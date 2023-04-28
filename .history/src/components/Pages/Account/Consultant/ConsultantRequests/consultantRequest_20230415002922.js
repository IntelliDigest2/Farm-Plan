import classes from "./consultantRequest.module.css";

import React from "react";
import { connect } from "react-redux";

export const consultantRequest = (props) => {
	const { requestType, requestStart, requestEnd } = props;
	return (
		<div className={classes.cont}>
			<div>request type: {requestType}</div>
			<div>request date: {requestType}</div>
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
