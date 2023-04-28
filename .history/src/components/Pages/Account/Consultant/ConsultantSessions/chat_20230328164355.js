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

function Chat() {
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
