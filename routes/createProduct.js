const express = require("express");
const Laptop = require("../models/Laptop");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("product/create", { title: "Create Product page" });
});

router.post("/", async (req, res) => {
  const laptop = new Laptop(
    req.body.title, 
    req.body.price, 
    req.body.description, 
    req.body.img
    );
  await laptop.save();
  res.redirect("/products");
});
module.exports = router;
