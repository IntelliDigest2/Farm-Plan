import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import EatingOut from "./EatingOut";
import { PreparedOrRaw } from "./PreparedOrRaw";
import { AddButton, SubButton } from "../../../../../../SubComponents/Button";
import Tooltip from "@mui/material/Tooltip";
import Scanner from "../../../../../../SubComponents/QRCode/Scanner";
import AddPlanForm from "./AddPlanForm";
import Breakfast from "../Plan/Forms/Breakfast";
import Lunch from "../Plan/Forms/Lunch";
import Dinner from "../Plan/Forms/Dinner";
import RecipeSearch from "../Plan/Forms/Search/RecipeSearch";
import ScannerPlan from "../../../../../../SubComponents/QRCode/ScannerPlan";

export function AddPlanModal({ show, setShow, value }) {
  const [eatingOut, setEatingOut] = useState("unconfirmed");
  const [page, setPage] = useState(0);
  const [date, setDate] = useState([value])

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
 

  const [formData, setFormData] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
  });

  const componentList = [

    <Breakfast
    value={value} 
    formData={formData}
    setFormData={setFormData} 
    page={page}
    setPage={setPage}
    />,

    <Lunch
    value={value} 
    formData={formData}
    setFormData={setFormData} 
    page={page}
    setPage={setPage}
    />,

    <Dinner
    value={value} 
    formData={formData}
    setFormData={setFormData} 
    page={page}
    setPage={setPage}
    />,

  ];

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
            <button
                  className="btn success shadow-none qrcode-btn"
                  onClick={() => handleSetScan()}
            >
              {expand} 
            </button>
            {scan ? (
              <ScannerPlan value={value} handleFormClose={handleFormClose} />
            ) : (
              <RecipeSearch value={value} />
              )}
        </Modal.Body>
      </Modal>
    </>
  );
}

