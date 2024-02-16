import React, { useEffect, useState, useRef } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

import DatePicker from "react-datepicker";

import { connect, useSelector } from "react-redux";

// import { addSaleData } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import { Dropdown } from "./../../../../SubComponents/Dropdown";
import { submitNotification } from "./../../../../lib/Notifications";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import { foodItemApi } from "./../../Personal/Marketplace/MealPlanComp/Icons/InputRecipe/FoodItemAPI";
import TextField from "@mui/material/TextField";
import { AddButton } from "./../../../../SubComponents/Button";
import { addRestaurantSale } from "./../../../../../store/actions/marketplaceActions/restaurantData";

const RestaurantSalesForm = (props) => {
	const [submitError, setSubmitError] = useState(false);
	const defaultLocal = {
		unit: "plate",
		quantity: "",
		mealName: "",
		mealPrice: "",

		// amount: "",
		mealCurrency: "$",
		customerName: "",
		medium: "ext",
		menuSection: "Any",
	};
	const [submitLoading, setSubmitLoading] = useState(false);
	const [response, setResponse] = useState([]);

	const [show, setShow] = useState(true);
	const [saleDate, setSaleDate] = useState(new Date());
	const [query, setQuery] = useState("");

	useEffect(() => {
		foodItemApi(query, setResponse);
	}, [query]);

	let options;
	if (query === "") {
		options = ["..."];
	} else {
		options = response;
	}

	const [local, setLocal] = useState(defaultLocal);
	const [productType, setProductType] = useState("Any");

	const formRef = useRef(null);

	const defaultIngredient = [{ id: 1, food: "", quantity: "", measure: "g" }];

	const [inputGroups, setInputGroups] = useState(defaultIngredient);
	const [ingredients, setIngredients] = useState([]);

	// useEffect(() => {
	// 	if (props.submitError !== null) setSubmitError(props.submitError);
	// }, [props.submitError]);

	// useEffect(() => {
	// 	console.log(props.addExpenseLoader, `it has changed`);
	// 	if (props.addLoader === false) {
	// 		submitNotification("Success", "Produce added to inventory");
	// 		formRef.current.reset();
	// 	}
	// }, [props.expense]);

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

	const handleIngredientNameChange = (index, value) => {
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, food: value } : group
		);
		setInputGroups(updatedInputGroups);
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

	const handleLocal = (e) => {
		setLocal({ ...local, [e.target.id]: e.target.value });
	};

	const handleForm = () => setShow(true);
	const handleFormClose = () => {
		setShow(false);
	};

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

	console.log(props.Menus, `these are the menus`);

	//fired when click "done"
	const handleSubmit = (e) => {
		// const data = {
		// 	medium: "ext",
		// 	unit: local.unit,
		// 	quantity: local.quantity,
		// 	price: { amount: local.amount, currency: local.currency },
		// 	currency: local.currency,
		// 	date: saleDate,
		// 	productName: local.productName,
		// 	productType: productType,
		// 	customerInfo: { customerName: local.customerName, customerId: null },
		// };

		const data = {
			meal: local.mealName,
			// mealDescription: mealDescription,
			mealPrice: parseInt(local.mealPrice),
			mealCurrency: local.mealCurrency,
			menuSection: local.menuSection,
			quantity: parseInt(local.quantity),
			unit: local.unit,

			restaurantName: props.profile.restaurantName,
			city: props.profile.city,
			region: props.profile.region,
			country: props.profile.country,
			mobile: props.profile.mobile,
			email: props.profile.email,
			medium: "ext",
			customerInfo: { customerName: local.customerName, customerId: null },
			date: saleDate,
		};

		// console.log(data, `this is the data returned`);
		setSubmitLoading(true);
		props
			.addSale(data)
			.then((resp) => {
				// console.log(resp.id, `this is the id of the newly added sale`);
				if (resp === null) {
					setSubmitLoading(false);

					submitNotification(
						"Error",
						"This meal does not exist in your menu,you can add it to your menu first or check meal name and try again"
					);
				} else {
					setSubmitLoading(false);
					setLocal(defaultLocal);
					submitNotification("Success", "Produce added to sales");
				}
			})
			.catch((err) => {
				// console.log(err, `an error occurred`);
				submitNotification("Error", "Something went wrong try again");
				setSubmitLoading(false);
				setSubmitError(true);
			});
	};

	// console.log(props.addSaleLoader, `this is the add Expense loader`);

	return (
		<div>
			<Form ref={formRef}>
				<Form.Group>
					<Form.Label>Menu Type</Form.Label>
					<InputGroup>
						<Dropdown
							id="productType"
							styling="grey dropdown-input"
							data={productType}
							items={menuSections}
							function={(e) => {
								setProductType(e);
							}}
						/>
					</InputGroup>
				</Form.Group>

				<div>
					<Form.Group>
						<Form.Label>Dish name</Form.Label>
						<Form.Control
							type="text"
							id="mealName"
							onChange={(e) => handleLocal(e)}
							value={local.mealName}
							required
						/>
					</Form.Group>
					{/* <Form.Group>
						<Form.Label>Batch Number</Form.Label>
						<Form.Control
							type="text"
							id="batchNumber"
							onChange={(e) => handleLocal(e)}
							value={local.batchNumber}
							required
						/>
					</Form.Group> */}
					{/* <Row>
						<Col md={4}>
							<Form.Label>Ingredients</Form.Label>
							<AddButton onClick={addIngredientHandler} />
						</Col>
					</Row>

					<Row style={{ width: "100%", alignItems: "center" }}>
						{ingredientGroup}
					</Row> */}

					<Form.Group>
						<Form.Label>Price</Form.Label>
						<InputGroup>
							<Form.Control
								id="mealPrice"
								type="number"
								min="0"
								step="1"
								onChange={(e) => handleLocal(e)}
								value={local.mealPrice}
								required
								placeholder="0"
							/>

							<Dropdown
								id="mealCurrency"
								styling="grey dropdown-input"
								data={local.mealCurrency}
								items={["$", "€", "£"]}
								function={(e) => {
									setLocal({ ...local, currency: e });
								}}
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<Form.Label>Quantity</Form.Label>
						<InputGroup>
							<Form.Control
								id="quantity"
								type="number"
								min="0"
								step="1"
								onChange={(e) => handleLocal(e)}
								value={local.quantity}
								required
								placeholder="0"
							/>
							<Dropdown
								id="unit"
								styling="grey dropdown-input"
								data={local.unit}
								items={[
									"plate",
									"bowl",
									"ltr",
									"/",
									"oz",
									"lbs",
									"/",
									"l",
									"ml",
								]}
								function={(e) => {
									setLocal({ ...local, unit: e });
								}}
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<Form.Label>Customer Name</Form.Label>
						<InputGroup>
							<Form.Control
								type="text"
								id="customerName"
								required
								onChange={(e) => handleLocal(e)}
								// style={{ maxHeight: "300px" }}
								value={local.customerName}
							/>
						</InputGroup>
					</Form.Group>

					<Form.Group>
						<Form.Label>Date</Form.Label>
						<DatePicker
							selected={saleDate}
							onChange={(date) => setSaleDate(date)}
							dateFormat="dd/MM/yyyy"
						/>
					</Form.Group>
				</div>

				{/* {ChooseFarmType()}  */}

				<div style={{ alignItems: "center" }}>
					<Button
						onClick={(e) => {
							e.preventDefault();
							handleSubmit();
							// props.setUpdate(props.update + 1);
							// props.handleFormClose();
						}}
						className="blue-btn shadow-none mt-3"
						type="submit"
						disabled={
							local.quantity === "0" ||
							local.quantity === "" ||
							local.quantity === 0 ||
							local.mealName.trim() === "" ||
							local.mealPrice === "0" ||
							local.mealPrice === "" ||
							local.mealPrice === 0 ||
							local.customerName.trim() === ""
						}
					>
						{submitLoading === false ? "Submit" : "...Loading"}
					</Button>
					{submitError === false ? "" : "Something went wrong try again"}
				</div>
			</Form>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
		Menus: state.restaurant.savedMenus,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addSale: (data) => dispatch(addRestaurantSale(data)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RestaurantSalesForm);
