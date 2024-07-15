import React, { useState, useEffect } from "react";
import "./Mealplan.css";
import { PageWrap } from "../../../../../SubComponents/PageWrap";
import LoadingScreen from "../../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

import { Calendar } from "./Calendar";
import { CalendarPlan } from "./CalendarPlan";
import CalendarPlanner from "./Plan/CalendarPlanner/CalendarPlanner";
import CalendarPlannerSchool from "./Plan/CalendarPlanner/CalendarPlannerSchool";

import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import moment from "moment";

import SavedMeals from "./SavedMeals";
import RecipeSearch from "./Search/RecipeSearch";
import { ShoppingList } from "./BuildShoppingList/ShoppingList";
import { Inventory } from "./Inventory";
import SchoolMeals from "./SchoolMeals";
// import WaveLoader from "../../../../../SubComponents/Loading/WaveLoader";

function MealPlan(props) {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(true); // Initialize loading to true
	const [getItems, setGetItems] = useState([]);
	const [value, setValue] = useState(moment());

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1500);
		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return <LoadingScreen />;
	}

	return (
		<PageWrap goTo="/account" header={t("description.my_plan_to_save")}>
			<Tabs
				defaultActiveKey="calendar"
				id="meal-plan-tabs"
				className="mb-3 mealtabs basic-title"
				fill
			>
				<Tab eventKey="calendar" title={t("description.meal_diary")} className="mealtab">
					<Calendar value={value} onChange={setValue} />
				</Tab>
				<Tab eventKey="recipes" title={t("description.recipe")} className="mealtab">
					<SavedMeals value={value} onChange={setValue} />
					<RecipeSearch value={value} onChange={setValue} />
				</Tab>
				<Tab eventKey="inventory" title={t("description.inventory")} className="mealtab">
					<Inventory value={value} />
				</Tab>
				{props.profile.isSubAccount ? (
					<Tab eventKey="schoolmeals" title="SCHOOL MEALS" className="mealtab">
						<SchoolMeals value={value} onChange={setValue} />
					</Tab>
				) : (
					<CalendarPlan value={value} onChange={setValue} />
				)}
				<Tab eventKey="plan" title={t("description.view_plan")} className="mealtab">
					{props.profile.isSubAccount ? (
						<CalendarPlannerSchool
							value={value}
							getItems={getItems}
							setGetItems={setGetItems}
						/>
					) : (
						<CalendarPlanner
							value={value}
							getItems={getItems}
							setGetItems={setGetItems}
						/>
					)}
				</Tab>
			</Tabs>
		</PageWrap>
	);
}

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
	};
};

export default connect(mapStateToProps, null)(MealPlan);
