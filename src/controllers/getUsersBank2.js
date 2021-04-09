const { DummyBank2Model } = require("../db/dummyBank2model")

async function getUserBank2(userId,pin){
    const user=await DummyBank2Model.find({userId:userId,pin:pin})
    return user[0]
}
module.exports={getUserBank2}