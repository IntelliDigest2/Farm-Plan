import "./calendarStyle.css";
import { useState } from "react";
import Calendar from "./CalendarPlan";
import FullCalendarHealthApp from "./FullCalendarHealth";
import Details from "./Details";

import { useTranslation, Trans } from 'react-i18next';
import { PageWrap } from "../../../../../../../SubComponents/PageWrap";


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
          <PageWrap goTo="/account" header={t("description.my_plan_to_save")}>
          <h2>{t('description.six_month_plan')}</h2>
          <FullCalendarHealthApp value={props.value} getItems={getItems} setGetItems={setGetItems}/>
          <br />
          {showDetails && <Details data={data} />}
          </PageWrap>

      
    </div>
  );
}
