import React, { useState, useEffect } from "react";
import { Alert, Form } from "react-bootstrap"; // Added Form from react-bootstrap

import { AddPlanModal } from "./Icons/AddPlanModal";
import { useTranslation } from 'react-i18next';

import MyPlans from "./plans";

export const CalendarPlan = ({ value, onChange }) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [lunchType, setLunchType] = useState("school"); // State for lunch type selection

  // State for calendar and useEffect to simulate fetching data
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    // Simulate fetching calendar data
    // Replace with actual data fetching logic as needed
    const fetchData = async () => {
      // Example fetch call:
      // const result = await fetchCalendarData();
      // setCalendar(result);
      setCalendar(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    };
    fetchData();
  }, []);

  // Function to get chosen day formatted as "Day Date"
  const chosenDay = () => {
    return value.format("dddd DD/MM");
  };

  // Handler function to update lunch type selection
  const handleLunchTypeChange = (event) => {
    setLunchType(event.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="col-8" style={{textAlign: "left"}}>
          {t('description.changes_to_mealplan')}  🙂
        </div>
        <div className="col-4" style={{textAlign: "right"}}>
          <AddPlanModal value={value} show={show} setShow={setShow} />
        </div>
      </div>
      <Alert variant="primary">
        {t('description.changes_to_mealplan')}
      </Alert>

      {/* Added Form.Group and Form.Check for lunch type selection */}
      <Form.Group className="mt-3">
        <Form.Label>Select Lunch Type:</Form.Label>
        <div key="inline-radio" className="mb-3">
          <Form.Check 
            inline 
            label="School Lunch" 
            type="radio" 
            id="school-lunch" 
            value="school" 
            checked={lunchType === "school"} 
            onChange={handleLunchTypeChange} 
          />
          <Form.Check 
            inline 
            label="Packed Lunch" 
            type="radio" 
            id="packed-lunch" 
            value="packed" 
            checked={lunchType === "packed"} 
            onChange={handleLunchTypeChange} 
          />
        </div>
      </Form.Group>

      <div className="plan-box">
        <div className="header">{chosenDay()}</div>
        {/* Pass lunchType to MyPlans component */}
        <MyPlans value={value} show={show} lunchType={lunchType} />
      </div>
    </>
  );
};