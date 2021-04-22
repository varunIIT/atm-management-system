const authRoute = require("express").Router();
const axios = require("axios");
const {msgObjHin,msgObjEng,error}=require('./../utils/authRouteTrans')


authRoute.post("/login", async (req, res) => {
  //todo hashing
  let remote_url = null;
  if (process.env.PORT) {
    remote_url = `https://atm-machine-april-2021.herokuapp.com/${req.body.bankName}?userId=${req.body.userId}&pin=${req.body.pin}`;
  }
  axios
    .get(
      remote_url ||
        `http://localhost:5000/${req.body.bankName}?userId=${req.body.userId}&pin=${req.body.pin}`
    )
    .then((response) => {
      if (!response.data) {
        
        let choosenLanguage=msgObjEng;
        choosenLanguage.popUpMsg=error.errorEng;
        if (req.session.language == "hindi") {
          choosenLanguage=msgObjHin;
          choosenLanguage.popUpMsg=error.errorHin;
        }
      res.render("login", choosenLanguage);
      choosenLanguage.popUpMsg='';
      return
      }

      req.session.user = response.data;
      req.session.user.bankName = req.body.bankName;

      res.redirect("/menu");
    })
    .catch((err) => {
      let choosenLanguage=msgObjEng;
      choosenLanguage.popUpMsg=error.errorEng;
      if (req.session.language == "hindi") {
        choosenLanguage=msgObjHin;
        choosenLanguage.popUpMsg=error.errorHin;
        
      }
      res.render("login", choosenLanguage);
      choosenLanguage.popUpMsg='';
    });
});

authRoute.get("/login", (req, res) => {
  if (!req.session.language) {
    return res.redirect("/");
  }
  
  let choosenLanguage=msgObjEng;

  if (req.session.language == "hindi") {
    choosenLanguage=msgObjHin;
   
  }
  res.render("login",choosenLanguage);
});
authRoute.get("/user", (req, res) => {
  res.send({ user: req.session.user.name, lang: req.session.language });
});
authRoute.get("/logout", (req, res) => {
  req.session.user = null;
  req.session.language = null;
  res.redirect("/");
});
module.exports = {
  authRoute,
};
