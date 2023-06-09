import React, { useState, useEffect } from "react";
import classes from "./consultantChats.module.css";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { format, parseISO } from "date-fns";

function ConsultantChatCard(props) {
	const [showNotification, setShowNotification] = useState(false);

	// if (useParams())
	const { chat, notifications, profile } = props;

	console.log(chat);

	const handleNotif = () => {
		setShowNotification(false);
	};

	// let { pathname } = useLocation();
	let arr = useLocation().pathname.split("/");

	const endChat = () => {
		// endChat function
	};

	let userName;
	if (`${profile.first} ${profile.lastName}` === chat.consultantName) {
		userName = chat.consultantName;
	} else {
		userName = chat.userName;
	}

	useEffect(() => {
		if (notifications.includes(chat._id)) {
			setShowNotification(true);
		}
	}, [chat._id, notifications]);

	let notificationBulb = showNotification ? (
		<div className={classes.notification}></div>
	) : (
		""
	);
	let active = arr[arr.length - 1] === chat._id ? classes.active : "";

	const date = parseISO(new Date(chat.createdAt).toISOString());

	const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");

	return (
		<div className={active} onClick={(e) => handleNotif(e)}>
			<div>
				<div className={classes.chat_card}>
					<Button
						className={classes.endChat}
						variant="danger"
						size="sm"
						onClick={endChat}
					>
						End chat
					</Button>
					<div>
						<h1 className={classes.chat_heading}>
							{userName}
							<span>{formattedDate}</span>
						</h1>
						<h2 className={classes.chat_topic}>Horticulture consulting</h2>
					</div>
					<div className={classes.chat_txt}>{chat.latestMessage}</div>
				</div>
			</div>
			{notificationBulb}
		</div>
	);
}

const mapStateToProps = (state) => ({
	profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantChatCard);
