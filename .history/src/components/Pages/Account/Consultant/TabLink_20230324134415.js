import React from "react";
import classes from "./Tablink.module.css";
import { Link } from "react-router-dom";

function TabLink({ backgroundColor, link, icon, text }) {
	console.log(backgroundColor);
	return (
		<>
			<Link
				to={link}
				style={{ backgroundColor: `#afba15` }}
				className={classes.tabLink}
			>
				{icon}

				{text}
			</Link>
		</>
	);
}

export default TabLink;
