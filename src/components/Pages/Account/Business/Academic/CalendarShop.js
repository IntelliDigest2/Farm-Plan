import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

import { AddMealModalShop } from "./Icons/AddMealModalShop";

import buildCalendar from "./BuildCalendar/Build";
import dayStyles from "./BuildCalendar/dayStyles";
import CalendarHeader from "./BuildCalendar/header";
import ShoppingListHeader from "./BuildShoppingList/header";

import { useTranslation, Trans } from 'react-i18next';


import moment from "moment";

// import MyMeals from "./meals";
import ShopItems from "./BuildShoppingList/ShopItems";

export const CalendarShop = ({ value, onChange }) => {

  const { t } = useTranslation();

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
      <div className="row">
        <div className="col-8" style={{textAlign: "left"}}>{t('description.add_other_items')}🙂</div>
        <div className="col-4" style={{textAlign: "right"}}><AddMealModalShop value={values} show={show} setShow={setShow} /></div>
        <Alert variant="primary">
        {t('description.order_all_food_text')}
        </Alert>
      </div>
      <div className="plan-box">
        <div className="header">{chosenDay()}</div>
        <ShoppingListHeader value={value} setValue={setValue} />
        {/* <MyMeals value={value} show={show} /> */}
        <ShopItems value={value} show={show} />
      </div>
    </>
  );
};
