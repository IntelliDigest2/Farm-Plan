import classes from "./consultantRequest.module.css";
import { format, parseISO, isValid } from "date-fns";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import {
	acceptBookingRequest,
	cancelBookingRequest,
} from "../../../../../store/actions/consultantActions/consultantActions";

export const ConsultantRequest = (props) => {
	const [cancelLoading, setCancelLoading] = useState(false);
	const [acceptLoading, setAcceptLoading] = useState(false);
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

	let date = format(parseISO(event.start), "yyyy-mm-dd");
	let startTime = format(parseISO(event.start), "hh:mm a");
	let endTime = format(parseISO(event.end), "hh:mm a");

	let prices = consultantData.services.reduce((o, u) => {
		// console.log(u);
		o[u.service] = u.price;
		return o;
	}, {});

	let serviceCost = prices[event.eventType];
	// console.log(profile, "this is the service cost");
	const acceptRequest = () => {
		setAcceptLoading(true);
		acceptBookingRequest(
			event,
			auth.uid,
			`${profile.firstName} ${profile.lastName}`,
			serviceCost
		)
			.then((result) => {
				console.log(result);
				setAcceptLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	const rejectRequest = () => {
		setCancelLoading(true);
		cancelBookingRequest(auth.uid, event)
			.then((result) => {
				console.log(result);
				setCancelLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
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
		<div className={classes.cont}>
			<div>request type: {event.eventType}</div>
			<div>request date: {date}</div>
			<div>start time: {startTime}</div>
			<div>end time: {endTime}</div>

			<Button
				disabled={
					event.status.requestAccepted || event.status.requestId === null
				}
				onClick={(e) => rejectRequest(e)}
				variant="danger"
			>
				{event.status.requestAccepted
					? "Canceled"
					: cancelLoading
					? "canceling..."
					: "cancel Request"}
			</Button>
			<Button
				disabled={
					event.status.requestAccepted || event.status.requestId === null
				}
				onClick={(e) => acceptRequest(e)}
			>
				{event.status.requestAccepted
					? "Accepted"
					: acceptLoading
					? "accepting..."
					: "accept Request"}
			</Button>
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
