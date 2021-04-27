const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const session = require("express-session");

app.set("view engine", "hbs");

require("./src/db/conn");
const { authRoute } = require("./src/routers/authRoute");
const { balEnqRoute } = require("./src/routers/balEnqRoute");
const { bank1Route } = require("./src/routers/bank1Routes");
const { bank2Route } = require("./src/routers/bank2Routes");
const { bank3Route } = require("./src/routers/bank3Routes");
const { changePinRoute } = require("./src/routers/changePinRoute");
const { chequeBookRouter } = require("./src/routers/chequeBookRouter");
const { createDatabasesRoute } = require("./src/routers/createDatabases");
const { langRoute } = require("./src/routers/langRoute");
const { recentTransactionRoute } = require("./src/routers/recentTransaction");
const { withdrawalRoute } = require("./src/routers/withdrawalRoute");
const { menuRoute } = require("./src/routers/menuRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //body parser

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "24knb6k247b2k7b2k7bk247hb2kh7b2",
  })
);

app.use("/", express.static(__dirname + "/src/public"));

app.use("/", authRoute);
app.use("/", bank1Route);
app.use("/", bank2Route);
app.use('/',bank3Route)
app.use("/", withdrawalRoute);
app.use("/", changePinRoute);
app.use("/", balEnqRoute);
app.use("/", recentTransactionRoute);
app.use("/", chequeBookRouter);
app.use("/", createDatabasesRoute);
app.use("/", langRoute);
app.use("/", menuRoute);
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
