import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import EatNowLater from './EatNowLater';
import EatNowRecipe from "./EatNowRecipe";
import AddMealForm from "./AddMealForm";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import Scanner from "../../../../../../SubComponents/QRCode/Scanner";
import ScannerPrepared from "../../../../../../SubComponents/QRCode/ScannerPrepared";


export function PreparedOrRaw({ value }) {
  const [raw, setRaw] = useState("unconfirmed");
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
    setRaw("unconfirmed");
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
            Add new meal for 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <YesOrNo
            raw={raw}
            setRaw={setRaw}
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
          </YesOrNo>
        </Modal.Body>
      </Modal>
    </>
  );
}

function YesOrNo(props) {
  switch (props.raw) {
    default:
    case "unconfirmed":
      return (
        <>
          <div className="basic-title-left">
            Prepared Or Raw
          </div>
          <Row>
            <Col>
              <SubButton
                styling="green"
                text="Prepared"
                onClick={() => props.setRaw("no")}
              />
            </Col>
            <Col>
              <SubButton
                styling="green"
                text="Raw"
                onClick={() => props.setRaw("yes")}
              />
            </Col>
          </Row>
        </>
      );
    case "no":
      return <EatNowLater value={props.value} handleFormClose={props.handleFormClose} />;
    case "yes":
      return <EatNowRecipe value={props.value} handleFormClose={props.handleFormClose} />;
  }
}