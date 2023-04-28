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

function Chat({ sendMessage, socket }) {
	const [newMessage, setNewMessage] = useState("");

	const [messages, setMessages] = useState([]);
	const [chatLoading, setChatLoading] = useState(null);

	const [isTyping, setIsTyping] = useState("");

	const params = useParams();

	const selectedChatId = params.chatId;

	useEffect(() => {
		socket.on("new_message", newMessageRecieved);

		if (
			!selectedChatCompare ||
			selectedChatCompare._id !== newMessageRecieved._id
		) {
			//   give notifications
		} else {
			setMessages([...messages, newMessageRecieved]);
		}
	});

	useEffect(() => {
		socket.on("typing", () => setIsTyping(true));
		socket.on("stop_typing", () => setIsTyping(false));
	}, []);

	const sendChat = async (e) => {
		e.preventDefault();
		// sendMessage(e, newMessage);
		setMessageList({ ...messageList, newMessage });
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

		if (!typing) {
			setTyping;
		}
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
