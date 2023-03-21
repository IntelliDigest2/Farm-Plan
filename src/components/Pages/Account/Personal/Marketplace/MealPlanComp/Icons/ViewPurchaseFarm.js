import React from "react";
import { useId } from "react";
import { Modal } from "react-bootstrap";
import ViewPurchaseInfoFarm from "./ViewPurchaseInfoFarm";
import { useTranslation, Trans } from 'react-i18next';

export function ViewPurchaseFarm({
  show,
  setShow,
  forceUpdate,
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
        <Modal.Title id="add-meal">{t('description.order')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ViewPurchaseInfoFarm />
      </Modal.Body>
    </Modal>
  );
}
