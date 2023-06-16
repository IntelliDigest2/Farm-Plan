import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchOtherConsultingBookings } from "../../../store/actions/consultingActions";

import { fetchUserInfo } from "./../../../store/actions/consultantActions/consultantActions";

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
import { generateId } from "../../Pages/Account/Consultant/utils/utils";
import { markEventAsComplete } from "./../../../store/actions/consultingActions";

const handleCheckboxChange = (e, userId, consultantId, eventId) => {
	if (e.target.checked) {
		markEventAsComplete(userId, consultantId, eventId)
			.then((result) => {
				// console.log("completed");
			})
			.catch((err) => {
				console.log(err);
			});
	}
	// console.log(
	// 	e.target.checked,
	// 	// isChecked,
	// 	userId,
	// 	consultantId,
	// 	eventId,
	// 	`this is the event value`
	// );
};
const VisitConsultant = (props) => {
	const [showUserInfo, setShowUserInfo] = useState(false);
	const [isChecked, setIsChecked] = useState(false);

	const [userInfo, setUserInfo] = useState(null);

	const [locationLoading, setLocationLoading] = useState(false);
	const [loading, setLoading] = useState(false);

	const { booking, profile, auth } = props;

	function revealInformation(e, booking) {
		e.preventDefault();
		setLocationLoading(true);
		// console.log(booking, `this is the booking`);
		fetchUserInfo(booking.consultant.consultantId)
			.then((result) => {
				// console.log(result.data());
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
	}

	function RevealConsultantInfo(booking) {
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
				<div>consultant Information:</div>
				<div>
					Consultant Name : {`${userInfo.firstName} ${userInfo.lastName}`}{" "}
				</div>
				<div>Consultant Address : {userInfo.address}</div>
				`bulabah`
			</div>
		);
	}

	let startTime = format(parseISO(booking.event.start), "hh:mm a");
	let endTime = format(parseISO(booking.event.end), "hh:mm a");

	let date = booking.event.start.split("T")[0];

	return (
		<ListGroupItem>
			<Row>
				<Col>Booking info:</Col>
				<Col>
					{/* <Form.Group controlId="formBasicCheckbox"> */}
					<Form.Check
						checked={isChecked}
						onChange={(e) => {
							setIsChecked(!isChecked);
							handleCheckboxChange(
								e,
								auth.uid,

								booking.consultant.consultantId,
								booking.id
							);
						}}
						type="checkbox"
						label="Mark as complete"
					/>
					{/* </Form.Group> */}
				</Col>
			</Row>
			<Row>
				<Col>
					{" "}
					<div>Event type: {booking.event.eventType}</div>
				</Col>
				<Col>
					<div>Event date: {date}</div>
				</Col>
			</Row>

			{/* <div>Industry: {booking.industry}</div> */}
			<Row>
				<Col>
					<div>Start time: {startTime}</div>
				</Col>
				<Col>
					<div>End time: {endTime}</div>
				</Col>
			</Row>
			{RevealConsultantInfo(booking)}
		</ListGroupItem>
	);
};

const ConsultantIsVisiting = (props) => {
	const [showUserInfo, setShowUserInfo] = useState(false);
	const [isChecked, setIsChecked] = useState(false);

	const [locationLoading, setLocationLoading] = useState(false);

	const [userInfo, setUserInfo] = useState(null);

	const { booking, auth } = props;

	function revealInformation(e, booking) {
		e.preventDefault();
		setLocationLoading(true);
		// console.log(booking, `this is the booking`);
		fetchUserInfo(booking.consultant.consultantId)
			.then((result) => {
				// console.log(result.data());
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

	function showConsultant(booking) {
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
				<div>consultant Information:</div>

				<div>
					Consultant Name : {`${userInfo.firstName} ${userInfo.lastName}`}{" "}
				</div>
				{/* <div>Consult Address : {userInfo.address}</div> */}
			</div>
		);
	}

	let startTime = format(parseISO(booking.event.start), "hh:mm a");
	let endTime = format(parseISO(booking.event.end), "hh:mm a");

	let date = booking.event.start.split("T")[0];

	return (
		<ListGroupItem>
			<Row>
				<Col>Booking info:</Col>
				<Col>
					{/* <Form.Group controlId="formBasicCheckbox"> */}
					<Form.Check
						checked={isChecked}
						onChange={(e) => {
							setIsChecked(!isChecked);
							handleCheckboxChange(
								e,
								auth.uid,

								booking.consultant.consultantId,
								booking.id
							);
						}}
						type="checkbox"
						label="Mark as complete"
					/>
					{/* </Form.Group> */}
				</Col>
			</Row>

			<Row>
				<Col>
					<div>Event type: {booking.event.eventType}</div>
				</Col>
				<Col>
					<div>Event date: {date}</div>
				</Col>
			</Row>

			{/* <div>Industry: {booking.industry}</div> */}
			<Row>
				<Col>
					<div>Start time: {startTime}</div>
				</Col>
				<Col>
					<div>End time: {endTime}</div>
				</Col>
			</Row>
			{showConsultant(booking)}
		</ListGroupItem>
	);
};

function genereateRandomLink(booking) {
	// Math.floor(

	let callDuration =
		differenceInSeconds(
			parseISO(booking.event.end),
			parseISO(booking.event.start)
		) / 100;
	// );

	let id = generateId(6);

	const part1 = id.substring(0, 4);
	const part2 = id.substring(4);
	let callType = booking.event.eventType === "Video call" ? "xV" : "Lq";

	return `${part1}-${callDuration}-${callType}${part2}`;
}
const Call = (props) => {
	const { booking, auth } = props;
	let randomLink = genereateRandomLink(booking);
	const [isChecked, setIsChecked] = useState(false);

	let startTime = format(parseISO(booking.event.start), "hh:mm a");
	let endTime = format(parseISO(booking.event.end), "hh:mm a");
	let date = booking.event.start.split("T")[0];

	// console.log(booking, `this is the booking values`);
	return (
		<ListGroupItem>
			<Row>
				<Col>Booking info:</Col>
				<Col>
					{/* <Form.Group controlId="formBasicCheckbox"> */}
					<Form.Check
						checked={isChecked}
						onChange={(e) => {
							setIsChecked(!isChecked);
							handleCheckboxChange(
								e,
								auth.uid,

								booking.consultant.consultantId,
								booking.id
							);
						}}
						type="checkbox"
						label="Mark as complete"
					/>
					{/* </Form.Group> */}
				</Col>
			</Row>
			<Row>
				<Col>
					{" "}
					<div>Event type: {booking.event.eventType}</div>
				</Col>
				<Col>
					<div>Event date:{date}</div>
				</Col>
			</Row>

			{/* <div>Industry: {booking.industry}</div> */}
			<Row>
				<Col>
					<div>Start time: {startTime}</div>
				</Col>
				<Col>
					<div>End time: {endTime}</div>
				</Col>
			</Row>

			<div>Channel id for call: {booking.event.callId}</div>
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
};

const submitRequest = (e) => {
	e.preventDefault();
	//submitRequests
};

const WrittenFeedback = (props) => {
	const { booking, auth } = props;
	const [isChecked, setIsChecked] = useState(false);

	let startTime = format(parseISO(booking.event.start), "hh:mm a");
	let endTime = format(parseISO(booking.event.end), "hh:mm a");

	let date = booking.event.start.split("T")[0];

	return (
		<ListGroupItem>
			<Row>
				<Col>Booking info:</Col>
				<Col>
					{/* <Form.Group controlId="formBasicCheckbox"> */}
					<Form.Check
						checked={isChecked}
						onChange={(e) => {
							setIsChecked(!isChecked);
							handleCheckboxChange(
								e,
								auth.uid,

								booking.consultant.consultantId,
								booking.id
							);
						}}
						type="checkbox"
						label="Mark as complete"
					/>
					{/* </Form.Group> */}
				</Col>
			</Row>
			<Row>
				<Col>
					<div>Event type: {booking.event.eventType}</div>
				</Col>
				<Col>
					<div>Event date: {date}</div>
				</Col>
			</Row>

			{/* <div>Industry: {booking.industry}</div> */}
			<Row>
				<Col>
					<div>Start time: {startTime}</div>
				</Col>
				<Col>
					<div>End time: {endTime}</div>
				</Col>
			</Row>
			{booking.question ? <p>{booking.event.question}</p> : ""}
			{booking.question ? (
				<div>
					<Form.Label className="form-label">
						Type your Response here and click send
					</Form.Label>
					<Form.Control as="textarea" rows={4} type="text"></Form.Control>
					<Button onClick={(e) => submitRequest(e)}>Send</Button>{" "}
				</div>
			) : (
				""
			)}
		</ListGroupItem>
	);
};

export const ConsultingBookings = (props) => {
	const { auth, getOtherBookings, otherBookings, profile } = props;

	// const [showUserInfo, setShowUserInfo] = useState(false);
	// const [locationLoading, setLocationLoading] = useState(false);
	// const [userInfo, setUserInfo] = useState(null);
	// const [loading, setLoading] = useState(false);

	useEffect(() => {
		getOtherBookings(auth.uid);
	}, []);

	useEffect(() => {
		// console.log(otherBookings);
	}, [otherBookings]);

	// console.log(profile);

	let events = (
		<ListGroup>
			{otherBookings?.map((booking) => {
				let value;

				switch (booking.event.eventType) {
					case "Video call":
					case "Phone call":
						value = <Call booking={booking} auth={auth} />;
						break;

					case "Consultant visitation":
						value = <ConsultantIsVisiting booking={booking} auth={auth} />;
						break;
					case "Visit to consultant":
						value = <VisitConsultant booking={booking} auth={auth} />;
						break;
					case "Written feedback":
						value = <WrittenFeedback booking={booking} auth={auth} />;
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
	otherBookings: state.consultingState.otherBookings,
	profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => {
	return {
		getOtherBookings: (uid) => {
			dispatch(fetchOtherConsultingBookings(uid));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultingBookings);
