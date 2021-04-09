const { DummyBank1Model } = require("../db/dummyBank1model")
const bcrypt=require('bcrypt')

async function getUserBank1(userId,pin){
    //todo comparison of pin 
    const users=await DummyBank1Model.find({userId:userId})
    const user=users[0]
    if(user){
        const login=await bcrypt.compare(pin,user.pin);
        if(login){
            return user
        }
    }
}
module.exports={getUserBank1}
