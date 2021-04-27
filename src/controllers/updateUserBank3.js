const { DummyBank3Model } = require("../db/dummyBank3model");

const updateUserBank3 = async (userId, amount) => {
  if(!(userId&&amount)){
    return null;
  }
  const user = await DummyBank3Model.findOne({ userId: parseInt(userId) });
  const updatedUser=await DummyBank3Model.findOneAndUpdate(
    { userId: parseInt(userId) },
    { amount: user.amount - parseInt(amount) }
  );
  return updatedUser;
};
module.exports = {
  updateUserBank3,
};
