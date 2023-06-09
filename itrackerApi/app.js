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
	const uid = req.body.uid;
	// const uid = Math.floor(Math.random() * 1000);
	console.log("🚀 ~ file: app.js:28 ~ app.post ~ uid:", uid);
	// const role =
	// 	req.body.role === "publisher" ? RtmRole.Rtm_Admin : RtmRole.Rtm_User;
	// console.log(RtcRole.PUBLISHER)
	// console.log("🚀 ~ file: app.js:30 ~ app.post ~ role:", role);
	const channel = req.body.channel;
	console.log("🚀 ~ file: app.js:34 ~ app.post ~ channel:", channel);

	const token = RtcTokenBuilder.buildTokenWithUid(
		appID,
		appCertificate,
		channel,
		uid,
		// role,
		expirationTimeInSeconds
	);
	// const token = RtmTokenBuilder.buildToken(
	// 	appID,
	// 	appCertificate,
	// 	channel,
	// 	uid,
	// 	// role,
	// 	expirationTimeInSeconds
	// );
	console.log(uid, token, `These are the uid and token generted`);
	res.send({ uid, token });
});
// app.use("/api/payment", paymentRoute);

export default app;
