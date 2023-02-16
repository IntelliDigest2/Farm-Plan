import React from "react";
import { useId } from "react";
import { Modal } from "react-bootstrap";
import EditPurchaseForm from "./EditPurchaseForm";

export function EditPurchase({
  cart,
  id,
  show,
  setShow,
  forceUpdate,
  uid,
}) {
  const handleFormClose = () => setShow(false);
  return (
    <Modal
      show={show}
      onHide={handleFormClose}
      size="lg"
      aria-labelledby="edit meal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-meal">Edit Meal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <p>bleeeeeeeeh</p> */}
        <EditPurchaseForm
          cart={cart}
          id={id}
          forceUpdate={forceUpdate}
          handleFormClose={handleFormClose}
          uid={uid}
        />
      </Modal.Body>
    </Modal>
  );
}
