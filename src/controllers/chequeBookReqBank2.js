const { DummyBank2Model } = require("../db/dummyBank2model");

const chequeBookReqBank2 = async (userId) => {
  if(!userId){
    return null;
  }
  const user = await DummyBank2Model.findOne({ userId: parseInt(userId) });
  const updatedUser=await DummyBank2Model.findOneAndUpdate(
    { userId: parseInt(userId) },
    { chequeBookRequest: !user.chequeBookRequest }
  );
  return updatedUser;
};

module.exports = {
  chequeBookReqBank2,
};
