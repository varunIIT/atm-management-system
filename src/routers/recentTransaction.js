const { TransactionModel } = require("../db/atmModels");

const recentTransactionRoute = require("express").Router();

recentTransactionRoute.get("/recentTransaction", async (req, res) => {
  if (!req.session.user) {
    return res.send(null);
  }
  const recentTran = await TransactionModel.find({
    userId: req.session.user.userId,
    bankName: req.session.user.bankName,
  })
    .sort({ _id: -1 })
    .limit(10);
  //console.log(recentTran)
  res.send({ recentTran: recentTran, lang: req.session.language });
});

module.exports = {
  recentTransactionRoute,
};
