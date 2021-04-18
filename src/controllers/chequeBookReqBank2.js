const { DummyBank2Model } = require("../db/dummyBank2model");

const chequeBookReqbank2 = async (userId) => {
  const user = await DummyBank2Model.findOne({ userId: parseInt(userId) });
  await DummyBank2Model.findOneAndUpdate(
    { userId: parseInt(userId) },
    { chequeBookRequest: !user.chequeBookRequest }
  );
};

module.exports = {
  chequeBookReqbank2,
};
