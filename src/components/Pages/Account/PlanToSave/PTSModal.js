import React, { useState } from "react";
import ModalUnstyled from "@mui/material/Modal";
import PTSForm from "./PTSForm";

import { isBrowser } from "react-device-detect";
import pTSNotebook from "../../../../images/pts_plate_notebook-dark.jpg";
import pTSField from "../../../../images/pts_field_standing-dark.jpg";

export function PTSModal({ show, setShow }) {
  const [content, setContent] = useState("start");

  const handleClose = () => {
    setShow(false);
  };

  return (
    <ModalUnstyled
      open={show}
      onClose={handleClose}
      aria-labelledby="plan to save title"
      color="default"
    >
      <div className="pts-modal">
        {isBrowser ? (
          <img src={pTSNotebook} alt="create your own plan" width="100%" />
        ) : (
          <img src={pTSField} alt="create your own plan" width="100%" />
        )}

        <button className="close" onClick={handleClose}>
          X
        </button>
        <div className="title">JOIN THE PLAN TO SAVE!</div>
        <PTSForm
          content={content}
          setContent={setContent}
          handleClose={handleClose}
        />
      </div>
    </ModalUnstyled>
  );
}
