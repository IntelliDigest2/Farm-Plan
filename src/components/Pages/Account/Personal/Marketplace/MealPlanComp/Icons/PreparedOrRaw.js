import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import AddMealForm from "./AddMealForm";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import Scanner from "../../../../../../SubComponents/QRCode/Scanner";

export function PreparedOrRaw({ value }) {
  const [prepared, setPrepared] = useState("unconfirmed");
  const [show, setShow] = useState(false);


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
    setPrepared("unconfirmed");
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
            prepared={prepared}
            setPrepared={setPrepared}
            handleFormClose={handleFormClose}
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
  switch (props.prepared) {
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
                onClick={() => props.setPrepared("no")}
              />
            </Col>
            <Col>
              <SubButton
                styling="green"
                text="Raw"
                onClick={() => props.setPrepared("yes")}
              />
            </Col>
          </Row>
        </>
      );
    case "yes":
      return <Scanner handleFormClose={props.handleFormClose} />;
    case "no":
      return <>{props.children}</>;
  }
}