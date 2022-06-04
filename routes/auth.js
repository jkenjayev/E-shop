const { Router } = require("express");
const User = require("../models/User");
const session = require("express-session");
const authMiddleware = require("../middlewares/authMiddleware");
const router = Router();

router.get("/", (req, res) => {
  res.render("auth/auth", { title: "Register" });
});

router.post("/login", async (req, res) => {
  const user = await User.findById("6291fdd0bd2d72090df316f5");
  req.session.user = user;
  req.session.isAuthenticated = true;
  req.session.save((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth");
  });
});
module.exports = router;
