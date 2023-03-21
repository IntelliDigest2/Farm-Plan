import React from "react";
import { Modal } from "react-bootstrap";
import EditInventoryForm from "./EditInventoryForm";
import { useTranslation, Trans } from 'react-i18next';

export function EditInventory({
  food,
  quantity,
  measure,
  expiry,
  id,
  show,
  setShow,
  value,
  update,
  setUpdate,
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
        <Modal.Title id="add-meal">{t('description.edit_item')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <p>bleeeeeeeeh</p> */}
        <EditInventoryForm
          //meal={meal}
          food={food}
          measure={measure}
          quantity={quantity}
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
