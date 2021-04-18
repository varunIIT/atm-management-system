const chequeBookRouter = require("express").Router();
const axios = require("axios");
chequeBookRouter.get("/chequeBookReqPage", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  if (req.session.user.chequeBookRequest) {
    res.render("chequeBookReq", {
      passed:
        "Your cheque book request has been already passed,wait for bank to reply!",
      Req: false,
    });
  } else {
    res.render("chequeBookReq", { Req: true });
  }
});
chequeBookRouter.post("/chequeBookReq", (req, res) => {
  let remote_url=null
  if(process.env.PORT){
    remote_url = `https://atm-machine-april-2021.herokuapp.com/chequeBookReq${req.session.user.bankName}?userId=${req.session.user.userId}`;
  }
  axios
    .get(
      remote_url||`http://localhost:5000/chequeBookReq${req.session.user.bankName}?userId=${req.session.user.userId}`
        
    )
    .then(() => {
      req.session.user.chequeBookRequest = !req.session.user.chequeBookRequest;
      req.session.save();
      if (req.session.user.chequeBookRequest) {
        res.redirect("/chequeBookReqPassed");
      } else {
        res.redirect("/chequeBookReqCancel");
      }
      //console.log('cheque book request passed')
    })
    .catch(() => {
      //console.log('cheque book request failed')
    });
});
chequeBookRouter.get("/chequeBookReqPassed", (req, res) => {
  res.render("chequeBookReq", {
    passed: "Your cheque book request has been passed!",
    Req: false,
  });
});
chequeBookRouter.get("/chequeBookReqCancel", (req, res) => {
  res.render("chequeBookReq", { Req: true });
});

module.exports = {
  chequeBookRouter,
};
