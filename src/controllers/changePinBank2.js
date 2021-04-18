const { DummyBank2Model } = require("../db/dummyBank2model");
const bcrypt = require("bcrypt");

const changePinBank2 = async (pin, userId) => {
  const SALT_WORK_FACTOR = 10;
  await bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    bcrypt.hash(pin, salt, async (err, hash) => {
      // Now we can store the password hash in db.
      await DummyBank2Model.findOneAndUpdate({ userId: userId }, { pin: hash });
    });
  });
};

module.exports = {
  changePinBank2,
};
