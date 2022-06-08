module.exports = (req, res, next) => {
  if((!req.session.isAuthenticated) || (req.session.isAuthenticated = null)) {
    return res.redirect("/");
  }

  next();
}