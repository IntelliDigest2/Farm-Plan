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
				{icon}

				<div>{text}</div>
			</Link>
		</>
	);
}

export default TabLink;
