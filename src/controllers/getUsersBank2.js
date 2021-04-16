const { DummyBank2Model } = require("../db/dummyBank2model")
const bcrypt=require('bcrypt')

async function getUserBank2(userId,pin){
    //todo comparison of pin 
    const users=await DummyBank2Model.find({userId:userId})
    const user=users[0]
    if(user){
        const login=await bcrypt.compare(pin,user.pin);
        if(login){
            return user
        }
    }
}
module.exports={getUserBank2}