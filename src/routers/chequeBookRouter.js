const chequeBookRouter = require("express").Router();
const axios = require("axios");
const { msgObjEngCancelReq,msgObjHinCancelReq,msgObjEngReq,msgObjHinReq,alreadyPassed,justPassed}=require('./../utils/chequeBookRouterTrans')

chequeBookRouter.get("/chequeBookReqPage", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  if (req.session.user.chequeBookRequest) {
    let choosenLanguage=msgObjEngCancelReq;
    choosenLanguage.popUpMsg=alreadyPassed.passedEng;

    if (req.session.language == "hindi") {
      choosenLanguage=msgObjHinCancelReq;
      choosenLanguage.popUpMsg=alreadyPassed.passedHin;
      }
    choosenLanguage.Req=false;
    res.render("chequeBookReq", choosenLanguage);
  } 
  
  else {
    let choosenLanguage=msgObjEngReq;
    if (req.session.language == "hindi") {
      choosenLanguage=msgObjHinReq;
    }
    choosenLanguage.Req=true;
    res.render("chequeBookReq",choosenLanguage);
  }
});


chequeBookRouter.post("/chequeBookReq", (req, res) => {
  let remote_url = null;
  if (process.env.PORT) {
    remote_url = `https://atm-machine-april-2021.herokuapp.com/chequeBookReq${req.session.user.bankName}?userId=${req.session.user.userId}`;
  }
  axios
    .get(
      remote_url ||
        `http://localhost:5000/chequeBookReq${req.session.user.bankName}?userId=${req.session.user.userId}`
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
      console.log('cheque book request failed')
    });
});


chequeBookRouter.get("/chequeBookReqPassed", (req, res) => {
  
  let choosenLanguage=msgObjEngCancelReq;
  choosenLanguage.popUpMsg=justPassed.passedEng;

  if (req.session.language == "hindi") {
    choosenLanguage=msgObjHinCancelReq;
    choosenLanguage.popUpMsg=justPassed.passedHin;
    
  }
  res.render("chequeBookReq", choosenLanguage);
  
});


chequeBookRouter.get("/chequeBookReqCancel", (req, res) => {
  
  let choosenLanguage=msgObjEngReq;
  if (req.session.language == "hindi") {
    
    choosenLanguage=msgObjHinReq
  }
  choosenLanguage.Req=true;
  res.render("chequeBookReq",choosenLanguage);
});

module.exports = {
  chequeBookRouter,
};
