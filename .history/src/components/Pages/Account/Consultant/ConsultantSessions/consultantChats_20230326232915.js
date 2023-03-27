import React from "react";
import { connect } from "react-redux";
import classes from "./consultantChat.module.css";

export const ConsultantChats = (props) => {
	let chats = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11];

	function goToChat() {
		console.log("gone to chat");
	}

	let chatCards = chats.map((chat) => {
		return (
			<div>
				<div>
					<div onClick={goToChat} className={classes.chat_card}>
						<div className={classes.chat_heading}>
							Seun micheals, 11/12/2023
						</div>
						<div>
							<p>Horticulture consulting</p>
							<div className={classes.chat_txt}>
								<p>i have seen some changes in the leaf colorations</p>
							</div>
						</div>
					</div>
				</div>
				<div></div>
			</div>
		);
	});
	return <div>{chatCards}</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantChats);
