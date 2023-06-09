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
	useLocation,
} from "react-router-dom";
import Chat from "./chat";
import { io } from "socket.io-client";
import ConsultantChatCard from "./consultantChatCard";
import { getUserChatsData } from "../../../../../store/actions/consultantActions/consultantActions";

function ConsultantChats(props) {
	const [socketConnected, setSocketConnected] = useState(false);

	const [notifications, setNotification] = useState([]);
	const { userChats, getChats, auth, fakeuid } = props;
	const [chats, setChats] = useState("");
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

	let { pathname } = useLocation();

	console.log(useLocation());

	// let active =  ? classes.active : ""

	let active = pathname === `${url}/${chat._id}` ? classes.active : "";

	let chatCards;
	if (chats.length > 0) {
		chatCards = chats.map((chat, index) => {
			console.log(pathname, `${url}/${chat._id}`, "this is from the useParams");

			return (
				<li key={`chat-${index}`}>
					<Link to={`${url}/${chat._id}`}>
						<ConsultantChatCard notification={notifications} chat={chat} />
					</Link>
				</li>
			);
		});
	}

	let chatContent =
		chats === [] ? (
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getChats: (userId) => dispatch(getUserChatsData(userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantChats);
