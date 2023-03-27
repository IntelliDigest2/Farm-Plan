import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch,
	Redirect,
} from "react-router-dom";
import ConsultantVideoBookings from "./consultantVideoBookings";
import ConsultantChats from "./consultantChats";
import ConsultantNotes from "./consultantNotes";
import ConsultantCalendar from "./consultantCalendar";
import classes from "./consultantSessionsPage.module.css";

function ConsultantSessionsPage() {
	let { path, url } = useRouteMatch();
	return (
		<Router>
			<nav className={classes.nav}>
				<ul>
					<li>
						<Link to={`${url}`}>ORGANISE CALENDAR</Link>
					</li>
					<li>
						<Link to={`${url}/chats`}>CHATS</Link>
					</li>
					<li>
						<Link to={`${url}/video-bookings`}>VIDEO BOOKING</Link>
					</li>
					<li>
						<Link to={`${url}/notes`}>NOTES</Link>
					</li>
				</ul>
			</nav>

			<hr />

			<Switch>
				<Route exact path={`${url}`}>
					<div style={{ width: "50%", height: "70vh" }}>
						<ConsultantCalendar />
					</div>
				</Route>

				<Route exact path={`${url}/chats`}>
					<ConsultantChats />
				</Route>
				<Route path={`${url}/video-bookings`}>
					<ConsultantVideoBookings />
				</Route>
				<Route path={`${url}/notes`}>
					<ConsultantNotes />
				</Route>
			</Switch>
		</Router>
	);
}

export default ConsultantSessionsPage;
