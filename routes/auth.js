const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middlewares/authMiddleware");
const router = Router();

router.get("/", (req, res) => {
  res.render("auth/auth", { title: "Register", error: req.flash("error") });
});

router.post("/login", authMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    const comparedPwd = await bcrypt.compare(password, candidate.password);
    if (candidate && comparedPwd) {
      req.session.user = candidate;
      req.session.isAuthenticated = true;
      req.session.save((err) => {
        if (err) throw err;
        res.redirect("/");
      });
    } else {
      req.flash("error", "This username or password is wrong!!!");
      res.redirect("/auth");
    }
  } catch (err) {
    req.flash("error", "This user is not found!!!");
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
      req.flash("error", "This email is already exist!!!");
      res.redirect("/auth");
    } else {
      const hashedPwd = await bcrypt.hash(password, 10);
      const user = new User({
        name: name,
        email: email,
        password: hashedPwd,
      });

      await user.save();
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
