import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./consultantChats.module.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch,
	Link,
} from "react-router-dom";
import Chat from "./chat";
import { io } from "socket.io-client";
import ConsultantChatCard from "./consultantChatCard";
import { getUserChatsData } from "../../../../../store/actions/consultantActions/consultantActions";

function ConsultantChats(props) {
	const [socketConnected, setSocketConnected] = useState(false);

	const [notifications, setNotification] = useState([]);
	const { userChats, getChats, auth, user } = props;
	const [chats, setChats] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [chatId, setChatId] = useState("");
	const [socket, setSocket] = useState(null);
	let { url } = useRouteMatch();
	let userId = auth.uid;

	useEffect(() => {
		getChats(userId);
	}, []);

	useEffect(() => {
		setChats(userChats);

		setIsLoading(false);
	}, [userChats]);

	useEffect(() => {
		let chatWithNewMessage;
	}, [notifications]);

	useEffect(() => {
		let newSocket = io.connect("http://localhost:3001");

		newSocket.emit("setup", userId);
		// socket.emit("setup", userId);
		// socket.emit("setup", auth.uid);
		newSocket.on("connected", () => setSocketConnected(true));
		newSocket.on("connect_error", (err) => {
			console.log(err, "error occurred");
		});

		setSocket(newSocket);

		return () => {
			newSocket.on("disconnect", () => {
				console.log("disconnected");
			});
		};
	}, []);

	const removeFromNotif = (chatId) => {
		let newNotif = notifications.filter((id) => {
			return chatId !== id;
		});

		setNotification(newNotif);
	};

	const notificationHandler = (chatId) => {
		setNotification([chatId, ...notifications]);

		let chatWithNewMessage = chats.filter((chat) => {
			return chat._id === chatId;
		});

		let index = chats.indexOf(chatWithNewMessage);

		// chats.slice(0, index);

		setChats([
			chatWithNewMessage,
			...chats.slice(0, index),
			...chats.slice(index),
		]);
	};

	let chatCards;
	if (chats.length > 0) {
		chatCards = chats.map((chat, index) => {
			return (
				<li key={`chat-${index}`}>
					<Link to={`${url}/${chat._id}`}>
						<ConsultantChatCard
							notifications={notifications}
							chat={chat}
							notifClicked={removeFromNotif}
						/>
					</Link>
				</li>
			);
		});
	}

	let chatContent = isLoading ? (
		"loading..."
	) : chats.length === 0 ? (
		"you dont have any chats"
	) : (
		<>
			<div className={classes.chat_cards}>
				<div className={classes.chat_left}>
					<ul>{chatCards}</ul>
				</div>
			</div>
			<div className={classes.chat_cont}>
				<Switch>
					<Route exact path={`${url}/`}>
						<div>Click on a chat and your conversations would appear here</div>
					</Route>
					<Route path={`${url}/:chatIdn`}>
						<Chat
							uid={userId}
							// uid={auth.uid}
							notification={notifications}
							onNotification={notificationHandler}
							socketConnected={socketConnected}
							socket={socket}
							chatIds={chatId}
							user={user}
						/>
					</Route>
				</Switch>
			</div>
		</>
	);

	return (
		<Router>
			<div className={classes.chatsCont}>
				<div>
					<h1>Chats</h1>
				</div>
				<div className={classes.chats_cont}>{chatContent}</div>
			</div>
		</Router>
	);
}

const mapStateToProps = (state) => {
	return {
		userChats: state.consultantState.userChats,
		auth: state.firebase.auth,
		user: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getChats: (userId) => dispatch(getUserChatsData(userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantChats);
