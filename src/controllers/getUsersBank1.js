const { DummyBank1Model } = require("../db/dummyBank1model")

async function getUserBank1(userId,pin){
    const user=await DummyBank1Model.find({userId:userId,pin:pin})
    return user[0]
}
module.exports={getUserBank1}
