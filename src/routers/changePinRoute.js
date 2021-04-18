const changePinRoute = require("express").Router();
const axios = require("axios");

changePinRoute.get("/changePin", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  res.render("changePin");
});
changePinRoute.post("/changePin", (req, res) => {
  const remote_url = `https://atm-machine-april-2021.herokuapp.com/changePin${req.session.user.bankName}?userId=${req.session.user.userId}&pin=${req.body.newPin}`;
  axios
    .get(
      `http://localhost:5000/changePin${req.session.user.bankName}?userId=${req.session.user.userId}&pin=${req.body.newPin}` ||
        remote_url
    )
    .then(() => {
      res.render("changePin", { error: "PIN changed successfully!" });
    })
    .catch(() => {
      console.log("error changing pin");
    });
});

module.exports = {
  changePinRoute,
};
