import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import AddMealFormShop from "./AddMealFormShop";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import ScannerShop from "../../../../../../SubComponents/QRCode/ScannerShop";
import { useTranslation, Trans } from 'react-i18next';

export function AddMealModalShop({ show, setShow, value }) {
  const [eatingOut, setEatingOut] = useState("unconfirmed");


  const { t } = useTranslation();

  //control barcode scanner
  const [scan, setScan] = useState(false);
  const [expand, setExpand] = useState(<span className="scan-text">+ scan from barcode</span>);
  //scanning items will add item as a meal in meal plan including nutrition info and ingrs if information available
  const handleSetScan = () => {
    setScan(!scan);
    if (scan) {
      setExpand(
        <span className="scan-text">+ scan from barcode</span>
        );
    } else {
      setExpand(
        <span className="scan-text">- input manually</span>
        );
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
          {t('description.add_new_meal_for')} {value.format("DD/MM")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <button
              className="btn success shadow-none qrcode-btn"
              onClick={() => handleSetScan()}
            >
              {expand}
            </button>
            {scan ? (
              <ScannerShop value={value} handleFormClose={handleFormClose} />
            ) : (
              <AddMealFormShop value={value} handleFormClose={handleFormClose} />
            )}
        </Modal.Body>
      </Modal>
    </>
  );
}

function InOrOut(props) {


  switch (props.eatingOut) {
    default:
    case "unconfirmed":
      return (
        <>
          <div className="basic-title-left">
            Are you cooking at home or eating out?
          </div>
          <Row>
            <Col>
              <SubButton
                styling="green"
                text="At Home"
                onClick={() => props.setEatingOut("no")}
              />
            </Col>
            <Col>
              <SubButton
                styling="green"
                text="Eating Out"
                onClick={() => props.setEatingOut("yes")}
              />
            </Col>
          </Row>
        </>
      );
    case "yes":
      return <EatingOut handleFormClose={props.handleFormClose} />;
    case "no":
      return <>{props.children}</>;
  }
}
