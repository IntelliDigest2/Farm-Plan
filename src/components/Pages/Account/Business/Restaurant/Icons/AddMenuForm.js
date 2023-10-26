import React, { useState, useEffect, useRef } from "react";
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
import { foodItemApi } from "./../../../Personal/Marketplace/MealPlanComp/Icons/InputRecipe/FoodItemAPI";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Height } from "@mui/icons-material";

function AddMealForm_restaurant(props) {
	const [mealName, setMealName] = useState("");
	const [mealDescription, setMealDescription] = useState("");
	const [mealPrice, setMealPrice] = useState("");
	const [costPrice, setCostPrice] = useState("");
	const [mealCurrency, setMealCurrency] = useState("$");
	const [menuSection, setMenuSection] = useState("Any");
	const [createMenuLoading, setCreateMenuLoading] = useState(false);
	// const [mealType, setMealType] = useState("");
	const [err, setErr] = useState("");
	const [query, setQuery] = useState("");
	const [response, setResponse] = useState([]);
	const [image, setImage] = useState(null);
	const [metric, setMetric] = useState("");
	const [metricUnit, setMetricUnit] = useState("g");

	useEffect(() => {
		foodItemApi(query, setResponse);
	}, [query]);

	const formRef = useRef(null);

	//saves recipe to saved meal list
	const [save, setSave] = useState(true);

	const handleSave = () => {
		setSave(!save);
	};

	//controls local state of ingredient as we fetch data for it,
	//once ingredient is "added" it will be moved to ingredient array
	const defaultLocal = {
		food: "",
		quantity: "",
		measure: "g",
		foodId: "",
	};

	const defaultIngredient = [{ id: 1, food: "", quantity: "", measure: "g" }];

	const [inputGroups, setInputGroups] = useState(defaultIngredient);
	const [metricGroups, setMetricGroups] = useState([]);

	useEffect(() => {}, [metricGroups]);

	const [local, setLocal] = useState(defaultLocal);
	const handleLocal = (e) => {
		if (e.target.textContent) {
			setLocal({ ...local, [e.target.id]: e.target.textContent });
		} else {
			setLocal({ ...local, [e.target.id]: e.target.value });
		}
	};
	const handleFoodSearch = (index, e) => {
		if (e.target.textContent) {
			setLocal({ ...local, food: e.target.textContent });
			handleIngredientNameChange(index, e.target.textContent);
		} else {
			setLocal({ ...local, food: e.target.value });
			handleIngredientNameChange(index, e.target.value);
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
		// console.log("ingredients", ingredients);
	}, [ingredients]);

	useEffect(() => {}, [inputGroups]);

	// console.log(inputGroups, `these are the inputGroups`);

	const handleIngredientNameChange = (index, value) => {
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, food: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	const handleIngredientQuantityChange = (index, value) => {
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, quantity: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	const handleIngredientUnit = (index, value) => {
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, measure: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	function deleteIngredientHandler(index) {
		console.log(index, `this is the index that we want to delete`);
		const updatedInputGroups = inputGroups.filter((group, i) => i !== index);
		console.log(updatedInputGroups, `this is the updated Input Group`);
		setInputGroups(updatedInputGroups);
	}

	let validity = inputGroups.every((inputGroup) => {
		return (
			inputGroup.food.trim() !== "" &&
			inputGroup.quantity !== "0" &&
			inputGroup.quantity !== 0 &&
			inputGroup.quantity !== ""
		);
	});
	let metricValidity =
		metricGroups.length > 0
			? metricGroups.every((metric) => {
					return (
						metric.metric.trim() !== "" &&
						metric.quantity !== "0" &&
						metric.quantity !== 0 &&
						metric.quantity !== ""
					);
			  })
			: true;

	// console.log(validity, `this is te validity `);

	function addIngredientHandler() {
		if (inputGroups.length <= 5) {
			setInputGroups([
				...inputGroups,
				{
					id: inputGroups.length + 1,
					food: "",
					quantity: "",
					measure: "g",
				},
			]);
		}
	}

	let options;
	if (query === "") {
		options = ["..."];
	} else {
		options = response;
	}

	let ingredientGroup = inputGroups.map((group, index) => {
		return (
			<>
				<InputGroup key={`nut-${index}`} style={{ margin: "5px 0" }}>
					<Col md={7}>
						<Autocomplete
							onInputChange={(e) => {
								setQuery(e.target.value);
								handleFoodSearch(index, e);
							}}
							// onChange={(e) => {
							// 	setQuery(e.target.value);
							// 	handleFoodSearch(index, e);
							// }}
							id="food"
							options={options}
							freeSolo
							sx={{ width: "100%", lineHeight: "calc(1.5em + .75rem + 2px)" }}
							renderInput={(params) => (
								<TextField {...params} label="Ingredient" />
							)}
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
							value={group.quantity}
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
							data={group.measure}
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

	// const ingredientsList = ingredients.map((ingredient, index) => {
	// 	return (
	// 		<li key={index}>
	// 			{ingredient.food}: {ingredient.quantity}
	// 			{ingredient.measure}
	// 		</li>
	// 	);
	// });

	//trigger this when editing/deleting items
	const [update, setUpdate] = useState(0);
	const forceUpdate = () => {
		setUpdate(update + 1);
	};

	const uploadImage = async () => {
		const formData = new FormData();
		formData.append("file", image);
		formData.append("upload_preset", "upylhe4l");
		formData.append("cloud_name", "dghm4xm7k");
		// formData.append("resize", "fill");
		// formData.append("width", "500");
		// formData.append("height", "500");
		try {
			const response = await fetch(
				"https://api.cloudinary.com/v1_1/dghm4xm7k/image/upload",
				{
					method: "POST",
					body: formData,
				}
			);
			const responseData = await response.json();
			return responseData.url;
		} catch (error) {
			console.log(error);
		}
	};

	// console.log(mealPrice === "0", `this is the mealPrice === "0"`);
	// console.log(mealPrice === 0, `this is the mealPrice === 0`);
	// console.log(costPrice === "", `this is the costPrice === "" `);
	// console.log(costPrice === "0", `this is the costPrice === "0"`);
	// console.log(costPrice === 0, `this is the costPrice === 0 `);
	// console.log(metric === "", `this is the metric === ""`);
	// console.log(metric === "0", `this is the metric === "0"`);
	// console.log(metric === 0, `this is the metric === 0 `);
	// console.log(local.quantity === "0", `this is the local.quantity === "0" `);
	// console.log(local.quantity === 0, `this is the local.quantity === 0 `);
	// console.log(local.quantity === "", `this is the local.quantity === "" `);
	// console.log(!validity, `this is the  !validity`);
	// console.log(mealName.trim() === "", `this is the mealName.trim() === "" `);
	// console.log(
	// 	mealDescription.trim() === "",
	// 	`this is the mealDescription.trim() === ""`
	// );
	// console.log(image === null, `this is the image === null `);
	// console.log(mealPrice === "", `this is the mealPrice === ""  `);

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
				mealPrice: parseInt(mealPrice),
				costPrice: parseInt(costPrice),
				mealCurrency: mealCurrency,
				menuSection: menuSection,
				metric: metricGroups,

				metricUnit: metricUnit,
				// mealType: mealType,
				ingredients: inputGroups,
				restaurantName: props.profile.restaurantName,
				city: props.profile.city,
				region: props.profile.region,
				country: props.profile.country,
				mobile: props.profile.mobile,
				email: props.profile.email,
			},
		};

		// setCreateMenuLoading(true);

		uploadImage()
			.then((resp) => {
				console.log(resp, `this is ithe image url response`);
				data.upload.imageURL = resp;
				return resp;
				// props.createProduct(data);
			})
			.then((resp) => {
				console.log(data.upload, `the data we want to upload`);
				props.createMenu(data);
			})
			.then((resp) => {
				submitNotification("Success", `Dish has been added to menu!`);
				setCreateMenuLoading(false);
				// formRef.current.reset();
			})
			.catch((err) => {
				console.log(err);
				submitNotification("Error", `Something went wrong`);
				setCreateMenuLoading(false);
			});

		// props.addToShoppingList(data);
	};

	// console.log(menuSection, `this is the menusection set`);

	// const handleMenuSection = (value) => {
	// 	console.log(value, `this is wat was passed`);
	// 	console.log(value, `this is wat was passed`);
	// };

	const handleMetricNameChange = (index, value) => {
		const updatedMetricGroups = metricGroups.map((group, i) =>
			i === index ? { ...group, metric: value } : group
		);
		setMetricGroups(updatedMetricGroups);
	};

	const handleMetricQuantityChange = (index, value) => {
		const updatedMetricGroups = metricGroups.map((group, i) =>
			i === index ? { ...group, quantity: value } : group
		);
		setMetricGroups(updatedMetricGroups);
	};

	const handleMetricUnit = (index, value) => {
		const updatedMetricGroups = metricGroups.map((group, i) =>
			i === index ? { ...group, measure: value } : group
		);
		setMetricGroups(updatedMetricGroups);
	};

	function deleteMetricHandler(index) {
		console.log(index, `this is the index that we want to delete`);
		const updatedMetricGroups = metricGroups.filter((group, i) => i !== index);
		console.log(updatedMetricGroups, `this is the updated Input Group`);
		setMetricGroups(updatedMetricGroups);
	}

	function addMetricHandler() {
		if (metricGroups.length <= 2) {
			setMetricGroups([
				...metricGroups,
				{
					id: metricGroups.length + 1,
					metric: "",
					quantity: "",
					measure: "g",
				},
			]);
		}
	}

	let addMetricGroup = metricGroups.map((group, index) => {
		return (
			<>
				<InputGroup key={`nut-${index}`} style={{ margin: "5px 0" }}>
					<Col md={7}>
						<Form.Control
							id="metric"
							type="text"
							onChange={(e) => handleMetricNameChange(index, e.target.value)}
							value={local.metric}
							placeholder="metric name"
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
								handleMetricQuantityChange(index, e.target.value)
							}
							value={group.quantity}
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
							data={group.measure}
							// data={local.measure}
							required
							items={[
								"g",
								"kg",
								"ltr",
								"/",
								"mL",
								"L",
								"/",
								"tsp",
								"tbsp",
								"cups",
								"kcal",
							]}
							function={(e) => handleMetricUnit(index, e)}
						/>
					</Col>
					<Col md={1}>
						{index >= 0 ? (
							<ClearIcon onClick={() => deleteMetricHandler(index)}></ClearIcon>
						) : (
							""
						)}
					</Col>
				</InputGroup>
			</>
		);
	});

	const menuSections = [
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
			{/* <MenuSection
				setMenuSection={() => handleMenuSection()}
				ownRecipe={true}
			/> */}
			<Form.Group>
				<Form.Label>Menu type:</Form.Label>

				<Dropdown
					id="menu-section"
					styling="green dropdown-input"
					data={menuSection}
					items={menuSections}
					function={(e) => setMenuSection(e)}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Dish name</Form.Label>
				<Form.Control
					type="text"
					id="mealName"
					onChange={(e) => {
						setMealName(e.target.value);
					}}
					placeholder="e.g pottage"
					required
				/>

				<Form.Label>Description</Form.Label>
				<Form.Control
					type="text"
					id="mealDescription"
					onChange={(e) => {
						setMealDescription(e.target.value);
					}}
					placeholder="type a good description of your dish here"
				/>

				<Form.Label>Cost price</Form.Label>
				<InputGroup>
					<Form.Control
						id="costPrice"
						type="number"
						min="0"
						step="1"
						placeholder="0"
						onChange={(e) => {
							setCostPrice(e.target.value);
						}}
						defaultValue={costPrice}
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
				<Form.Label>Price</Form.Label>
				<InputGroup>
					<Form.Control
						id="mealPrice"
						type="number"
						min="0"
						step="1"
						placeholder="0"
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
			<Form.Group>
				<Row>
					<Col md={4}>
						<Form.Label>Add Dish Ingredients</Form.Label>

						{ingredientGroup.length < 6 ? (
							<AddButton onClick={addIngredientHandler} />
						) : (
							""
						)}
					</Col>
				</Row>

				<Row style={{ width: "100%", alignItems: "center" }}>
					{ingredientGroup}
				</Row>
			</Form.Group>

			{/* <div style={{ padding: "0 0 0 4%" }}> */}
			{/* <ul>{ingredientsList}</ul>
			</div> */}

			{/* <Form.Group> */}
			{/* <Form.Label>Ingredient</Form.Label> */}
			{/* <Form.Control
          type="text"
          id="food"
          onChange={(e) => handleLocal(e)}
          value={local.food}
        /> */}
			{/* <FoodItemSearch handleFoodSearch={handleFoodSearch} /> */}
			{/* </Form.Group> */}
			<Form.Group>
				<Row>
					<Col md={8}>
						<Form.Label>
							Add Additional Metric (Weight/Volume/Calorie count)
						</Form.Label>

						{addMetricGroup.length < 3 ? (
							<AddButton onClick={addMetricHandler} />
						) : (
							""
						)}
					</Col>
				</Row>

				<Row style={{ width: "100%", alignItems: "center" }}>
					{addMetricGroup}
				</Row>
			</Form.Group>
			{/* <Form.Group>
				<Form.Label>Weight/Volume/Calorie count (metric)</Form.Label>
				<InputGroup>
					<Form.Control
						id="metric"
						type="number"
						min="0"
						step=".1"
						onChange={(e) => setMetric(e.target.value)}
						value={metric}
						placeholder="0"
					/>
					<Dropdown
						id="metric"
						styling="grey dropdown-input"
						data={metricUnit}
						items={[
							"g",
							"kg",
							"/",
							"mL",
							"L",
							"/",
							"tsp",
							"tbsp",
							"cups",
							"Kcals",
							"kJ",
						]}
						function={(e) => {
							setMetricUnit(e);
						}}
					/>
				</InputGroup>
			</Form.Group> */}

			<Form.Group className="mb-3">
				<Form.Label>Add product image</Form.Label>
				<Form.Control
					type="file"
					placeholder="Upload Image"
					defaultValue={""}
					required
					onChange={(e) => {
						setImage(e.target.files[0]);
					}}
				/>
			</Form.Group>

			{/* <Form.Group>
				<Button
					className="green-btn shadow-none"
					id="add ingredient"
					onClick={() => {
						handleIngredient();
					}}
				>
					Add Ingredient
				</Button>
			</Form.Group> */}

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
					disabled={
						mealPrice === "" ||
						mealPrice === "0" ||
						mealPrice === 0 ||
						costPrice === "" ||
						costPrice === "0" ||
						costPrice === 0 ||
						metric === "" ||
						metric === "0" ||
						metric === 0 ||
						// local.quantity === "0" ||
						// local.quantity === 0 ||
						// local.quantity === "" ||
						// local.quantity === "0" ||
						// local.quantity === 0 ||
						// local.quantity === "" ||
						// ingredientName: "", ingredientQuantity: ""
						!metricValidity ||
						!validity ||
						mealName.trim() === "" ||
						mealDescription.trim() === "" ||
						image === null
					}
				>
					{/* <Button className="blue-btn shadow-none" type="submit"> */}
					{createMenuLoading ? "...loading" : "Submit"}
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
