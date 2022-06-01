const { Router } = require("express");
const Card = require("../models/Cart");
const Laptop = require("../models/Laptop");
const User = require("../models/User");
const router = Router();

router.post("/add", async (req, res) => {
  const laptop = await Laptop.findById(req.body.id);
  await req.user.addToCart(laptop);
  res.redirect("/card");
});

router.get("/", async (req, res) => {
  const user = await req.user.populate("cart.items.laptopId");
  const laptops = mappingCart(user.cart);
  res.render("Card", { laptops, price: computePrice(laptops) });
});

router.delete("/remove/:id", async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate("cart.items.laptopId");
  const laptops = mappingCart(user.cart);
  const cart = {
    laptops,
    price: computePrice(laptops),
  };
  res.status(200).json(cart);
});

function mappingCart(cart) {
  return cart.items.map((l) => ({
    ...l.laptopId._doc,
    id: l.laptopId.id,
    count: l.count,
  }));
}

function computePrice(laptops) {
  return laptops.reduce((total, laptop) => {
    return (total += laptop.price * laptop.count);
  }, 0);
}

module.exports = router;
