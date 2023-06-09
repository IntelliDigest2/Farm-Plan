import React, { useState, useEffect } from "react";
import { Form, Row, Col, Accordion } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchConsultantData } from "../../store/actions/consultingActions";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function BookConsulting(props) {
	const [consultationType, setConsultationType] = useState("");
	const [consultationDate, setConsultationDate] = useState(new Date());
	const [result, setResult] = useState(null);
	const [isFetching, setIsFetching] = useState();

	const { consultingResult, getConsultants, isFetchingData } = props;

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
		console.log(consultingResult, "this is the consulting result");
	}, [consultingResult, isFetchingData]);

	let displayResult = result.map((consultant, index) => {
		return (
			<div key={index}>
				{consultant.fullName}
				{consultant.}
				<hr></hr>
				<div>
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
					events={consultant.events}
					// select={(start, end, allDays) => {
					// 	addBookableEventToDay(start, end, allDays);
					// }}
				></Fullcalendar>
				</div>
				
			</div>
		);
	});

	let me = !result ? (
		<div>
			<p>select consultant specialty and date</p>
		</div>
	) : result.length === 0 ? (
		<div>
			<p>there are no consultants availble </p>
		</div>
	) : (
		displayResult
	);

	let content = isFetching ? <div>...</div> : me;

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
			<div>{content}</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		consultingResult: state.consultingState.consultingData,
		isFetchingData: state.consultingState.isFetching,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getConsultants: (consultationField, date) => {
			dispatch(fetchConsultantData(consultationField, date));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookConsulting);
