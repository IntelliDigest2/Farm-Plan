import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

import { AddItemModal } from "./Icons/AddItemModal";


import ShopItems from "./shopItems";

export const ItemPlan = ({ value, onChange }) => {
  const [calendar, setCalendar] = useState([]);
  const [show, setShow] = useState(false);

  function chosenDay() {
    return value.format("dddd DD/MM");
  }



  return (
    <>
      <div className="row">
        <div className="col-8" style={{textAlign: "left"}}>Add Items to your listings  🙂</div>
        <div className="col-4" style={{textAlign: "right"}}><AddItemModal value={value} show={show} setShow={setShow} /></div>

      </div>
      <div className="plan-box">
        <div className="header">{chosenDay()}</div>
        <div><ShopItems value={value} show={show} /></div>
      </div>
    </>
  );
};
 