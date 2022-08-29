import React, { useState } from "react";

export default function NutrientsBoxHeader({ value, setValue }) {
//   const startDay = value.clone().startOf("week");
//   const endDay = value.clone().endOf("week");

  function prevDay() {
    return value.clone().subtract(1, "days");
  }

  function nextDay() {
    return value.clone().add(1, "days");
  }

  return (
    <div className="header" style={{display: "flex", justifyContent: "center"}}>
      <div className="header previous" onClick={() => setValue(prevDay())}  style={{marginRight: "auto", paddingLeft: "10px"}}>
        {String.fromCharCode(171)}
      </div>
      <div className="header">
        Nutritional Information for {value.format("DD MMMM")}
      </div>
      <div className="header next" onClick={() => setValue(nextDay())} style={{marginLeft: "auto", paddingRight: "10px"}}>
        {String.fromCharCode(187)}
      </div>
    </div>
  );
}
