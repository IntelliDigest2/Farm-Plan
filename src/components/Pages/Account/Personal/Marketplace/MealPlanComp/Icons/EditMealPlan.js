import React from "react";
import { Modal } from "react-bootstrap";
import EditMealFormPlan from "./EditMealFormPlan";

export function EditMealPlan({
  meal,
  ingredients,
  id,
  show,
  setShow,
  value,
  forceUpdate,
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
        <EditMealFormPlan
          meal={meal}
          ingredient={ingredients}
          id={id}
          forceUpdate={forceUpdate}
          value={value}
          handleFormClose={handleFormClose}
          saved={saved}
        />
      </Modal.Body>
    </Modal>
  );
}
