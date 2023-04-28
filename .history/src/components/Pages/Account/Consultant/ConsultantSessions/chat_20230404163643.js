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
	// let params = useParams();

	// const userId = params.id;

	console.log(newMessage);

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageReceived(data.message);
		});
	}, [socket]);

	return (
		<div className={classes.chat_cont}>
			<div>
				<h1>Message: {messageReceived}</h1>
			</div>

			<Form className={classes.chat_input}>
				<Row>
					<Col>
						<ImageUploadIcon />
					</Col>
					<Col md="9">
						<Form.Control onChange={(e) => setNewMessage(e.target.value)} />
					</Col>
					<Col>
						<button type="button" onClick={sendMessage}>
							<SendIcon />
						</button>
					</Col>
				</Row>
			</Form>
		</div>
	);
}

export default Chat;
