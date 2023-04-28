import React from "react";
import { connect } from "react-redux";
import { Button, card } from "react-bootstrap";

function ConsultantRequestsPage(props) {
	const { consultantCalendarEvents } = props;

	let requests = consultantCalendarEvents.filter((request) => {
		return request.status !== null;
	});

	let requestList = requests.map((request) => {
		return (
			<Card style={{ width: "18rem" }}>
				<Card.Img variant="top" src="holder.js/100px180" />
				<Card.Body>
					<Card.Title>Card Title</Card.Title>
					<Card.Text>
						Some quick example text to build on the card title and make up the
						bulk of the card's content.
					</Card.Text>
					<Button variant="primary">Go somewhere</Button>
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
