import classes from "./consultantRequest.module.css";
import { format, isValid } from "date-fns";

import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

export const consultantRequest = (props) => {
	const { requestType, requestStart, requestEnd } = props;

	// let requestDate = format(requestStart, "yyyy-mm-dd");
	let requestDate = requestStart.split("T")[0];

	console.log(isValid(requestStart));

	const acceptRequest = () => {};
	const rejectRequest = () => {};
	return (
		<div className={classes.cont}>
			<div>request type: {requestType}</div>
			<div>request date: {requestDate}</div>
			<div>start time: {requestStart}</div>
			<div>end time: {requestEnd}</div>

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
