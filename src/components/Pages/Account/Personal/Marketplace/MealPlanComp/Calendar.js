import React, { useState, useEffect } from "react";

import { AddMealModal } from "./AddMealModal";

import buildCalendar from "./Build";
import dayStyles, { beforeToday } from "./dayStyles";
import CalendarHeader from "./header";

import MyMeals from "./meals";

export const Calendar = ({ value, onChange, tab, update, forceUpdate }) => {
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
      <div className="display">
        <div className="plan-box">
          <div className="header">{chosenDay()}</div>
          <MyMeals
            value={value}
            show={show}
            update={update}
            tab={tab}
            forceUpdate={forceUpdate}
          />
          <AddMealModal
            value={value}
            show={show}
            setShow={setShow}
            forceUpdate={forceUpdate}
          />
        </div>
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
                    onClick={() => !beforeToday(day) && onChange(day)}
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
      </div>
    </>
  );
};
