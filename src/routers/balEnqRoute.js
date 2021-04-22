const { msgObjHin,msgObjEng  } = require("../utils/balEnqRouteTrans");
const balEnqRoute = require("express").Router();

balEnqRoute.get("/balance", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  
  let choosenLanguage=msgObjEng;
  choosenLanguage.second= `Rs. ${req.session.user.amount}`;
  if (req.session.language == "hindi") {
    choosenLanguage=msgObjHin;
    choosenLanguage.second=`रु. ${req.session.user.amount}`;
  }
  res.render("balEnq", choosenLanguage);
});
module.exports = {
  balEnqRoute,
};
