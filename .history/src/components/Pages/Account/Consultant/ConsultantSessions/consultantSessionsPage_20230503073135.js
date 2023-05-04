import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
	useParams,
	useRouteMatch,
	Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import ConsultantOtherBookings from "./consultantOtherBookings";
import ConsultantChats from "./consultantChats";
import ConsultantNotes from "./consultantNotes";
import classes from "./consultantSessionsPage.module.css";
import AvailabilityOrganiser from "./availabilityOrganiser";
import { fetchConsultantData } from "../../../../../store/actions/consultantActions/consultantActions";
import { Form, Row, Col, Container, Modal, Button } from "react-bootstrap";

function ConsultantSessionsPage(props) {
	let { path, url } = useRouteMatch();
	const [calendarEvents, setCalendarEvents] = useState("");
	const [userInfo, setUserInfo] = useState("");

	let { getConsultantData, auth, consultantData } = props;
	const consultantId = auth.uid;

	useEffect(() => {
		getConsultantData(consultantId);
	}, []);

	useEffect(() => {
		console.log(consultantData);
		if (consultantData) {
			setUserInfo(consultantData);
		}
	}, [consultantData]);

	const goBack = () => {
		// console.log()
		return;
	};

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
								ORGANISE CALENDAR
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
						<li>
							<NavLink
								className={classes.link}
								activeClassName={classes.active}
								to={`${url}/other-bookings`}
							>
								OTHER BOOKINGS
							</NavLink>
						</li>
						<li>
							<NavLink
								className={classes.link}
								activeClassName={classes.active}
								to={`${url}/notes`}
							>
								NOTES
							</NavLink>
						</li>
					</ul>
				</nav>

				<section className={classes.subCont}>
					<Switch>
						<Route path={`${url}/chats`}>
							<ConsultantChats />
						</Route>
						<Route exact path={`${url}/other-bookings`}>
							<ConsultantOtherBookings />
						</Route>
						<Route exact path={`${url}/notes`}>
							<ConsultantNotes />
						</Route>
						<Route exact path={`${url}`}>
							<AvailabilityOrganiser
								// consultantCalendarEvents={calendarEvents}
								consultantInfo={userInfo}
								auth={auth}
							/>
						</Route>
					</Switch>
				</section>
			</Router>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		getConsultantData: (userId) => dispatch(fetchConsultantData(userId)), // getConsultantData: (item) => dispatch(),
	};
};

const mapStateToProps = (state) => {
	return {
		consultantCalendarEvents:
			state.consultantState.consultantData.calendarEvents,
		auth: state.firebase.auth,
		consultantData: state.consultantState.consultantData,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultantSessionsPage);
