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
	} = props;

	let date = format(parseISO(event.start), "yyyy-mm-dd");
	let startTime = format(parseISO(event.start), "hh:mm a");
	let endTime = format(parseISO(event.end), "hh:mm a");

	let prices = consultantData.services.reduce((o, u) => {
		console.log(u);
		o[u.service] = u.price;
		return o;
	}, {});

	let serviceCost = prices[event.eventType];
	console.log(serviceCost, "this is the service cost");
	const acceptRequest = () => {
		acceptBooking("EAudRc5YajVorKygb0kZFGlfl163", event, serviceCost);
		// showDialog();
		setAcceptLoading(true);
	};
	const rejectRequest = () => {
		cancelBooking("EAudRc5YajVorKygb0kZFGlfl163", event);
		//showDialog
		setCancelLoading(true);
	};

	useEffect(() => {
		if (!confirmLoad) {
			setAcceptLoading(false);
		}
	}, [cancelLoad, confirmLoad]);

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
	confirmLoad: state.consultantState.acceptBookingLoad,
});

const mapDispatchToProps = (dispatch) => {
	return {
		acceptBooking: (event, consultantId, serviceCost) =>
			dispatch(acceptBookingRequest(event, consultantId, serviceCost)),

		cancelBooking: (event, consultantId) =>
			dispatch(cancelBookingRequest(event, consultantId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantRequest);
