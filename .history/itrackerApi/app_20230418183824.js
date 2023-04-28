import messagesRoute from "./v1/Routes/messagesRoute.js";

import chatsRoute from "./v1/Routes/chatsRoute.js";

import paymentRoute from "./v1/Routes/paymentRoute.js";
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/payment", paymentRoute);

export default app;
