const mongoose = require("mongoose");
const schema = mongoose.Schema;

const DummyBank3Schema = new schema({
  userId: Number,
  //changed to string
  pin: String,
  name: String,
  amount: Number,
  chequeBookRequest: {
    type: Boolean,
    default: false,
  },
});

const DummyBank3Model = mongoose.model("DummyBank3Model", DummyBank3Schema);
module.exports = {
  DummyBank3Model,
};
