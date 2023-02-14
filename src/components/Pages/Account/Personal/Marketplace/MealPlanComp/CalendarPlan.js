import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

import { AddPlanModal } from "./Icons/AddPlanModal";
import Scanner from "../../../../../SubComponents/QRCode/Scanner";

import buildCalendar from "./BuildCalendar/Build";
import dayStyles from "./BuildCalendar/dayStyles";
import CalendarHeader from "./BuildCalendar/header";

import MyPlans from "./plans";
import { PreparedOrRaw } from "./Icons/PreparedOrRaw";

export const CalendarPlan = ({ value, onChange }) => {
  const [calendar, setCalendar] = useState([]);
  const [show, setShow] = useState(false);

  function chosenDay() {
    return value.format("dddd DD/MM");
  }

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <>
      {/* <div className="calendar">
        <CalendarHeader value={value} setValue={onChange} />
        <div className="body">
          <div className="day-names">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
              <div className="week" key={index}>
                {d}
              </div>
            ))}
          </div>
          {calendar.map((week) => (
            <div key={week}>
              {week.map((day) => (
                <div
                  className="day"
                  key={day.format("D").toString()}
                  onClick={() => onChange(day)}
                >
                  <div className={dayStyles(day, value)}>
                    {day.format("D").toString()}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div> */}
      <div className="row">
        <div className="col-8" style={{textAlign: "left"}}>Want to make changes to your meal plan? Add more meals to your meal plan by clicking the 'plus' button or remove meals from the meal plan by deleting from the meal plan list  🙂</div>
        <div className="col-4" style={{textAlign: "right"}}><AddPlanModal value={value} show={show} setShow={setShow} /></div>
        <Alert variant="primary">
          New to meal planning? Create your 6-Months meal plan by clicking on the 'plus' button, using the search button or your saved meals or the barcode scanner, add at least 7 meals for breakfast, lunch and dinner; then go to the View Plan tab to generate a 6 month meal plan
        </Alert>
      </div>
      <div className="plan-box">
        <div className="header">{chosenDay()}</div>
        <div><MyPlans value={value} show={show} /></div>
      </div>
    </>
  );
};
