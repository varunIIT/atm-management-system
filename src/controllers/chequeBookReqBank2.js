const { DummyBank2Model } = require("../db/dummyBank2model")

const chequeBookReqbank2=async(req,res)=>{
    await DummyBank2Model.findOneAndUpdate({userId:parseInt(req.query.userId)},{chequeBookRequest:true})
}

module.exports={
    chequeBookReqbank2
}