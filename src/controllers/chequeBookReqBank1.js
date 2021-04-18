const { DummyBank1Model } = require("../db/dummyBank1model");

const chequeBookReqbank1 = async (userId) => {
  const user = await DummyBank1Model.findOne({ userId: parseInt(userId) });
  await DummyBank1Model.findOneAndUpdate(
    { userId: parseInt(userId) },
    { chequeBookRequest: !user.chequeBookRequest }
  );
};

module.exports = {
  chequeBookReqbank1,
};
