import React from "react";
import { Modal } from "react-bootstrap";
import EditMealFormPlan from "./EditMealFormPlan";
import { useTranslation, Trans } from 'react-i18next';

export function EditMealPlan({
  meal_name,
  ingredients,
  id,
  show,
  setShow,
  value,
  forceUpdate,
  saved,
}) {
  const { t } = useTranslation();

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
        <Modal.Title id="add-meal">{t('description.edit_meal')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <p>bleeeeeeeeh</p> */}
        <EditMealFormPlan
          meal_name={meal_name}
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
