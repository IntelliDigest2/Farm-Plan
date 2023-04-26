import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";  
import { useTranslation, Trans } from 'react-i18next';


import buildCalendar from "../BuildCalendar/Build";
import dayStyles, { beforeToday } from "../BuildCalendar/dayStyles";
import CalendarHeader from "../BuildCalendar/header";

import { SubButton } from "../../../../../SubComponents/Button";

import { connect } from "react-redux";
import { createMealPlanData } from "../../../../../../store/actions/marketplaceActions/mealPlanData";
import { addToShoppingList } from "../../../../../../store/actions/marketplaceActions/shoppingListData";

function AddToCalendar(props) {
  const { t } = useTranslation();

  const [calendar, setCalendar] = useState([]);
  const handleFormClose = () => props.setShow(false);
 
  useEffect(() => {
    setCalendar(buildCalendar(props.value));
  }, [props.value]);

  //fired when click "add"
  const handleSubmit = () => {
    let data;
    //data is a little different between saved meals and searched meals
    if (props.saved && !props.selected.nonNativeData) {
      data = {
        // month and day are used for the MealPlan db, year and week for the shopping list.
        year: props.value.format("YYYY"),
        month: props.value.format("YYYYMM"),
        week: props.value.format("w"),
        day: props.value.format("DD"),
        upload: {
          meal: props.selected.meal,
          mealType: props.selected.mealType,
          ingredients: props.selected.ingredients,
        },
      };
    } else {
      data = {
        year: props.value.format("YYYY"),
        month: props.value.format("YYYYMM"),
        week: props.value.format("w"),
        day: props.value.format("DD"),
        upload: {
          meal: props.selected.meal,
          ingredients: props.selected.ingredients,
          mealType: props.selected.mealType,
          totalNutrients: props.selected.totalNutrients,
          totalDaily: props.selected.totalDaily,
          yield: props.selected.yield,
          url: props.selected.url,
          nonNativeData: true,
        },
      };
    }

    props.createMealPlanData(data);
    props.addToShoppingList(data);
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleFormClose}
        size="lg"
        aria-labelledby="add-to-calendar"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="add-to-calendar">
          {t('description.add')}  {props.selected.meal} {t('description.to_calendar')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="calendar" style={{ maxWidth: "100%" }}>
              <CalendarHeader value={props.value} setValue={props.onChange} />
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
                        onClick={() => !beforeToday(day) && props.onChange(day)}
                      >
                        <div className={dayStyles(day, props.value)}>
                          {day.format("D").toString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <SubButton
              styling="green"
              text="Add"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
                handleFormClose();
              }}
            />
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMealPlanData: (mealPlan) => dispatch(createMealPlanData(mealPlan)),
    addToShoppingList: (data) => dispatch(addToShoppingList(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddToCalendar);
