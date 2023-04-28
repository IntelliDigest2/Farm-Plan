import React from "react";
import { connect } from "react-redux";
import ConsultantRequest from "./consultantRequest";
import { Button, Modal } from "react-bootstrap";

function ConsultantRequestsPage(props) {
	const { consultantCalendarEvents } = props;
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	let requests = consultantCalendarEvents.filter((event) => {
		return event.status.requesterId !== null;
	});

	let requestList = requests.map((request, index) => {
		return <ConsultantRequest key={`request-${index}`} event={request} />;
	});

	return (
		<div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			<div>
				<li>{requestList}</li>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		consultantCalendarEvents:
			state.consultantState.consultantData.calendarEvents,
	};
}
function mapDispatchToProps() {
	return {};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConsultantRequestsPage);
