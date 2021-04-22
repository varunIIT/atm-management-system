const changePinRoute = require("express").Router();
const axios = require("axios");
const {msgObjHin,msgObjEng,success}=require('./../utils/changePinRouteTrans')

changePinRoute.get("/changePin", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  let choosenLanguage=msgObjEng;
  if (req.session.language == "hindi") {
    choosenLanguage=msgObjHin;
  }
  res.render("changePin",choosenLanguage);
});
changePinRoute.post("/changePin", (req, res) => {
  let remote_url = null;
  if (process.env.PORT) {
    remote_url = `https://atm-machine-april-2021.herokuapp.com/changePin${req.session.user.bankName}?userId=${req.session.user.userId}&pin=${req.body.newPin}`;
  }
  axios
    .get(
      remote_url ||
        `http://localhost:5000/changePin${req.session.user.bankName}?userId=${req.session.user.userId}&pin=${req.body.newPin}`
    )
    .then(() => {
      
      
      let choosenLanguage=msgObjEng;
      choosenLanguage.popUpMsg=success.successEng;

      if (req.session.language == "hindi") {
        choosenLanguage=msgObjHin;
        choosenLanguage.popUpMsg=success.successHin;
      }
      res.render("changePin", choosenLanguage);
      choosenLanguage.popUpMsg='';
    })
    .catch(() => {
      console.log("error changing pin");
    });
});

module.exports = {
  changePinRoute,
};
