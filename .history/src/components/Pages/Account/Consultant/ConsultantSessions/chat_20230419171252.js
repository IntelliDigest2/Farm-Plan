import React, { useState, useEffect } from "react";
import classes from "./chat.module.css";
import ImageUploadIcon from "../ConsutltantIcons/imageUploadIcon";
import SendIcon from "../ConsutltantIcons/sendIcon";
import { useParams } from "react-router-dom";
import axios from "axios";
import animationData from "../ConsutltantIcons/typing.json";
import { getChatMessages } from "../../../../../store/actions/consultantActions/consultantActions";

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
import { connect } from "react-redux";

function Chat(props) {
	const {
		socket,
		onNotification,
		socketConnected,
		notification,
		getChatMessages,
	} = props;
	const [newMessage, setNewMessage] = useState("");
	// const [selectedChatCompare, setSelectedChatCompare] = useState("");

	const [messages, setMessages] = useState([]);
	const [previousMessagesLoading, setPreviousMessagesLoading] = useState(true);

	const [isTyping, setIsTyping] = useState("");

	const params = useParams();

	const selectedChatId = params.chatId;
	let selectedChatCompare;

	const fetchMessages = async () => {
		if (!selectedChatId) return;

		// const { data } = await axios.get(`/api/message/${selectedChatId}`);

		getChatMessages(selectedChatId);

		socket.emit("join_chat", selectedChatId);
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
				if (!notification.includes(newMessageReceived)) {
					onNotification(newMessageReceived);
					// setFetchAgain(!fetchAgain);
				}
			} else {
				setMessages([...messages, newMessageReceived]);
			}
		});
	}, [messages, notification, onNotification, selectedChatCompare, socket]);

	useEffect(() => {
		socket.on("typing", () => setIsTyping(true));

		socket.on("stop_typing", () => setIsTyping(false));
	}, [socket]);

	useEffect(() => {
		setMessages(props.chatMessages);
		setPreviousMessagesLoading(false);
	}, [props.chatMessages]);

	const sendMessage = async (e) => {
		e.preventDefault();
		if (e.key === "Enter" && newMessage) {
			socket.emit("stop_typing", selectedChatId);

			try {
				// setMessages({ ...messages, newMessage });
				setNewMessage("");

				const { data } = await axios.post("http://localhost:3001/api/message", {
					content: newMessage,
					chatId: selectedChatId,
				});

				socket.emit("new_message", data);
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
		console.log(e.target.value);

		// setNewMessage({...newMessage,e.target.value});

		// if (!isTyping) {
		// 	setIsTyping(true);
		// 	socket.emit("typing", selectedChatId);
		// }

		// let lastTypingTime = new Date().getTime();
		// let timerLength = 3000;

		// setTimeout(() => {
		// 	let timeNow = new Date().getTime();
		// 	let timeDiff = timeNow - lastTypingTime;

		// 	if (timeDiff >= timerLength && isTyping) {
		// 		socket.emit("stop_typing", selectedChatId);
		// 		setIsTyping(false);
		// 	}
		// }, timerLength);
	};

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserverAspectRation: "xMidYMid slice",
		},
	};

	return (
		<div className={classes.chat_cont}>
			<div>
				<h1>James Taylor </h1>
			</div>

			<div>{loader}</div>

			{isTyping ? (
				<div>
					<Lottie
						options={defaultOptions}
						width={70}
						style={{ marginBottom: 15, marginLeft: 0 }}
					/>
				</div>
			) : (
				""
			)}
			<Form className={classes.chat_input}>
				<Row>
					<Col>
						<ImageUploadIcon />
					</Col>
					<Col md="9">
						<Form.Control
							type="text"
							// name="messageInput"
							placeholder="Enter a message"
							onChange={(e) => {
								setNewMessage(e.target.value);
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

const mapStateToProps = (state) => {
	return {
		chatMessages: state.consultantState.chatMessages,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getChatMessages: (selectedChatId) =>
			dispatch(getChatMessages(selectedChatId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
