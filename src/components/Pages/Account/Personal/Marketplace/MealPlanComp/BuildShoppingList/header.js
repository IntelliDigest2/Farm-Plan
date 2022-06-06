import React, { useState } from "react";

export default function ShoppingListHeader({ value, setValue }) {
  const startDay = value.clone().startOf("week").add(7, "days");
  const endDay = value.clone().endOf("week").add(7, "days");

  function prevWeek() {
    return value.clone().subtract(7, "days");
  }

  function nextWeek() {
    return value.clone().add(7, "days");
  }

  return (
    <div className="header">
      <div className="previous" onClick={() => setValue(prevWeek())}>
        {String.fromCharCode(171)}
      </div>
      <div className="current">
        Shopping list for {startDay.format("DD MMMM")} -{" "}
        {endDay.format("DD MMMM")}
      </div>
      <div className="next" onClick={() => setValue(nextWeek())}>
        {String.fromCharCode(187)}
      </div>
    </div>
  );
}
