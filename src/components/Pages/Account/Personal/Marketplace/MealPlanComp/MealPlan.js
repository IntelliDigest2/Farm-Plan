import React, { useState } from "react";

import "./Mealplan.css";
import { PageWrap } from "../../../../SubComponents/PageWrap";
import { Tab, Tabs } from "react-bootstrap";

import { Calendar } from "./Calendar";
import SavedMeals from "./SavedMeals";
import RecipeSearch from "./Search/RecipeSearch";
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
    else if (key === "saved-meals") setTab(1);
    else setTab(2);
  };

  return (
    <PageWrap goTo="/account" header="My Plan to Save" subtitle="My Meal Plan">
      <Tabs
        defaultActiveKey="calendar"
        id="meal-plan-tabs"
        className="mb-3 mealtabs"
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
          {/* search for recipes via api */}
          <RecipeSearch value={value} onChange={setValue} />
        </Tab>
      </Tabs>

      {/* input available locations for picking up */}
      {/* shopping list */}
    </PageWrap>
  );
}
