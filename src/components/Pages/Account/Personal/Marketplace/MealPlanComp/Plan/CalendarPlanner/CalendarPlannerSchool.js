import "./calendarStyle.css";
import { useState } from "react";
import Calendar from "./CalendarPlan";
import FullCalendarSchoolApp from "./FullCalendarSchool";
import Details from "./Details";

import { useTranslation, Trans } from 'react-i18next';


export default function CalendarPlanner(props, getItems, setGetItems) {

  const { t } = useTranslation();

  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };

  return (
    <div>
      <h2>{t('description.six_month_plan')}</h2>
      <FullCalendarSchoolApp value={props.value} getItems={getItems} setGetItems={setGetItems}/>
      <br />
      {showDetails && <Details data={data} />}
    </div>
  );
}

