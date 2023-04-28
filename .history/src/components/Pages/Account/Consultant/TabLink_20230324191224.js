import React from "react";
import classes from "./Tablink.module.css";
import { Link } from "react-router-dom";

function TabLink({ backgroundColor, link, icon, text }) {
	console.log(backgroundColor);
	return (
		<>
			<Link
				to={link}
				style={{ backgroundColor: `${backgroundColor}` }}
				className={classes.tabLink}
			>
				<div>
					<div className={classes.tablink_icon}>{icon}</div>

					<div>{text}</div>
				</div>
			</Link>
		</>
	);
}

export default TabLink;
