import React, { useState, useEffect } from "react";
import classes from "./chat.module.css";
import ImageUploadIcon from "../ConsutltantIcons/imageUploadIcon";
import SendIcon from "../ConsutltantIcons/sendIcon";
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

import {
	Form,
	Row,
	Col,
	Spinner,
	Container,
	Modal,
	Button,
} from "react-bootstrap";

function Chat({ sendMessage, socket }) {
	const [newMessage, setNewMessage] = useState("");
	// const [messageReceived, setMessageReceived] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [chatLoading, setChatLoading] = useState(null);

	// const userId = params.id;

	function sendChat(e) {
		e.preventDefault();
		sendMessage(e, newMessage);
		setMessageList({ ...messageList, newMessage });
		setNewMessage("");
	}

	socket.on("private_message", ({ content, from }) => {
		// setMessageList({ ...messageList, data });

		console.log(content, from);
	});

	useEffect(() => {
		//   fetchchat with id chatId
	}, []);

	const params = useParams();

	const chatId = params.chatId;

	console.log(chatId);

	// useEffect(() => {
	// 	socket.on("private_message", ({ content, from }) => {
	// 		setMessageList({ ...messageList, data });

	// 		console.log(data);
	// 	});
	// }, [socket]);

	// let messages;
	// if (messageList.length !== 0) {
	// 	messages = messageList.map((message) => {
	// 		console.log(message, "this is the message");
	// 		return <p>{message}</p>;
	// 	});
	// }

	let loader = !chatLoading || chatLoading === 'done' ? " ": (<div className={classes.chat_loader}>
	'loading messages...'
	</div>
		);
	 
	

	return (
		<div className={classes.chat_cont}>
			
					<h1>Messages: </h1>
				</div>
				{/* {messages} */}
				<Form className={classes.chat_input}>
					<Row>
						<Col>
							<ImageUploadIcon />
						</Col>
						<Col md="9">
							<Form.Control
								type="text"
								name="messageInput"
								placeholder="Type message here"
								onChange={(e) => setNewMessage(e.target.value)}
								// onKeyPress={(e) => {
								// 	e.preventDefault();
								// 	e.key === "Enter" && sendChat();
								// }}
							/>
						</Col>
						<Col>
							<button type="button" onClick={sendChat}>
								<SendIcon />
							</button>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
}

export default Chat;
