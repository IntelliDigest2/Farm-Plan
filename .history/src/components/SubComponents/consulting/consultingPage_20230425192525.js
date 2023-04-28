import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	useParams,
	Link,
	useRouteMatch,
	Redirect,
	useHistory,
	useLocation,
} from "react-router-dom";
import classes from "./consultingPage.module.css";
import BookConsulting from "./bookConsulting";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import ConsultantChats from "../../Pages/Account/Consultant/ConsultantSessions/consultantChats";
const ConsultingPage = (props) => {
	let { path, url } = useRouteMatch();
	const history = useHistory();
	const { auth } = props;
	const location = useLocation();

	function goBack() {
		if (history.length > 1) {
			let backIndex;
			// if (history.location.state) {
			// 	backIndex = history.location.state.goBack;
			// } else {
			// 	backIndex = -1;
			// }
			// // history.push({
			// // 	pathname: "-1",
			// // 	state: {
			// // 		from: "consult",
			// // 	},
			// // });
			// // history.push(-1);
			// history.go(backIndex);
		}

		console.log(history);
		console.log(location);
	}

	return (
		<div className={classes.session_cont}>
			<Button onClick={goBack}>Back</Button>
			<Router>
				<nav>
					<ul className={classes.nav}>
						<li>
							<NavLink
								className={classes.link}
								activeClassName={classes.active}
								exact
								to={`${url}`}
							>
								CONSULT
							</NavLink>
						</li>
						<li>
							<NavLink
								className={classes.link}
								activeClassName={classes.active}
								to={{ pathname: `${url}/chats`, state: { goBack: goBack - 1 } }}
							>
								CHATS
							</NavLink>
						</li>
					</ul>
				</nav>

				<section className={classes.subCont}>
					<Switch>
						<Route path={`${url}/chats`}>
							<ConsultantChats fakeuid={auth.uid} />
						</Route>

						<Route exact path={`${url}`}>
							<BookConsulting />
						</Route>
					</Switch>
				</section>
			</Router>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		userChats: state.consultantState.userChats,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultingPage);
