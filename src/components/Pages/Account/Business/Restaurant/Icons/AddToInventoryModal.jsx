import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { AddButton } from "../../../../../SubComponents/Button";
import { Modal } from "react-bootstrap";
import AddToInventoryForm from "./AddToInventoryForm";
import { useTranslation, Trans } from 'react-i18next';

export const AddToInventoryModal = ({ show, setShow, update, setUpdate }) => {

  const { t } = useTranslation();

  const handleForm = () => setShow(true);
  const handleFormClose = () => setShow(false);

  return (
    <div>
      <Tooltip title="add" arrow>
        <div className="button">
          <AddButton onClick={handleForm} />
        </div>
      </Tooltip>
      <Modal
        show={show}
        onHide={handleFormClose}
        size="lg"
        aria-labelledby="add item"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-item" className="basic-title-left basic-lg">
          {t('description.add_to_inventory')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddToInventoryForm
            handleFormClose={handleFormClose}
            update={update}
            setUpdate={setUpdate}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};
