import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import EditMealForm from "./EditMealForm";

//pass down meal props from meals.js
//edit each item
//send via editMealData

export function EditMeal({
  meal,
  ingredients,
  id,
  show,
  setShow,
  value,
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
        <Modal.Title id="add-meal">Edit Meal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <p>bleeeeeeeeh</p> */}
        <EditMealForm
          meal={meal}
          ingredient={ingredients}
          id={id}
          forceUpdate={forceUpdate}
          value={value}
          handleFormClose={handleFormClose}
        />
      </Modal.Body>
    </Modal>
  );
}
