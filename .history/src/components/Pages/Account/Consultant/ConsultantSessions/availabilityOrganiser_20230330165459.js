import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container, Modal, Button } from "react-bootstrap";
import classes from "./availabilityOrganiser.module.css";
import ConsultantCalendar from "./consultantCalendar";
import moment from "moment";

function AvailabilityOrganiser({ consultantCalendarInfo }) {
	const [newEvent, setNewEvent] = useState({
		title: "",
		start: "",
		end: "",
		description: "",
		status: null,
	});

	//the events are stored in the utc format in the database
	//they will then be converted to local time before being displayed in the calendar

	console.log(consultantCalendarInfo);

	function transformUTCtoLocalTime() {
		let localTimeEvents = consultantCalendarInfo.map((ev) => {
			// 2023-03-30T16:30:00

			// let localStart = ev.start.toLocaleString();

			const localTimeStartYear = new Date(ev.start);
			console.log(localTimeStartYear.getFullYear(), "year");
			console.log(localTimeStartYear.getMonth(), "month");
			console.log(localTimeStartYear.getDate(), "date");
			console.log(localTimeStartYear.getMinutes(), "min");
			// console.log(localTimeStartYear.getFullYear());

			// .getFullYear()
			// const localYear =

			var formatLocalDate = function () {
				new Date();
			};

			// Date(
			// 	utcDate.getFullYear(),
			// 	utcDate.getMonth(),
			// 	utcDate.getDate(),
			// 	utcDate.getHours(),
			// 	utcDate.getMinutes(),
			// 	utcDate.getSeconds()
			//  );
			// let localEventTime = { ...ev, start: localStart, end: localEnd };

			return "me";
			// return localEventTime;
		});

		// return localTimeEvents;
	}

	transformUTCtoLocalTime();

	// console.log(new Date(Date.now()).toISOString().split(".")[0]);

	const [events, setEvents] = useState(consultantCalendarInfo);
	const [duration, setDuration] = useState(0);
	const [currentDate, setCurrentDate] = useState(
		new Date(Date.now()).toISOString()
	);

	const [clickedDate, setClickedDate] = useState(currentDate);
	useEffect(() => {
		console.log(newEvent, "this is the useEffect");
	}, [newEvent]);

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
		let endDate = new Date(
			date.getTime() + parseInt(duration) * 60000
		).toISOString();

		return endDate;
	}

	function setStartTime(e) {
		let time = e.target.value;
		console.log(time, "time i inputed");

		// console.log(date, "this is the date", date.length);

		let date = `${clickedDate.split("T")[0]}T${time}:00`;
		if (date.length > 18) {
			//it has to have the format 2023-03-30T16:30:00 before it can execute if not we get an error
			let startDateAndTime = new Date(date).toISOString();
			console.log(startDateAndTime, "new start date");
			// setNewEvent({ ...newEvent, start: startDateAndTime });

			if (newEvent.end !== "") {
				let endDate = calculateEndTime(
					new Date(`${startDateAndTime}`),
					duration
				);

				setNewEvent({ ...newEvent, end: endDate, start: startDateAndTime });
			} else {
				setNewEvent({ ...newEvent, start: startDateAndTime });
			}
		}
	}

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
		return;
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
