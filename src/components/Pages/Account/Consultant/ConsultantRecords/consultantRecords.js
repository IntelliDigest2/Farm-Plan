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

	useEffect(() => {
		getCompletedBookings(auth.uid);
	}, []);

	useEffect(() => {
		setBookingsData(completedBookings);
	}, [completedBookings]);

	// ... Existing code ...

	let content;
	if (bookingsData && bookingsData.length > 0) {
		content = bookingsData.map((booking) => {
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
	} else {
		content = <div>You dont have any records yet 🙂</div>;
	}

	return (
		<>
			<h2>Booking Records</h2>
			<ListGroup>{content}</ListGroup>
		</>
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
