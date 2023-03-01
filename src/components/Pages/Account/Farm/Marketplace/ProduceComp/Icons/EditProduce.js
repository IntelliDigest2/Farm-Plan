import React from "react";
import { Modal } from "react-bootstrap";
import EditProduceForm from "./EditProduceForm";

export function EditProduce({
  produce,
  id,
  show,
  setShow,
  forceUpdate,
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
        <Modal.Title id="add-meal">Edit Produce</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditProduceForm
          produce={produce}
          id={id}
          forceUpdate={forceUpdate}
          handleFormClose={handleFormClose}
        />
      </Modal.Body>
    </Modal>
  );
}
