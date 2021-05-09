const express = require("express");
var cors = require("cors");

require("./db/mongoose");
const userRouter = require("./routers/user");
const orderRouter = require("./routers/order");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", exposedHeaders: ["Content-Range"] }));
app.use(userRouter);
app.use(orderRouter);

module.exports = app;
