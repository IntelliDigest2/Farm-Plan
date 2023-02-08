import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import AddMealFormRecipe from "./AddMealFormRecipe";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import ScannerShop from "../../../../../../SubComponents/QRCode/ScannerShop";

export function AddMealModalRecipe({ show, setShow, value }) {
  const [eatingOut, setEatingOut] = useState("unconfirmed");

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
            Add To Saved Meals
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
              <ScannerShop handleFormClose={handleFormClose} />
            ) : (
              <AddMealFormRecipe handleFormClose={handleFormClose} />
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
