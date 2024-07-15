import React, { useState, useEffect } from "react";
<<<<<<< HEAD
=======

>>>>>>> parent of 57bc6b3c (TJs changes)
import "./Mealplan.css";
import { PageWrap } from "../../../../../SubComponents/PageWrap";
import LoadingScreen from "../../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";

import { Calendar } from "./Calendar";
import { CalendarPlan } from "./CalendarPlan";
import CalendarPlanner from "./Plan/CalendarPlanner/CalendarPlanner";
import CalendarPlannerSchool from "./Plan/CalendarPlanner/CalendarPlannerSchool";

<<<<<<< HEAD
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import moment from "moment";
=======

import { useTranslation, Trans } from "react-i18next";
import { connect } from "react-redux";
>>>>>>> parent of 57bc6b3c (TJs changes)

import SavedMeals from "./SavedMeals";
import RecipeSearch from "./Search/RecipeSearch";
import { ShoppingList } from "./BuildShoppingList/ShoppingList";
import moment from "moment";
import { Inventory } from "./Inventory";
import SchoolMeals from "./SchoolMeals";
// import WaveLoader from "../../../../../SubComponents/Loading/WaveLoader";

function MealPlan(props) {
	const { t } = useTranslation();
<<<<<<< HEAD
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
=======

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
>>>>>>> parent of 57bc6b3c (TJs changes)
			<Tabs
				defaultActiveKey="calendar"
				id="meal-plan-tabs"
				className="mb-3 mealtabs basic-title"
				fill
			>
<<<<<<< HEAD
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
=======
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
				{ props.profile.isSubAccount ? (
					<Tab
					eventKey="schoolmeals"
					title="SCHOOL MEALS"
					className="mealtab"
				>
					<SchoolMeals 
						value={value} 
						onChange={setValue} 
					/>
				</Tab>
				):(
					<CalendarPlan 
						value={value} 
						onChange={setValue} 
					/>
				)}
				<Tab
					eventKey="plan"
					title={t("description.view_plan")}
					className="mealtab"
				>
					
					{ props.profile.isSubAccount ? (
>>>>>>> parent of 57bc6b3c (TJs changes)
						<CalendarPlannerSchool
							value={value}
							getItems={getItems}
							setGetItems={setGetItems}
						/>
<<<<<<< HEAD
					) : (
=======
					):(
>>>>>>> parent of 57bc6b3c (TJs changes)
						<CalendarPlanner
							value={value}
							getItems={getItems}
							setGetItems={setGetItems}
						/>
					)}
				</Tab>
			</Tabs>
<<<<<<< HEAD
=======

			{/* input available locations for picking up */}
			{/* shopping list */}
>>>>>>> parent of 57bc6b3c (TJs changes)
		</PageWrap>
	);
}

const mapStateToProps = (state) => {
	return {
<<<<<<< HEAD
		profile: state.firebase.profile,
	};
};

export default connect(mapStateToProps, null)(MealPlan);
=======
	  profile: state.firebase.profile,
	};
  };
  

  export default connect(mapStateToProps, null)(MealPlan);

>>>>>>> parent of 57bc6b3c (TJs changes)
