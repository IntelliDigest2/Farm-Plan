import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import { PreparedOrRaw } from "./PreparedOrRaw";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation, Trans } from 'react-i18next';

export function AddMealModal({ show, setShow, value }) {

  const { t } = useTranslation();

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
          {t('description.add_new_meal_for')} {value.format("DD/MM")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
  const { t } = useTranslation();

  switch (props.eatingOut) {
    default:
    case "unconfirmed":
      return (
        <>
          <div className="basic-title-left">
            {t('description.eat_home_out')}
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
