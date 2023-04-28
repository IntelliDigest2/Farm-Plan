import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	useParams,
	useRouteMatch,
	Redirect,
} from "react-router-dom";
import classes from "./consultingPage.module.css";
import BookConsulting from "./bookConsulting";
import UserConsultingChatPage from "./userConsultingChatPage";

const ConsultingPage = () => {
	let { path, url } = useRouteMatch();

	return (
		<div className={classes.session_cont}>
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
								to={`${url}/chats`}
							>
								CHATS
							</NavLink>
						</li>
					</ul>
				</nav>

				<section className={classes.subCont}>
					<Switch>
						<Route path={`${url}/chats`}>
							<UserConsultingChatPage />
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

export default ConsultingPage;
