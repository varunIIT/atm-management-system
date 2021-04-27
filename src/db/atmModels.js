const mongoose = require("mongoose");
const schema = mongoose.Schema;

const atmSchema = new schema({
  atmUniqueNumber: Number,
  atmAmount: Number,
  receipt: Number,
  note100: Number,
  note200: Number,
  note500: Number,
  note1000: Number,
  note2000: Number,
});
const transactionSchema = new schema({
  userId: Number,
  name: String,
  bankName: String,
  withdrawalAmount: Number,
  receipt: Boolean,
});

const AtmModel = mongoose.model("AtmModel", atmSchema);
const TransactionModel = mongoose.model("TransactionModel", transactionSchema);
module.exports = {
  AtmModel,
  TransactionModel,
};
