const { DummyBank1Model } = require("../db/dummyBank1model");

const updateUserBank1 = async (userId, amount) => {
  if(!(userId&&amount)){
    return null;
  }
  
  const user = await DummyBank1Model.findOne({ userId: parseInt(userId) });

  const updatedUser=await DummyBank1Model.findOneAndUpdate(
    { userId: parseInt(userId) },
    { amount: user.amount - parseInt(amount) }
  );
  return updatedUser;
};

module.exports = {
  updateUserBank1,
};
