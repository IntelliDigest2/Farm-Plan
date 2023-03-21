import React from "react";
import { useId } from "react";
import { Modal } from "react-bootstrap";
import EditPurchaseForm from "./EditPurchaseForm";
import { useTranslation, Trans } from 'react-i18next';


export function EditPurchase({
  cart,
  id,
  show,
  setShow,
  forceUpdate,
  uid,
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
