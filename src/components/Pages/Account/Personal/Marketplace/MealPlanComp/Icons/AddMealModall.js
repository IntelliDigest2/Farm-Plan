import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import { PreparedOrRaw } from "./PreparedOrRaw";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import AddPlanForm from "./AddPlanForm";


export function AddMealModall({ show, setShow, value }) {
  const [eatingOut, setEatingOut] = useState("unconfirmed");

  //control barcode scanner
  const [expand, setExpand] = useState("+ scan from barcode");
  
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
            Add new meal for {value.format("DD/MM")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AddPlanForm value={value} handleFormClose={handleFormClose} />
          <InOrOut
            eatingOut={eatingOut}
            setEatingOut={setEatingOut}
            handleFormClose={handleFormClose}
            value={value}
          >
          </InOrOut>
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
