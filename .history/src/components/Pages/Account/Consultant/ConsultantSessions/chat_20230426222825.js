import React, { useState, useEffect, useRef } from "react";
import classes from "./chat.module.css";
import ImageUploadIcon from "../ConsutltantIcons/imageUploadIcon";
import SendIcon from "../ConsutltantIcons/sendIcon";
import { useParams } from "react-router-dom";
import axios from "axios";
import animationData from "../ConsutltantIcons/typing.json";
import { getChatMessages } from "../../../../../store/actions/consultantActions/consultantActions";

import { format, parseISO } from "date-fns";

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
		uid,
		chatMessages,
		chatIds,
		userChats,
	} = props;
	const [newMessage, setNewMessage] = useState("");
	// const [selectedChatCompare, setSelectedChatCompare] = useState("");

	const [messages, setMessages] = useState([]);
	const [previousMessagesLoading, setPreviousMessagesLoading] = useState(false);
	const [userChat, setUserChat] = useState([]);

	const [isTyping, setIsTyping] = useState("");

	const { chatIdn } = useParams();

	const selectedChatId = chatIdn;

	const fetchMessages = async () => {
		if (!selectedChatId) return;
		setPreviousMessagesLoading(true);

		getChatMessages(selectedChatId);

		socket.emit("join_chat", selectedChatId);
	};

	useEffect(() => {
		if (userChats.length > 0) {
			let chatInfo = userChats.filter((chat) => {
				return chat._id === chatIdn;
			});
			setUserChat(chatInfo);
		}
	}, [chatIdn, userChats]);

	const selectedChatCompare = useRef();

	console.log(
		useImperativeHandle(
			first,
			() => {
				second;
			},
			[third]
		),
		`this is the auth from the chat`
	);

	useEffect(() => {
		//   fetchchat with id chatId
		fetchMessages();
		selectedChatCompare.current = selectedChatId;
	}, [selectedChatId]);

	useEffect(() => {
		socket.on("receive_message", (newMessageReceived) => {
			if (
				!selectedChatCompare ||
				selectedChatCompare.current !== newMessageReceived.chatId
			) {
				//   give notifications
				if (!notification.includes(newMessageReceived.chatId)) {
					onNotification(newMessageReceived.chatId);
					// setFetchAgain(!fetchAgain);
				}
				// console.log("message sent to another chat");
			} else {
				setMessages([...messages, newMessageReceived.content]);
			}
		});
	});

	useEffect(() => {
		socket.on("typing", () => setIsTyping(true));

		socket.on("stop_typing", () => {
			setIsTyping(false);
		});
	}, [socket]);

	useEffect(() => {
		console.log(messages, "this are the messages ");
		if (messages.length === 0) {
			setMessages(chatMessages);
		}
		setPreviousMessagesLoading(false);
	}, [chatMessages]);

	const sendMessage = async (e) => {
		e.preventDefault();
		// if (e.key === "Enter" && newMessage.trim()) {
		socket.emit("stop_typing", selectedChatId);

		try {
			setMessages([...messages, newMessage]);

			// setNewMessage("");

			const sentMessage = await axios.post(
				"http://localhost:3001/api/messages",
				{
					content: newMessage.content,
					chatId: selectedChatId,
					userId: uid,
					usersInfo: userChat[0].users,
				}
			);

			socket.emit("new_message", sentMessage.data.data);
		} catch (err) {
			console.log(err);
		}
		// }
	};
	let allMessages;
	if (messages.length > 0) {
		allMessages = messages.map(
			({ content, senderId, _id, createdAt }, index) => {
				// let time = format(parseISO(createdAt), "hh:mm a");
				return (
					<div
						// attr=[time]
						key={`${_id}${index}`}
						className={senderId !== uid ? classes.meMsg : classes.otherMsg}
					>
						{content}
					</div>
				);
			}
		);
	}

	let loader = previousMessagesLoading ? (
		<div className={classes.chat_loader}>'loading messages...'</div>
	) : (
		<div className={classes.allmsg}>{allMessages}</div>
	);

	const typingHandler = (e) => {
		if (!socketConnected) return;

		setNewMessage({
			content: e.target.value,
			senderId: uid,
			chatId: selectedChatId,
			usersInfo: userChat[0].users,
		});

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

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserverAspectRation: "xMidYMid slice",
		},
	};

	const submitWithKey = (e) => {
		if (e.charCode === 13) {
			console.log(e);
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<div className={classes.chat_cont}>
			<div>
				<h1>James Taylor </h1>
				<div className={classes.messages}>{loader}</div>
				{isTyping ? (
					<div className={classes.typing}>
						{/* <Lottie
						options={defaultOptions}
						width={70}
						style={{ marginBottom: 15, marginLeft: 0 }}
					/> */}
						"typing..."
					</div>
				) : (
					""
				)}
			</div>

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
							onKeyPress={(e) => {
								submitWithKey(e);
							}}
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
