const { DummyBank1Model } = require("../db/dummyBank1model");

const chequeBookReqBank1 = async (userId) => {
  if(!userId){
    return null;
  }
  const user = await DummyBank1Model.findOne({ userId: parseInt(userId) });
  const updatedUser=await DummyBank1Model.findOneAndUpdate(
    { userId: parseInt(userId) },
    { chequeBookRequest: !user.chequeBookRequest }
  );
  return updatedUser;
};

module.exports = {
  chequeBookReqBank1,
};
