import React, { useState, useEffect } from "react";

// import "./Mealplan.css";
import { PageWrapRes } from "../../../../SubComponents/PageWrapRes";
// import LoadingScreen from "../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

import { Calendar } from "../../Personal/Marketplace/MealPlanComp/Calendar";
import SavedProducts from "../Suppliers/SavedProducts";
import RecipeSearch from "../../Personal/Marketplace/MealPlanComp/Search/RecipeSearch";
import { ShoppingList } from "../Restaurant/BuildShoppingList/ShoppingList";
import moment from "moment";
import { Inventory } from "../Restaurant/Inventory";
// import WaveLoader from "../../../../../SubComponents/Loading/WaveLoader";

import { CalendarPlanRes } from "../Restaurant/CalendarPlanRes";
import { CalendarShop } from "./CalendarShop";
import AddProductForm_supply from "./Icons/AddProductForm_supply";

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
        defaultActiveKey="recipes"
        id="meal-plan-tabs"
        className="mb-3 mealtabs basic-title"
      >
        <Tab eventKey="recipes" title="PRODUCT" className="mealtab">
          {/* returns all saved recipes */}
          <SavedProducts value={value} onChange={setValue} />
          {/* search for recipes via api */}
          {/* <RestaurantRecipes value={value} onChange={setValue} /> */}
          <AddProductForm_supply/>

        </Tab>

        {/* <Tab eventKey="menu-preview" title="Menu Preview" className="menupreview"> 
        <MenuPreview/>
        </Tab> */}

        <Tab eventKey="shopping-list" title="STOCK" className="mealtab">
        </Tab>
        <Tab eventKey="inventory" title="SALES" className="mealtab">
        </Tab>
        
      </Tabs>

      {/* input available locations for picking up */}
      {/* shopping list */}
    </PageWrapRes>
  );
}
