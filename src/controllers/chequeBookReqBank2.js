const { DummyBank2Model } = require("../db/dummyBank2model")

const chequeBookReqbank2=async(req,res)=>{
    const user=await DummyBank2Model.findOne({userId:parseInt(req.query.userId)})
    await DummyBank2Model.findOneAndUpdate({userId:parseInt(req.query.userId)},{chequeBookRequest:(!user.chequeBookRequest)})
}

module.exports={
    chequeBookReqbank2
}