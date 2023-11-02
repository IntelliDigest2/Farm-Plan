import React, { useState, useEffect, useRef } from "react";
import { Form, Row, Col, Container, Modal, Button } from "react-bootstrap";
import classes from "./availabilityOrganiser.module.css";
import ConsultantCalendar from "./consultantCalendar";
import { addConsultantEventToDatabase } from "../../../../../store/actions/consultantActions/consultantActions";
import { connect } from "react-redux";
import { format, add } from "date-fns";
import { generateId } from "../utils/utils";
import {
	countryNames,
	countries,
} from "./../../../../../config/countries.json";
import { submitNotification } from "./../../../../lib/Notifications";

function AvailabilityOrganiser(props) {
	let initialState = {
		eventType: "",
		start: "",
		end: "",
		description: null,
		status: {
			requesterId: null,
			requestAccepted: false,
		},

		// eventId: generateId(20),

		booked: false,
	};
	const [newEvent, setNewEvent] = useState(initialState);
	const [showModal, setShowModal] = useState();
	const [currency, setCurrency] = useState(null);
	const formRef = useRef(null);

	const {
		addEventToDB,
		isSubmitting,
		auth,
		consultantInfo,
		consultantCalendar,
	} = props;

	const [duration, setDuration] = useState(0);

	const [currentDate, setCurrentDate] = useState(
		// new Date(Date.now()).toISOString().split("T")[0]
		format(Date.now(), "yyyy-MM-dd")
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

			return {
				...ev,
				start: localStartEvent,
				end: localEndEvent,
				title: ev.eventType,
			};
		});

		return localTimeEvents;
	}

	const [clickedDate, setClickedDate] = useState(currentDate);

	useEffect(() => {
		setIsLoading(isSubmitting);
	}, [isSubmitting]);

	useEffect(() => {
		// console.log(newEvent);
	}, [newEvent]);

	let options;
	if (consultantInfo) {
		options = consultantInfo.services.map(({ _, service }, index) => {
			return (
				<option key={`opt-${index}`} value={service}>
					{" "}
					{`${service}`}
				</option>
			);
		});
	}

	//add event function
	function addEvent(e) {
		//add event to database

		// newEvent.end === "" ||
		// newEvent.description === ""
		if (newEvent.eventType === "" || newEvent.start === "") {
			return;
		}
		e.preventDefault();

		let endDate = calculateEndTime(duration);

		// const newEventDay = newEvent.start.split("T")[0];

		// console.log(currency, `this is the currency`);
		setIsLoading(true);
		addEventToDB(
			{ ...newEvent, end: endDate },
			auth.uid,
			consultantInfo,
			currency
		)
			.then((resp) => {
				submitNotification(
					"Success",
					"Event opening successfully added to calendar"
				);
				setIsLoading(false);
			})
			.catch((err) => {
				submitNotification(
					"Error",
					"Something went wrong, check your inputs and try again"
				);
				setIsLoading(false);
			});

		formRef.current.reset();
	}

	console.log(props.profile, `this is the user profile`);
	const getCountryCurrency = (country) => {
		let cc = countries.country.find((c) => c.countryName === country);
		return cc;
	};

	useEffect(() => {
		if (props.profile.isLoaded) {
			let countryObject = getCountryCurrency(props.profile.country);
			setCurrency(countryObject.currencyCode);
			console.log(countryObject.currencyCode, `this is the currency code`);
		}
	}, [props.profile]);

	// console.log(`availabilty Second`);

	function addBookableEventHandler(start) {
		// console.log(start.startStr);
		setClickedDate(start.startStr);
		setShowModal(true);
	}

	function calculateEndTime(duration) {
		let date = new Date(`${newEvent.start}`);

		let endDate = new Date(
			date.getTime() + parseInt(duration) * 60000
		).toISOString();

		return endDate;
	}

	function setStartTime(e) {
		let time = e.target.value;
		// console.log(time, "time i inputed");

		let date = `${clickedDate.split("T")[0]}T${time}:00`;
		// console.log(date, `this is the selected date`);
		if (date.length > 18) {
			//it has to have the format 2023-03-30T16:30:00 before it can execute if not we get an error
			let startDateAndTime = new Date(date).toISOString();

			// if (newEvent.end !== "") {
			// 	let endDate = calculateEndTime(
			// 		new Date(`${startDateAndTime}`),
			// 		duration
			// 	);

			// 	setNewEvent({ ...newEvent, end: endDate, start: startDateAndTime });
			// } else {
			setNewEvent({ ...newEvent, start: startDateAndTime });
			// }
		}
	}

	function setDurationTime(e) {
		if (e.target.value !== "") {
			let duration = e.target.value;
			setDuration(duration);
		}
		return;
		//
	}

	const handleFormClose = () => setShowModal(false);

	// function editBookableDayEvent() {}

	// console.log(consultantCalendar);
	let calendarEmpty;
	if (consultantCalendar) {
		calendarEmpty =
			consultantCalendar.length === 0
				? "Your calendar is empty, Start out by adding new availability openings "
				: "";

		if (consultantCalendar.length > 0) {
			localEventArray = transformUTCtoLocalTime(consultantCalendar);
		}
	}
	let modal = (
		<Modal
			show={showModal}
			onHide={handleFormClose}
			size="lg"
			aria-labelledby="edit meal"
			centered
		>
			<Modal.Header closeButton>
				{/* <Modal.Title id="add-meal">{t("description.order")}</Modal.Title> */}
			</Modal.Header>
			<Modal.Body>
				<div className={classes.calendar_inputs}>
					<h1>Schedule Availability Opening</h1>
					<h2>Add new open bookings for : {clickedDate}</h2>
					<Form ref={formRef}>
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
										{}

										{options}
									</Form.Control>
								</Form.Group>
							</Col>

							<Col>
								<Form.Group className="mb-3" controlId="time">
									<Form.Label>Start Time</Form.Label>
									<Form.Control
										type="time"
										// placeholder="Password"
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
										onChange={(e) => setDurationTime(e)}
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

						<Form.Group
							className="mb-3"
							controlId="exampleForm.ControlTextarea1"
						>
							<Form.Label>
								Any additional note or Requirements (optional)
							</Form.Label>
							<Form.Control
								onChange={(e) =>
									setNewEvent({ ...newEvent, description: e.target.value })
								}
								as="textarea"
								rows={3}
								// required
							/>
						</Form.Group>
						<Button
							onClick={(e) => addEvent(e)}
							variant="primary"
							type="button"
						>
							{isLoading ? "loading..." : "Submit"}
						</Button>
					</Form>
				</div>
			</Modal.Body>
		</Modal>
	);

	let mainContent = consultantCalendar ? (
		<>
			{calendarEmpty}
			<p>Click on the date you would like to add an opening to</p>
			<div className={classes.calendar}>
				<ConsultantCalendar
					events={localEventArray}
					addBookableEventToDay={addBookableEventHandler}
					passCurrentDate={(date) => setCurrentDate(date)}
				/>
			</div>

			{modal}
		</>
	) : (
		"loading..."
	);

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
			<h2>Calendar</h2>
			{mainContent}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		// eventAddedError: state.consultantState.consultantData.calendarEvents,
		isSubmitting: state.consultantState.eventAddLoading,
		auth: state.firebase.auth,
		consultantInfo: state.consultantState.consultantData,
		profile: state.firebase.profile,
		// consultantCalendar: state.consultantState.consultantCalendar,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addEventToDB: (newEvent, consultantId, consultantInfo, currency) =>
			dispatch(
				addConsultantEventToDatabase(
					newEvent,
					consultantId,
					consultantInfo,
					currency
				)
			),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AvailabilityOrganiser);
