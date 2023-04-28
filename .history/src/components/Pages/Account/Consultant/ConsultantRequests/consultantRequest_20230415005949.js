import classes from "./consultantRequest.module.css";
import { format } from "date-fns";

import React from "react";
import { connect } from "react-redux";

export const consultantRequest = (props) => {
	const { requestType, requestStart, requestEnd } = props;

	let requestDate = format(requestStart, "yyyy-mm-dd");
	return (
		<div className={classes.cont}>
			<div>request type: {requestType}</div>
			<div>request date: {requestDate}</div>
			<div>start time: {requestStart}</div>
			<div>end time: {requestEnd}</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = () => {
	return;
};

export default connect(mapStateToProps, mapDispatchToProps)(consultantRequest);
