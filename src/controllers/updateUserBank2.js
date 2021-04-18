const { DummyBank2Model } = require("../db/dummyBank2model");

const updateUserBank2 = async (userId, amount) => {
  const user = await DummyBank2Model.findOne({ userId: parseInt(userId) });
  await DummyBank2Model.findOneAndUpdate(
    { userId: parseInt(userId) },
    { amount: user.amount - parseInt(amount) }
  );
};
module.exports = {
  updateUserBank2,
};
