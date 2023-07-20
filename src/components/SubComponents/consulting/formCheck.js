import React, { useEffect, useState, useRef, forwardRef } from "react";
import {
	Form,
	Col,
	Button,
	Row,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { markEventAsComplete } from "./../../../store/actions/consultingActions";

const FormCheck = (props) => {
	const [isChecked, setIsChecked] = useState(false);
	const {
		handleShow,
		bookingInfo,
		dataRef,
		checkedRef,
		tickCheckBoxi,
		// ref,
		auth,
		index,
	} = props;

	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);

	console.log(isChecked, `this is the checked status for the form `);

	const handleClose = () => {
		setIsChecked(false);
		setShowModal(false);
	};

	const handleCheckboxChange = (e, userId, consultantId, eventId) => {
		if (isChecked) {
			setLoading(true);
			markEventAsComplete(userId, consultantId, eventId)
				.then((result) => {
					setLoading(false);
					// console.log("completed");
				})
				.catch((err) => {
					setLoading(false);

					console.log(err);
				});
		}
		console.log(
			e.target.checked,
			// isChecked,
			userId,
			consultantId,
			eventId,
			`this is the event value`
		);
	};

	function handleChange() {
		setIsChecked(!isChecked);
		if (!showModal) {
			setShowModal(true);
		}
	}
	return (
		<>
			<div>
				<Modal show={showModal} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Confirm action</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						You are about to mark a booking as complete. You cannot cancel after
						you click 'proceed'
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button
							variant="primary"
							onClick={(e) =>
								handleCheckboxChange(
									e,
									auth.uid,
									bookingInfo.consultantId,
									bookingInfo.bookingId
								)
							}
						>
							{loading ? "...loading" : "Proceed"}
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
			<Form.Check
				checked={isChecked}
				onChange={handleChange}
				type="checkbox"
				label="Mark as complete"
			/>
		</>
	);
};

export default FormCheck;
