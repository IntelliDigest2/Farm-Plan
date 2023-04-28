import React, { useState, useEffect } from "react";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchConsultantData } from "../../store/actions/consultingActions";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import classes from "./bookConsulting.module.css";
import { bookEvent } from "../../store/actions/consultingActions";
import BookingConsultingEvent from "./bookingConsultingEvent";

function BookConsulting(props) {
	const [consultationType, setConsultationType] = useState("");
	const [consultationDate, setConsultationDate] = useState(new Date());
	const [result, setResult] = useState(null);
	const [isFetching, setIsFetching] = useState();
	const [showEventsForSelectedDay, setshowEventsForSelectedDay] =
		useState(false);
	const [clickedDay, setClickedDay] = useState(
		// new Date(Date.now()).toISOString()
		format(Date.now(), "yyyy-mm-dd")
	);

	const {
		consultingResult,
		getConsultants,
		isFetchingData,
		bookEvent,
		auth,
		bookingLoading,
	} = props;

	console.log(auth.uid);

	function chooseConsultationType(e) {
		setConsultationType(e.target.value);

		// console.log();
	}

	useEffect(() => {
		if (consultationType) {
			let newFormat = format(consultationDate, "yyyy-MM-dd");
			getConsultants(consultationType, newFormat);
		}
	}, [consultationDate, consultationType, getConsultants]);

	useEffect(() => {
		if (consultingResult && consultingResult.length >= 0) {
			setResult(consultingResult);
		}

		setIsFetching(isFetchingData);
		// console.log(consultingResult, "this is the consulting result");
	}, [consultingResult, isFetchingData]);

	const bookConsultantEvent = (e, event, consultantId) => {
		//conveting the start and end time to isoString
		let eventToSend = {
			...event,
			start: new Date(event.start).toISOString(),
			end: new Date(event.end).toISOString(),
		};
		bookEvent(eventToSend, consultantId, auth.uid);
	};

	// console.log(result);

	let displayResult;

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

	if (result) {
		displayResult = result.map(({ consultant, consultantId }, index) => {
			// console.log(consultant, "this is the new created one");
			// const{}
			// console.log(consultant, "this shows the new thing i added");
			function listAllDateEvent(start, end, allDays) {
				// console.log(start.startStr);
				setshowEventsForSelectedDay(true);
				setClickedDay(start.startStr);

				// console.log(clickedDate);
			}

			let formatedEvents = transformUTCtoLocalTime(consultant.calendarEvents);

			// let dayEvents = formatedEvents.find((event, _) => {

			// 	return event.start.split("T")[0] === clickedDay;
			// });

			let dayEvents = formatedEvents.filter((event) => {
				return event.start.split("T")[0] === clickedDay && !event.booked;
			});

			// console.log(dayEvents);

			let displayDayEvents = dayEvents.map((event, i) => {
				// console.log(event);
				return (
					<BookingConsultingEvent
						bookEvent={(e, event, consultantId) => {
							bookConsultantEvent(e, event, consultantId);
						}}
						consultantId={consultantId}
						event={event}
						index={i}
					/>
				);
			});

			console.log(displayDayEvents);

			return (
				<div key={index}>
					<div>{consultant.fullName}</div>
					<div>{consultant.summary}</div>
					<div>years of experience : {consultant.experience}</div>

					<hr></hr>
					<div className={classes.consultant_calendar}>
						<Fullcalendar
							// ref={calendarRef}
							plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
							initialView={"dayGridMonth"}
							headerToolbar={{
								start: "today prev,next",
								center: "title",
								end: "dayGridMonth timeGridDay",
							}}
							// selectMirror={true}
							// selectHelper={true}
							selectable={true}
							events={formatedEvents}
							select={(start, end, allDays) => {
								listAllDateEvent(start, end, allDays);
							}}
						></Fullcalendar>
					</div>
					{showEventsForSelectedDay && displayDayEvents.length > 0 ? (
						<div>
							<div>date : {clickedDay}</div>
							<div>
								<div>{displayDayEvents}</div>
							</div>
						</div>
					) : (
						`click day on calendar to see booking Openings`
					)}
				</div>
			);
		});
	}

	let resultContent = !result ? (
		<div>
			<p>select consultant specialty and date</p>
		</div>
	) : result.length === 0 ? (
		<div>
			<p>there are no consultants openings available for the selected date</p>
		</div>
	) : (
		displayResult
	);

	// let content = isFetching ? <div>...</div> : resultContent;

	return (
		<div>
			<h1>Search for consultant</h1>
			<Row>
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
		getConsultants: (consultationField, date) => {
			dispatch(fetchConsultantData(consultationField, date));
		},
		bookEvent: (event, consultantId, userId) => {
			dispatch(bookEvent(event, consultantId, userId));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookConsulting);
