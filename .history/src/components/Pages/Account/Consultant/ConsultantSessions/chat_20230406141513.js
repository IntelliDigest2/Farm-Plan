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

function Chat({ socket }) {
	const [newMessage, setNewMessage] = useState("");

	const [messages, setMessages] = useState([]);
	const [chatLoading, setChatLoading] = useState(null);

	const [isTyping, setIsTyping] = useState("");

	const params = useParams();

	const selectedChatId = params.chatId;

	useEffect(() => {
		socket.on("new_message", message);

		if (!selectedChatCompare || selectedChatCompare._id !== message.id) {
			//   give notifications
		} else {
			setMessages([...messages, message]);
		}
	});

	useEffect(() => {
		socket.on("typing", () => setIsTyping(true));
		socket.on("stop_typing", () => setIsTyping(false));
	}, []);

	const sendMessage = async (e) => {
		e.preventDefault();
		if (event.key === "Enter" && newMessage) {
			socket.emit("stop_Typing", selectedChatId);

			try {
				setMessages({ ...messages, newMessage });
				setNewMessage("");

				socket.on("new_message", ({ newMessage, from, to }) => {
					// setMessageList({ ...messageList, data });

					console.log(content, from);
				});

				const { data } = await axios.post("/api/message", {
					content: newMessage,
					chatId: selectedChat._id,
				});

				socket.emit();
			} catch {
				(err) => {
					console.log(err);
				};
			}
		}
	};

	const fetchMessages = async () => {
		try {
			if (!selectedChat) return;

			const { data } = await axios.get(`/api/message/${selectedChatId}`);

			setMessageList(data);
			setChatLoading(false);

			socket.emit("join_room", selectedChatId);
		} catch {
			(err) => {
				console.log(err);
			};
		}
	};

	useEffect(() => {
		//   fetchchat with id chatId
		fetchMessages();
	}, []);

	let loader =
		!chatLoading || chatLoading === "done" ? (
			" "
		) : (
			<div className={classes.chat_loader}>'loading messages...'</div>
		);

	const typingHandler = (e) => {
		if (!socketConnected) return;

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

	const handleInput = (e) => {
		typingHandler();
		setNewMessage(e.target.value);
	};

	return (
		<div className={classes.chat_cont}>
			<div>
				<h1>James Taylor </h1>
			</div>

			<div>{loader}</div>

			{/* {messages} */}
			{isTyping ? <div>typing...</div> : ""}
			<Form onKeyDown={sendMessage} className={classes.chat_input}>
				<Row>
					<Col>
						<ImageUploadIcon />
					</Col>
					<Col md="9">
						<Form.Control
							type="text"
							name="messageInput"
							placeholder="Type message here"
							onChange={(e) => {
								handleInput(e);
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
