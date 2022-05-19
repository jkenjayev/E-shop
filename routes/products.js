const express = require("express");
const Laptop = require("../models/Laptop");
const router = express.Router();

router.get("/", async (req, res) => {
<<<<<<< HEAD
  const laptops = await Laptop.getAllData();
  res.render("product/index", { title: "Laptops", isProducts: true, laptops });
=======
  const laptops = await Laptop.getAllData()
  res.render("product/index", {title: "Laptops", isProducts: true, laptops});
>>>>>>> 6b29ae0d0a6e481f5ec8da84bb7deb9b254dd83a
});

module.exports = router;
