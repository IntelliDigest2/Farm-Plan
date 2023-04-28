import classes from "./consultantRequest.module.css";
import { format, parseISO, isValid } from "date-fns";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import {
	acceptRequest,
	cancelRequest,
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

	console.log(consultantData, "this is the consultant data");

	let date = format(parseISO(event.start), "yyyy-mm-dd");
	let startTime = format(parseISO(event.start), "hh:mm a");
	let endTime = format(parseISO(event.end), "hh:mm a");

	const acceptRequest = () => {
		acceptBooking("EAudRc5YajVorKygb0kZFGlfl163", event);
		// showDialog();
		setAcceptLoading(true);
	};
	const rejectRequest = () => {
		cancelBooking("EAudRc5YajVorKygb0kZFGlfl163", event);
		//showDialog
		setCancelLoading(true);
	};

	let serviceCost = consultantData.services.reduce((o, u) => {
		o[u.service] = u.price;
		return o;
	}, {});

	console.log(serviceCost);

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
		acceptBooking: (event, consultantId) =>
			dispatch(acceptRequest(event, consultantId)),

		cancelBooking: (event, consultantId) =>
			dispatch(cancelRequest(event, consultantId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantRequest);
