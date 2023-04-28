import React from "react";
import { connect } from "react-redux";
import ConsultantRequest from "./consultantRequest";

function ConsultantRequestsPage(props) {
	const { consultantCalendarEvents } = props;

	console.log(consultantCalendarEvents);

	let requests = consultantCalendarEvents.filter((event) => {
		return event.status.requesterId !== null;
	});

	// let requestList = requests.map((request) => {
	// 	return (
	// 		<ConsultantRequest
	// 			requestType={consultantCalendarEvents.eventType}
	// 			requestStart={consultantCalendarEvents.start}
	// 			requestEnd={consultantCalendarEvents.end}
	// 		/>
	// 	);
	// });

	return <div>{/* <li>{requestList}</li> */}</div>;
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
