const { Router } = require("express");
const Card = require("../models/Cart");
const Laptop = require("../models/Laptop");
const router = Router();

router.post("/add", async (req, res) => {
  const laptop = await Laptop.getLaptopById(req.body.id);
  await Card.add(laptop);
  res.redirect("/card");
});

router.get("/", async (req, res) => {
  const card = await Card.fetch();
  res.render("Card", {
    title: "Basket",
    laptops: card.laptops,
    price: card.price
  });
});


router.delete("/remove/:id", async (req, res) => {
  const cart = await Card.remove(req.params.id);
  res.status(200).send(cart);  
})

module.exports = router;
