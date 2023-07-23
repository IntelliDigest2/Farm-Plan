import React, { useState, useEffect } from "react";

import "./ProduceTab.css";
import { PageWrapFarm } from "../../../../../SubComponents/PageWrapFarm";
import LoadingScreen from "../../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

import { ItemPlan } from "./ItemPlan";
import moment from "moment";
import ChartProduce from "../../../Charts/ChartProduce";

export default function ItemTab() {

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  });

  const [value, setValue] = useState(moment());

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <PageWrapFarm goTo="/account" header="Produce">
      {/* <WaveLoader /> */}
      <Tabs
        defaultActiveKey="calendar"
        id="meal-plan-tabs"
        className="mb-3 mealtabs basic-title"
        fill
      >
        <Tab eventKey="calendar" title="ITEM LIST" className="mealtab">
          <ItemPlan value={value} onChange={setValue} />
        </Tab>
        <Tab eventKey="recipes" title="ITEM CHART" className="mealtab">
          <ChartProduce />
          <h2>Items Summary</h2>
        </Tab>
      </Tabs> 

      {/* input available locations for picking up */}
      {/* shopping list */}
    </PageWrapFarm>
  );
}
