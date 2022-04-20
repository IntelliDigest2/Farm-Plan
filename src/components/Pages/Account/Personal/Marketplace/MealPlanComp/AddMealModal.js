import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import AddMealForm from "./AddMeal";
import { AddButton } from "../../../../SubComponents/Button";

export function AddMealModal({ show, setShow, value }) {
  const handleForm = () => setShow(true);
  const handleFormClose = () => setShow(false);

  return (
    <>
      <div className="button">
        <AddButton onClick={handleForm} />
      </div>
      <Modal
        show={show}
        onHide={handleFormClose}
        size="lg"
        aria-labelledby="add-meal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-meal">
            Add new meal for {value.format("DD/MM")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddMealForm value={value} handleFormClose={handleFormClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}
