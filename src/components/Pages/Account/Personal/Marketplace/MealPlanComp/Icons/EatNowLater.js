import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import AddMealForm from "./AddMealForm";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import Scanner from "../../../../../../SubComponents/QRCode/Scanner";
import ScannerPrepared from "../../../../../../SubComponents/QRCode/ScannerPrepared";
import { useTranslation, Trans } from 'react-i18next';


export default function EatNowLater({ value }) {
  const { t } = useTranslation();

  const [eatLater, setEatLater] = useState("unconfirmed");
  const [show, setShow] = useState(true);

  //control barcode scanner
  const [scan, setScan] = useState(false);
  const [expand, setExpand] = useState("+ scan from barcode");
  //scanning items will add item as a meal in meal plan including nutrition info and ingrs if information available
  const handleSetScan = () => {
    setScan(!scan);
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
    setEatLater("unconfirmed");
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
            {t('description.add_new_meal_for')} 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NowOrLater
            eatLater={eatLater}
            setEatLater={setEatLater}
            handleFormClose={handleFormClose}
            value={value}
          >
            <button
              className="btn success shadow-none qrcode-btn"
              onClick={() => handleSetScan()}
            >
              {expand}
            </button>
            {scan ? (
              <Scanner value={value} handleFormClose={handleFormClose} />
            ) : (
              <AddMealForm value={value} handleFormClose={handleFormClose} />
            )}
          </NowOrLater>
        </Modal.Body>
      </Modal>
    </>
  );
}

function NowOrLater(props) {

  const { t } = useTranslation();

  switch (props.eatLater) {
    default:
    case "unconfirmed":
      return (
        <>
          <div className="basic-title-left">
            {t('description.eat_now_or_later')} 
          </div>
          <Row>
            <Col>
              <SubButton
                styling="green"
                text="Eat Now"
                onClick={() => props.setEatLater("no")}
              />
            </Col>
            <Col>
              <SubButton
                styling="green"
                text="Eat Later"
                onClick={() => props.setEatLater("yes")}
              />
            </Col>
          </Row>
        </>
      );
    case "no":
      return <>{props.children}</>;
    case "yes":
      return <>{props.children}</>;
  }
}