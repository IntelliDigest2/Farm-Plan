import React, { useEffect, useState } from "react";
import { fetchCompletedBookings } from "../../../../../store/actions/consultantActions/consultantActions";

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

function ConsultantRecord(props) {
	const [bookingsData, setBookingsData] = useState(null);

	const { completedBookings, auth, getCompletedBookings } = props;

	console.log(auth, `this is the auth`);
	useEffect(() => {
		getCompletedBookings(auth.uid);
	}, []);

	useEffect(() => {
		setBookingsData(completedBookings);
		console.log(completedBookings);
	}, [completedBookings]);

	let bookings = bookingsData?.map((booking) => {
		let startTime = format(parseISO(booking.start), "hh:mm a");
		let endTime = format(parseISO(booking.end), "hh:mm a");
		return (
			<ListGroupItem>
				<Col>Booking info:</Col>
				Booking Id: {booking.id}
				<Row>
					<Col>
						<div>Event date: {booking.date}</div>
					</Col>
					<Col>
						<div>Event type: {booking.eventType}</div>
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
		);
	});

	return (
		<div>
			<ListGroup>{bookings}</ListGroup>
		</div>
	);
}

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	completedBookings: state.consultantState.completedBookings,
	// profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getCompletedBookings: (uid) => {
			dispatch(fetchCompletedBookings(uid));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantRecord);
