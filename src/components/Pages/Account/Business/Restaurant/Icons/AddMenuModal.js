import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
// import  from "../../../../../../SubComponents/Button";

import { Modal } from "react-bootstrap";
import AddMenuForm from "./AddMenuForm";
import { AddButton } from "./../../../../../SubComponents/Button";

export const AddMenuModal = ({ show, setShow, update, setUpdate }) => {
	const handleForm = () => setShow(true);
	const handleFormClose = () => setShow(false);

	return (
		<div>
			<Tooltip title="add" arrow>
				<div className="button">
					<AddButton onClick={handleForm} />
				</div>
			</Tooltip>
			<Modal
				show={show}
				onHide={handleFormClose}
				size="lg"
				aria-labelledby="add item"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="add-item" className="basic-title-left basic-lg">
						Add new restaurant menu
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddMenuForm
						handleFormClose={handleFormClose}
						// update={update}
						// setUpdate={setUpdate}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
};
