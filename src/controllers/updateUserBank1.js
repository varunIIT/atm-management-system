const { DummyBank1Model } = require("../db/dummyBank1model");

const updateUserBank1 = async (userId, amount) => {
  const user = await DummyBank1Model.findOne({ userId: parseInt(userId) });

  await DummyBank1Model.findOneAndUpdate(
    { userId: parseInt(userId) },
    { amount: user.amount - parseInt(amount) }
  );
};

module.exports = {
  updateUserBank1,
};
