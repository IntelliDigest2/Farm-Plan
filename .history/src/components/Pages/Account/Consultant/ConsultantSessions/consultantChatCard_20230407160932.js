import React, { useState, useEffect } from "react";
import classes from "./consultantChats.module.css";
import { useRouteMatch, Link } from "react-router-dom";

function ConsultantChatCard({ chat, notification }) {
	let { url } = useRouteMatch();
	const [showNotification, setShowNotification] = useState(false);

	const handleNotif = () => {
		setShowNotification(false);
	};

	useEffect(() => {
		if (notification) {
		}
	}, [notification]);

	return (
		<div>
			{/* <Link onClick={handleNotif} to={`${url}/${chat.id}`}> */}
			<Link onClick={handleNotif} to={`${url}/24`}>
				<div>
					<div>
						<div className={classes.chat_card}>
							{/* <div className={classes.chat_card}> */}
							<div>
								<h1 className={classes.chat_heading}>
									Seun micheals, 11/12/2023
								</h1>
								<h2 className={classes.chat_topic}>Horticulture consulting</h2>
							</div>
							<div className={classes.chat_txt}>
								i have seen some changes in the leaf colorations
							</div>
						</div>
					</div>
					<div className={classes.notification}></div>
				</div>
			</Link>
		</div>
	);
}

export default ConsultantChatCard;
