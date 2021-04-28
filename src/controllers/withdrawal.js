const { TransactionModel, AtmModel } = require("../db/atmModels");
const withdrawal = async (req, res) => {
  try {
    let {currMsgObj,msgObjHin}=require('./../utils/withdrawalControllerTrans')
   
    if (req.session.language == "hindi") {
      currMsgObj=msgObjHin;
    }
    let amount = parseInt(req.body.amount);

    if (amount == 0) {
      let error = "Please increase your amount!";
      if (req.session.language == "hindi") {
        error = "कृपया अपनी राशि बढ़ाएँ!";
      }
      currMsgObj.popUpMsg=error;
      currMsgObj.color='red';
      res.render("withdrawal", currMsgObj);
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
      currMsgObj.popUpMsg=error;
      currMsgObj.color='red';
      res.render("withdrawal", currMsgObj);
      return 0;
    } 
    
    
    else if (amount > atmAmount) {
      let error = "Please reduce your amount!";
      if (req.session.language == "hindi") {
        error = "कृपया अपनी राशि कम करें!";
      }
      currMsgObj.popUpMsg=error;
      currMsgObj.color='red';
      res.render("withdrawal", currMsgObj);
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
        req.session.user.amount = req.session.user.amount - parseInt(req.body.amount);
        req.session.save();

        let success = "Your transaction is successfull!";
        if (req.session.language == "hindi") {
          success = "आपका लेनदेन सफल है!";
        }
        currMsgObj.popUpMsg=success;
        currMsgObj.color='green';
        res.render("withdrawal",currMsgObj);
        flag = 1;
    } 
    
    else if ((atmReceipt != 0) & (flag == 0)) {
        userReceipt = 1;
        req.session.user.amount = req.session.user.amount - parseInt(req.body.amount);
        req.session.save();
        let success =
          "Your transaction is successfull,Please collect your receipt!";
        if (req.session.language == "hindi") {
          success = "आपका लेनदेन सफल है, कृपया अपनी रसीद जमा करें!";
        }
        currMsgObj.popUpMsg=success;
        currMsgObj.color='green';
        res.render("withdrawal", currMsgObj);
        flag = 1;
      } 
    
    
    else if (flag == 0) {
        userReceipt = 0;
        req.session.user.amount = req.session.user.amount - parseInt(req.body.amount);
        req.session.save();
        let success =
          "Your transaction is successfull,We are running out of receipts!";
        if (req.session.language == "hindi") {
          success = "आपका लेनदेन सफल है, हम प्राप्तियों से बाहर चल रहे हैं!!";
        }
        currMsgObj.popUpMsg=success;
        currMsgObj.color='green';
        res.render("withdrawal", currMsgObj);
    }


    let note100 = atmData[0].note100;
    let note200 = atmData[0].note200;
    let note500 = atmData[0].note500;
    let note1000 = atmData[0].note1000;
    let note2000 = atmData[0].note2000;

    await AtmModel.findOneAndUpdate(
      { atmUniqueNumber: atmId },
      {
        receipt: atmReceipt - userReceipt,
        note100: note100 - req.body.note100,
        note200: note200 - req.body.note200,
        note500: note500 - req.body.note500,
        note1000: note1000- req.body.note1000,
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
