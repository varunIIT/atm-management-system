const authRoute = require("express").Router();
const axios = require("axios");


let msgObjEng={
    loginMsg : "Please Login to continue",
    welMsg : "Welcome!",
    atmMsg : "Delhi Bank ATM",
    bankMsg : "Your Bank Name",
    cardMsg : "Your Card No.",
    pinMsg : "Your PIN",
    submitMsg : "Submit",
    popUpMsg:''
}
let msgObjHin={
    loginMsg : "जारी रखने के लिए कृपया लॉग इन करें",
    welMsg : "स्वागत हे!",
    atmMsg : "दिल्ली बैंक एटीएम",
    bankMsg : "आपका बैंक का नाम",
    cardMsg : "आपका कार्ड नं.",
    pinMsg : "आपका पिन",
    submitMsg : "प्रस्तुत",
    popUpMsg:''

}

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
        
        let error = "Invalid Credentials!";
        let choosenLanguage=msgObjEng
        if (req.session.language == "hindi") {
          error = "अवैध प्रत्यय पत्र!";
          choosenLanguage=msgObjHin
        }
        choosenLanguage.popUpMsg=error
        return res.render("login", choosenLanguage);
      }

      req.session.user = response.data;
      req.session.user.bankName = req.body.bankName;

      res.redirect("/menu");
    })
    .catch((err) => {
      
      let error = "Invalid Credentials!";
      let choosenLanguage=msgObjEng;
      if (req.session.language == "hindi") {
        choosenLanguage=msgObjHin
        error = "अवैध प्रत्यय पत्र!";
      }
      choosenLanguage.popUpMsg=error
      res.render("login", choosenLanguage);
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
