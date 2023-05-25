import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	fetchOtherBookings,
	fetchUserInfo,
} from "../../../../../store/actions/consultantActions/consultantActions";
import { parseISO, format, differenceInSeconds } from "date-fns";
import { Link } from "react-router-dom";
import {
	Form,
	Col,
	Button,
	Row,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";
import { generateId } from "../utils/utils";

export const ConsultantOtherBookings = (props) => {
	const { auth, getOtherBookings, otherBookings, profile } = props;

	const [showUserInfo, setShowUserInfo] = useState(false);
	const [locationLoading, setLocationLoading] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// fetchOtherBookings(auth.uid);
		getOtherBookings(auth.uid);
	}, []);

	function showVisitToConsultantLocation(booking) {
		return !showUserInfo ? (
			<Button
				onClick={(e) => {
					revealInformation(e, booking);
				}}
			>
				{locationLoading
					? "...loading"
					: "Click to reveal location information"}
			</Button>
		) : (
			<div>
				<div>consultee Information:</div>

				<div>
					Consultee Name : {`${userInfo.firstName} ${userInfo.lastName}`}{" "}
				</div>
				<div>Consultee Address : {userInfo.address}</div>
			</div>
		);
	}

	function RevealConsulteeInfo(booking) {
		return !showUserInfo ? (
			<Button
				onClick={(e) => {
					revealInformation(e, booking);
				}}
			>
				{loading ? "...loading" : "Click to reveal location information"}
			</Button>
		) : (
			<div>
				<div>consultee Information:</div>

				<div>
					Consultee Name : {`${userInfo.firstName} ${userInfo.lastName}`}{" "}
				</div>
			</div>
		);
	}

	useEffect(() => {
		console.log(otherBookings);
	}, [otherBookings]);

	function genereateRandomLink(booking) {
		// Math.floor(

		let callDuration =
			differenceInSeconds(parseISO(booking.end), parseISO(booking.start)) / 100;
		// );

		let id = generateId(6);

		const part1 = id.substring(0, 4);
		const part2 = id.substring(4);
		let callType = booking.eventType === "Video call" ? "xV" : "Lq";

		return `${part1}-${callDuration}-${callType}${part2}`;
	}

	function revealInformation(e, booking) {
		e.preventDefault();
		setLocationLoading(true);
		// console.log(booking, `this is the booking`);
		fetchUserInfo(booking.status.requesterId)
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

				let randomLink;

				switch (booking.eventType) {
					case "Video call":
						randomLink = genereateRandomLink(booking);
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
									to={`/call/${randomLink}`}
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
						randomLink = genereateRandomLink(booking);

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
									to={`/call/${randomLink}`}
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
								{RevealConsulteeInfo(booking)}
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

	return <div style={{ overflowY: "scroll", height: "730px" }}>{events}</div>;
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
