const balEnqRoute = require("express").Router();

balEnqRoute.get("/balance", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  res.render("balEnq", { balance: req.session.user.amount });
});
module.exports = {
  balEnqRoute,
};
