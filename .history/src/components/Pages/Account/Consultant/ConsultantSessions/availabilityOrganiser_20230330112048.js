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
	const [duration, setDuration] = useState(0);
	const [currentDate, setCurrentDate] = useState(
		new Date(Date.now()).toISOString()
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

	function calculateEndTime(date, duration) {
		const smpdate = new Date(date);

		smpdate.setMinutes(smpdate.getMinutes() + 30);

		console.log(
			smpdate.setMinutes(smpdate.getMinutes() + 30),
			"this is the smp date"
		);

		// console.log(new Date(date.getTime() + parseInt(duration) * 60000));
		console.log(
			new Date(date.getTime() + parseInt(duration) * 60000).toISOString()
		);
		let dateSample = new Date(
			date.getTime() + parseInt(duration) * 60000
		).toISOString();

		console.log(dateSample.getTimezoneOffset());

		// let endDate = new Date(
		// 	date.getTime() + parseInt(duration) * 60000
		// ).toISOString();

		// return endDate;
	}

	function setStartTime(e) {
		let time = e.target.value;
		console.log(time);
		console.log(clickedDate);
		// 2023-03-23T14:00:00
		// console.log(new Date(time), "this is the current time");

		// let startDateAndTime = new Date(time).toISOString();

		// setNewEvent({ ...newEvent, start: startDateAndTime });

		// if (newEvent.end !== "") {
		// 	let endDate = calculateEndTime(new Date(`${startDateAndTime}`), duration);
		// 	setNewEvent({ ...newEvent, end: endDate });
		// }
	}

	console.log(newEvent);

	function setEndTime(e) {
		if (e.target.value !== "") {
			let duration = e.target.value;
			setDuration(duration);

			let date = new Date(`${newEvent.start}`);

			let endDate = calculateEndTime(date, duration);

			if (newEvent.start !== "") {
				setNewEvent({ ...newEvent, end: endDate });
			}
		}

		//
	}

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
							<Form.Group className="mb-3" controlId="consultationType">
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
							<Form.Group className="mb-3" controlId="time">
								<Form.Label>Start Time</Form.Label>
								<Form.Control
									type="time"
									placeholder="Password"
									onChange={(e) => setStartTime(e)}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="availabilityDuration">
								<Form.Label>Duration</Form.Label>
								<Form.Control
									onChange={(e) => setEndTime(e)}
									as="select"
									aria-label="Default select example"
									placeholder="Select availaibility period"
								>
									{/* <option>Select availaibility period</option> */}
									<option value="">Select event duration</option>
									<option value="30">30 mins</option>
									<option value="60">1 hr</option>
									<option value="120">2 hrs</option>
									<option value="180">3 hrs</option>
									<option value="240">4 hrs</option>
								</Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group className="mb-3" controlId="availabilityFrequency">
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
						<Form.Control
							onChange={(e) =>
								setNewEvent({ ...newEvent, description: e.target.value })
							}
							as="textarea"
							rows={3}
						/>
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
