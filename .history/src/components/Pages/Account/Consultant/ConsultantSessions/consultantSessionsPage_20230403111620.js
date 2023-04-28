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
import { Form, Row, Col, Container, Modal, Button } from "react-bootstrap";

function ConsultantSessionsPage(props) {
	let { path, url } = useRouteMatch();
	const [calendarEvents, setCalendarEvents] = useState("");

	const events = [
		{
			title: "Open for avian consultation",
			start: "2023-03-20T08:00:00.000Z",
			end: "2023-03-20T09:00:00.000Z",
			status: null,
			booked: false,
		},
		{
			title: "Open for pig consultation",
			start: "2023-03-23T14:00:00.000Z",
			end: "2023-03-23T16:00:00.000Z",
			status: null,
			booked: false,
		},
		{
			title: "Open for cow consultation",
			start: "2023-03-23T12:00:00.000Z",
			end: "2023-03-23T03:00:00.000Z",
			status: null,
			booked: false,
		},
	];

	useEffect(() => {
		setCalendarEvents(props.consultantEventsData);
	}, [props.consultantEventsData]);

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
							<ConsultantChats />
						</Route>
						<Route exact path={`${url}/video-bookings`}>
							<ConsultantVideoBookings />
						</Route>
						<Route exact path={`${url}/notes`}>
							<ConsultantNotes />
						</Route>
						<Route exact path={`${url}`}>
							<AvailabilityOrganiser consultantCalendarInfo={events} />
						</Route>
					</Switch>
				</section>
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => ({
	consultantEventsData: state.consultantData.consultantData,
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultantSessionsPage);
