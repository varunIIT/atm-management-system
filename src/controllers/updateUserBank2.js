const { DummyBank2Model } = require("../db/dummyBank2model")

 const updateUserBank2=async (req,res)=>{
    const user=await DummyBank2Model.findOne({userId:parseInt(req.query.userId)})
    await DummyBank2Model.findOneAndUpdate({userId:req.query.userId},{amount:user.amount-parseInt(req.query.amount)})
 }
 module.exports={
     updateUserBank2
 }