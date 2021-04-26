const { DummyBank1Model } = require("../db/dummyBank1model");
const bcrypt = require("bcrypt");

async function getUserBank1(userId, pin) {

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
  const users = await DummyBank1Model.find({ userId: userId });
  const user = users[0];
  if (user) {
    const login = await bcrypt.compare(pin, user.pin);
    if (login) {
      return user;
    }
  }
}
module.exports = { getUserBank1 };
