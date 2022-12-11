import React from "react";
import { Modal } from "react-bootstrap";
import EditInventoryForm from "./EditInventoryForm";

export function EditInventory({
  meal,
  ingredients,
  expiry,
  id,
  show,
  setShow,
  value,
  update,
  setUpdate,
  saved,
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
        <EditInventoryForm
          meal={meal}
          ingredients={ingredients}
          expiry={expiry}
          id={id}
          update={update}
          setUpdate={setUpdate}
          value={value}
          handleFormClose={handleFormClose}
          saved={saved}
        />
      </Modal.Body>
    </Modal>
  );
}
