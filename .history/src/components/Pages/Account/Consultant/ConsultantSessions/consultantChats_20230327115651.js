import React from "react";
import { connect } from "react-redux";
import classes from "./consultantChat.module.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	useParams,
	useRouteMatch,
	Redirect,
} from "react-router-dom";
import Chat from "./chat";

export const ConsultantChats = (props) => {
	let chats = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 11];

	function goToChat() {
		console.log("gone to chat");
	}

	let { path, url } = useRouteMatch();

	let chatCards = chats.map((chat) => {
		return (
			<>
				<div>
					<div onClick={goToChat} className={classes.chat_card}>
						<div>
							<h1 className={classes.chat_heading}>
								Seun micheals, 11/12/2023
							</h1>
							<h2>Horticulture consulting</h2>
						</div>
						<div className={classes.chat_txt}>
							<p>i have seen some changes in the leaf colorations</p>
						</div>
					</div>
				</div>
				<div></div>
			</>
		);
	});
	return (
		<div>
			<div>{chatCards}</div>
			<Switch>
				<Route exact path={`${url}/{:id}`}>
					<Chat />
				</Route>
			</Switch>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantChats);
