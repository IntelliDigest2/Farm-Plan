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
	const [message, setMessage] = useState("");
	const [messageReceived, setMessageReceived] = useState("");
	// let params = useParams();

	// const userId = params.id;

	// console.log(userId);

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessageReceived(data.message);
		});
	}, [socket]);

	let currentMessage = "who are you";
	let userId = "1234566";

	return (
		<div className={classes.cont}>
			<div>
				<h1>Message: {messageReceived}</h1>
			</div>

			<Form className={classes.chat_input}>
				<Row>
					<Col md="1">
						<ImageUploadIcon />
					</Col>
					<Col md="10">
						<Form.Group
							className={classes.input}
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>Type message and </Form.Label>
							<Form.Control />
						</Form.Group>
					</Col>
					<Col md="1">
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
