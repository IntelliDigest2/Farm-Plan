import React, { useState, useEffect } from "react";

import { useTranslation, Trans } from "react-i18next";
import { Row, Col } from "react-bootstrap";

import MealsBoxRecipe from "./MealsBoxRecipe";
import { connect } from "react-redux";
import { getMenus } from "../../../../../store/actions/marketplaceActions/restaurantData";
import { AddMenuModal } from "./Icons/AddMenuModal";
import { Dropdown } from "./../../../../SubComponents/Dropdown";

const SavedMeals = (props) => {
	const { t } = useTranslation();

	const [menus, setMenus] = useState([]);
	const [weeklyMeals, setWeeklyMeals] = useState([]);

	const [show, setShow] = useState(false);
	const [menuSection, setMenuSection] = useState("All");
	// const [first, setfirst] = useState(second);

	//trigger this when editing/deleting items
	// const [update, setUpdate] = useState(0);
	// const forceUpdate = () => {
	// 	setUpdate(update + 1);
	// };

	//this sends data request
	useEffect(() => {
		props.getMenus();
	}, []);

	const menuSections = [
		"All",
		"Any",
		"Breakfast",
		"Lunch",
		"Dinner",
		"Snack",
		"Brunch",
		"Large Plates",
		"Small Plates",
		"Sides",
		"Dessert",
	];

	// const updateSMeals = async () => {
	// 	//clears the meals array before each update- IMPORTANT
	// 	setSMeals([]);

	// 	//sets a new meal object in the array for every document with this date attached
	// 	props.Menus.forEach((doc) => {
	// 		var mealName = doc.meal;
	// 		var ingredients = doc.ingredients;
	// 		var id = doc.id;
	// 		var mealType = doc.mealType;
	// 		var nonNativeData = doc.nonNativeData;
	// 		var totalDaily = doc.totalDaily;
	// 		var totalNutrients = doc.totalNutrients;
	// 		var url = doc.url;
	// 		var recipeYield = doc.yield;

	// 		if (nonNativeData) {
	// 			setSMeals((sMeals) => [
	// 				...sMeals,
	// 				{
	// 					meal: mealName,
	// 					mealType: mealType,
	// 					ingredients: ingredients,
	// 					id: id,
	// 					nonNativeData: nonNativeData,
	// 					totalDaily: totalDaily,
	// 					totalNutrients: totalNutrients,
	// 					url: url,
	// 					recipeYield: recipeYield,
	// 				},
	// 			]);
	// 		} else {
	// 			setSMeals((sMeals) => [
	// 				...sMeals,
	// 				{
	// 					meal: mealName,
	// 					mealType: mealType,
	// 					ingredients: ingredients,
	// 					id: id,
	// 				},
	// 			]);
	// 		}
	// 	});
	// };

	// useEffect(() => {
	// 	// const sorted = sMeals.sort((a, b) => a.meal.localeCompare(b.meal));
	// 	updateSMeals();
	// 	// console.log("Saved Meals", sMeals);
	// 	// .then(setSMeals(sorted));
	// 	// console.log(props.data);
	// }, [props.Menus]);
	useEffect(() => {}, [props.Menus]);
	console.log(props.Menus, `these are the menus`);

	useEffect(() => {
		if (menuSection === "All") {
			setMenus(props.Menus);
		} else {
			const newMenu = props.Menus.filter((menu) => {
				return menu.menuSection === menuSection;
			});
			setMenus(newMenu);
		}
	}, [menuSection, props.Menus]);

	let allMenus =
		menus === null ? (
			"...loading"
		) : menus?.length > 0 ? (
			// props.Menus.map((menu) => {
			// return (
			<MealsBoxRecipe
				// forceUpdate={forceUpdate}
				onChange={props.onChange}
				meals={menus}
			/>
		) : (
			<div>menu list empty</div>
		);

	return (
		<>
			<Row className="row">
				<Col className="col-8 basic-title-left mb-3">
					{t("description.restaurant_menu")}
				</Col>
				<Col
					style={{ display: "flex", justifyItems: "space-evenly" }}
					className="col-4"
				>
					Add New Menu{" "}
					<AddMenuModal value={props.value} show={show} setShow={setShow} />
				</Col>
			</Row>
			<Row>
				<Col className="col-2"> Filter by </Col>
				<Col className="col-3">
					<Dropdown
						id="menu-section"
						styling="green dropdown-input"
						data={menuSection}
						items={menuSections}
						function={(e) => setMenuSection(e)}
					/>
				</Col>
			</Row>
			<div>{allMenus}</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		Menus: state.restaurant.savedMenus,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getMenus: () => dispatch(getMenus()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMeals);
