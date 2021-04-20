const changePinRoute = require("express").Router();
const axios = require("axios");

let msgObjEng={
   headMsg : "Change PIN",
   enterMsg : "Enter new pin :",
   btnMsg : "Change Pin!",
   btn2Msg : "Logout",
}
let msgObjHin={
  headMsg : "पिन बदलिए",
  enterMsg : "नया पिन दर्ज करें:",
  btnMsg : "पिन बदलिए!",
  btn2Msg : "लॉग आउट",
}
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
      
      let error = "PIN changed successfully!";
      let choosenLanguage=msgObjEng;
      if (req.session.language == "hindi") {
        choosenLanguage=msgObjHin
        error = "पिन सफलतापूर्वक बदल गया!";
      }
      choosenLanguage.popUpMsg=error;
      res.render("changePin", choosenLanguage);
    })
    .catch(() => {
      console.log("error changing pin");
    });
});

module.exports = {
  changePinRoute,
};
