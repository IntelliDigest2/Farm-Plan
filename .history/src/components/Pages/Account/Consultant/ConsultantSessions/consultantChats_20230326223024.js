import React from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";

export const ConsultantChats = (props) => {
	let chats = [1, 2, 3, 4, 5, 5, 6, 7];

	let chatCards = chats.map((chat) => {
		return (
			<Card className="shadow-none">
				<Card.Header>Quote</Card.Header>
				<Card.Body>
					<blockquote className="blockquote mb-0">
						<p>
							{" "}
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
							posuere erat a ante.{" "}
						</p>
						<footer className="blockquote-footer">
							Someone famous in <cite title="Source Title">Source Title</cite>
						</footer>
					</blockquote>
				</Card.Body>
			</Card>
		);
	});
	return <div>{chatCards}</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ConsultantChats);
