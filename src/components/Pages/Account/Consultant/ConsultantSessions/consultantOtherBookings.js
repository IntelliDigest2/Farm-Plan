import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	fetchOtherBookings,
	fetchUserLocation,
} from "../../../../../store/actions/consultantActions/consultantActions";
import { parseISO, format } from "date-fns";
import { Link } from "react-router-dom";
import {
	Form,
	Col,
	Button,
	Row,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";

export const ConsultantOtherBookings = (props) => {
	const { auth, getOtherBookings, otherBookings, profile, fetchLocation } =
		props;

	const [showUserInfo, setShowUserInfo] = useState(false);
	const [locationLoading, setLocationLoading] = useState(false);
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		// fetchOtherBookings(auth.uid);
		getOtherBookings(auth.uid);
	}, []);

	function showVisitToConsultantLocation(booking) {
		return !showUserInfo ? (
			<Button
				onClick={(e) => {
					revealLocation(e, booking);
				}}
			>
				{locationLoading
					? "...loading"
					: "Click to reveal location information"}
			</Button>
		) : (
			<div>
				<div>consultee Information:</div>

				<div>username : {`${userInfo.firstName} ${userInfo.lastName}`} </div>
				<div>user Address : {userInfo.address}</div>
			</div>
		);
	}

	useEffect(() => {
		console.log(otherBookings);
	}, [otherBookings]);

	function revealLocation(e, booking) {
		e.preventDefault();
		setLocationLoading(true);
		// console.log(booking, `this is the booking`);
		fetchUserLocation(booking.status.requesterId)
			.then((result) => {
				console.log(result.data());
				setUserInfo(result.data());
				setLocationLoading(false);
				setShowUserInfo(true);
			})
			.catch((error) => {
				// Handle error, if any
				console.error("Error:", error);
				// Reset loading state
				setLocationLoading(false);
			});
		//revealUserLocation
	}

	const submitRequest = (e) => {
		e.preventDefault();
		//submitRequests
	};

	console.log(profile.consultant);

	let events = (
		<ListGroup>
			{otherBookings?.map((booking) => {
				let startTime = format(parseISO(booking.start), "hh:mm a");
				let endTime = format(parseISO(booking.end), "hh:mm a");
				let value;
				switch (booking.eventType) {
					case "Video call":
						value = (
							<ListGroupItem>
								<p>Booking info</p>
								<Row>
									<Col>
										{" "}
										<div>Event type: {booking.eventType}</div>
									</Col>
									<Col>
										<div>Event date: {booking.date}</div>
									</Col>
								</Row>

								<div>Industry: {booking.industry}</div>
								<Row>
									<Col>
										<div>Start time: {startTime}</div>
									</Col>
									<Col>
										<div>End time: {endTime}</div>
									</Col>
								</Row>
								<div>Channel id for video call: {booking.callId}</div>
								<Link
									to="/video-call"
									target="_blank"
									rel="noopener noreferrer"
								>
									{" "}
									Go to call
								</Link>
							</ListGroupItem>
						);
						break;
					case "Phone call":
						value = (
							<ListGroupItem>
								<p>Booking info</p>
								<Row>
									<Col>
										{" "}
										<div>Event type: {booking.eventType}</div>
									</Col>
									<Col>
										<div>End time:{booking.date}</div>
									</Col>
								</Row>

								<div>Industry: {booking.industry}</div>
								<Row>
									<Col>
										<div>Start time: {startTime}</div>
									</Col>
									<Col>
										<div>End time: {endTime}</div>
									</Col>
								</Row>

								<div>Channel id for call: {booking.callId}</div>
								<Link
									to="/video-call"
									target="_blank"
									rel="noopener noreferrer"
								>
									{" "}
									Go to call
								</Link>
							</ListGroupItem>
						);
						break;
					case "Consultant visitation":
						value = (
							<ListGroupItem>
								<p>Booking info:</p>
								<Row>
									<Col>
										{" "}
										<div>Event type: {booking.eventType}</div>
									</Col>
									<Col>
										<div>End time: {booking.date}</div>
									</Col>
								</Row>

								<div>Industry: {booking.industry}</div>
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
						break;
					case "Visit to consultant":
						value = (
							<ListGroupItem>
								<p>Booking info:</p>
								<Row>
									<Col>
										<div>Event type: {booking.eventType}</div>
									</Col>
									<Col>
										<div>End time: {booking.date}</div>
									</Col>
								</Row>

								<div>Industry: {booking.industry}</div>
								<Row>
									<Col>
										<div>Start time: {startTime}</div>
									</Col>
									<Col>
										<div>End time: {endTime}</div>
									</Col>
								</Row>
								{showVisitToConsultantLocation(booking)}
							</ListGroupItem>
						);
						break;
					case "Written feedback":
						value = (
							<ListGroupItem>
								<p>Booking info:</p>
								<Row>
									<Col>
										<div>Event type: {booking.eventType}</div>
									</Col>
									<Col>
										<div>Event date: {booking.date}</div>
									</Col>
								</Row>

								<div>Industry: {booking.industry}</div>
								<Row>
									<Col>
										<div>Start time: {startTime}</div>
									</Col>
									<Col>
										<div>End time: {endTime}</div>
									</Col>
								</Row>
								{booking.question ? <p>{booking.question}</p> : ""}
								{booking.question ? (
									<div>
										<Form.Label className="form-label">
											Type your Response here and click send
										</Form.Label>
										<Form.Control
											as="textarea"
											rows={4}
											type="text"
										></Form.Control>
										<Button onClick={(e) => submitRequest(e)}>Send</Button>{" "}
									</div>
								) : (
									""
								)}
							</ListGroupItem>
						);
						break;

					default:
						break;
				}

				return value;
			})}
		</ListGroup>
	);

	return <div>{events}</div>;
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	otherBookings: state.consultantState.otherBookings,
	profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getOtherBookings: (uid) => {
			dispatch(fetchOtherBookings(uid));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultantOtherBookings);
