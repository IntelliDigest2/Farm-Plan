import React, { useState, useEffect } from "react";
import classes from "./chat.module.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	useParams,
	useRouteMatch,
	Redirect,
	useHistory,
} from "react-router-dom";
import { io } from "socket.io-client";

function Chat() {
	const socket = io.connect("http://localhost:3001");
	socket.on("connection", () => {
		console.log(socket.id);
		console.log(socket.connected);
		console.log("socket connected");
	});

	const [message, setMessage] = useState("");
	const [messageReceived, setMessageReceived] = useState("");
	// let params = useParams();

	// const userId = params.id;

	// console.log(userId);

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageReceived(data.message);
		});
	}, [socket]);

	let currentMessage = "who are you";
	let userId = "1234566";

	async function sendMessage() {
		const messageData = {
			room: "room",
			author: userId,
			message: currentMessage,
			time: new Date(),
		};
		await socket.emit("send_message", messageData);
	}

	return (
		<div className={classes.cont}>
			<form id="form" action="">
				<input id="input" />
				<button type="button" onClick={sendMessage}>
					Send
				</button>
			</form>
			<h1>Message: {messageReceived}</h1>
		</div>
	);
}

export default Chat;
