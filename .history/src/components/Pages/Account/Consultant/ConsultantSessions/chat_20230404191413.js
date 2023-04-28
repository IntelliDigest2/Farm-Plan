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
	}

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageList({ ...messageList, data });
		});
	}, [socket]);

	if (messageList.length !== 0) {
		let messages = messageList.map((message) => {
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
						<Form.Control onChange={(e) => setNewMessage(e.target.value)} />
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
