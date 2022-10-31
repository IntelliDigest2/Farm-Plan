import React, { useState, useEffect } from "react";

import { AddMealModalShop } from "./Icons/AddMealModalShop";
import Scanner from "../../../../../SubComponents/QRCode/Scanner";

import buildCalendar from "./BuildCalendar/Build";
import dayStyles from "./BuildCalendar/dayStyles";
import CalendarHeader from "./BuildCalendar/header";
import ShoppingListHeader from "./BuildShoppingList/header";

import moment from "moment";

// import MyMeals from "./meals";
import ShopItems from "./BuildShoppingList/ShopItems";

export const CalendarShop = ({ value, onChange }) => {
  const [calendar, setCalendar] = useState([]);
  const [show, setShow] = useState(false);
  const [values, setValue] = useState(moment());

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

        {/* <MyMeals value={value} show={show} /> */}
        <ShoppingListHeader value={value} setValue={setValue} />
        <AddMealModalShop value={values} show={show} setShow={setShow} />
        <ShopItems value={value} show={show} />
      </div>
    </>
  );
};
