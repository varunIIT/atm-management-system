const mongoose = require("mongoose");
if(process.env.NODE_env=="testing"){
  mongoose
  .connect("mongodb://localhost:27017/ATM-db-testing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected successfully for testing");
  })
  .catch(() => {
    console.log("database connection is unsuccessful for testing");
  });
}
else{
  mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ATM-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch(() => {
    console.log("database connection is unsuccessful");
  });

}