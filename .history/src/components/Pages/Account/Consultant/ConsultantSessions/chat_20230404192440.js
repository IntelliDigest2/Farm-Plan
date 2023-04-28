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
import { Form, Row, Col, Container, Modal, Button } from "react-bootstrap";

function Chat({ sendMessage, socket }) {
	const [newMessage, setNewMessage] = useState("");
	const [messageReceived, setMessageReceived] = useState("");
	const [messageList, setMessageList] = useState([]);

	// const userId = params.id;

	function sendChat(e) {
		sendMessage(e, newMessage);
		setMessageList({ ...messageList, newMessage });
		setNewMessage("");
	}

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageList({ ...messageList, data });
		});
	}, [socket]);

	let messages;
	if (messageList.length !== 0) {
		messages = messageList.map((message) => {
			return <p>{message}</p>;
		});
	}

	return (
		<div className={classes.chat_cont}>
			<div>
				<h1>Messages: </h1>
			</div>
			{messages}

			<Form className={classes.chat_input}>
				<Row>
					<Col>
						<ImageUploadIcon />
					</Col>
					<Col md="9">
						<Form.Control
							placeholder="Type message here"
							onChange={(e) => setNewMessage(e.target.value)}
							onKeyPress={(e) => {
								e.key === "Enter" && sendChat();
							}}
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
	);
}

export default Chat;
