const { withdrawal } = require("../controllers/withdrawal");
const { AtmModel } = require("../db/atmModels");
const axios = require("axios");
const {msgObjHin,msgObjEng}=require('./../utils/withdrawalRouteTrans')

const withdrawalRoute = require("express").Router();
withdrawalRoute.get("/withdraw", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  let choosenLanguage=msgObjEng;
  if (req.session.language == "hindi") {
    choosenLanguage=msgObjHin;
  }
  res.render("withdrawal", choosenLanguage);
});
withdrawalRoute.post("/withdrawPost", async (req, res) => {
  const success = await withdrawal(req, res);
  if (success) {
    let remote_url = null;
    if (process.env.PORT) {
      remote_url = `https://atm-machine-april-2021.herokuapp.com/update${req.session.user.bankName}?userId=${req.session.user.userId}&amount=${req.body.amount}`;
    }
    await axios
      .get(
        remote_url ||
          `http://localhost:5000/update${req.session.user.bankName}?userId=${req.session.user.userId}&amount=${req.body.amount}`
      )
      .then(() => {
        console.log("user updated successfully");
        })
      .catch(() => {
        console.log("user is not updated,error");
      });
  }
});
withdrawalRoute.get("/denomination", async (req, res) => {
  const data = await AtmModel.find({});
  res.send(data[0]);
});
module.exports = {
  withdrawalRoute,
};
