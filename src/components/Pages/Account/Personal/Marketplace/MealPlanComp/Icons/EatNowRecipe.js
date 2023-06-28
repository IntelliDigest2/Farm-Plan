import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import AddMealForm from "./AddMealForm";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import Scanner from "../../../../../../SubComponents/QRCode/Scanner";
import ScannerPrepared from "../../../../../../SubComponents/QRCode/ScannerPrepared";
import { useTranslation, Trans } from 'react-i18next';


export default function EatNowRecipe({ value }) {
  const { t } = useTranslation();

  const [eatRecipe, setEatRecipe] = useState("unconfirmed");
  const [show, setShow] = useState(true);

  //control barcode scanner
  const [scan, setScan] = useState(false);
  const [expand, setExpand] = useState(<span className="scan-text">+ scan from barcode</span>);
  //scanning items will add item as a meal in meal plan including nutrition info and ingrs if information available
  const handleSetScan = () => {
    setScan(!scan);
    if (scan) {
      <span className="scan-text">+ scan from barcode</span>
    } else {
      <span className="scan-text">- input manually</span>
    }
  };
 
  //control modal
  const handleForm = () => setShow(true);
  const handleFormClose = () => {
    setShow(false);
    setEatRecipe("unconfirmed");
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
          {t('description.eat_now_or_add_recipe')} 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NowOrRecipe
            eatRecipe={eatRecipe}
            setEatRecipe={setEatRecipe}
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
          </NowOrRecipe>
        </Modal.Body>
      </Modal>
    </>
  );
}

function NowOrRecipe(props) {
  const { t } = useTranslation();

  switch (props.eatRecipe) {
    default:
    case "unconfirmed":
      return (
        <>
          <div className="basic-title-left">
          {t('description.eat_now_or_add_recipe')} 
          </div>
          <Row>
            <Col>
              <SubButton
                styling="green"
                text="Eat Now"
                onClick={() => props.setEatRecipe("no")}
              />
            </Col>
            <Col>
              <SubButton
                styling="green"
                text="Add Recipe"
                onClick={() => props.setEatRecipe("yes")}
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