import React, { useState } from "react";
import ModalUnstyled from "@mui/material/Modal";
import PTSForm from "./PTSForm";

import { isBrowser } from "react-device-detect";
import blueberries from "../../../../images/Blueberries.jpg";
import pTSNotebook from "../../../../images/pts_plate_notebook-dark.jpg";
import pTSField from "../../../../images/pts_field_standing-dark.jpg";

export function PTSModal({ show, setShow }) {
  const [content, setContent] = useState("start");

  const handleClose = () => {
    setShow(false);
    setContent("start");
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
          <img src={blueberries} alt="create your own plan" width="100%" />
        ) : (
          <img src={pTSField} alt="create your own plan" width="100%" />
        )}

        <button className="close" onClick={handleClose}>
          X
        </button>

        <PTSForm
          content={content}
          setContent={setContent}
          handleClose={handleClose}
        />
      </div>
    </ModalUnstyled>
  );
}
