const { DummyBank3Model } = require("../db/dummyBank3model");
const bcrypt = require("bcrypt");

async function getUserBank3(userId, pin) {
  //todo comparison of pin
  
  let isNum = /^\d+$/.test(userId);
  
  if(!isNum){
    return null;
  }
  if(!(userId&&pin)){
    return null;
  }
  if(typeof(pin)=='number'){
    return null;
  }
  userId=parseInt(userId);
  const users = await DummyBank3Model.find({ userId: userId });
  const user = users[0];
  if (user) {
    const login = await bcrypt.compare(pin, user.pin);
    if (login) {
      return user;
    }
  }
}
module.exports = { getUserBank3 };
