const chequeBookRouter = require("express").Router();
const axios = require("axios");
chequeBookRouter.get("/chequeBookReqPage", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  if (req.session.user.chequeBookRequest) {
    let passed="Your cheque book request has been already passed,wait for bank to reply!"
    let headMsg='Cheque Book Request'
    let cancelMsg='Cancel Request'
    let logout='Logout'

  if(req.session.language=='hindi'){
    passed= 'आपका चेक बुक अनुरोध पहले ही पारित हो चुका है, बैंक के जवाब की प्रतीक्षा करें!'
    headMsg='चेक बुक निवेदन'
    cancelMsg='अनुरोध रद्द करें'
    logout='लॉग आउट'
  }
    res.render("chequeBookReq", {
      passed:passed,
      Req: false,
      headMsg:headMsg,
      cancelMsg:cancelMsg,
      logout:logout
    });
  } else {
    let reqMsg='Do you want to make a cheque book request to your bank?'
    let req2Msg='Request Cheque Book'
    let headMsg='Cheque Book Request'
    let logout='Logout'
  
  
  
    if(req.session.language=='hindi'){
      reqMsg='क्या आप अपने बैंक को चेक बुक अनुरोध करना चाहते हैं?'
      req2Msg='चेक बुक अनुरोध करें'
      headMsg='चेक बुक निवेदन'
      logout='लॉग आउट'
  
    }
    res.render("chequeBookReq", { Req: true,req2Msg:req2Msg,reqMsg:reqMsg ,headMsg:headMsg,logout:logout});
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
  let passed="Your cheque book request has been passed!"
  let headMsg='Cheque Book Request'
  let cancelMsg='Cancel Request'
  let logout='Logout'

  if(req.session.language=='hindi'){
    passed= "आपका चेक बुक अनुरोध पारित हो गया है!"
    headMsg='चेक बुक निवेदन'
    cancelMsg='अनुरोध रद्द करें'
    logout='लॉग आउट'
  }
  res.render("chequeBookReq", {
   passed:passed,
    Req: false,
    headMsg:headMsg,
    cancelMsg:cancelMsg,
    logout:logout
  });
});
chequeBookRouter.get("/chequeBookReqCancel", (req, res) => {
  let reqMsg='Do you want to make a cheque book request to your bank?'
  let req2Msg='Request Cheque Book'
  let headMsg='Cheque Book Request'
  let logout='Logout'



  if(req.session.language=='hindi'){
    reqMsg='क्या आप अपने बैंक को चेक बुक अनुरोध करना चाहते हैं?'
    req2Msg='चेक बुक अनुरोध करें'
    headMsg='चेक बुक निवेदन'
    logout='लॉग आउट'

  }
  res.render("chequeBookReq", { Req: true,req2Msg:req2Msg,reqMsg:reqMsg ,headMsg:headMsg,logout:logout});
});

module.exports = {
  chequeBookRouter,
};
