const balEnqRoute = require("express").Router();

balEnqRoute.get("/balance", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }
  let headMsg='Your Balance!'
  let logout='Logout'
  let first='Your have a total of'
  let second=`Rs. ${req.session.user.amount}`
  let last='in your account!'

  if(req.session.language=='hindi'){
    headMsg='आपका बैलेंस!'
    logout='लॉग आउट'
    first='आपका कुल है'
    second=`रु. ${req.session.user.amount}`
    last='आपके खाते में!'
  }
  res.render("balEnq", {headMsg:headMsg,logout:logout,first:first,second:second,last:last});
});
module.exports = {
  balEnqRoute,
};
