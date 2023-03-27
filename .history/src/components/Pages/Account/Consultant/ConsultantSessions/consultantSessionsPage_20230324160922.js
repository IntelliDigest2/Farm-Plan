import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	NavLink,
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
			<nav>
				<ul className={classes.nav}>
					<li>
						<NavLink
							className={(isActive) =>
								classes.link + (!isActive ? "" : `${classes.active}`)
							}
							to={`${url}`}
						>
							ORGANISE CALENDAR
						</NavLink>
					</li>
					<li>
						<NavLink
							className={(isActive) =>
								classes.link + (!isActive ? "" : `${classes.active}`)
							}
							to={`${url}/chats`}
						>
							CHATS
						</NavLink>
					</li>
					<li>
						<NavLink
							className={(isActive) =>
								classes.link + (!isActive ? "" : `${classes.active}`)
							}
							to={`${url}/video-bookings`}
						>
							VIDEO BOOKING
						</NavLink>
					</li>
					<li>
						<NavLink
							className={(isActive) =>
								classes.link + (!isActive ? "" : `${classes.active}`)
							}
							to={`${url}/notes`}
						>
							NOTES
						</NavLink>
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
