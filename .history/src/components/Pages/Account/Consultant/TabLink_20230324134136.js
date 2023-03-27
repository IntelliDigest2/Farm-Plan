import React from "react";
import classes from "./Tablink.module.css";
import { Link } from "react-router-dom";

function TabLink({ backgroundColor, link, icon, text }) {
	return (
		<>
			<Link
				to={link}
				style={{ backgroundColor: { backgroundColor } }}
				className={classes.tabLink}
			>
				{icon}

				{text}
			</Link>
		</>
	);
}

export default TabLink;
