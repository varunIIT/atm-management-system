const { DummyBank1Model } = require("../db/dummyBank1model")

 const updateUserBank1=async (req,res)=>{
    const user=await DummyBank1Model.findOne({userId:parseInt(req.query.userId)})
    await DummyBank1Model.findOneAndUpdate({userId:req.query.userId},{amount:user.amount-parseInt(req.query.amount)})
 }
 module.exports={
     updateUserBank1
 }