const express = require("express");
const cors = require("cors");
const chatsRoute = require("./v1/Routes/chatsRoute");
const paymentRoute = require("./v1/Routes/paymentRoute");

const app = express();

app.use(cors());

app.use("/api/chats", chatsRoute);
app.use("/api/payment", paymentRoute);

module.exports = app;
