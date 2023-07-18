import React from "react";
import { Modal } from "react-bootstrap";
import EditProduceForm from "./EditProduceForm";

export function EditProduce({
  shopItems,
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
        <Modal.Title id="add-meal">Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditProduceForm
          shopItems={shopItems}
          id={id}
          forceUpdate={forceUpdate}
          handleFormClose={handleFormClose}
        />
      </Modal.Body>
    </Modal>
  );
}
