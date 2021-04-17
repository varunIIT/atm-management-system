const { DummyBank1Model } = require("../db/dummyBank1model")

const chequeBookReqbank1=async(req,res)=>{
    await DummyBank1Model.findOneAndUpdate({userId:parseInt(req.query.userId)},{chequeBookRequest:true})
}

module.exports={
    chequeBookReqbank1
}