import classes from "./consultantRequest.module.css";
import { format, parseISO, isValid } from "date-fns";

import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

export const consultantRequest = (props) => {
	const { event } = props;

	let newDate = pasIson(event.start, "yyyy-mm-dd");
	console.log(newDate);

	let requestDate = event.start.split("T")[0];
	let startTime = event.start.split("T")[1];
	let endTime = event.end.split("T")[1];

	// console.log(isValid(requestStart));

	const acceptRequest = () => {};
	const rejectRequest = () => {};
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = () => {
	return;
};

export default connect(mapStateToProps, mapDispatchToProps)(consultantRequest);
