import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ConsultantRequest from "./consultantRequest";
import { Button, Modal, ListGroup, ListGroupItem } from "react-bootstrap";
import {
	fetchConsultantInfo,
	getBookingRequest,
} from "../../../../../store/actions/consultantActions/consultantActions";

function ConsultantRequestsPage(props) {
	const {
		consultantCalendarEvents,
		auth,
		handleGetBookingRequest,
		consultantRequests,
		consultantData,
		getConsultantInfo,
	} = props;
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [requests, setRequests] = useState(null);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleProceed = () => {};

	useEffect(() => {
		handleGetBookingRequest(auth.uid);
		getConsultantInfo(auth.uid);
	}, []);

	useEffect(() => {
		setRequests(consultantRequests);
		setIsLoading(false);
	}, [consultantRequests]);

	console.log(requests, `this is the requests`);

	// let requests = consultantCalendarEvents.filter((event) => {
	// 	console.log(event);
	// 	return event.status.requesterId !== null && !event.status.requestAccepted;
	// });
	let requestList;
	if (requests) {
		requestList = (
			<ListGroup>
				{requests.map((request, index) => {
					return (
						<ListGroupItem>
							<ConsultantRequest
								showDialog={handleShow}
								key={`request-${index}`}
								event={request}
								consultantData={consultantData}
							/>
						</ListGroupItem>
					);
				})}
			</ListGroup>
		);
	}
	console.log(requests, `this is the requests stuff`);
	let requestContent =
		requests === null ? (
			"...loading"
		) : requests.length === 0 ? (
			<div>You do not have any requests available</div>
		) : (
			requestList
		);

	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					You are about to accept a booking. You cannot cancel after you click
					'proceed'
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleProceed}>
						Proceed
					</Button>
				</Modal.Footer>
			</Modal>
			<div>
				<li>{requestContent}</li>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		// consultantCalendarEvents: state.consultantState.calendarEvents,
		consultantData: state.consultantState.consultantData,
		auth: state.firebase.auth,
		consultantRequests: state.consultantState.consultantRequests,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		handleGetBookingRequest: (uid) => dispatch(getBookingRequest(uid)),
		getConsultantInfo: (uid) => dispatch(fetchConsultantInfo(uid)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultantRequestsPage);
