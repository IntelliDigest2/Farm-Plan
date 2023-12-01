import React from "react";
import { Modal, ModalBody } from "react-bootstrap";
import EdamamBadge from "../../../../../../../images/Edamam_Badge_White.svg";

export default function InfoModal({ show, setShow }) {
  const handleForm = () => setShow(true);
  const handleFormClose = () => {
    setShow(false);
  };

  return (
    <>
      <button className="btn success edamam shadow-none" onClick={handleForm}>
        Info
      </button>
      <Modal
        show={show}
        onHide={handleFormClose}
        size="sm"
        aria-labelledby="info"
        centered
      >
        {/* <a href="https://www.edamam.com/">
          <img src={EdamamBadge} alt="powered by edamam" />
        </a> */}
        <ModalBody>
        <p>If you cannot find your preferred meal, please select a meal closest to the your preferred meal, to help us track the appropriate nutrient</p>
        </ModalBody>
      </Modal>
    </>
  );
}
