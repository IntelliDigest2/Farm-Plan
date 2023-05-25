import messagesRoute from "./v1/Routes/messagesRoute.js";

import chatsRoute from "./v1/Routes/chatsRoute.js";
import * as Agora from "agora-access-token";

// import paymentRoute from "./v1/Routes/paymentRoute.js";

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/chats", chatsRoute);
app.use("/api/messages", messagesRoute);
// app.use("/rtctoken", rtcRoute)
app.post("/api/rtctoken", (req, res) => {
	const appID = process.env.AGORA_ID;
	console.log("🚀 ~ file: app.js:22 ~ app.post ~ appID:", appID);
	const appCertificate = process.env.AGORA_CERT;
	console.log(
		"🚀 ~ file: app.js:24 ~ app.post ~ appCertificate:",
		appCertificate
	);
	const expirationTimeInSeconds = req.body.duration * 100;
	console.log(
		"🚀 ~ file: app.js:26 ~ app.post ~ expirationTimeInSeconds:",
		expirationTimeInSeconds
	);
	const uid = req.body.userId;
	// const uid = Math.floor(Math.random() * 1000);
	console.log("🚀 ~ file: app.js:28 ~ app.post ~ uid:", uid);
	// const role = req.body.isPublisher;

	// console.log("🚀 ~ file: app.js:30 ~ app.post ~ role:", role);
	const channel = req.body.channel;
	console.log("🚀 ~ file: app.js:34 ~ app.post ~ channel:", channel);

	const token = Agora.RtcTokenBuilder.buildTokenWithUid(
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
