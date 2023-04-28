import React from "react";
import { connect } from "react-redux";
import classes from "./consultantChats.module.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	useParams,
	useRouteMatch,
	Redirect,
	useHistory,
	Link,
} from "react-router-dom";
import Chat from "./chat";
import { io } from "socket.io-client";

export const ConsultantChats = ({ to }) => {
	const socket = io.connect("http://localhost:3001");

	const sessionID = localStorage.getItem("sessionID");

	// Save data to sessionStorage
	// sessionStorage.setItem("key", "value");

	// Get saved data from sessionStorage
	// let data = sessionStorage.getItem("key");

	if (sessionID) {
		socket.auth = { sessionID };
	}

	let userId = "12340u";
	let userName = "James";
	let otherUserId = "56789u";

	socket.on("connect", () => {
		socket.userId = userId;
		socket.auth.userName = userName;

		// console.log(socket.id);

		console.log("socket connected");
	});

	const roomName = "234";

	function joinRoom() {
		socket.emit("join_room", roomName);
	}
	joinRoom();

	socket.on("connect_error", (err) => {
		console.log(err, "error occurred");
	});

	socket.on("session", ({ sessionId, userId }) => {
		//attach the sessonID to the next reconnection attempts
		socket.auth = { sessionID };

		//store it in the local Storage
		localStorage.setItem("sessionID", sessionID);

		//save the ID of the user
		socket.userID = userId;
	});

	// useEffect(() => {
	// 	function onConnect() {
	// 		setIsConnected(true);
	// 	  }

	// 	  function onDisconnect() {
	// 		setIsConnected(false);
	// 	  }

	// 	  function onFooEvent(value) {
	// 		setFooEvents(previous => [...previous, value]);
	// 	  }

	// 	  socket.on('connect', onConnect);
	// 	  socket.on('disconnect', onDisconnect);
	// 	  socket.on('foo', onFooEvent);

	// 	  return () => {
	// 		socket.off('connect', onConnect);
	// 		socket.off('disconnect', onDisconnect);
	// 		socket.off('foo', onFooEvent);
	// 	  };
	// }, [third])

	let chats = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11];

	let history = useHistory();

	let { path, url } = useRouteMatch();

	socket.on("disconnect", () => {
		console.log("disconnected");
	});

	function sendMessageHandler(e, value) {
		e.preventDefault();

		if (value !== "") {
			socket.emit(
				"private_message", //this it going to be the id of the consultant and person consulting
				{
					message: value,
					// to: this.otherUser.userID, //id of the person consulting
					room: roomName,
					to: otherUserId,
					time:
						new Date(Date.now()).getHours() +
						":" +
						new Date(Date.now()).getMinutes(),
				}
			);
		}
	}

	let chatCards = chats.map((chat, index) => {
		return (
			<li key={`chat-${index}`}>
				<Link to={`${url}/24`}>
					<div>
						<div className={classes.chat_card}>
							{/* <div className={classes.chat_card}> */}
							<div>
								<h1 className={classes.chat_heading}>
									Seun micheals, 11/12/2023
								</h1>
								<h2 className={classes.chat_topic}>Horticulture consulting</h2>
							</div>
							<div className={classes.chat_txt}>
								i have seen some changes in the leaf colorations
							</div>
						</div>
					</div>
					<div></div>
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
							<Route path={`${url}/:id`}>
								<Chat
									socket={socket}
									sendMessage={(e, value) => sendMessageHandler(e, value)}
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
