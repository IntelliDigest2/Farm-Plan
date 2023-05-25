import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	useRouteMatch,
	useHistory,
	useLocation,
} from "react-router-dom";
import classes from "./consultingPage.module.css";
import BookConsulting from "./bookConsulting";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

import ConsultantChats from "../../Pages/Account/Consultant/ConsultantSessions/consultantChats";
import { PageWrapPayment } from "../../SubComponents/PageWrapPayment";
const ConsultingPage = (props) => {
	let { url } = useRouteMatch();
	const { auth, user, profile } = props;

	function goBack() {}

	// console.log(auth, `this is the auth`);
	// console.log(user, `this is the user`);

	return (
		<PageWrapPayment goTo="/account" header="Consulting">
			<div className={classes.session_cont}>
				{/* <Button onClick={goBack}>Back</Button> */}
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
									to={{ pathname: `${url}/chats` }}
								>
									CHATS
								</NavLink>
							</li>
							<li>
								<NavLink
									className={classes.link}
									activeClassName={classes.active}
									to={{ pathname: `${url}/bookings` }}
								>
									BOOKINGS
								</NavLink>
							</li>
						</ul>
					</nav>

					<section className={classes.subCont}>
						<Switch>
							<Route path={`${url}/chats`}>
								<ConsultantChats />
							</Route>

							<Route exact path={`${url}`}>
								<BookConsulting />
							</Route>
						</Switch>
					</section>
				</Router>
			</div>
		</PageWrapPayment>
	);
};

const mapStateToProps = (state) => {
	return {
		userChats: state.consultantState.userChats,
		auth: state.firebase.auth,
		user: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultingPage);
