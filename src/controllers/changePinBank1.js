const { DummyBank1Model } = require("../db/dummyBank1model");
const bcrypt = require("bcrypt");

const changePinBank1 = async (pin, userId) => {
  //console.log(req.query.userId, req.query.pin)

  const SALT_WORK_FACTOR = 10;
  await bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    bcrypt.hash(pin, salt, async (err, hash) => {
      // Now we can store the password hash in db.
      await DummyBank1Model.findOneAndUpdate({ userId: userId }, { pin: hash });
    });
  });
};

module.exports = {
  changePinBank1,
};
