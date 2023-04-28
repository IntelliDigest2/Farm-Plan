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
import ConsultantVideoBookings from "./consultantVideoBookings";
import ConsultantChats from "./consultantChats";
import ConsultantNotes from "./consultantNotes";
import classes from "./consultantSessionsPage.module.css";
import AvailabilityOrganiser from "./availabilityOrganiser";
import { fetchConsultantData } from "../../../../../store/actions/consultingActions";
import { Form, Row, Col, Container, Modal, Button } from "react-bootstrap";

function ConsultantSessionsPage(props) {
	let { path, url } = useRouteMatch();
	const [calendarEvents, setCalendarEvents] = useState("");

	let { consultantCalendarEvents, getConsultantData } = props;

	useEffect(() => {
		if (!consultantCalendarEvents) {
			getConsultantData("EAudRc5YajVorKygb0kZFGlfl163");
		}
	}, []);

	useEffect(() => {
		setCalendarEvents(consultantCalendarEvents);
		console.log(consultantCalendarEvents);
	}, [consultantCalendarEvents]);

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
								to={`${url}/video-bookings`}
							>
								VIDEO BOOKING
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
							<ConsultantChats
								userName={"james"}
								userId={"12340u"}
								to={"56789u"}
							/>
						</Route>
						<Route exact path={`${url}/video-bookings`}>
							<ConsultantVideoBookings />
						</Route>
						<Route exact path={`${url}/notes`}>
							<ConsultantNotes />
						</Route>
						<Route exact path={`${url}`}>
							<AvailabilityOrganiser
								consultantCalendarEvents={calendarEvents}
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
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultantSessionsPage);
