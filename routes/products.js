const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("product/index", {title: "Laptops", isProducts: true});
});

module.exports = router;