const express = require("express");
const Laptop = require("../models/Laptop");
const router = express.Router();

router.get("/add", (req, res) => {
  res.render("products/create", {
    layout: "main",
    title: "Create Product page",
  });
});

router.post("/", async (req, res) => {
  const laptop = new Laptop({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    img: req.body.img,
  });
  try {
    await laptop.save();
    res.redirect("/");
  } catch (err) {
    console.log("Product creating error: ", err);
  }
});
module.exports = router;
