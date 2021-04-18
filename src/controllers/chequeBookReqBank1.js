const { DummyBank1Model } = require("../db/dummyBank1model")

const chequeBookReqbank1=async(req,res)=>{
    const user=await DummyBank1Model.findOne({userId:parseInt(req.query.userId)})
    await DummyBank1Model.findOneAndUpdate({userId:parseInt(req.query.userId)},{chequeBookRequest:(!user.chequeBookRequest)})
}

module.exports={
    chequeBookReqbank1
}