import React, { useState, useEffect } from "react";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchConsultantForDate } from "../../../store/actions/consultingActions";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import classes from "./bookConsulting.module.css";
import BookingConsultingEvent from "./bookingConsultingEvent";

function BookConsulting(props) {
	const [consultationType, setConsultationType] = useState("");
	const [consultationDate, setConsultationDate] = useState(new Date());
	const [consultationEventType, setConsultationEventType] = useState("");
	const [result, setResult] = useState(null);
	const [isFetching, setIsFetching] = useState();
	const [showEventsForSelectedDay, setshowEventsForSelectedDay] =
		useState(false);
	const [clickedDay, setClickedDay] = useState(
		// new Date(Date.now()).toISOString()
		format(Date.now(), "yyyy-mm-dd")
	);

	const { consultingResult, getConsultants, isFetchingData, auth } = props;

	function chooseConsultationType(e) {
		setConsultationType(e.target.value);
	}

	const SearchForConsultant = (e) => {
		e.preventDefault();
		let newFormat = format(consultationDate, "yyyy-MM-dd");
		getConsultants(consultationType, newFormat, consultationEventType);
	};

	// useEffect(() => {
	// 	if (
	// 		consultationType !== "" &&
	// 		consultationDate !== "" &&
	// 		consultationEventType !== ""
	// 	) {

	// 	}
	// }, [
	// 	consultationDate,
	// 	consultationType,
	// 	consultationEventType,
	// 	getConsultants,
	// ]);

	useEffect(() => {
		if (consultingResult && consultingResult.length >= 0) {
			setResult(consultingResult);
		}

		setIsFetching(isFetchingData);
	}, [consultingResult, isFetchingData]);

	let displayResult;
	// console.log(result);

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

			return { ...ev, start: localStartEvent, end: localEndEvent };
		});

		return localTimeEvents;
	}

	if (result) {
		displayResult = result.map((event, index) => {
			// console.log(event);
			// function listAllDateEvent(start, end, allDays) {
			// 	setshowEventsForSelectedDay(true);
			// 	setClickedDay(start.startStr);
			// }

			// let formatedEvents = transformUTCtoLocalTime(consultant.calendarEvents);

			// let dayEvents = formatedEvents.find((event, _) => {

			// 	return event.start.split("T")[0] === clickedDay;
			// });

			// let dayEvents = formatedEvents.filter((event) => {
			// 	return event.start.split("T")[0] === clickedDay && !event.booked;
			// });

			// let displayDayEvents = dayEvents.map((event, i) => {
			// 	return (
			// 	);
			// });

			return (
				<div key={index}>
					<BookingConsultingEvent event={event} key={`event-${index}`} />
				</div>
			);
		});
	}

	let resultContent = !result ? (
		<div>
			<p>Result of available consultants will appear here</p>
		</div>
	) : result.length === 0 ? (
		<div>
			<p>there are no consultants openings available for the selected date</p>
		</div>
	) : (
		displayResult
	);

	// console.log(auth.uid, "this is the uid for the user that is consulting");
	// let content = isFetching ? <div>...</div> : resultContent;

	return (
		<div>
			<h3>Search for consultant</h3>
			<div>
				<p>select consultant specialty and date</p>
			</div>
			<Row style={{ alignItems: "baseline" }}>
				<Col>
					<Form.Group className="form-group">
						<Form.Label className="form-label">
							Choose field of consultation
						</Form.Label>
						<Form.Control
							as="select"
							className="form-control"
							onChange={chooseConsultationType}
						>
							<option>Select</option>
							<option>Dietician</option>
							<option>Nutrition</option>
							<option>Food and Beverage</option>
							<option>Food Safety</option>
							<option>Sustainable Food Packaging</option>
							<option>Aquaculture</option>
							<option>Horticulture</option>
							<option>Agro-Feed</option>
							<option>Account and Legal</option>
							<option>Supply Chain</option>
						</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="form-group">
						<Form.Label className="form-label">
							pick date for consultation
						</Form.Label>
						<DatePicker
							selected={consultationDate}
							onChange={(date) => setConsultationDate(date)}
							// dateFormat="dd/m/yyyy"
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="form-group">
						<Form.Label className="form-label">
							pick type of consultation
						</Form.Label>
						<Form.Control
							as="select"
							className="form-control"
							type="select"
							onChange={(e) => setConsultationEventType(e.target.value)}
							required
							aria-label="Default select example"
							// id={`service-${index}`}
						>
							<option>select service</option>
							<option value="Written feedback"> Written Feedback</option>
							<option value="Chat"> Chat</option>
							<option value="Phone call"> Phone call</option>
							<option value="Video call"> Video call</option>
							<option value="Visit to consultant"> Visit to consultant</option>
							<option value="Consultant visitation">
								{" "}
								Consultant visitation
							</option>
						</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Button type="button" onClick={(e) => SearchForConsultant(e)}>
						Search
					</Button>
				</Col>
			</Row>
			<div>{resultContent}</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		consultingResult: state.consultingState.consultingData,
		isFetchingData: state.consultingState.isFetching,
		auth: state.firebase.auth,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getConsultants: (consultationField, date, chatType) => {
			dispatch(fetchConsultantForDate(consultationField, date, chatType));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookConsulting);
