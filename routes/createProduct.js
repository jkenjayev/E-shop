const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("product/create", { title: "Create Product page" });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.redirect("/products");
});
module.exports = router;
