import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import ConsultantVideoBookings from "./consultantVideoBookings";
import ConsultantChats from "./consultantChats";
import ConsultantNotes from "./consultantNotes";

function consultantSessions() {
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/consultant/sessions/chats">CHATS</Link>
					</li>
					<li>
						<Link to="/consultant/sessions/video-bookings">VIDEO BOOKING</Link>
					</li>
					<li>
						<Link to="/consultant/sessions/notes">NOTES</Link>
					</li>
				</ul>

				<hr />

				<Switch>
					<Route exact path="/consultant/sessions/chats">
						<ConsultantChats />
					</Route>
					<Route path="/consultant/sessions/video-bookings">
						<ConsultantVideoBookings />
					</Route>
					<Route path="/consultant/sessions/notes">
						<ConsultantNotes />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default consultantSessions;
