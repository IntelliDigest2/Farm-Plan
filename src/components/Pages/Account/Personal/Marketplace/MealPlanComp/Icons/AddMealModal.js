import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import AddMealForm from "./AddMealForm";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";

export function AddMealModal({ show, setShow, value, forceUpdate }) {
  const [eatingOut, setEatingOut] = useState("unconfirmed");
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
          <InOrOut
            eatingOut={eatingOut}
            setEatingOut={setEatingOut}
            handleFormClose={handleFormClose}
          >
            <AddMealForm
              value={value}
              handleFormClose={handleFormClose}
              forceUpdate={forceUpdate}
            />
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
      return <>{props.children}</>;
  }
}
