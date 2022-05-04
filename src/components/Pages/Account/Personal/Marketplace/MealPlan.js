import React, { useState } from "react";

import "./MealPlanComp/Mealplan.css";
import { PageWrap } from "../../../SubComponents/PageWrap";
import { Tab, Tabs } from "react-bootstrap";

import { Calendar } from "./MealPlanComp/Calendar";
import SavedMeals from "./MealPlanComp/SavedMeals";
import moment from "moment";

export default function MealPlan() {
  const [value, setValue] = useState(moment());
  const [tab, setTab] = useState(0);

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  const handleSelect = (key) => {
    if (key === "calendar") setTab(0);
    else setTab(1);
  };

  return (
    <PageWrap goTo="/account" header="My Plan to Save" subtitle="My Meal Plan">
      <Tabs
        defaultActiveKey="calendar"
        id="meal-plan-tabs"
        className="mb-3"
        onSelect={handleSelect}
      >
        <Tab eventKey="calendar" title="Calendar">
          {/* Calender returns daily meal plan and monthly calendar- since they both use the "value" prop */}
          <Calendar
            value={value}
            onChange={setValue}
            tab={tab}
            update={update}
            forceUpdate={forceUpdate}
          />
        </Tab>
        <Tab eventKey="saved-meals" title="My Saved Meals">
          {/* returns all saved meals */}
          <SavedMeals
            update={update}
            forceUpdate={forceUpdate}
            value={value}
            tab={tab}
            onChange={setValue}
          />
        </Tab>
        <Tab eventKey="search" title="Search">
          {/* search via API */}
          <h1>:P</h1>
        </Tab>
      </Tabs>

      {/* input available locations for picking up */}
      {/* shopping list */}
    </PageWrap>
  );
}
