import React from "react";
import { connect } from "react-redux";
import classes from './consultantChat.module.css'

export const ConsultantChats = (props) => {
	let chats = [1, 2, 3, 4, 5, 5, 6, 7];

	function goToChat() {
		console.log("gone to chat");
	}

	let chatCards = chats.map((chat) => {
		return (
			<div onClick={goToChat} className={}>
				<div>Name of Recipient, 11/12/2023</div>
				<div>
					<p>Topic</p>
					<div>
						<p>Last message</p>
					</div>
				</div>
			</div>
		);
	});
	return <div>{chatCards}</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantChats);
