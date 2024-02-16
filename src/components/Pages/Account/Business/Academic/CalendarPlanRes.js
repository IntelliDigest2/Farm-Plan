import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

import { AddPlanModalRes } from "./Icons/AddPlanModalRes";
import Scanner from "../../../../SubComponents/QRCode/Scanner";

import buildCalendar from "./BuildCalendar/Build";
import dayStyles from "./BuildCalendar/dayStyles";
import CalendarHeader from "./BuildCalendar/header";

import { useTranslation, Trans } from 'react-i18next';


import MyPlans from "./plans";

export const CalendarPlanRes = ({ value, onChange }) => {

  const { t } = useTranslation();

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
        <div className="col-8" style={{textAlign: "left"}}>Add meals to your catalogue  🙂</div>
        <div className="col-4" style={{textAlign: "right"}}><AddPlanModalRes value={value} show={show} setShow={setShow} /></div>
        <Alert variant="primary">
          {t('description.changes_to_mealplan')}
        </Alert>
      </div>
      <div className="plan-box">
        <div className="header">{chosenDay()}</div>
        <div><MyPlans value={value} show={show} /></div>
      </div>
    </>
  );
};
