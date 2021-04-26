const { DummyBank2Model } = require("../db/dummyBank2model");

const updateUserBank2 = async (userId, amount) => {
  if(!(userId&&amount)){
    return null;
  }
  const user = await DummyBank2Model.findOne({ userId: parseInt(userId) });
  const updatedUser=await DummyBank2Model.findOneAndUpdate(
    { userId: parseInt(userId) },
    { amount: user.amount - parseInt(amount) }
  );
  return updatedUser;
};
module.exports = {
  updateUserBank2,
};
