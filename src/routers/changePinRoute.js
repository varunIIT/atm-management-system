const changePinRoute = require("express").Router();
const axios = require("axios");

changePinRoute.get("/changePin", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  let headMsg='Change PIN'
  let enterMsg='Enter new pin :'
  let btnMsg='Change Pin!'
  let btn2Msg='Logout'
  if(req.session.language=='hindi'){
    headMsg='पिन बदलिए'
    enterMsg='नया पिन दर्ज करें:'
    btnMsg='पिन बदलिए!'
    btn2Msg='लॉग आउट'
  }
  res.render("changePin",{headMsg:headMsg,enterMsg:enterMsg,btnMsg:btnMsg,btn2Msg:btn2Msg});
});
changePinRoute.post("/changePin", (req, res) => {
  let remote_url=null
  if(process.env.PORT){
    remote_url = `https://atm-machine-april-2021.herokuapp.com/changePin${req.session.user.bankName}?userId=${req.session.user.userId}&pin=${req.body.newPin}`;
  }
  axios
    .get(
      remote_url||`http://localhost:5000/changePin${req.session.user.bankName}?userId=${req.session.user.userId}&pin=${req.body.newPin}`
        
    )
    .then(() => {
    let headMsg='Change PIN'
    let enterMsg='Enter new pin :'
    let btnMsg='Change Pin!'
    let btn2Msg='Logout'
    let error='PIN changed successfully!'
    if(req.session.language=='hindi'){
      headMsg='पिन बदलिए'
      enterMsg='नया पिन दर्ज करें:'
      btnMsg='पिन बदलिए!'
      btn2Msg='लॉग आउट'
      error='पिन सफलतापूर्वक बदल गया!'
  }
      res.render("changePin", { error:error,headMsg:headMsg,enterMsg:enterMsg,btnMsg:btnMsg,btn2Msg:btn2Msg });
    })
    .catch(() => {
      console.log("error changing pin");
    });
});

module.exports = {
  changePinRoute,
};
