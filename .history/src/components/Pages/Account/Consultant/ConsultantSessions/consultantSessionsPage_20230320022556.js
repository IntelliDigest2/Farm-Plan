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

function ConsultantSessionsPage() {
	let { path, url } = useRouteMatch();
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to={`/chats`}>CHATS</Link>
					</li>
					<li>
						<Link to={`${url}/video-bookings`}>VIDEO BOOKING</Link>
					</li>
					<li>
						<Link to={`${url}/notes`}>NOTES</Link>
					</li>
				</ul>

				<hr />

				<Switch>
					<Route exact path={`/`}>
						<ConsultantChats />
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
			</div>
		</Router>
	);
}

export default ConsultantSessionsPage;
