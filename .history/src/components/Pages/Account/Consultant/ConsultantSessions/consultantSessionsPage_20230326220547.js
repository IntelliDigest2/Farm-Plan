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
import ConsultantVideoBookings from "./consultantVideoBookings";
import ConsultantChats from "./consultantChats";
import ConsultantNotes from "./consultantNotes";
import ConsultantCalendar from "./consultantCalendar";
import classes from "./consultantSessionsPage.module.css";
import { Form, Row, Col, Container, Modal, Button } from "react-bootstrap";

function ConsultantSessionsPage() {
	let { path, url } = useRouteMatch();
	const consultantCalendarInfo = [
		{
			title: "Open for avian consultation",
			start: "2023-03-20T08:00:00",
			end: "2023-03-20T09:00:00",
		},
		{
			title: "Open for pig consultation",
			start: "2023-03-23T14:00:00",
			end: "2023-03-23T16:00:00",
		},
		{
			title: "Open for cow consultation",
			start: "2023-03-23T12:00:00",
			end: "2023-03-23T03:00:00",
		},
	];

	function addBookableEventHandler() {
		console.log("booked");
	}

	function editBookableDayEvent() {}

	const [first, setfirst] = useState("");

	function submitFormHandler() {}

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
							<div className={classes.session_organiser}>
								<div className={classes.calendar}>
									<ConsultantCalendar
										events={consultantCalendarInfo}
										addBookableEventToDay={addBookableEventHandler}
									/>
									<div className={classes.calendar_inputs}>
										<h1>Schedule Availability</h1>
										<Form>
											<Row>
												<Col>
													<Form.Group
														className="mb-3"
														controlId="formBasicEmail"
													>
														<Form.Label>Event Name</Form.Label>
														<Form.Control
															type="txt"
															placeholder="Type of consultation"
														/>
														{/* <Form.Text className="text-muted">
													We'll never share your email with anyone else.
												</Form.Text> */}
													</Form.Group>
												</Col>

												<Col>
													<Form.Group
														className="mb-3"
														controlId="formBasicPassword"
													>
														<Form.Label>Start Time</Form.Label>
														<Form.Control type="time" placeholder="Password" />
													</Form.Group>
												</Col>
											</Row>
											<Row>
												<Col>
													<Form.Group
														className="mb-3"
														controlId="formBasicPassword"
													>
														<Form.Label>Duration</Form.Label>
														<Form.Control
															as="select"
															aria-label="Default select example"
														>
															<option>Select availaibility period</option>
															<option value=".5">30 mins</option>
															<option value="1">1 hr</option>
															<option value="2">2 hr2</option>
															<option value="2">3 hrs</option>
															<option value="3">4 hrs</option>
														</Form.Control>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group
														className="mb-3"
														controlId="formBasicCheckbox"
													>
														<Form.Label>Frequency of occurence</Form.Label>
														<Form.Control as="select">
															<option>Select availability frequency</option>
															<option value="none">none</option>
															<option value="weekly">Weekly</option>
															<option value="Biweekly">Biweekly</option>
															{/* <option value="weekly"> Every 2 weeks</option> */}
															<option value="Monthly">Monthly</option>
														</Form.Control>
													</Form.Group>
												</Col>
											</Row>

											<Form.Group
												className="mb-3"
												controlId="exampleForm.ControlTextarea1"
											>
												<Form.Label>Description and Requirements</Form.Label>
												<Form.Control as="textarea" rows={3} />
											</Form.Group>
											<Button
												onClick={submitFormHandler}
												variant="primary"
												type="button"
											>
												Submit
											</Button>
										</Form>
									</div>
								</div>
							</div>
						</Route>
					</Switch>
				</section>
			</Router>
		</div>
	);
}

export default ConsultantSessionsPage;
