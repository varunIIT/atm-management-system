const { withdrawal } = require("../controllers/withdrawal");
const { AtmModel } = require("../db/atmModels");
const axios = require("axios");

const withdrawalRoute = require("express").Router();
withdrawalRoute.get("/withdraw", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  let withMsg='Withdrawal'
  let totalMsg='Total Cash (in Rs.)'
  let receipt='Receipt'
  let with2Msg='Withdraw'
  let logout='Logout'
  if(req.session.language=='hindi'){
    withMsg='निकासी'
    totalMsg='कुल नकद (रु में)'
    receipt='रसीद'
    with2Msg='निकालना'
    logout='लॉग आउट'
  }
  res.render("withdrawal",{withMsg:withMsg,totalMsg:totalMsg,receipt:receipt,with2Msg:with2Msg,logout:logout});
});
withdrawalRoute.post("/withdrawPost", async (req, res) => {
  const success = await withdrawal(req, res);
  if (success) {
    let remote_url=null
    if(process.env.PORT){
    remote_url = `https://atm-machine-april-2021.herokuapp.com/update${req.session.user.bankName}?userId=${req.session.user.userId}&amount=${req.body.amount}`;
    }
    await axios
      .get(
        remote_url||`http://localhost:5000/update${req.session.user.bankName}?userId=${req.session.user.userId}&amount=${req.body.amount}`
          
      )
      .then(() => {
        //console.log("user updated successfully")
        //console.log(req.session)
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
