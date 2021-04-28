const { DummyBank3Model } = require("../db/dummyBank3model");

const chequeBookReqBank3 = async (userId) => {
  if(!userId){
    return null;
  }
  const user = await DummyBank3Model.findOne({ userId: parseInt(userId) });
  const updatedUser=await DummyBank3Model.findOneAndUpdate(
    { userId: parseInt(userId) },
    { chequeBookRequest: !user.chequeBookRequest }
  );
  return updatedUser;
};

module.exports = {
  chequeBookReqBank3,
};
