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

export const ConsultantChats = (props) => {
	const socket = io.connect("http://localhost:3001");

	socket.on("connection", () => {
		console.log(socket.id);
		console.log(socket.connected);
		console.log("socket connected");
	});

	const sessionID = localStorage.getItem("sessionID");

	socket.on("session", ({ sessionID, userID }) => {
		// attach the session ID to the next reconnection attempts
		socket.auth = { sessionID };
		// store it in the localStorage
		localStorage.setItem("sessionID", sessionID);
		// save the ID of the user
		socket.userID = userID;
	});

	let chats = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11];

	let history = useHistory();

	let { path, url } = useRouteMatch();

	function sendMessageHandler(e) {
		console.log(`send message clicked`);
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
					<div className={classes.chat_Cont}>
						<Switch>
							<Route exact path={`${url}/`}>
								<div>
									Click on a chat and your conversations would appear here
								</div>
							</Route>
							<Route path={`${url}/:id`}>
								<Chat socket={socket} sendMessage={sendMessageHandler} />
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
