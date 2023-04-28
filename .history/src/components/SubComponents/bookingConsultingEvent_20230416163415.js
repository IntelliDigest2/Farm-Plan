import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

export const BookingConsultingEvent = (props) => {
	const { bookingLoading } = props;
	return (
		<>
			<div key={`event-${index}`}>
				<div>Event Type: {event.eventType}</div>
				<div> Description: {event.description}</div>

				<div>Event Start: {event.start.split("T")[1]}</div>
				<div> Event end: {event.end.split("T")[1]}</div>
				<Button
					onClick={(e) => bookConsultantEvent(e, event, consultantId)}
					disabled={event.status !== null ? true : false}
				>
					{event.status !== null
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
