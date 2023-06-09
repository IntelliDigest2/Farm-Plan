import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

export const BookingConsultingEvent = (props) => {
	const { openEvent, index, bookingLoading, consultantId, clickEvent } = props;
	return (
		<>
			<div>
				<div>Event Type: {openEvent.eventType}</div>
				<div> Description: {openEvent.description}</div>

				<div>Event Start: {openEvent.start.split("T")[1]}</div>
				<div> Event end: {openEvent.end.split("T")[1]}</div>
				<Button
					onClick={(e) => clickEvent(e, openEvent, consultantId)}
					disabled={openEvent.status !== null ? true : false}
				>
					{openEvent.status !== null
						? "Requested"
						: bookingLoading
						? "booking..."
						: "Book Opening"}
				</Button>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	bookingLoading: state.consultingState.isBooking,
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BookingConsultingEvent);
