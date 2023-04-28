import React from "react";
import { connect } from "react-redux";
import { Button, Card, Row, Col } from "react-bootstrap";

function ConsultantRequestsPage(props) {
	const { consultantCalendarEvents } = props;

	console.log(consultantCalendarEvents);

	let requests = consultantCalendarEvents.filter((request) => {
		return request.status !== null;
	});

	let requestList = requests.map((request) => {
		return (
			<Card style={{ width: "18rem" }}>
				<Card.Img variant="top" src="holder.js/100px180" />
				<Card.Body>
					<Card.Title>{request.eventType}</Card.Title>
					<Card.Text>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>

					<Row>
						<Col>
							<Button variant="danger">Decline Request</Button>
						</Col>
						<Col>
							<Button variant="primary">Confirm Request</Button>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		);
	});
	return (
		<div>
			<li>{requestList}</li>
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
