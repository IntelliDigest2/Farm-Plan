import React, { useState, useEffect } from "react";

import { AddMealModal } from "./Icons/AddMealModal";
import Scanner from "../../../../../SubComponents/QRCode/Scanner";

import buildCalendar from "./BuildCalendar/Build";
import dayStyles from "./BuildCalendar/dayStyles";
import CalendarHeader from "./BuildCalendar/header";

import MyMeals from "./meals";
import { PreparedOrRaw } from "./Icons/PreparedOrRaw";

export const Calendar = ({ value, onChange }) => {
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
      <div className="calendar">
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
      </div>
      <div className="plan-box">
        <div className="header">{chosenDay()}</div>

        <MyMeals value={value} show={show} />
        <AddMealModal value={value} show={show} setShow={setShow} />
      </div>
    </>
  );
};
