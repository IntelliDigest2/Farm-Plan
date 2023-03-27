import React from "react";
import classes from "./Tablink.module.css";
import { Link } from "react-router-dom";

function TabLink({ backgroundColor, link, icon, text }) {
	return (
		<>
			<a
				style={{ backgroundColor: { backgroundColor } }}
				className={classes.tabLink}
			>
				{icon}
				<Link to={link}></Link>
				{text}
			</a>
		</>
	);
}

export default TabLink;
