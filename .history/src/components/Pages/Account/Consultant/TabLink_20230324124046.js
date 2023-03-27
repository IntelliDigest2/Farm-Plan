import React from "react";
import classes from "./Tablink.module.css";
import { Link } from "react-router-dom";

function TabLink({ backgroundColor, link, icon }) {
	return (
		<div className={classes.tabLink}>
			{icon}
			<Link to={link}></Link>
		</div>
	);
}

export default TabLink;
