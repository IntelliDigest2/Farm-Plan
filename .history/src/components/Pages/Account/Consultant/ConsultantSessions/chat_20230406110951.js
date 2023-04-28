import React, { useState, useEffect } from "react";
import classes from "./chat.module.css";
import ImageUploadIcon from "../ConsutltantIcons/imageUploadIcon";
import SendIcon from "../ConsutltantIcons/sendIcon";
import {useParams} from "react-router-dom";
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


		socket.on("new_message", ({ newMessage, from ,to}) => {
			// setMessageList({ ...messageList, data });
	
			console.log(content, from);
		});
	}

	

	const fetchMessages = async ()=>{
		try{if(!selectedChat)return ;

			const {data} = await axios.get(
				`/api/message/${selectedChatId}`
			)
	
			setMessageList(data);
			setChatLoading(false)
	
	
			socket.emit("join_room",selectedChatId)
		}catch{(err)=>{
			console.log(err)
		}}
		
	}

	useEffect(() => {
		//   fetchchat with id chatId
		fetchMessages()
	}, []);

	useEffect(() => {
	  socket.on("new_message",newMessageRecieved)

	  if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved._id){
	//   give notifications

	  }else{
		setMessageList([...messages, newMessageRecieved])
	  }
	})
	

	


	let loader = !chatLoading || chatLoading === 'done' ? " ": (<div className={classes.chat_loader}>
	'loading messages...'
	</div>
		);
	 
	

	return (
		<div className={classes.chat_cont}>

					<div><h1>James Taylor </h1></div>
					
					
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
