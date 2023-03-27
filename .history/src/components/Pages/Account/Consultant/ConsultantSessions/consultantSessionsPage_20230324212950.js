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
import ConsultantVideoBookings from "./consultantVideoBookings";
import ConsultantChats from "./consultantChats";
import ConsultantNotes from "./consultantNotes";
import ConsultantCalendar from "./consultantCalendar";
import classes from "./consultantSessionsPage.module.css";

function ConsultantSessionsPage() {
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
						<Route exact path={`${url}/chats`}>
							<ConsultantChats />
						</Route>
						<Route exact path={`${url}/video-bookings`}>
							<ConsultantVideoBookings />
						</Route>
						<Route exact path={`${url}/notes`}>
							<ConsultantNotes />
						</Route>
						<Route exact path={`${url}`}>
							<div>
								<ConsultantCalendar />
							</div>
						</Route>
					</Switch>
				</section>
			</Router>
		</div>
	);
}

export default ConsultantSessionsPage;
