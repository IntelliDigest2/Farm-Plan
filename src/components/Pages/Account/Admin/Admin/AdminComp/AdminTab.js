import React, { useState, useEffect } from "react";

import "./AdminTab.css";
import { PageWrapAdmin } from "../../../../../SubComponents/PageWrapAdmin";
import LoadingScreen from "../../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

import Admin from "./Admin";
import moment from "moment";
import ChartProduce from "../../../Charts/ChartProduce";

export default function AdminTab() {

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  });

  const [value, setValue] = useState(moment());

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <PageWrapAdmin goTo="/account" header="Admin">
      {/* <WaveLoader /> */}
      <Tabs
        defaultActiveKey="calendar"
        id="meal-plan-tabs"
        className="mb-3 mealtabs basic-title"
        fill
      >
        <Tab eventKey="calendar" title="Purchase List" className="mealtab">
          <Admin value={value} onChange={setValue} />
        </Tab>
        <Tab eventKey="recipes" title="Items" className="mealtab">
          <h2>Farm</h2>
        </Tab>
      </Tabs> 

      {/* input available locations for picking up */}
      {/* shopping list */}
    </PageWrapAdmin>
  );
}
