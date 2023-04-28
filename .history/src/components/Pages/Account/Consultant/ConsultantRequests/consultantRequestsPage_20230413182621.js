import React from "react";
import ConsultantRequest from "./consultantRequest";
import { connect } from "react-redux";

function ConsultantRequestsPage(props) {
	const { consultantCalendarEvents } = props;

	let requests = consultantCalendarEvents.filter((request) => {
		return request.status === "requested";
	});
	return (
		<div>
			<ConsultantRequest />
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
