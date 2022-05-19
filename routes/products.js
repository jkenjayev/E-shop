const express = require("express");
const Laptop = require("../models/Laptop");
const router = express.Router();

router.get("/", async (req, res) => {
  const laptops = await Laptop.getAllData();
  res.render("product/index", { title: "Laptops", isProducts: true, laptops });
});

module.exports = router;
