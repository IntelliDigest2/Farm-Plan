import React, { useState, useEffect } from "react";

import "./ProduceTab.css";
import { PageWrap } from "../../../../../SubComponents/PageWrap";
import LoadingScreen from "../../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

// import { Calendar } from "./Calendar";
// import { CalendarShop } from "./CalendarShop";
import { ProducePlan } from "./ProducePlan";
import { ProduceChart } from "../../../Charts/ProduceChart"
// import  CalendarPlanner from './Plan/CalendarPlanner/CalendarPlanner'


// import SavedMeals from "./SavedMeals";
// import RecipeSearch from "./Search/RecipeSearch";
// import { ShoppingList } from "./BuildShoppingList/ShoppingList";
import moment from "moment";
// import { Inventory } from "./Inventory";
// import WaveLoader from "../../../../../SubComponents/Loading/WaveLoader";

export default function ProduceTab() {

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
    <PageWrap goTo="/account" header="Produce">
      {/* <WaveLoader /> */}
      <Tabs
        defaultActiveKey="calendar"
        id="meal-plan-tabs"
        className="mb-3 mealtabs basic-title"
        fill
      >
        <Tab eventKey="calendar" title="PRODUCE LIST" className="mealtab">
          <ProducePlan value={value} onChange={setValue} />
        </Tab>
        <Tab eventKey="recipes" title="PRODUCE CHART" className="mealtab">
          <ProduceChart/>
          <h2>Produce chart here</h2>
        </Tab>
      </Tabs> 

      {/* input available locations for picking up */}
      {/* shopping list */}
    </PageWrap>
  );
}
