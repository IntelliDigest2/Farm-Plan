import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation, Trans } from 'react-i18next';

export function AddMealModalRestaurant({ show, setShow }) {

  const { t } = useTranslation();

  //control modal
  const handleForm = () => setShow(true);
  const handleFormClose = () => {
    setShow(false);
  };

  return (
    <>
      <Tooltip title="add" arrow>
        <div className="button">
          <AddButton onClick={handleForm} />
        </div>
      </Tooltip>
      <Modal
        show={show}
        onHide={handleFormClose}
        size="lg"
        aria-labelledby="add meal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-meal" className="basic-title-left basic-lg">
            Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EatingOut />
        </Modal.Body>
      </Modal>
    </>
  );
}

