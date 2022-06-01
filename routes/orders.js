const { Router } = require("express");
const Order = require("../models/order");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id }).populate(
      "user.userId"
    );
    res.render("orders/index", {
      title: "Orders",
      orders: orders.map((or) => ({
        ...or._doc,
        price: or.laptops.reduce((total, l) => {
          return total += l.count * l.laptop.price
        }, 0),
      })),
    });
  } catch (err) {
    console.log("order view error: ", err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.laptopId");
    const laptops = user.cart.items.map((l) => ({
      count: l.count,
      laptop: { ...l.laptopId._doc },
    }));

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },

      laptops,
    });

    await order.save();
    await req.user.cleanCart();
    res.redirect("/orders");
  } catch (err) {
    console.log(`order error: `, err);
  }
});

module.exports = router;
