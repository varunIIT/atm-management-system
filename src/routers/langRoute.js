const langRoute = require("express").Router();

langRoute.get("/english", (req, res) => {
  req.session.language = "english";
  res.redirect("/login");
});
langRoute.get("/hindi", (req, res) => {
  req.session.language = "hindi";
  res.redirect("/login");
});

module.exports = {
  langRoute,
};
