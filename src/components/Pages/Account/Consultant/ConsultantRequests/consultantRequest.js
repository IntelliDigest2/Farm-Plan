import classes from "./consultantRequest.module.css";
import { format, parseISO, isValid } from "date-fns";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { Button } from "react-bootstrap";
import { Button, Modal, ListGroup, ListGroupItem } from "react-bootstrap";

import {
	acceptBookingRequest,
	cancelBookingRequest,
} from "../../../../../store/actions/consultantActions/consultantActions";

import { submitNotification } from "./../../../../lib/Notifications";

export const ConsultantRequest = (props) => {
	const [cancelLoading, setCancelLoading] = useState(false);
	const [acceptLoading, setAcceptLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [actionType, setActionType] = useState();

	const {
		event,
		acceptBooking,
		cancelBooking,

		cancelLoad,
		confirmLoad,
		consultantData,
		showDialog,
		profile,
		auth,
	} = props;

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	let date = format(parseISO(event.start), "yyyy-MM-dd");
	let startTime = format(parseISO(event.start), "hh:mm a");
	let endTime = format(parseISO(event.end), "hh:mm a");

	let prices = consultantData.services.reduce((o, u) => {
		// console.log(u);
		o[u.service] = u.price;
		return o;
	}, {});

	let serviceCost = prices[event.eventType];
	// console.log(profile, "this is the service cost");

	const handleProceed = () => {
		// console.log(`submitted`);

		if (actionType === "accept") {
			setAcceptLoading(true);

			console.log(
				event,
				auth.uid,
				`${profile.firstName} ${profile.lastName}`,
				serviceCost,
				`these are all the parameters needed`
			);
			acceptBookingRequest(
				event,
				auth.uid,
				`${profile.firstName} ${profile.lastName}`,
				serviceCost
			)
				.then((result) => {
					// console.log(result);
					setAcceptLoading(false);
					submitNotification("Sucess", "Consultation Request Accepted");
				})
				.catch((error) => {
					console.log(error);
					setAcceptLoading(false);

					submitNotification("Error", "Something went wrong, pls try again");
				});
		} else if (actionType === "reject") {
			setCancelLoading(true);
			cancelBookingRequest(auth.uid, event)
				.then((result) => {
					// console.log(result);
					submitNotification("Sucess", "Consultation Request Canceled");

					setCancelLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setCancelLoading(false);

					submitNotification("Error", "Something went wrong, pls try again");
				});
		}
	};
	const acceptRequest = () => {
		// setAcceptLoading(true);
		// showDialog();
		handleShow();
		setActionType("accept");
	};
	const rejectRequest = () => {
		handleShow();
		setActionType("reject");

		//showDialog
		// setCancelLoading(true);
	};

	// useEffect(() => {
	// 	if (confirmLoad === false) {
	// 		setAcceptLoading(confirmLoad);
	// 	}

	// 	// console.log(event.status.requestAccepted);
	// }, [confirmLoad]);

	// useE

	return (
		<div>
			<div>
				<Modal show={showModal} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Request action</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						You are about to accept/reject a booking. You cannot cancel after
						you click 'proceed'
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button variant="primary" onClick={handleProceed}>
							{/* { acceptLoading === false || cancelLoading === false ?	Proceed :  } */}
							{/* {cancelLoading ? "canceling Request..." : "Canceled"} */}
							{/* {acceptLoading ? "accepting Request..." : "Accepted"} */}

							{actionType === "accept"
								? acceptLoading
									? "accepting Request"
									: event.status.requestAccepted
									? "Accepted"
									: "Proceed"
								: cancelLoading
								? "canceling Request"
								: event.status.requestAccepted
								? "Canceled"
								: "Proceed"}
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<div className={classes.cont}>
				<div>Request type: {event.eventType}</div>
				<div>Request date: {date}</div>
				<div>Start time: {startTime}</div>
				<div>End time: {endTime}</div>

				<Button
					disabled={
						event.status.requestAccepted || event.status.requestId === null
					}
					onClick={(e) => rejectRequest(e)}
					variant="danger"
				>
					{event.status.requestAccepted ? "Canceled" : "Cancel request"}
				</Button>
				<Button
					disabled={
						event.status.requestAccepted || event.status.requestId === null
					}
					onClick={(e) => acceptRequest(e)}
				>
					{event.status.requestAccepted ? "Accepted" : "Accept request"}
				</Button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	consultantData: state.consultantState.consultantData,
	cancelLoad: state.consultantState.cancelBookingLoad,
	// confirmLoad: state.consultantState.acceptBookingLoad,
	auth: state.firebase.auth,
	profile: state.firebase.profile,
});

const mapDispatchToProps = (dispatch) => {
	return {
		// acceptBooking: (event) => dispatch(acceptBookingRequest(event)),
		// cancelBooking: (event, consultantId) =>
		// 	dispatch(cancelBookingRequest(event, consultantId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantRequest);
