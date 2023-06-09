import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch,
} from "react-router-dom";

function consultantSessions() {
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/topics">Topics</Link>
					</li>
				</ul>

				<hr />

				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/topics">
						<Topics />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default consultantSessions;
