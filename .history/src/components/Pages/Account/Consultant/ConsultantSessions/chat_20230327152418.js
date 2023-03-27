import React from "react";
import classes from "./chat.module.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	useParams,
	useRouteMatch,
	Redirect,
	useHistory,
} from "react-router-dom";

function Chat() {
	let params = useParams();

	const userId = params.id;

	console.log(userId);

	return <div className={classes.cont}>me and you</div>;
}

export default Chat;
