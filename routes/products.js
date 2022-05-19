const express = require("express");
const Laptop = require("../models/Laptop");
const router = express.Router();

router.get("/", async (req, res) => {
  const laptops = await Laptop.getAllData();
  res.render("products/index", { title: "Laptops", isProducts: true, laptops });
});

router.get("/:id", async (req, res) => {
  const laptop = await Laptop.getAllData();
  res.render("product/index", { id: req.params.id });
});

module.exports = router;
