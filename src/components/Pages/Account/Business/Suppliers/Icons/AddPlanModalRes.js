import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { AddButton, SubButton } from "../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import RecipeSearch from "../Plan/Forms/Search/RecipeSearch";
import Scanner from "../../../../../SubComponents/QRCode/ScannerPlanRes";
import SavedMealsPlan from "../SavedMealsPlan";

import { useTranslation, Trans } from 'react-i18next';


export function AddPlanModalRes({ show, setShow, value }) {

  const { t } = useTranslation();

  const [eatingOut, setEatingOut] = useState("unconfirmed");
  const [page, setPage] = useState(0);
  const [date, setDate] = useState([value])
  const [showS, setShowS] = useState(false);


  //control barcode scanner
  const [scan, setScan] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expand, setExpand] = useState("+ scan from barcode");


  const handleClose = () => setShowS(false);
  const handleShow = () => setShowS(true);

  //scanning items will add item as a meal in meal plan including nutrition info and ingrs if information available
  const handleSetScan = () => {
    setScan(!scan);
    setSaved(!saved)
    if (scan) {
      setExpand("+ scan from barcode");
    } else {
      setExpand("- input manually");
    }
  };


  //control modal  
  const handleForm = () => setShow(true);
  const handleFormClose = () => {
    setShow(false);
    setEatingOut("unconfirmed");
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
          Add meals you prepare here
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <button
                  className="btn success shadow-none qrcode-btn"
                  onClick={() => handleSetScan()}
            >
            
              {expand} 
            </button>
            {/* <button
                  className="btn success shadow-none qrcode-btn"
                  onClick={() => handleShow()}
            >
              {t('description.add_from_saved_meal')} 
            </button> */}
            {scan ? (
              <Scanner value={value} handleFormClose={handleFormClose} />
            ) : (
              <RecipeSearch value={value} />
              )}
          
        </Modal.Body>
      </Modal>

      <Modal
        show={showS}
        onHide={handleClose}
        size="lg"
        aria-labelledby="add meal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-meal" className="basic-title-left basic-lg">
          {t('description.add_from_saved_meal')} 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <SavedMealsPlan />
        </Modal.Body>
      </Modal>
    </>
  );
}

