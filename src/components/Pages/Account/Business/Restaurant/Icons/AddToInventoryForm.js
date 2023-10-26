import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";
import ScannerInventory from "../../../../../SubComponents/QRCode/ScannerInventory";
import FoodItemSearch from "./InputRecipe/FoodItemSearch";
import { Dropdown } from "../../../../../SubComponents/Dropdown";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useTranslation, Trans } from "react-i18next";

import { connect } from "react-redux";
import { addToInventoryRes } from "../../../../../../store/actions/marketplaceActions/restaurantData";
import { AddButton } from "./../../../../../SubComponents/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { submitNotification } from "./../../../../../lib/Notifications";

const AddToInventoryForm = (props) => {
	const { t } = useTranslation();

	const [itemName, setItemName] = useState("");
	const [quantity, setQuantity] = useState("");
	const [measure, setMeasure] = useState("");
	const [scan, setScan] = useState(false);
	const [expand, setExpand] = useState("+ scan from barcode");
	const [show, setShow] = useState(true);
	const [startDate, setStartDate] = useState(new Date());

	const defaultLocal = {
		food: "",
		quantity: "",
		measure: "units",
		currency: "$",
		foodId: "",
		price: "",
		retailer: "",
	};
	const [local, setLocal] = useState(defaultLocal);
	const [submitLoading, setSubmitLoading] = useState(false);
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

	//control modal
	const handleForm = () => setShow(true);
	const handleFormClose = () => {
		setShow(false);
	};

	//trigger this when editing/deleting items
	const [update, setUpdate] = useState(0);
	const forceUpdate = () => {
		setUpdate(update + 1);
	};

	const defaultIngredient = [{ id: 1, metric: "", quantity: "", measure: "g" }];

	const [inputGroups, setInputGroups] = useState([]);

	const handleMetricNameChange = (index, value) => {
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, metric: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	const handleMetricQuantityChange = (index, value) => {
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, quantity: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	const handleMetricUnit = (index, value) => {
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, measure: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	function deleteMetricHandler(index) {
		console.log(index, `this is the index that we want to delete`);
		const updatedInputGroups = inputGroups.filter((group, i) => i !== index);
		console.log(updatedInputGroups, `this is the updated Input Group`);
		setInputGroups(updatedInputGroups);
	}

	function addMetricHandler() {
		if (inputGroups.length <= 2) {
			setInputGroups([
				...inputGroups,
				{
					id: inputGroups.length + 1,
					metric: "",
					quantity: "",
					measure: "g",
				},
			]);
		}
	}

	// let validity = inputGroups.every((inputGroup) => {
	// 	return (
	// 		inputGroup.food.trim() !== "" &&
	// 		inputGroup.quantity !== "0" &&
	// 		inputGroup.quantity !== 0 &&
	// 		inputGroup.quantity !== ""
	// 	);
	// });

	useEffect(() => {}, [inputGroups]);

	//fired when click "done"
	const handleSubmit = () => {
		const data = {
			upload: {
				ingredients: local.food + " " + local.quantity + "" + local.measure,
				item: local.food,
				measure: local.measure,
				quantity: local.quantity,
				price: local.price,
				currency: local.currency,
				expiry: moment(startDate).format("DD/MM/yyyy"),
				created_at: new Date(),
				source: "ext",
				metrics: inputGroups,
				retailer: local.retailer,
			},
		};

		setSubmitLoading(true);

		console.log("this is the data:", data);

		props
			.addToInventoryRes(data)
			.then((resp) => {
				setSubmitLoading(false);

				submitNotification("Success", `${local.food} has been added!`);
				setInputGroups([]);
			})
			.catch((err) => {
				setSubmitLoading(false);

				submitNotification("Error", `Something went wrong, pls try again.`);
			});
		// props.createMealPlanData(data);
		// forceUpdate();
	};

	let metricValidity =
		inputGroups.length > 0
			? inputGroups.every((metric) => {
					return (
						metric.metric.trim() !== "" &&
						metric.quantity !== "0" &&
						metric.quantity !== 0 &&
						metric.quantity !== ""
					);
			  })
			: true;

	const handleSetScan = () => {
		setScan(!scan);
		if (scan) {
			setExpand("+ scan from barcode");
		} else {
			setExpand("- input manually");
		}
	};

	useEffect(() => {
		console.log("item", local.food);
	}, [local.food]);

	let ingredientGroup = inputGroups.map((group, index) => {
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

	return (
		<div>
			<button
				className="btn success shadow-none qrcode-btn"
				onClick={() => handleSetScan()}
			>
				{expand}
			</button>
			{scan ? (
				<ScannerInventory handleFormClose={handleFormClose} />
			) : (
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit();
						// props.setUpdate(props.update + 1);
						// props.handleFormClose();
					}}
				>
					<Form.Group>
						<Form.Label>Ingredient name</Form.Label>
						<FoodItemSearch handleFoodSearch={handleFoodSearch} />
					</Form.Group>
					{/* quantity */}
					<Form.Group>
						<Form.Label>Quantity purchased</Form.Label>
						<InputGroup>
							<Form.Control
								id="quantity"
								type="number"
								min="0"
								step=".1"
								onChange={(e) => handleLocal(e)}
								placeholder="0"
								value={local.quantity}
							/>
							<Dropdown
								id="measure"
								styling="grey dropdown-input"
								data={local.measure}
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
									"units",
									"pcs",
									"oz",
									"lbs",
								]}
								function={(e) => {
									setLocal({ ...local, measure: e });
								}}
							/>
						</InputGroup>
					</Form.Group>

					<Form.Group>
						<Form.Label>Price</Form.Label>
						<InputGroup>
							<Form.Control
								id="price"
								type="number"
								min="0"
								step=".1"
								onChange={(e) => handleLocal(e)}
								placeholder="0"
								value={local.price}
							/>
							<Dropdown
								id="currency"
								styling="grey dropdown-input"
								data={local.currency}
								items={["$", "€", "£"]}
								function={(e) => {
									setLocal({ ...local, currency: e });
								}}
							/>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<Row>
							<Col md={6}>
								<Form.Label>Add Additional Metric</Form.Label>

								{ingredientGroup.length < 3 ? (
									<AddButton onClick={addMetricHandler} />
								) : (
									""
								)}
							</Col>
						</Row>

						<Row style={{ width: "100%", alignItems: "center" }}>
							{ingredientGroup}
						</Row>
					</Form.Group>

					<Form.Group>
						Retailer name
						<Form.Label></Form.Label>
						<Form.Control
							id="retailer"
							type="text"
							onChange={(e) => handleLocal(e)}
							value={local.retailer}
							placeholder="eg kelvin stores"
						/>
					</Form.Group>

					{/* date picker */}
					<Form.Group>
						<Form.Label>{t("description.expiry_date")}</Form.Label>
						<DatePicker
							selected={startDate}
							onChange={(date) => setStartDate(date)}
							dateFormat="dd/mm/yyyy"
						/>
						{/* <Form.Control
          type="text"
          id="expiry"
          onChange={(e) => handleLocal(e)}
          value={local.expiry}
        /> */}
					</Form.Group>

					<div style={{ alignItems: "center" }}>
						<Button
							className="blue-btn shadow-none mt-3"
							type="submit"
							disabled={!metricValidity}
						>
							{submitLoading ? "...loading" : "submit"}
							{/* {t("description.button_done")} */}
						</Button>
					</div>
				</Form>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addToInventoryRes: (data) => dispatch(addToInventoryRes(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToInventoryForm);
