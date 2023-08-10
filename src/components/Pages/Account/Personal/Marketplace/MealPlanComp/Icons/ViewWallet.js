import React from "react";
import { useId } from "react";
import { Modal } from "react-bootstrap";
import CheckoutPage from "../../../../../../SubComponents/payment/RevolutPay"
import "./ViewPurchaseInfo.css"
import { useTranslation, Trans } from 'react-i18next';

export function ViewWallet({
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
      dialogClassName="custom-modal"

    >
      <Modal.Header closeButton>
        <Modal.Title id="add-meal">Fund Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CheckoutPage />
      </Modal.Body>
    </Modal>
  );
}
