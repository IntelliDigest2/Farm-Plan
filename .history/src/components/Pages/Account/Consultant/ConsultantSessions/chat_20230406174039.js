import React, { useState, useEffect } from "react";
import classes from "./chat.module.css";
import ImageUploadIcon from "../ConsutltantIcons/imageUploadIcon";
import SendIcon from "../ConsutltantIcons/sendIcon";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
	Form,
	Row,
	Col,
	Spinner,
	Container,
	Modal,
	Button,
} from "react-bootstrap";
import { Lottie } from "react-lottie";

function Chat({ socket, socketConnected }) {
	const [newMessage, setNewMessage] = useState("");
	// const [selectedChatCompare, setSelectedChatCompare] = useState("");

	const [messages, setMessages] = useState([]);
	const [previousMessagesLoading, setPreviousMessagesLoading] = useState(null);

	const [isTyping, setIsTyping] = useState("");

	const params = useParams();

	const selectedChatId = params.chatId;

	const fetchMessages = async () => {
		try {
			if (!selectedChatId) return;

			const { data } = await axios.get(`/api/message/${selectedChatId}`);

			setMessages(data);
			setPreviousMessagesLoading(false);

			socket.emit("join_chat", selectedChatId);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		//   fetchchat with id chatId
		fetchMessages();
		selectedChatCompare = selectedChatId;
	}, [selectedChatId]);

	useEffect(() => {
		socket.on("new_message", (newMessageReceived) => {
			if (
				!selectedChatCompare ||
				selectedChatCompare.id !== newMessageReceived.chat.id
			) {
				//   give notifications
			} else {
				setMessages([...messages, newMessageReceived]);
			}
		});
	}, [socket]);

	useEffect(() => {
		socket.on("typing", () => setIsTyping(true));

		socket.on("stop_typing", () => setIsTyping(false));
	}, []);

	const sendMessage = async (e) => {
		e.preventDefault();
		if (e.key === "Enter" && newMessage) {
			socket.emit("stop_typing", selectedChatId);

			try {
				setMessages({ ...messages, newMessage });
				setNewMessage("");

				socket.on("new_message", ({ newMessage, from, to }) => {
					// setMessageList({ ...messageList, data });

					console.log(content, from);
				});

				const { data } = await axios.post("/api/message", {
					content: newMessage,
					chatId: selectedChatId,
				});

				socket.emit();
			} catch (err) {
				console.log(err);
			}
		}
	};

	let loader =
		!previousMessagesLoading || previousMessagesLoading === "done" ? (
			<div>{messages}</div>
		) : (
			<div className={classes.chat_loader}>'loading messages...'</div>
		);

	const typingHandler = (e) => {
		if (!socketConnected) return;

		setNewMessage(e.target.value);

		if (!isTyping) {
			setIsTyping(true);
			socket.emit("typing", selectedChatId);
		}

		let lastTypingTime = new Date().getTime();
		let timerLength = 3000;

		setTimeout(() => {
			let timeNow = new Date().getTime();
			let timeDiff = timeNow - lastTypingTime;

			if (timeDiff >= timerLength && isTyping) {
				socket.emit("stop_typing", selectedChatId);
				setIsTyping(false);
			}
		}, timerLength);
	};

	return (
		<div className={classes.chat_cont}>
			<div>
				<h1>James Taylor </h1>
			</div>

			<div>{loader}</div>

			{isTyping ? (
				<div>
					<Lottie width={70} style={{ marginBottom: 15, marginLeft: 0 }} />
				</div>
			) : (
				""
			)}
			<Form onKeyDown={sendMessage} className={classes.chat_input}>
				<Row>
					<Col>
						<ImageUploadIcon />
					</Col>
					<Col md="9">
						<Form.Control
							type="text"
							name="messageInput"
							placeholder="Enter a message"
							onChange={(e) => {
								typingHandler(e);
							}}
							// onKeyPress={(e) => {
							// 	e.preventDefault();
							// 	e.key === "Enter" && sendChat();
							// }}
						/>
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
