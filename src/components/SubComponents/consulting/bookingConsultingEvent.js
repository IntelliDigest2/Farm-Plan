import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { bookEvent } from "../../../store/actions/consultingActions";
import { format, parseISO } from "date-fns";

export const BookingConsultingEvent = (props) => {
	const [isBookingLoading, setisBookingLoading] = useState(false);
	const {
		openEvent,
		index,
		// bookEvent,
		bookingLoading,
		consultantId,
		// consultantName,
		event,

		auth,
	} = props;

	let startTime = format(parseISO(event.start), "hh:mm a");
	let endTime = format(parseISO(event.end), "hh:mm a");

	// console.log(event);

	// useEffect(() => {
	// 	if (!bookingLoading) {
	// 		setisBookingLoading(false);
	// 	}
	// 	// setisBookingLoading(bookingLoading);
	// }, [bookingLoading]);

	const bookConsultantEvent = (e, event, consultantId) => {
		setisBookingLoading(true);
		bookEvent(event, auth.uid)
			.then((result) => {
				setisBookingLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setisBookingLoading(false);
			});
	};

	return (
		<>
			<div>
				<div>Event Type: {event.eventType}</div>
				<div>
					<h4>Consultant Information</h4>
					{/* <p> Consultant Summary: {event.consultant.summary}</p> */}
					<p> Consultant Name: {event.consultant.name}</p>
					<p>Years of experience: {event.consultant.experience}</p>
				</div>
				<div> Additional information: {event.description}</div>
				<div>{`Price : $${event.price}`}</div>

				<Row>
					<Col>
						<div>Start Time: {startTime}</div>
					</Col>
					<Col>
						<div>End Time: {endTime}</div>
					</Col>
				</Row>

				<Button
					onClick={(e) => bookConsultantEvent(e, event, consultantId)}
					disabled={event.status.requesterId !== null ? true : false}
				>
					{event.status.requesterId !== null
						? "Requested"
						: isBookingLoading
						? "booking..."
						: "Book Opening"}
				</Button>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	// bookingLoading: state.consultingState.isBooking,
	auth: state.firebase.auth,
});

const mapDispatchToProps = (dispatch) => {
	return {
		// bookEvent: (event, userId) => {
		// 	dispatch(bookEvent(event, userId));
		// },
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BookingConsultingEvent);
