import classes from "./consultantRequest.module.css";
import { format, isValid } from "date-fns";

import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

export const consultantRequest = (props) => {
	const { requestType, requestStart, requestEnd } = props;

	// let requestDate = format(requestStart, "yyyy-mm-dd");
	let requestDate = requestDate.split("T")[0];

	console.log(isValid(requestStart));
	return (
		<div className={classes.cont}>
			<div>request type: {requestType}</div>
			<div>request date: {requestDate}</div>
			<div>start time: {requestStart}</div>
			<div>end time: {requestEnd}</div>

			<Button>cancel Request</Button>
			<Button>confirm Request</Button>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = () => {
	return;
};

export default connect(mapStateToProps, mapDispatchToProps)(consultantRequest);
