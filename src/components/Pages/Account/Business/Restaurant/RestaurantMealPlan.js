import React, { useState, useEffect } from "react";

// import "./Mealplan.css";
import { PageWrap } from "./../../../../SubComponents/PageWrap";

// import LoadingScreen from "../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

import { Calendar } from "../../Personal/Marketplace/MealPlanComp/Calendar";
import SavedMeals from "../../Business/Restaurant/SavedMeals";
import RecipeSearch from "../../Personal/Marketplace/MealPlanComp/Search/RecipeSearch";
import { ShoppingList } from "../Restaurant/BuildShoppingList/ShoppingList";
import moment from "moment";
import { Inventory } from "../../Business/Restaurant/Inventory";
// import WaveLoader from "../../../../../SubComponents/Loading/WaveLoader";
import AddMealForm_restaurant from "../Restaurant/Icons/AddMealForm_restaurant";
import MenuPreview from "./MenuPreview";

import { CalendarPlanRes } from "../../Business/Restaurant/CalendarPlanRes";
import { CalendarShop } from "./CalendarShop";

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
		<PageWrap goTo="/account" header="Dashboard">
			{/* <WaveLoader /> */}
			<Tabs
				defaultActiveKey="recipes"
				id="meal-plan-tabs"
				className="mb-3 mealtabs basic-title"
			>
				<Tab eventKey="recipes" title="CREATE MENU" className="mealtab">
					{/* returns all saved recipes */}
					<SavedMeals value={value} onChange={setValue} />
					{/* search for recipes via api */}
					{/* <RestaurantRecipes value={value} onChange={setValue} /> */}
					{/* <AddMealForm_restaurant/> */}

					{/* <MenuPreview /> */}
				</Tab>

				{/* <Tab eventKey="menu-preview" title="Menu Preview" className="menupreview"> 
        <MenuPreview/>
        </Tab> */}

				<Tab eventKey="shopping-list" title="SHOPPING LIST" className="mealtab">
					<CalendarShop value={value} />
				</Tab>
				<Tab eventKey="inventory" title="INVENTORY" className="mealtab">
					<Inventory value={value} />
				</Tab>
				<Tab eventKey="meals" title="MEALS" className="mealtab">
					<CalendarPlanRes value={value} onChange={setValue} />
				</Tab>
			</Tabs>

			{/* input available locations for picking up */}
			{/* shopping list */}
		</PageWrap>
	);
}
