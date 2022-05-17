const expressHandlebars = require("express-handlebars");
const hbs = expressHandlebars.create({
  defaultLayout: "main",
  extname: "hbs"
});

module.exports = hbs;