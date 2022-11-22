import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import { PreparedOrRaw } from "./PreparedOrRaw";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import Scanner from "../../../../../../SubComponents/QRCode/Scanner";
import AddPlanForm from "./AddPlanForm";

export function AddPlanModal({ show, setShow, value }) {
  const [eatingOut, setEatingOut] = useState("unconfirmed");

  //control barcode scanner
  const [scan, setScan] = useState(false);
  //scanning items will add item as a meal in meal plan including nutrition info and ingrs if information available
  
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
            Create 6-Months meal plan from {value.format("DD/MM")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <AddPlanForm value={value} handleFormClose={handleFormClose} />
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
      return <PreparedOrRaw value={props.value}/>;
  }
}
