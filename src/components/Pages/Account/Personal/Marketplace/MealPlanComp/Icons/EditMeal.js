import React from "react";
import { Modal } from "react-bootstrap";
import EditMealForm from "./EditMealForm";
import { useTranslation, Trans } from 'react-i18next';

export function EditMeal({
  meal,
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
        <EditMealForm
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
