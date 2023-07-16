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
import { markEventAsComplete } from "./../../../store/actions/consultingActions";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Modal } from "react-bootstrap";
import { submitNotification } from "./../../lib/Notifications";

const FormCheck = (props) => {
	const [isChecked, setIsChecked] = useState(false);
	const { handleShow, bookingInfo, dataRef, checkedRef, tickCheckBox } = props;

	useEffect(() => {
		if (isChecked === true) {
			dataRef.current = bookingInfo;
			handleShow();
		}
	}, [isChecked]);

	useEffect(() => {
		if (tickCheckBox) {
			setIsChecked(false);
		}
	}, [tickCheckBox]);

	console.log(tickCheckBox, `this checks the tickedCheckbox status`);

	return (
		<Form.Check
			checked={isChecked}
			onChange={(e) => {
				setIsChecked(!isChecked);
			}}
			ref={checkedRef}
			type="checkbox"
			label="Mark as complete"
		/>
	);
};

const handleCheckboxChange = (e, userId, consultantId, eventId) => {
	if (e.target.checked) {
		// markEventAsComplete(userId, consultantId, eventId)
		// 	.then((result) => {
		// 		// console.log("completed");
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	}
	console.log(
		e.target.checked,
		// isChecked,
		userId,
		consultantId,
		eventId,
		`this is the event value`
	);
	console.log(`clicked`);
};
const VisitConsultant = (props) => {
	const [showUserInfo, setShowUserInfo] = useState(false);
	const [isChecked, setIsChecked] = useState(false);

	const [userInfo, setUserInfo] = useState(null);

	const [locationLoading, setLocationLoading] = useState(false);
	const [loading, setLoading] = useState(false);

	const { booking, profile, auth, openConfirmationModal } = props;

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
					{/* <Form.Group controlId="formBasicCheckbox"> */}

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

	const { booking, auth, openConfirmationModal } = props;

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
					{/* <Form.Check
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
					/> */}
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
	const {
		booking,
		auth,
		openConfirmationModal,
		dataRef,
		checkedRef,
		tickCheckBox,
	} = props;
	let randomLink = genereateRandomLink(booking);
	const [isChecked, setIsChecked] = useState(false);

	let startTime = format(parseISO(booking.event.start), "hh:mm a");
	let endTime = format(parseISO(booking.event.end), "hh:mm a");
	let date = booking.event.start.split("T")[0];

	function copyText(e, value) {
		e.preventDefault();

		navigator.clipboard.writeText(value);
		submitNotification("Success", "Text copied");
	}

	// console.log(booking, `this is the booking values`);
	return (
		<ListGroupItem>
			<Row>
				<Col>Booking info:</Col>
				<Col>
					{/* <Form.Group controlId="formBasicCheckbox"> */}
					{/* <Form.Check
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
					/> */}
					{/* </Form.Group> */}
					<FormCheck
						bookingInfo={{
							consultantId: booking.consultant.consultantId,
							bookingId: booking.id,
						}}
						tickCheckBox={tickCheckBox}
						handleShow={openConfirmationModal}
						dataRef={dataRef}
						checkedRef={checkedRef}
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
					{/* <Form.Group controlId="formBasicCheckbox"> */}
					{/* <Form.Check
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
					/> */}
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
	const [showModal, setShowModal] = useState(false);
	const [checkboxClickedStatus, setcheckboxClickedStatus] = useState(false);
	const [tickCheckBox, setTickCheckbox] = useState(false);

	useEffect(() => {
		getOtherBookings(auth.uid);
	}, []);

	function openConfirmationModal() {
		setShowModal(true);
	}

	const dataRef = useRef(null);
	const checkedRef = useRef(false);

	// console.log(dataRef, `the first dataRef`);
	// useEffect(() => {
	// 	console.log(dataRef.current, `the seconde dataRef`);
	// }, [dataRef.current]);

	useEffect(() => {}, [checkboxClickedStatus]);
	// console.log(checkedRef.current.checked, `this i sthe checkbox`);

	const handleClose = () => {
		setShowModal(false);
		setTickCheckbox(false);
		// checkedRef.current.
	};
	// const handleShow = () => {
	// 	setShowModal(false);
	// 	setCloseCheckbox(false);
	// };

	useEffect(() => {
		// console.log(otherBookings, `this is the other bookings`);
	}, [otherBookings]);

	// console.log(profile);

	let events =
		otherBookings === null ? (
			"...loading"
		) : otherBookings && otherBookings.length === 0 ? (
			"You dont have any bookings"
		) : (
			<ListGroup>
				{otherBookings?.map((booking) => {
					let value;

					switch (booking.event.eventType) {
						case "Video call":
						case "Phone call":
							value = (
								<Call
									dataRef={dataRef}
									openConfirmationModal={() => openConfirmationModal()}
									booking={booking}
									auth={auth}
									checkedRef={checkedRef}
									tickCheckBox={tickCheckBox}
								/>
							);
							break;

						case "Consultant visitation":
							value = (
								<ConsultantIsVisiting
									modalControl={() => openConfirmationModal()}
									booking={booking}
									auth={auth}
								/>
							);
							break;
						case "Visit to consultant":
							value = (
								<VisitConsultant
									modalControl={() => openConfirmationModal()}
									booking={booking}
									auth={auth}
								/>
							);
							break;
						case "Written feedback":
							value = (
								<WrittenFeedback
									modalControl={() => openConfirmationModal()}
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
			<div>
				<Modal show={showModal} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Confirm action</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						You are about to mark a booking as complete. You cannot cancel after
						you click 'proceed'
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button
							variant="primary"
							onClick={(e) =>
								handleCheckboxChange(
									e,
									auth.uid,
									dataRef.current.consultantId,
									dataRef.current.bookingId

									// booking.consultant.consultantId,
									// booking.id
								)
							}
						>
							{/* { acceptLoading === false || cancelLoading === false ?	Proceed :  } */}
							{/* {cancelLoading ? "canceling Request..." : "Canceled"} */}
							{/* {acceptLoading ? "accepting Request..." : "Accepted"} */}
							{/* {actionType === "accept"
								? acceptLoading
									? "accepting Request"
									: event.status.requestAccepted
									? "Accepted"
									: "Proceed"
								: cancelLoading
								? "canceling Request"
								: event.status.requestAccepted
								? "Canceled"
								: "Proceed"
								}  */}
							Proceed
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
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
