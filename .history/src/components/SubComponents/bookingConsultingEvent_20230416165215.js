import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { bookEvent } from "../../store/actions/consultingActions";

export const BookingConsultingEvent = (props) => {
	const {
		openEvent,
		index,
		bookEvent,
		bookingLoading,
		consultantId,
		clickEvent,
	} = props;

	const bookConsultantEvent = (e, event, consultantId) => {
		//conveting the start and end time to isoString
		let eventToSend = {
			...event,
			start: new Date(event.start).toISOString(),
			end: new Date(event.end).toISOString(),
		};
		bookEvent(eventToSend, consultantId, auth.uid);
	};
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
					{openEvent.status.requesterId !== null
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
	auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch) => {
	return {
		bookEvent: (event, consultantId, userId) => {
			dispatch(bookEvent(event, consultantId, userId));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BookingConsultingEvent);
