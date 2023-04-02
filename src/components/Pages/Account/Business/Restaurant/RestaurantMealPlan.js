import React, { useState, useEffect } from "react";

// import "./Mealplan.css";
import { PageWrapRes } from "../../../../SubComponents/PageWrapRes";
// import LoadingScreen from "../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

import { Calendar } from "../../Personal/Marketplace/MealPlanComp/Calendar";
import SavedMeals from "../../Business/Restaurant/SavedMeals";
import RecipeSearch from "../../Personal/Marketplace/MealPlanComp/Search/RecipeSearch";
import { ShoppingList } from "../../Personal/Marketplace/MealPlanComp/BuildShoppingList/ShoppingList";
import moment from "moment";
import { Inventory } from "../../Personal/Marketplace/MealPlanComp/Inventory";
// import WaveLoader from "../../../../../SubComponents/Loading/WaveLoader";
import AddMealForm_restaurant from "../Restaurant/Icons/AddMealForm_restaurant";
import MenuPreview from "./MenuPreview";

export default function RestaurantMealPlan() {
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
        defaultActiveKey="calendar"
        id="meal-plan-tabs"
        className="mb-3 mealtabs basic-title"
      >
        <Tab eventKey="calendar" title="MEAL PLAN" className="mealtab">
          {/* Calender returns daily meal plan and monthly calendar- since they both use the "value" prop */}
          <Calendar value={value} onChange={setValue} />
        </Tab>
        <Tab eventKey="recipes" title="CREATE MENU" className="mealtab">
          {/* returns all saved recipes */}
          <SavedMeals value={value} onChange={setValue} />
          {/* search for recipes via api */}
          {/* <RestaurantRecipes value={value} onChange={setValue} /> */}
          <AddMealForm_restaurant/>

          <MenuPreview/> 
        </Tab>

        {/* <Tab eventKey="menu-preview" title="Menu Preview" className="menupreview"> 
        <MenuPreview/>
        </Tab> */}

        <Tab eventKey="shopping-list" title="SHOPPING LIST" className="mealtab">
          <ShoppingList value={value} />
        </Tab>
        <Tab eventKey="inventory" title="INVENTORY" className="mealtab">
          <Inventory value={value} />
        </Tab>
      </Tabs>

      {/* input available locations for picking up */}
      {/* shopping list */}
    </PageWrapRes>
  );
}
