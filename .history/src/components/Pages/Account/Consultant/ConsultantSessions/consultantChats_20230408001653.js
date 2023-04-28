import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./consultantChats.module.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch,
	useHistory,
	Link,
} from "react-router-dom";
import Chat from "./chat";
import { io } from "socket.io-client";
import ConsultantChatCard from "./consultantChatCard";

export const ConsultantChats = ({ userId, userName }) => {
	const [socketConnected, setSocketConnected] = useState(false);

	const [notifications, setNotification] = useState([]);
	const socket = io.connect("http://localhost:3001");

	socket.emit("setup", userId);

	socket.on("connected", () => setSocketConnected(true));

	// socket.on("connect_error", (err) => {
	// 	console.log(err, "error occurred");
	// });

	socket.on("disconnect", () => {
		console.log("disconnected");
	});

	useEffect(() => {}, []);

	const getAllChats = () => {
		//get all chats
	};

	useEffect(() => {
		getAllChats();
	}, []);

	let chats = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11];

	const notificationHandler = (e) => {
		console.log(e);
		setNotification([]);
	};

	let { url } = useRouteMatch();

	let chatCards = chats.map((chat, index) => {
		return (
			<li key={`chat-${index}`}>
				<ConsultantChatCard notification={notifications} chat={chat} />
			</li>
		);
	});

	return (
		<Router>
			<div className={classes.chatsCont}>
				<div>
					<h1>Chats</h1>
				</div>
				<div className={classes.chats_cont}>
					<div className={classes.chat_cards}>
						<div className={classes.chat_left}>
							<ul>{chatCards}</ul>
						</div>
					</div>
					<div className={classes.chat_cont}>
						<Switch>
							<Route exact path={`${url}/`}>
								<div>
									Click on a chat and your conversations would appear here
								</div>
							</Route>
							<Route path={`${url}/:chatId`}>
								<Chat
									notification={notifications}
									onNotification={(e) => notificationHandler(e)}
									socketConnected={socketConnected}
									socket={socket}
								/>
							</Route>
						</Switch>
					</div>
				</div>
			</div>
		</Router>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantChats);
