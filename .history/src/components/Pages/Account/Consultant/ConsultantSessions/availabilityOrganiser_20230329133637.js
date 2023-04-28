import React, { useState } from "react";
import { Form, Row, Col, Container, Modal, Button } from "react-bootstrap";
import classes from "./availabilityOrganiser.module.css";
import ConsultantCalendar from "./consultantCalendar";

function AvailabilityOrganiser({ consultantCalendarInfo }) {
	const [newEvent, setNewEvent] = useState({
		title: "",
		start: "",
		end: "",
		description: "",
		status: null,
	});

	// console.log(new Date(Date.now()).toISOString().split(".")[0]);

	const [events, setEvents] = useState(consultantCalendarInfo);
	const [currentDate, setCurrentDate] = useState(
		new Date(Date.now()).toISOString().split(".")[0]
	);

	const [clickedDate, setClickedDate] = useState(currentDate);

	// const events = consultantCalendarInfo;

	function addEvent() {
		let newArray = events.slice();
		newArray.splice(events.length, 0, newEvent);

		setEvents(newArray);

		return;
	}

	function addBookableEventHandler(start) {
		console.log(start.startStr);
		setClickedDate(start.startStr);
	}

	function setTime(e) {
		console.log(e.target.value);
		let time = e.target.value;
		// 2023-03-23T14:00:00
		let startDateAndTime = `${clickedDate}-T${time}`;
		console.log(startDateAndTime);

		setNewEvent({ ...newEvent, start: startDateAndTime });
	}

	console.log(newEvent);

	function editBookableDayEvent() {}

	// const [first, setfirst] = useState("");

	function submitFormHandler() {}
	return (
		<div className={classes.session_organiser}>
			<div className={classes.calendar}>
				<ConsultantCalendar
					events={events}
					addBookableEventToDay={addBookableEventHandler}
					passCurrentDate={(date) => setCurrentDate(date)}
				/>
			</div>
			<div className={classes.calendar_inputs}>
				<h1>Schedule Availability</h1>
				<Form>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Event Name</Form.Label>
								<Form.Control
									type="text"
									onChange={(e) =>
										setNewEvent({ ...newEvent, title: e.target.value })
									}
									required
									placeholder="Type of consultation"
								/>
								{/* <Form.Text className="text-muted">
													We'll never share your email with anyone else.
												</Form.Text> */}
							</Form.Group>
						</Col>

						<Col>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Start Time</Form.Label>
								<Form.Control
									type="time"
									placeholder="Password"
									onChange={(e) => setTime(e)}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Duration</Form.Label>
								<Form.Control as="select" aria-label="Default select example">
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
							<Form.Group className="mb-3" controlId="formBasicCheckbox">
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

					<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
						<Form.Label>Description and Requirements</Form.Label>
						<Form.Control as="textarea" rows={3} />
					</Form.Group>
					<Button onClick={addEvent} variant="primary" type="button">
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default AvailabilityOrganiser;
