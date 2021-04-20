const chequeBookRouter = require("express").Router();
const axios = require("axios");

let msgObjEngCancelReq={
    headMsg : "Cheque Book Request",
    cancelMsg : "Cancel Request",
    logout : "Logout",
}
let msgObjHinCancelReq={
    headMsg : "चेक बुक निवेदन",
    cancelMsg : "अनुरोध रद्द करें",
    logout : "लॉग आउट",
}
let msgObjEngReq={
    reqMsg : "Do you want to make a cheque book request to your bank?",
    req2Msg : "Request Cheque Book",
    headMsg : "Cheque Book Request",
    logout : "Logout",
}
let msgObjHinReq={
    reqMsg : "क्या आप अपने बैंक को चेक बुक अनुरोध करना चाहते हैं?",
    req2Msg : "चेक बुक अनुरोध करें",
    headMsg : "चेक बुक निवेदन",
    logout : "लॉग आउट",

}


chequeBookRouter.get("/chequeBookReqPage", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  if (req.session.user.chequeBookRequest) {
    let passed ="Your cheque book request has been already passed,wait for bank to reply!";
    let choosenLanguage=msgObjEngCancelReq
    if (req.session.language == "hindi") {
      choosenLanguage=msgObjHinCancelReq
      passed ="आपका चेक बुक अनुरोध पहले ही पारित हो चुका है, बैंक के जवाब की प्रतीक्षा करें!";
      }
      choosenLanguage.popUpMsg=passed;
      choosenLanguage.Req=false;
    res.render("chequeBookReq", choosenLanguage);
  } 
  
  else {
    let choosenLanguage=msgObjEngReq;
    if (req.session.language == "hindi") {
      choosenLanguage=msgObjHinReq
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
      //console.log('cheque book request failed')
    });
});


chequeBookRouter.get("/chequeBookReqPassed", (req, res) => {
  let passed = "Your cheque book request has been passed!";
  let choosenLanguage=msgObjEngCancelReq;

  if (req.session.language == "hindi") {
    choosenLanguage=msgObjHinCancelReq;
    passed = "आपका चेक बुक अनुरोध पारित हो गया है!";
    
  }
  choosenLanguage.popUpMsg=passed
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
