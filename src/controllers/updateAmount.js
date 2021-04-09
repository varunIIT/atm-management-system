const { DummyBank2Model } = require("../db/dummyBank2model")
const { DummyBank1Model } = require("../db/dummyBank1model")
async function updateUserAmount(req,res){
    if(req.session.user.bankName=='bank1'){
        await DummyBank1Model.findOneAndUpdate({userId:req.session.user.userId},{amount:req.session.user.amount-req.body.amount})
        req.session.user.amount-=req.body.amount
    }
    else{
        await DummyBank2Model.findOneAndUpdate({userId:req.session.user.userId},{amount:req.session.user.amount-req.body.amount})
        req.session.user.amount-=req.body.amount

    }
}
module.exports={
    updateUserAmount
}