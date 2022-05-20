const express = require("express");
const Laptop = require("../models/Laptop");
const router = express.Router();

router.get("/", async (req, res) => {
  const laptops = await Laptop.getAllData();
  res.render("products/index", { title: "Laptops", isProducts: true, laptops });
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const laptop = await Laptop.getLaptopById(req.params.id);
  res.render("laptops/update", { laptop });
});

router.get("/:id", async (req, res) => {
  const laptop = await Laptop.getLaptopById(req.params.id);
  res.render("laptops/laptop", { layout: "details", laptop });
});

module.exports = router;
