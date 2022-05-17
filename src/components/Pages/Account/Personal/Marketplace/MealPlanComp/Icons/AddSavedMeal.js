import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import buildCalendar from "../BuildCalendar/Build";
import dayStyles, { beforeToday } from "../BuildCalendar/dayStyles";
import CalendarHeader from "../BuildCalendar/header";

import { SubButton } from "../../../../../../SubComponents/Button";

import { connect } from "react-redux";
import { createMealPlanData } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";

function AddSavedMeal(props) {
  const [calendar, setCalendar] = useState([]);
  const handleFormClose = () => props.setShow(false);

  useEffect(() => {
    setCalendar(buildCalendar(props.value));
  }, [props.value]);

  const handleSubmit = () => {
    let data;
    if (props.saved) {
      data = {
        month: props.value.format("YYYYMM"),
        day: props.value.format("DD"),
        upload: {
          meal: props.selected.meal,
          mealType: props.selected.mealType,
          ingredients: props.selected.ingredients,
        },
      };
    } else {
      data = {
        month: props.value.format("YYYYMM"),
        day: props.value.format("DD"),
        upload: {
          meal: props.selected.meal,
          ingredients: props.selected.ingredients,
          mealType: props.selected.mealType,
          url: props.selected.url,
          nonNativeData: true,
        },
      };
    }

    props.createMealPlanData(data);
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
            Add {props.selected.meal} to Calendar
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createMealPlanData: (data) => dispatch(createMealPlanData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSavedMeal);
