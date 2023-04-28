import React, { useState, useEffect } from "react";
import classes from "./chat.module.css";
import ImageUploadIcon from "../ConsutltantIcons/imageUploadIcon";
import SendIcon from "../ConsutltantIcons/sendIcon";
import {useParams} from "react-router-dom";

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
	const [newMessage, setNewMessage] = useState([]);
	// const [messageReceived, setMessageReceived] = useState("");
	const [messageList, setMessageList] = useState([]);
	const [chatLoading, setChatLoading] = useState(null);

	const params = useParams();

	const selectedChatId = params.chatId;

	

	

	function sendChat(e) {
		e.preventDefault();
		// sendMessage(e, newMessage);
		setMessageList({ ...messageList, newMessage });
		setNewMessage("");


		socket.on("private_message", ({ content, from }) => {
			// setMessageList({ ...messageList, data });
	
			console.log(content, from);
		});
	}

	

	const fetchMessages = async ()=>{
		if(!selectedChat)return ;

		const {data} = await axios.get(
			`/api/message/${selectedChatId}`
		)

		setMessageList(data);
		setChatLoading(false)


		socket.emit("join_room",selectedChatId)
	}

	useEffect(() => {
		//   fetchchat with id chatId
	}, []);

	


	let loader = !chatLoading || chatLoading === 'done' ? " ": (<div className={classes.chat_loader}>
	'loading messages...'
	</div>
		);
	 
	

	return (
		<div className={classes.chat_cont}>
				
					<h1>Messages: </h1>
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
								onChange={(e) => setNewMessage(e.target.value)}
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
		</div>
	);
}

export default Chat;
