import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container, Modal, Button } from "react-bootstrap";
import classes from "./availabilityOrganiser.module.css";
import ConsultantCalendar from "./consultantCalendar";
import { addConsultantEventToDatabase } from "../../../../../store/actions/consultantActions/consultantActions";
import { connect } from "react-redux";
import { format } from "date-fns";

function AvailabilityOrganiser(props) {
	const [newEvent, setNewEvent] = useState({
		eventType: "",
		start: "",
		end: "",
		description: "",
		status: null,
		booked: false,
	});

	const {
		addEventToDB,
		isSubmitting,
		consultantCalendarInfo,
		consultantCalendarEvents,
	} = props;

	// const [events, setEvents] = useState(consultantCalendarInfo);
	const [duration, setDuration] = useState(0);
	const [emptyCalendarNotification, setEmptyCalendarNotification] =
		useState(false);
	const [currentDate, setCurrentDate] = useState(
		new Date(Date.now()).toISOString()
	);
	const [isLoading, setIsLoading] = useState(false);

	// console.log(consultantCalendarInfo);
	let localEventArray;

	//the events are stored in the utc format in the database
	//they will then be converted to local time before being displayed in the calendar

	useEffect(() => {
		if (consultantCalendarInfo.length === 0) {
			setEmptyCalendarNotification(true);
		}
	}, [consultantCalendarInfo]);

	function transformUTCtoLocalTime(events) {
		let localTimeEvents = events.map((ev) => {
			var formatLocalDate = function (event) {
				const localTime = new Date(event);
				let localYear = localTime.getFullYear();
				let localMonth = localTime.getMonth() + 1;
				let localDay = localTime.getDate();
				let localHour = localTime.getHours();
				let localMinute = localTime.getMinutes();
				return `${localYear}-${localMonth
					.toString()
					.padStart(2, "0")}-${localDay.toString().padStart(2, "0")}T${localHour
					.toString()
					.padStart(2, "0")}:${localMinute.toString().padStart(2, "0")}:00`;
			};

			const localStartEvent = formatLocalDate(ev.start);
			const localEndEvent = formatLocalDate(ev.end);

			// console.log(localStartEvent, localEndEvent);

			return { ...ev, start: localStartEvent, end: localEndEvent };
		});

		return localTimeEvents;
	}

	if (consultantCalendarInfo.length > 0) {
		localEventArray = transformUTCtoLocalTime(consultantCalendarInfo);
	}

	const [clickedDate, setClickedDate] = useState(currentDate);

	useEffect(() => {
		// console.log(newEvent, "this is the useEffect");
		setIsLoading(isSubmitting);
	}, [isSubmitting]);

	//add event function
	function addEvent() {
		//add event to database

		let consultantId = "EAudRc5YajVorKygb0kZFGlfl163";
		addEventToDB(newEvent, consultantId);
		setNewEvent({
			eventType: "",
			start: "",
			end: "",
			description: "",
			status: null,
			booked: false,
		});

		setIsLoading(true);
		return;
	}
	// console.log(consultantCalendarEvents);

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

	// function editBookableDayEvent() {}

	let calendarEmpty = emptyCalendarNotification
		? "Calendar is empty add Event"
		: "";

	function setFrequencyOfOccurence(e) {
		console.log(e.target.value);
		// clickedDate
	}

	return (
		<div className={classes.session_organiser}>
			{calendarEmpty}
			<div className={classes.calendar}>
				<ConsultantCalendar
					events={localEventArray}
					addBookableEventToDay={addBookableEventHandler}
					passCurrentDate={(date) => setCurrentDate(date)}
				/>
			</div>
			<div className={classes.calendar_inputs}>
				<h1>Schedule Availability</h1>
				<h2>set event for : {clickedDate}</h2>
				<Form>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="consultationType">
								<Form.Label>Event Type</Form.Label>
								{/* <Form.Control
									type="text"
									onChange={(e) =>
										setNewEvent({ ...newEvent, title: e.target.value })
									}
									required
									placeholder="Type of consultation"
								/> */}
								<Form.Control
									as="select"
									className="form-control"
									type="select"
									onChange={(e) =>
										setNewEvent({ ...newEvent, eventType: e.target.value })
									}
									required
									aria-label="Default select example"
									// id={`service-${index}`}
								>
									<option>select service</option>
									<option value="Phone call"> Phone call</option>
									<option value="Written feedback"> Written Feedback</option>
									<option value="Video call"> Video call</option>
									<option value="Visit to consultant">
										{" "}
										Visit to consultant
									</option>
									<option value="Consultant visitation">
										{" "}
										Consultant visitation
									</option>
								</Form.Control>
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
								<Form.Control
									as="select"
									onChange={(e) => setFrequencyOfOccurence(e)}
								>
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
						{isLoading ? "loading..." : "Submit"}
					</Button>
				</Form>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		consultantCalendarEvents:
			state.consultantState.consultantData.calendarEvents,
		eventAddedError: state.consultantState.consultantData.calendarEvents,
		isSubmitting: state.consultantState.consultantData.eventAddLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addEventToDB: (newEvent, consultantId) =>
			dispatch(
				addConsultantEventToDatabase(newEvent, "EAudRc5YajVorKygb0kZFGlfl163")
			),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AvailabilityOrganiser);
