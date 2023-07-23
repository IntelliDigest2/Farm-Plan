import React, { useEffect, useState, useRef } from "react";
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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Modal } from "react-bootstrap";
import { submitNotification } from "./../../lib/Notifications";
import FormCheck from "./formCheck";

const VisitConsultant = (props) => {
	const [showUserInfo, setShowUserInfo] = useState(false);

	const [userInfo, setUserInfo] = useState(null);

	const [locationLoading, setLocationLoading] = useState(false);
	const [loading, setLoading] = useState(false);

	const { booking, profile, auth } = props;

	function revealInformation(e, booking) {
		e.preventDefault();
		setLocationLoading(true);
		fetchUserInfo(booking.consultant.consultantId)
			.then((result) => {
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
				{/* <Form.Check
					checked={isChecked}
					onChange={(e) => {
						setIsChecked(!isChecked);
						// handleShow();
					}}
					type="checkbox"
					label="Mark as complete"
				/> */}
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
					<FormCheck
						bookingInfo={{
							consultantId: booking.consultant.consultantId,
							bookingId: booking.id,
						}}
						auth={auth}
					/>
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
					<FormCheck
						bookingInfo={{
							consultantId: booking.consultant.consultantId,
							bookingId: booking.id,
						}}
						auth={auth}
					/>
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
	const {
		booking,
		auth,

		tickCheckBox,
	} = props;
	let randomLink = genereateRandomLink(booking);

	let startTime = format(parseISO(booking.event.start), "hh:mm a");
	let endTime = format(parseISO(booking.event.end), "hh:mm a");
	let date = booking.event.start.split("T")[0];

	function copyText(e, value) {
		e.preventDefault();

		navigator.clipboard.writeText(value);
		submitNotification("Success", "Text copied");
	}

	return (
		<ListGroupItem>
			<Row>
				<Col>Booking info:</Col>
				<Col>
					<FormCheck
						bookingInfo={{
							consultantId: booking.consultant.consultantId,
							bookingId: booking.id,
						}}
						tickCheckBox={tickCheckBox}
						auth={auth}
					/>
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

			<div>
				Channel id for call: {booking.event.callId}
				<span>
					<ContentCopyIcon
						titleAccess="copy"
						style={{ cursor: "pointer", marginLeft: "5px" }}
						onClick={(e) => copyText(e, booking.event.callId)}
					/>
				</span>
			</div>
			<div style={{ fontSize: "11px", color: "#95a000" }}>
				* channel id is required to make the call
			</div>
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
	const { booking, auth, openConfirmationModal } = props;
	const [isChecked, setIsChecked] = useState(false);

	let startTime = format(parseISO(booking.event.start), "hh:mm a");
	let endTime = format(parseISO(booking.event.end), "hh:mm a");

	let date = booking.event.start.split("T")[0];

	return (
		<ListGroupItem>
			<Row>
				<Col>Booking info:</Col>
				<Col>
					<FormCheck
						bookingInfo={{
							consultantId: booking.consultant.consultantId,
							bookingId: booking.id,
						}}
						auth={auth}
					/>
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

	useEffect(() => {
		getOtherBookings(auth.uid);
	}, []);

	useEffect(() => {
		// console.log(otherBookings, `this is the other bookings`);
	}, [otherBookings]);

	let events =
		otherBookings === null ? (
			"...loading"
		) : otherBookings && otherBookings.length === 0 ? (
			"You dont have any bookings"
		) : (
			<ListGroup>
				{otherBookings?.map((booking, index) => {
					let value;

					switch (booking.event.eventType) {
						case "Video call":
						case "Phone call":
							value = (
								<Call key={`booking-${index}`} booking={booking} auth={auth} />
							);
							break;

						case "Consultant visitation":
							value = (
								<ConsultantIsVisiting
									key={`booking-${index}`}
									booking={booking}
									auth={auth}
								/>
							);
							break;
						case "Visit to consultant":
							value = (
								<VisitConsultant
									key={`booking-${index}`}
									booking={booking}
									auth={auth}
								/>
							);
							break;
						case "Written feedback":
							value = (
								<WrittenFeedback
									key={`booking-${index}`}
									booking={booking}
									auth={auth}
								/>
							);
							break;

						default:
							break;
					}

					return value;
				})}
			</ListGroup>
		);

	return (
		<>
			<div style={{ overflowY: "scroll" }}>
				<div>
					<h2>Bookings</h2>
					{events}
				</div>
			</div>
		</>
	);
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
