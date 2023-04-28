import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container, Modal, Button } from "react-bootstrap";
import classes from "./availabilityOrganiser.module.css";
import ConsultantCalendar from "./consultantCalendar";
import { addConsultantEventToDatabase } from "../../../../../store/actions/consultantActions/consultantActions";
import { connect } from "react-redux";
import { format, add } from "date-fns";
import { generateId } from "../utils/utils";

function AvailabilityOrganiser(props) {
	let initialState = {
		eventType: "",
		start: "",
		end: "",
		description: "",
		status: {
			requesterId: null,
			requestAccepted: false,
		},
		eventId: generateId(20),

		booked: false,
	};
	const [newEvent, setNewEvent] = useState(initialState);

	const { addEventToDB, isSubmitting, auth, consultantInfo } = props;

	const [duration, setDuration] = useState(0);

	const [currentDate, setCurrentDate] = useState(
		// new Date(Date.now()).toISOString().split("T")[0]
		format(Date.now(), "yyyy-mm-dd")
	);
	const [isLoading, setIsLoading] = useState(false);

	// console.log(consultantCalendarInfo);
	let localEventArray;

	//the events are stored in the utc format in the database
	//they will then be converted to local time before being displayed in the calendar

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

	if (consultantInfo.calendarEvents.length > 0) {
		localEventArray = transformUTCtoLocalTime(consultantInfo.calendarEvents);
	}

	const [clickedDate, setClickedDate] = useState(currentDate);

	useEffect(() => {
		setIsLoading(isSubmitting);
	}, [isSubmitting]);

	//add event function
	function addEvent(e) {
		//add event to database

		if (
			newEvent.eventType === "" ||
			newEvent.start === "" ||
			newEvent.end === "" ||
			newEvent.description === ""
		)
			return;
		e.preventDefault();

		addEventToDB(newEvent, "EAudRc5YajVorKygb0kZFGlfl163");

		// addEventToDB(newEvent, auth.uid);
		setNewEvent({ ...initialState });
	}

	function addBookableEventHandler(start) {
		// console.log(start.startStr);
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
		// console.log(time, "time i inputed");

		let date = `${clickedDate.split("T")[0]}T${time}:00`;
		if (date.length > 18) {
			//it has to have the format 2023-03-30T16:30:00 before it can execute if not we get an error
			let startDateAndTime = new Date(date).toISOString();

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

	let calendarEmpty =
		consultantInfo.calendarEvents.length === 0
			? "Your calendar is empty, Start out by adding new availability openings "
			: "";

	function setFrequencyOfOccurence(e) {
		// console.log(e.target.value);
		let multiplier;
		// let additionalDates;
		// let frequency = e.target.value
		// switch (frequency) {
		// 	case frequency = 'weekly':
		// 		multiplier = 1;
		// 		additionalDates= 51
		// 		break;
		// 	case frequency = 'biweekly':
		// 		multiplier = 2;
		// 		additionalDates= 51
		// 		break;
		// 	case frequency = 'monthly':
		// 		multiplier = 4;
		// 		break;

		// 	default:
		// 		break;
		// }

		// for(let i = 0; i < )

		// add(newEvent.start, { weeks: multiplier });
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
				<h1>Schedule Availability Opening</h1>
				<h2>Add new open bookings for : {clickedDate}</h2>
				<Form>
					<Row>
						<Col>
							<Form.Group className="mb-3" controlId="consultationType">
								<Form.Label>Event Type</Form.Label>

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
									<option value="Chat"> Chat</option>
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
									required
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
									disabled
									as="select"
									onChange={(e) => setFrequencyOfOccurence(e)}
								>
									<option>Select availability frequency</option>
									<option value="none">none</option>
									<option value="weekly">Weekly</option>
									<option value="biweekly">Biweekly</option>
									{/* <option value="weekly"> Every 2 weeks</option> */}
									<option value="monthly">Monthly</option>
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
							required
						/>
					</Form.Group>
					<Button onClick={(e) => addEvent(e)} variant="primary" type="button">
						{isLoading ? "loading..." : "Submit"}
					</Button>
				</Form>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		eventAddedError: state.consultantState.consultantData.calendarEvents,
		isSubmitting: state.consultantState.eventAddLoading,
		auth: state.firebase.auth,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addEventToDB: (newEvent, consultantId) =>
			dispatch(
				addConsultantEventToDatabase(newEvent, consultantId)
				// addConsultantEventToDatabase(newEvent, auth.uid)
			),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AvailabilityOrganiser);
