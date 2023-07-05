import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import {
	Form,
	Col,
	Button,
	Row,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";
import { parseISO, format } from "date-fns";
import { fetchConsultingCompletedBookings } from "./../../../store/actions/consultingActions";

function ConsultingRecords(props) {
	const [bookingsData, setBookingsData] = useState(null);

	const { completedBookings, auth, getCompletedBookings } = props;

	// console.log(auth, `this is the auth`);
	useEffect(() => {
		getCompletedBookings(auth.uid);
	}, []);

	useEffect(() => {
		setBookingsData(completedBookings);
		console.log(completedBookings, `this is the completedbookings`);
	}, [completedBookings]);

	let bookings =
		completedBookings && completedBookings.length === 0
			? "You do not have any Records"
			: bookingsData?.map((booking) => {
					let startTime = format(parseISO(booking.event.start), "hh:mm a");
					let endTime = format(parseISO(booking.event.end), "hh:mm a");

					let date = booking.event.start.split("T")[0];
					return (
						<ListGroup>
							<ListGroupItem>
								<Col>Booking info:</Col>
								Booking Id: {booking.id}
								<Row>
									<Col>
										<div>Event date: {date}</div>
									</Col>
									<Col>
										<div>Event type: {booking.event.eventType}</div>
									</Col>
								</Row>
								<Row>
									<Col>
										<div>Start time: {startTime}</div>
									</Col>
									<Col>
										<div>End time: {endTime}</div>
									</Col>
								</Row>
							</ListGroupItem>
						</ListGroup>
					);
			  });

	return (
		<div>
			<h2>Bookings Records</h2>
			{bookings}
		</div>
	);
}

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	completedBookings: state.consultingState.completedBookings,
	// profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getCompletedBookings: (uid) => {
			dispatch(fetchConsultingCompletedBookings(uid));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultingRecords);
