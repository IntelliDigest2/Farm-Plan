import classes from "./consultantRequest.module.css";
import { format, parseISO, isValid } from "date-fns";

import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import {
	acceptRequest,
	cancelRequest,
} from "../../../../../store/actions/consultantActions/consultantActions";

export const consultantRequest = (props) => {
	const [setCancelLoaing, setsetCancelLoaing] = useState(false);
	const [setAcceptLoaing, setsetAcceptLoaing] = useState(false);
	const { event, acceptBooking, cancelBooking, auth } = props;

	let newDate = parseISO(event.start);
	let date = format(parseISO(event.start), "yyyy-mm-dd");
	let startTime = format(parseISO(event.start), "hh:mm a");
	let endTime = format(parseISO(event.end), "hh:mm a");
	console.log(newDate);

	const acceptRequest = () => {
		acceptBooking(auth.uid, event);
	};
	const rejectRequest = () => {
		cancelBooking(auth.uid, event);
	};
	return (
		<div className={classes.cont}>
			<div>request type: {event.eventType}</div>
			<div>request date: {date}</div>
			<div>start time: {startTime}</div>
			<div>end time: {endTime}</div>

			<Button onClick={(e) => rejectRequest(e)} variant="danger">
				cancel Request
			</Button>
			<Button onClick={(e) => acceptRequest(e)}>confirm Request</Button>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.firebase.auth,
	load: state.consultantState.bookingLoad,
});

const mapDispatchToProps = (dispatch) => {
	return {
		acceptBooking: (event, consultantId) =>
			dispatch(acceptRequest(event, consultantId)),

		cancelBooking: (event, consultantId) =>
			dispatch(cancelRequest(event, consultantId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(consultantRequest);
