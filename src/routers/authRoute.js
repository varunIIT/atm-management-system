const authRoute = require("express").Router();
const axios = require("axios");

authRoute.post("/login", async (req, res) => {
  //todo hashing
  const remote_url = `https://atm-machine-april-2021.herokuapp.com/${req.body.bankName}?userId=${req.body.userId}&pin=${req.body.pin}`;
  axios
    .get(
      `http://localhost:5000/${req.body.bankName}?userId=${req.body.userId}&pin=${req.body.pin}` ||
        remote_url
    )
    .then((response) => {
      if (!response.data) {
        return res.render("login", { error: "Invalid Credentials!" });
      }

      req.session.user = response.data;
      req.session.user.bankName = req.body.bankName;

      res.redirect("/menu");
    })
    .catch((err) => {
      res.render("login", { error: "Invalid Credentials!" });
    });
});

authRoute.get("/login", (req, res) => {
  if (!req.session.language) {
    return res.redirect("/");
  }

  let loginMsg='Please Login to continue'
  let welMsg='Welcome!'
  let atmMsg='Delhi Bank ATM'
  let bankMsg='Your Bank Name'
  let cardMsg='Your Card No.'
  let pinMsg='Your PIN'
  let submitMsg='Submit'
  if(req.session.language=='hindi'){
      loginMsg='जारी रखने के लिए कृपया लॉग इन करें'
      welMsg='स्वागत हे!'
      atmMsg='दिल्ली बैंक एटीएम'
      bankMsg='आपका बैंक का नाम'
      cardMsg='आपका कार्ड नं.'
      pinMsg='आपका पिन'
      submitMsg='प्रस्तुत'
  }
  res.render("login",{loginMsg:loginMsg,welMsg:welMsg,atmMsg:atmMsg,bankMsg:bankMsg, cardMsg: cardMsg,pinMsg:pinMsg, submitMsg: submitMsg});
});
authRoute.get("/user", (req, res) => {
  res.send({ user: req.session.user.name ,lang:req.session.language});
});
authRoute.get("/logout", (req, res) => {
  req.session.user = null;
  req.session.language=null;
  res.redirect("/");
});
module.exports = {
  authRoute,
};
