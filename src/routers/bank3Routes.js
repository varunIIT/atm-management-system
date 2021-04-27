const bank3Route = require("express").Router();
const { getUserBank3 } = require("../controllers/getUsersBank3");
const { updateUserBank3 } = require("../controllers/updateUserBank3");
const { changePinBank3 } = require("../controllers/changePinBank3");
const { chequeBookReqBank3 } = require("../controllers/chequeBookReqBank3");

bank3Route.get("/bank3", async (req, res) => {
  let userId =req.query.userId;
  let pin = req.query.pin;
  const user = await getUserBank3(userId, pin);
  res.send(user);
});

bank3Route.get("/updatebank3", async (req, res) => {
  await updateUserBank3(req.query.userId, req.query.amount);
  //console.log(2)
  res.send("ok");
});
bank3Route.get("/changePinbank3", async (req, res) => {
  await changePinBank3(req.query.pin, req.query.userId);
  res.send("ok");
});
bank3Route.get("/chequeBookReqbank3", async (req, res) => {
  await chequeBookReqBank3(req.query.userId);
  res.send("ok");
});

module.exports = { bank3Route };
