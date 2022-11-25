import "./calendarStyle.css";
import { useState } from "react";
import Calendar from "./CalendarPlan";
import FullCalendarApp from "./FullCalendar";
import Details from "./Details";

export default function CalendarPlanner() {
  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };

  return (
    <div className="App">
      <h2>6-Months Meal Plan</h2>
      <FullCalendarApp />
      <br />
      {showDetails && <Details data={data} />}
    </div>
  );
}
