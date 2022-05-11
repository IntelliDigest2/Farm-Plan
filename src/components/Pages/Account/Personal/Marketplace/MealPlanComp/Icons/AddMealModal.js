import React from "react";
import { Modal } from "react-bootstrap";
import AddMealForm from "./AddMeal";
import { AddButton } from "../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";

export function AddMealModal({ show, setShow, value, forceUpdate }) {
  const handleForm = () => setShow(true);
  const handleFormClose = () => setShow(false);

  return (
    <>
      <Tooltip title="add" arrow>
        <div className="button">
          <AddButton onClick={handleForm} />
        </div>
      </Tooltip>
      <Modal
        show={show}
        onHide={handleFormClose}
        size="lg"
        aria-labelledby="add meal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-meal">
            Add new meal for {value.format("DD/MM")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMealForm
            value={value}
            handleFormClose={handleFormClose}
            forceUpdate={forceUpdate}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
