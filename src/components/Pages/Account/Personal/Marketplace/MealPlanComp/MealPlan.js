import React, { useState, useEffect } from "react";

import "./Mealplan.css";
import { PageWrap } from "../../../../../SubComponents/PageWrap";
import LoadingScreen from "../../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

import { Calendar } from "./Calendar";
import { CalendarPlan } from "./CalendarPlan";
import CalendarPlanner from "./Plan/CalendarPlanner/CalendarPlanner";

import { useTranslation, Trans } from "react-i18next";

import SavedMeals from "./SavedMeals";
import RecipeSearch from "./Search/RecipeSearch";
import { ShoppingList } from "./BuildShoppingList/ShoppingList";
import moment from "moment";
import { Inventory } from "./Inventory";
// import WaveLoader from "../../../../../SubComponents/Loading/WaveLoader";

export default function MealPlan() {
	const { t } = useTranslation();

	const [loading, setLoading] = useState(false);
	const [getItems, setGetItems] = useState([]);
	useEffect(() => {
		setTimeout(() => setLoading(false), 1500);
	});

	const [value, setValue] = useState(moment());

	// if (loading) {
	// 	return <LoadingScreen />;
	// }

	return (
		<PageWrap goTo="/account" header={t("description.my_plan_to_save")}>
			{/* <WaveLoader /> */}
			<Tabs
				defaultActiveKey="calendar"
				id="meal-plan-tabs"
				className="mb-3 mealtabs basic-title"
				fill
			>
				<Tab
					eventKey="calendar"
					title={t("description.meal_diary")}
					className="mealtab"
				>
					{/* Calender returns daily meal plan and monthly calendar- since they both use the "value" prop */}
					<Calendar value={value} onChange={setValue} />
				</Tab>
				<Tab
					eventKey="recipes"
					title={t("description.recipe")}
					className="mealtab"
				>
					{/* returns all saved recipes */}
					<SavedMeals value={value} onChange={setValue} />
					{/* search for recipes via api */}
					<RecipeSearch value={value} onChange={setValue} />
				</Tab>
				{/* <Tab eventKey="shopping-list" title="SHOPPING LIST" className="mealtab">
          <ShoppingList value={value} />
        </Tab> */}
				
				<Tab
					eventKey="inventory"
					title={t("description.inventory")}
					className="mealtab"
				>
					<Inventory value={value} />
				</Tab>
				<Tab
					eventKey="mealplanner"
					title={t("description.meal_planner")}
					className="mealtab"
				>
					<CalendarPlan value={value} onChange={setValue} />
				</Tab>
				<Tab
					eventKey="plan"
					title={t("description.view_plan")}
					className="mealtab"
				>
					<CalendarPlanner
						value={value}
						getItems={getItems}
						setGetItems={setGetItems}
					/>
				</Tab>
			</Tabs>

			{/* input available locations for picking up */}
			{/* shopping list */}
		</PageWrap>
	);
}
