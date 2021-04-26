const { DummyBank2Model } = require("../db/dummyBank2model");
const bcrypt = require("bcrypt");

const changePinBank2 = async (pin, userId) => {
  if(!(pin&&userId)){
    return null;
  }
  if(typeof(pin)=='number'){
    return null;
  }
  const SALT_WORK_FACTOR = 10;
  await bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    bcrypt.hash(pin, salt, async (err, hash) => {
      // Now we can store the password hash in db.
      await DummyBank2Model.findOneAndUpdate({ userId: userId }, { pin: hash });
    });
  });
  return 1;
};

module.exports = {
  changePinBank2,
};
