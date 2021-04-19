const { TransactionModel, AtmModel } = require("../db/atmModels");
const withdrawal = async (req, res) => {
  try {
    let withMsg = "Withdrawal";
    let totalMsg = "Total Cash (in Rs.)";
    let receiptMsg = "Receipt";
    let with2Msg = "Withdraw";
    let logout = "Logout";
    if (req.session.language == "hindi") {
      withMsg = "निकासी";
      totalMsg = "कुल नकद (रु में)";
      receiptMsg = "रसीद";
      with2Msg = "निकालना";
      logout = "लॉग आउट";
    }
    let amount = parseInt(req.body.amount);
    if (amount == 0) {
      let error = "Please increase your amount!";
      if (req.session.language == "hindi") {
        error = "कृपया अपनी राशि बढ़ाएँ!";
      }
      res.render("withdrawal", {
        error: error,
        color: "red",
        withMsg: withMsg,
        totalMsg: totalMsg,
        receipt: receiptMsg,
        with2Msg: with2Msg,
        logout: logout,
      });
      return 0;
    }
    //console.log(req.body)
    const atmData = await AtmModel.find({});
    const atmAmount = atmData[0].atmAmount;
    const atmReceipt = atmData[0].receipt;
    const receipt = req.body.receipt;
    // console.log(req.session)

    if (amount > req.session.user.amount) {
      let error = `You have Rs. ${req.session.user.amount} in your account!`;
      if (req.session.language == "hindi") {
        error = `आपके पास आपके खाते में रु. ${req.session.user.amount} है!`;
      }
      res.render("withdrawal", {
        error: error,
        color: "red",
        withMsg: withMsg,
        totalMsg: totalMsg,
        receipt: receiptMsg,
        with2Msg: with2Msg,
        logout: logout,
      });
      return 0;
    } else if (amount > atmAmount) {
      let error = "Please reduce your amount!";
      if (req.session.language == "hindi") {
        error = "कृपया अपनी राशि कम करें!";
      }
      res.render("withdrawal", {
        error: error,
        color: "red",
        withMsg: withMsg,
        totalMsg: totalMsg,
        receipt: receiptMsg,
        with2Msg: with2Msg,
        logout: logout,
      });
      return 0;
    }
    let flag = 0;
    let userReceipt;
    let atmId = 1212;
    await AtmModel.findOneAndUpdate(
      { atmUniqueNumber: atmId },
      { atmAmount: atmAmount - amount }
    );
    if (!receipt & (flag == 0)) {
      userReceipt = 0;
      req.session.user.amount =
        req.session.user.amount - parseInt(req.body.amount);
      req.session.save();

      let error = "Your transaction is successfull!";
      if (req.session.language == "hindi") {
        error = "आपका लेनदेन सफल है!";
      }
      res.render("withdrawal", {
        error: error,
        color: "green",
        withMsg: withMsg,
        totalMsg: totalMsg,
        receipt: receiptMsg,
        with2Msg: with2Msg,
        logout: logout,
      });
      flag = 1;
    } else if ((atmReceipt != 0) & (flag == 0)) {
      userReceipt = 1;
      req.session.user.amount =
        req.session.user.amount - parseInt(req.body.amount);
      req.session.save();
      let error =
        "Your transaction is successfull,Please collect your receipt!";
      if (req.session.language == "hindi") {
        error = "आपका लेनदेन सफल है, कृपया अपनी रसीद जमा करें!";
      }
      res.render("withdrawal", {
        error: error,
        color: "green",
        withMsg: withMsg,
        totalMsg: totalMsg,
        receipt: receiptMsg,
        with2Msg: with2Msg,
        logout: logout,
      });
      flag = 1;
    } else if (flag == 0) {
      userReceipt = 0;
      req.session.user.amount =
        req.session.user.amount - parseInt(req.body.amount);
      req.session.save();
      let error =
        "Your transaction is successfull,We are running out of receipts!";
      if (req.session.language == "hindi") {
        error = "आपका लेनदेन सफल है, हम प्राप्तियों से बाहर चल रहे हैं!!";
      }
      res.render("withdrawal", {
        error: error,
        color: "green",
        withMsg: withMsg,
        totalMsg: totalMsg,
        receipt: receiptMsg,
        with2Msg: with2Msg,
        logout: logout,
      });
    }
    let note100 = atmData[0].note100;
    let note200 = atmData[0].note200;
    let note500 = atmData[0].note500;
    let note2000 = atmData[0].note2000;
    await AtmModel.findOneAndUpdate(
      { atmUniqueNumber: atmId },
      {
        receipt: atmReceipt - userReceipt,
        note100: note100 - req.body.note100,
        note200: note200 - req.body.note200,
        note500: note500 - req.body.note500,
        note2000: note2000 - req.body.note2000,
      }
    );
    await TransactionModel.create({
      userId: req.session.user.userId,
      name: req.session.user.name,
      bankName: req.session.user.bankName,
      withdrawalAmount: amount,
      receipt: userReceipt,
    });

    return 1;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { withdrawal };
