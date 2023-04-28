import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import classes from "./consultantChats.module.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useRouteMatch,
	Link,
	useParams,
} from "react-router-dom";
import Chat from "./chat";
import { io } from "socket.io-client";
import ConsultantChatCard from "./consultantChatCard";
import { getUserChatsData } from "../../../../../store/actions/consultantActions/consultantActions";

function ConsultantChats(props) {
	const [socketConnected, setSocketConnected] = useState(false);

	const [notifications, setNotification] = useState([]);
	const { userChats, getChats, auth, fakeuid } = props;
	const [chats, setChats] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [chatId, setChatId] = useState("");

	useEffect(() => {
		// getChats(auth.uid);
		getChats(fakeuid);
	}, []);

	useEffect(() => {
		setChats(userChats);

		setIsLoading(false);
	}, [userChats]);

	const socket = io.connect("http://localhost:3001");

	socket.emit("setup", fakeuid);

	socket.on("connected", () => setSocketConnected(true));

	// socket.on("connect_error", (err) => {
	// 	console.log(err, "error occurred");
	// });

	socket.on("disconnect", () => {
		console.log("disconnected");
	});

	const notificationHandler = (e) => {
		console.log(e);
		setNotification([]);
	};

	let { url } = useRouteMatch();
	console.log(useParams(), url);

	let chatCards = chats.map((chat, index) => {
		return (
			<li key={`chat-${index}`}>
				<Link to={`${chat._id}`}>
					<ConsultantChatCard
						onSelectChatId={(chatId) => {
							return setChatId(chatId);
						}}
						notification={notifications}
						chat={chat}
						// chat_id={chatIdn}
					/>
				</Link>
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
							<Route path={`${url}/:chatIdn`}>
								<Chat
									fakeuid={fakeuid}
									notification={notifications}
									onNotification={(e) => notificationHandler(e)}
									socketConnected={socketConnected}
									socket={socket}
									chatIds={chatId}
								/>
							</Route>
						</Switch>
					</div>
				</div>
			</div>
		</Router>
	);
}

const mapStateToProps = (state) => {
	return {
		userChats: state.consultantState.userChats,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getChats: (userId) => dispatch(getUserChatsData(userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantChats);
