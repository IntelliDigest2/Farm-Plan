import classes from "./consultantRequest.module.css";
import { format, parseISO, isValid } from "date-fns";

import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import {
	acceptRequest,
	cancelRequest,
} from "../../../../../store/actions/consultantActions/consultantActions";

export const consultantRequest = (props) => {
	const { event, acceptBooking, cancelBooking, auth } = props;

	let newDate = parseISO(event.start);
	let newDate2 = format(newDate, "yyyy-mm-dd");
	console.log(newDate2);

	let requestDate = event.start.split("T")[0];
	let startTime = event.start.split("T")[1];
	let endTime = event.end.split("T")[1];

	// console.log(isValid(requestStart));

	const acceptRequest = () => {
		acceptBooking(auth.uid, event);
	};
	const rejectRequest = () => {
		cancelBooking(auth.uid, event);
	};
	return (
		<div className={classes.cont}>
			<div>request type: {event.eventType}</div>
			<div>request date: {requestDate}</div>
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
