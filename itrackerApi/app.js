import messagesRoute from "./v1/Routes/messagesRoute.js";

import chatsRoute from "./v1/Routes/chatsRoute.js";
import { RtcTokenBuilder } from "agora-access-token";
// import { RtmTokenBuilder } from "agora-rtm-sdk";
// import paymentRoute from "./v1/Routes/paymentRoute.js";

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());
// app.get("/", (req, res) => {
// 	res.send("Hello from App Engine v1!");
// });

app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);

// app.use("/rtctoken", rtcRoute)
app.post("/api/rtctoken", (req, res) => {
	const appID = process.env.AGORA_ID;
	const appCertificate = process.env.AGORA_CERT;

	const expirationTimeInSeconds = req.body.duration * 100;

	const uid = req.body.uid;

	const channel = req.body.channel;

	const token = RtcTokenBuilder.buildTokenWithUid(
		appID,
		appCertificate,
		channel,
		uid,
		// role,
		expirationTimeInSeconds
	);

	res.send({ uid, token });
});
// app.use("/api/payment", paymentRoute);

export default app;
