import React from "react";
import { connect } from "react-redux";
import { Button, Card, Row, Col } from "react-bootstrap";
import ConsultantRequest from "./consultantRequest";

function ConsultantRequestsPage(props) {
	const { consultantCalendarEvents } = props;

	console.log(consultantCalendarEvents);

	let requests = consultantCalendarEvents.filter((request) => {
		return request.status !== null;
	});

	let requestList = requests.map((request) => {
		return (
			<ConsultantRequest requestType={} requestStart={} requestEnd={} />
		);
	});
	return (
		<div>
			<li>{requestList}</li>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		consultantCalendarEvents:
			state.consultantState.consultantData.calendarEvents,
	};
}
function mapDispatchToProps() {
	return {};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultantRequestsPage);
