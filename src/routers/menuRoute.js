const menuRoute = require("express").Router();
const path = require("path");

menuRoute.get("/menu", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  res.sendFile(path.join(__dirname, "/../public/menu/menu.html"));
});

module.exports = {
  menuRoute,
};
