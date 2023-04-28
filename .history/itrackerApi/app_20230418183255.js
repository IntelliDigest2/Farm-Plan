import messagesRoute from "./v1/Routes/messagesRoute";

import chatsRoute from "./v1/Routes/chatsRoute";

import paymentRoute from "./v1/Routes/paymentRoute";
const express = require("express");
const cors = require("cors");

export const app = express();

app.use(cors());

app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/payment", paymentRoute);

// export default app;
