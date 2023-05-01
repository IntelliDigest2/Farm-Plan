import React, { useState, useEffect } from "react";

// import "./Mealplan.css";
import { PageWrapRes } from "../../../../SubComponents/PageWrapRes";
// import LoadingScreen from "../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

import SavedProducts from "../Suppliers/SavedProducts";
import moment from "moment";
// import WaveLoader from "../../../../../SubComponents/Loading/WaveLoader";
import AddProductForm_supply from "./Icons/AddProductForm_supply";
import SavedSales from "./SavedSales";
import SavedRent from "./SavedRent";


export default function SupplyPlan() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  });

  const [value, setValue] = useState(moment());

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <PageWrapRes goTo="/account" header="Dashboard">
      {/* <WaveLoader /> */}
      <Tabs
        defaultActiveKey="product"
        id="meal-plan-tabs"
        className="mb-3 mealtabs basic-title"
      >
        <Tab eventKey="sales" title="SALES" className="mealtab">
          {/* returns all saved sales item */}
          <SavedSales value={value} onChange={setValue} />
        </Tab>
        <Tab eventKey="rentage" title="RENTAGE" className="mealtab">
          <SavedRent value={value} onChange={setValue} />
        </Tab>
        <Tab eventKey="product" title="STOCK" className="mealtab">
          {/* returns all saved products */}
          <SavedProducts value={value} onChange={setValue} />
        </Tab>
        <Tab eventKey="add-product" title="ADD PRODUCT" className="mealtab">
          
          <AddProductForm_supply/>

        </Tab>

        {/* <Tab eventKey="menu-preview" title="Menu Preview" className="menupreview"> 
        <MenuPreview/>
        </Tab> */}
        
      </Tabs>

      {/* input available locations for picking up */}
      {/* shopping list */}
    </PageWrapRes>
  );
}
