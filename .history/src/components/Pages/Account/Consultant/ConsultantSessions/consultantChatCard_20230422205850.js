import React, { useState, useEffect } from "react";
import classes from "./consultantChats.module.css";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

function ConsultantChatCard({ chat, notification }) {
	const [showNotification, setShowNotification] = useState(false);

	// if (useParams())

	const handleNotif = () => {
		setShowNotification(false);
	};

	// let { pathname } = useLocation();
	let arr = useLocation().pathname.split("/");

	const endChat = () => {
		// endChat function
	};

	useEffect(() => {
		if (notification) {
			setShowNotification(true);
		}
	}, [notification]);

	let notificationBulb = showNotification ? (
		<div className={classes.notification}></div>
	) : (
		""
	);
	let active = arr[arr.length - 1] === chat._id ? classes.active : "";

	return (
		<div className={active} onClick={(e) => handleNotif(e)}>
			<div>
				<div className={classes.chat_card}>
					<Button size="sm" onClick={endChat}>
						End{" "}
					</Button>
					<div>
						<h1 className={classes.chat_heading}>Seun micheals, 11/12/2023</h1>
						<h2 className={classes.chat_topic}>Horticulture consulting</h2>
					</div>
					<div className={classes.chat_txt}>
						i have seen some changes in the leaf colorations
					</div>
				</div>
			</div>
			{notificationBulb}
		</div>
	);
}

export default ConsultantChatCard;
