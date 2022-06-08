const { Router } = require("express");
const User = require("../models/User");
const session = require("express-session");
const authMiddleware = require("../middlewares/authMiddleware");
const router = Router();

router.get("/", (req, res) => {
  res.render("auth/auth", { title: "Register" });
});

router.post("/login", authMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate && (password === candidate.password)) {
      req.session.user = candidate;
      req.session.isAuthenticated = true;
      req.session.save((err) => {
        if (err) throw err;
        res.redirect("/");
      });
    } else {
      res.redirect("/auth");
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", authMiddleware, async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth");
  });
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const candidate = await User.findOne({ email: email });
    if (candidate) {
      res.redirect("/auth");
    } else {
      const user = new User({
        name: name,
        email: email,
        password: password,
      });

      await user.save();
      res.redirect("/auth/login");
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
