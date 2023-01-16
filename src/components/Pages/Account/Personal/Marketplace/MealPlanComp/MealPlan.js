import React, { useState, useEffect } from "react";

import "./Mealplan.css";
import { PageWrap } from "../../../../../SubComponents/PageWrap";
import LoadingScreen from "../../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

import { Calendar } from "./Calendar";
import { CalendarShop } from "./CalendarShop";
import { CalendarPlan } from "./CalendarPlan";
import  CalendarPlanner from './Plan/CalendarPlanner/CalendarPlanner'


import SavedMeals from "./SavedMeals";
import RecipeSearch from "./Search/RecipeSearch";
import { ShoppingList } from "./BuildShoppingList/ShoppingList";
import moment from "moment";
import { Inventory } from "./Inventory";
// import WaveLoader from "../../../../../SubComponents/Loading/WaveLoader";

export default function MealPlan() {

  const [loading, setLoading] = useState(true);
  const [getItems, setGetItems] = useState([])
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  });

  const [value, setValue] = useState(moment());

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <PageWrap goTo="/account" header="My Plan to Save">
      {/* <WaveLoader /> */}
      <Tabs
        defaultActiveKey="calendar"
        id="meal-plan-tabs"
        className="mb-3 mealtabs basic-title"
      >
        <Tab eventKey="calendar" title="MEAL DIARY" className="mealtab">
          {/* Calender returns daily meal plan and monthly calendar- since they both use the "value" prop */}
          <Calendar value={value} onChange={setValue} />
        </Tab>
        <Tab eventKey="recipes" title="RECIPES" className="mealtab">
          {/* returns all saved recipes */}
          <SavedMeals value={value} onChange={setValue} />
          {/* search for recipes via api */}
          <RecipeSearch value={value} onChange={setValue} />
        </Tab>
        {/* <Tab eventKey="shopping-list" title="SHOPPING LIST" className="mealtab">
          <ShoppingList value={value} />
        </Tab> */}
        <Tab eventKey="shopscan" title="SHOPPING LIST" className="mealtab">
        <CalendarShop value={value} onChange={setValue} getItems={getItems} />
        </Tab>
        <Tab eventKey="inventory" title="INVENTORY" className="mealtab">
          <Inventory value={value} />
        </Tab>
        <Tab eventKey="mealplanner" title="MEAL PLANNER" className="mealtab">
          <CalendarPlan value={value} onChange={setValue} />
        </Tab>
        <Tab eventKey="plan" title="VIEW PLAN" className="mealtab">
          <CalendarPlanner value={value} getItems={getItems} setGetItems={setGetItems}/>
        </Tab>
      </Tabs> 

      {/* input available locations for picking up */}
      {/* shopping list */}
    </PageWrap>
  );
}
