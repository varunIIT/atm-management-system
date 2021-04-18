const mongoose = require("mongoose");
const schema = mongoose.Schema;

const DummyBank2Schema = new schema({
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

const DummyBank2Model = mongoose.model("DummyBank2Model", DummyBank2Schema);
module.exports = {
  DummyBank2Model,
};
