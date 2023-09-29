import React, { useState, useEffect } from "react";
import { Dropdown } from "../../../../../SubComponents/Dropdown";
import MenuSection from "../../../Personal/Marketplace/MealPlanComp/Search/menuSection";
import MealType from "../../../Personal/Marketplace/MealPlanComp/Search/mealType";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import FoodItemSearch from "../../../Personal/Marketplace/MealPlanComp/Icons/InputRecipe/FoodItemSearch";
import "../../../../../SubComponents/Button.css";
import ClearIcon from "@mui/icons-material/Clear";

import { connect } from "react-redux";
import {
	foodIdAPI,
	nutritionAPI,
} from "../../../Personal/Marketplace/MealPlanComp/Icons/InputRecipe/NutritionApi";
import SaveMealIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/SaveMealIcon";
import { createMenu } from "../../../../../../store/actions/marketplaceActions/restaurantData";
import { submitNotification } from "./../../../../../lib/Notifications";
import { AddButton } from "./../../../../../SubComponents/Button";

function AddMealForm_restaurant(props) {
	const [mealName, setMealName] = useState("");
	const [mealDescription, setMealDescription] = useState("");
	const [mealPrice, setMealPrice] = useState(0);
	const [mealCurrency, setMealCurrency] = useState("$");
	const [menuSection, setMenuSection] = useState("");
	const [createMenuLoading, setCreateMenuLoading] = useState(false);
	// const [mealType, setMealType] = useState("");
	const [err, setErr] = useState("");

	//saves recipe to saved meal list
	const [save, setSave] = useState(true);
	const handleSave = () => {
		setSave(!save);
	};

	//controls local state of ingredient as we fetch data for it,
	//once ingredient is "added" it will be moved to ingredient array
	const defaultLocal = {
		food: "",
		quantity: 0,
		measure: "g",
		foodId: "",
	};

	const defaultFoodItem = [
		{ id: 1, ingredientName: "", ingredientQuantity: "", ingredientUnit: "g" },
	];

	const [inputGroups, setInputGroups] = useState(defaultFoodItem);

	const [local, setLocal] = useState(defaultLocal);
	const handleLocal = (e) => {
		if (e.target.textContent) {
			setLocal({ ...local, [e.target.id]: e.target.textContent });
		} else {
			setLocal({ ...local, [e.target.id]: e.target.value });
		}
	};
	const handleFoodSearch = (e) => {
		if (e.target.textContent) {
			setLocal({ ...local, food: e.target.textContent });
		} else {
			setLocal({ ...local, food: e.target.value });
		}
	};

	//when local.food changes, fetch the id for the food item
	//which is needed to fetch nutrition
	const setFoodId = (foodId) => {
		setLocal({ ...local, foodId: foodId });
	};

	const [ingredients, setIngredients] = useState([]);
	const handleIngredient = async () => {
		if (local.food !== "") {
			foodIdAPI(local.food, setFoodId).then(() => {
				setIngredients((ingredients) => [...ingredients, local]);
				setLocal(defaultLocal);
			});
		} else {
			setErr("Please input an ingredient to add.");
		}
	};
	useEffect(() => {
		console.log("ingredients", ingredients);
	}, [ingredients]);

	const handleIngredientNameChange = (index, value) => {
		// console.log(id);
		// inputGroups[id].nutrientName = e.target.value;
		// let inp = { nutrientName: e.target.value };

		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, ingredientName: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	const handleIngredientQuantityChange = (index, value) => {
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, ingredientQuantity: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	const handleIngredientUnit = (index, value) => {
		// console.log(value);
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, ingredientUnit: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	function deleteIngredientHandler(index) {
		const updatedInputGroups = inputGroups.filter((group, i) => i !== index);
		setInputGroups(updatedInputGroups);
	}

	function addIngredientHandler() {
		if (inputGroups.length <= 5) {
			setInputGroups([
				...inputGroups,
				{
					id: inputGroups.length + 1,
					ingredientName: "",
					ingredientQuantity: "",
					ingredientUnit: "g",
				},
			]);
		}
	}

	let ingredientGroup = inputGroups.map((group, index) => {
		return (
			<>
				<InputGroup key={`nut-${index}`} style={{ margin: "5px 0" }}>
					<Col md={7}>
						<Form.Control
							// id="Name"
							type="text"
							// min="0"
							// step=".5"
							required
							onChange={(e) =>
								handleIngredientNameChange(index, e.target.value)
							}
							value={group.ingredientName}
							placeholder="ingredient name"
						/>
					</Col>
					<Col md={2}>
						<Form.Control
							// id="nutrientQuantity"
							type="number"
							min="0"
							required
							// step=".5"
							onChange={(e) =>
								handleIngredientQuantityChange(index, e.target.value)
							}
							value={group.ingredientQuantity}
							// function={(e) => {
							//   setLocal({ ...local, measure: e });
							// }}
							placeholder="qty"
						/>
					</Col>
					<Col md={2}>
						<Dropdown
							// id="nutrientUnit"
							styling="grey dropdown-input"
							data={group.ingredientUnit}
							// data={local.measure}
							required
							items={["g", "kg", "/", "mL", "L", "/", "tsp", "tbsp", "cups"]}
							function={(e) => handleIngredientUnit(index, e)}
						/>
					</Col>
					<Col md={1}>
						{index >= 1 ? (
							<ClearIcon
								onClick={() => deleteIngredientHandler(index)}
							></ClearIcon>
						) : (
							""
						)}
					</Col>
				</InputGroup>
			</>
		);
	});

	const ingredientsList = ingredients.map((ingredient, index) => {
		return (
			<li key={index}>
				{ingredient.food}: {ingredient.quantity}
				{ingredient.measure}
			</li>
		);
	});

	//trigger this when editing/deleting items
	const [update, setUpdate] = useState(0);
	const forceUpdate = () => {
		setUpdate(update + 1);
	};

	//fired when click "done"
	const handleSubmit = () => {
		const data = {
			// month and day are used for the MealPlan db, year and week for the shopping list.
			// year: props.value.format("YYYY"),
			// month: props.value.format("YYYYMM"),
			// week: props.value.format("w"),
			// day: props.value.format("DD"),
			upload: {
				meal: mealName,
				mealDescription: mealDescription,
				mealPrice: mealPrice,
				mealCurrency: mealCurrency,
				menuSection: menuSection,
				// mealType: mealType,
				ingredients: ingredients,
				restaurantName: props.profile.restaurantName,
				city: props.profile.city,
				region: props.profile.region,
				country: props.profile.country,
				mobile: props.profile.mobile,
				email: props.profile.email,
			},
		};

		// props.createMealPlanData(data);
		// forceUpdate();

		// if (save) {

		setCreateMenuLoading(true);
		props
			.createMenu(data)
			.then(() => {
				submitNotification("Success", "Menu Created");
				setCreateMenuLoading(false);
			})
			.catch((err) => {
				submitNotification("Error", "Something went wrong");
				setCreateMenuLoading(false);

				// dispatch({ type: "CREATE_MENUS_ERROR", err });
			});
		// }
		// props.addToShoppingList(data);
	};

	return (
		<Form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
				// props.handleFormClose();
			}}
		>
			{/* <button
        onClick={() => {
          nutritionAPI(local);
        }}
      >
        send test
      </button> */}
			<MenuSection setMenuSection={setMenuSection} ownRecipe={true} />

			<Form.Group>
				<Form.Label>Dish name</Form.Label>
				<Form.Control
					type="text"
					id="mealName"
					onChange={(e) => {
						setMealName(e.target.value);
					}}
					required
				/>

				<Form.Label>Description</Form.Label>
				<Form.Control
					type="text"
					id="mealDescription"
					onChange={(e) => {
						setMealDescription(e.target.value);
					}}
				/>

				<Form.Label>Price</Form.Label>
				<InputGroup>
					<Form.Control
						id="mealPrice"
						type="number"
						min="0"
						step="1"
						onChange={(e) => {
							setMealPrice(e.target.value);
						}}
						defaultValue={mealPrice}
					/>
					<Dropdown
						id="currency"
						styling="grey dropdown-input"
						data={mealCurrency}
						items={["$", "€", "£"]}
						function={(e) => {
							setMealCurrency(e);
						}}
					/>
				</InputGroup>
			</Form.Group>

			<div style={{ padding: "0 0 0 4%" }}>
				<ul>{ingredientsList}</ul>
			</div>

			<Form.Group>
				{/* <Form.Label>Ingredient</Form.Label> */}
				{/* <Form.Control
          type="text"
          id="food"
          onChange={(e) => handleLocal(e)}
          value={local.food}
        /> */}
				<FoodItemSearch handleFoodSearch={handleFoodSearch} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Weight/Volume</Form.Label>
				<InputGroup>
					<Form.Control
						id="quantity"
						type="number"
						min="0"
						step=".1"
						onChange={(e) => handleLocal(e)}
						value={local.quantity}
					/>
					<Dropdown
						id="measure"
						styling="grey dropdown-input"
						data={local.measure}
						items={["g", "kg", "/", "mL", "L", "/", "tsp", "tbsp", "cups"]}
						function={(e) => {
							setLocal({ ...local, measure: e });
						}}
					/>
				</InputGroup>
			</Form.Group>

			<Form.Group>
				<Button
					className="green-btn shadow-none"
					id="add ingredient"
					onClick={() => {
						handleIngredient();
					}}
				>
					Add Ingredient
				</Button>
			</Form.Group>
			<Form.Group>
				<Form.Label>Add Dish Ingredients</Form.Label>

				<AddButton onClick={addIngredientHandler} />

				<Row style={{ width: "100%", alignItems: "center" }}>
					{ingredientGroup}
				</Row>
			</Form.Group>

			{/* <Form.Group>
        <Form.Check
          type="checkbox"
          defaultChecked
          label="Save meal"
          onClick={() => handleSave()}
        />
      </Form.Group> */}

			<div style={{ alignItems: "center" }}>
				<Button
					className="blue-btn shadow-none"
					type="submit"
					onClick={() => handleSave()}
				>
					{/* <Button className="blue-btn shadow-none" type="submit"> */}
					Submit
				</Button>
			</div>
		</Form>
	);
}

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createMenu: (data) => dispatch(createMenu(data)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddMealForm_restaurant);
