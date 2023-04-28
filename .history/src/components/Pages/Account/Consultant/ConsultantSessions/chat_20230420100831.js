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
		fakeuid,
		chatMessages,
		chatIds,
		userChats,
	} = props;
	const [newMessage, setNewMessage] = useState("");
	// const [selectedChatCompare, setSelectedChatCompare] = useState("");
	console.log(userChats);

	const [messages, setMessages] = useState([]);
	const [previousMessagesLoading, setPreviousMessagesLoading] = useState(true);
	const [userChat, setUserChat] = useState([]);

	const [isTyping, setIsTyping] = useState("");

	const { chatId } = useParams();
	console.log(useParams(), "thisi is the use params");

	let chatUsers = chatIds.split("_");

	const selectedChatId = chatId;
	let selectedChatCompare;

	const fetchMessages = async () => {
		if (!selectedChatId) return;

		// const { data } = await axios.get(`/api/message/${selectedChatId}`);

		getChatMessages(selectedChatId);

		socket.emit("join_chat", selectedChatId);
	};

	useEffect(() => {
		console.log(userChats, "in the useEffect");
		if (userChats.length > 0) {
			let chatInfo = userChats.filter((chat) => {
				console.log(chatId, chat._id);
				return chat._id === chatId;
			});
			setUserChat(chatInfo);
		}
	}, [chatId, userChats]);

	console.log(userChat, "this is the info the chat");

	useEffect(() => {
		//   fetchchat with id chatId
		fetchMessages();
		selectedChatCompare = selectedChatId;
	}, [selectedChatId]);

	useEffect(() => {
		socket.on("new_message", (newMessageReceived) => {
			console.log(newMessageReceived, `this is the new message received`);
			// if (
			// 	!selectedChatCompare ||
			// 	selectedChatCompare.id !== newMessageReceived.chat.id
			// ) {
			// 	//   give notifications
			// 	if (!notification.includes(newMessageReceived)) {
			// 		onNotification(newMessageReceived);
			// 		// setFetchAgain(!fetchAgain);
			// 	}
			// } else {
			// 	setMessages([...messages, newMessageReceived.content]);
			// }

			setMessages([...messages, newMessageReceived.content]);
		});
		// }, [messages, notification, onNotification, selectedChatCompare, socket]);
	}, [socket, messages]);

	useEffect(() => {
		socket.on("typing", () => setIsTyping(true));

		socket.on("stop_typing", () => setIsTyping(false));
	}, [socket]);

	useEffect(() => {
		setMessages(chatMessages);
		setPreviousMessagesLoading(false);
	}, [chatMessages]);

	const sendMessage = async (e) => {
		e.preventDefault();
		// if (e.key === "Enter" && newMessage.trim()) {
		socket.emit("stop_typing", selectedChatId);

		console.log(newMessage);
		try {
			setMessages([...messages, newMessage]);
			setNewMessage("");

			const { data } = await axios.post("http://localhost:3001/api/messages", {
				content: newMessage,
				chatId: selectedChatId,
				userId: fakeuid,
				usersIds: chatIds,
			});

			// let receiverId = chatUsers.filter((user) => {
			// 	return user !== data.senderId;
			// });

			// data.data.receiverId = receiverId;

			console.log(data, "this is the date that received from the database");

			socket.emit("new_message", data.data);
		} catch (err) {
			console.log(err);
		}
		// }
	};

	let allMessages = messages.map((message) => {
		return <div>{message}</div>;
	});

	let loader =
		!previousMessagesLoading || previousMessagesLoading === "done" ? (
			<div>{allMessages}</div>
		) : (
			<div className={classes.chat_loader}>'loading messages...'</div>
		);

	const typingHandler = (e) => {
		if (!socketConnected) return;

		setNewMessage(e.target.value);

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
							size="sm"
							type="text"
							// name="messageInput"
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

const mapStateToProps = (state) => {
	return {
		chatMessages: state.consultantState.chatMessages,
		userChats: state.consultantState.userChats,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getChatMessages: (selectedChatId) =>
			dispatch(getChatMessages(selectedChatId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
