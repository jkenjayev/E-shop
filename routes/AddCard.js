const { Router } = require("express");
const Card = require("../models/Card");
const Laptop = require("../models/Laptop");
const router = Router();

router.post("/add", async (req, res) => {
  const addedToCard = await Laptop.getLaptopById(req.body.id);
  await Card.add(addedToCard);
  res.redirect("/card");
});

router.get("/", async (req, res) => {
  // const card = await Card.fetch();
  res.render("Card", {
    title: "CardPage",
  });
});

module.exports = router;
