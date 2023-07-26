import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import "../../../../../../SubComponents/Button.js";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import DatePicker from "react-datepicker";
import moment from "moment";

import { connect } from "react-redux";
import { addProduceData } from "../../../../../../../store/actions/marketplaceActions/farmPlanData.js";
import { submitNotification } from "../../../../../../lib/Notifications.js";

// import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { AddButton } from "./../../../../../../SubComponents/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { Margin } from "@mui/icons-material";

const AddProduceForm = (props) => {
	const [produceName, setProduceName] = useState("");
	const [farmType, setFarmType] = useState("Horticulture");
	const [quantity, setQuantity] = useState(0);
	const [measure, setMeasure] = useState("");
	const [price, setPrice] = useState("");
	const [currency, setCurrency] = useState("");

	const [show, setShow] = useState(true);
	const [produceDate, setProduceDate] = useState(new Date());
	const [inputGroups, setInputGroups] = useState([
		{ id: 1, nutrientName: "", nutrientQuantity: "", nutrientUnit: "units" },
	]);

	const defaultLocal = {
		item: "",
		quantity: 0,
		measure: "units",
		price: "",
		currency: "$",
		// nutrients: inputGroups,
	};

	const [local, setLocal] = useState(defaultLocal);
	const handleLocal = (e) => {
		if (e.target.textContent) {
			setLocal({ ...local, [e.target.id]: e.target.textContent });
		} else {
			setLocal({ ...local, [e.target.id]: e.target.value });
		}
	};

	// console.log(inputGroups);

	const handleNutrientQuantityChange = (index, value) => {
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, nutrientQuantity: value } : group
		);
		setInputGroups(updatedInputGroups);
	};
	const handleNutrientUnit = (index, value) => {
		console.log(value);
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, nutrientUnit: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	function addNutrientHandler() {
		if (inputGroups.length <= 5) {
			setInputGroups([
				...inputGroups,
				{
					id: inputGroups.length + 1,
					nutrientName: "",
					nutrientQuantity: "",
					nutrientUnit: "units",
				},
			]);
		}
	}
	function deleteNutrientHandler(index) {
		const updatedInputGroups = inputGroups.filter((group, i) => i !== index);
		setInputGroups(updatedInputGroups);
	}

	const handleNutrientNameChange = (index, value) => {
		// console.log(id);
		// inputGroups[id].nutrientName = e.target.value;
		// let inp = { nutrientName: e.target.value };

		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, nutrientName: value } : group
		);
		setInputGroups(updatedInputGroups);
	};

	useEffect(() => {}, [inputGroups]);

	let nutrientGroup = inputGroups.map((group, index) => {
		return (
			<>
				<InputGroup key={`nut-${index}`} style={{ margin: "5px 0" }}>
					<Col md={7}>
						<Form.Control
							// id="nutrientName"
							type="text"
							// min="0"
							// step=".5"
							required
							onChange={(e) => handleNutrientNameChange(index, e.target.value)}
							value={group.nutrientName}
							placeholder="nutrient name"
						/>
					</Col>
					<Col md={2}>
						<Form.Control
							// id="nutrientQuantity"
							type="number"
							min="0"
							required
							// step=".5"
							function={(e) =>
								handleNutrientQuantityChange(index, e.target.value)
							}
							data={group.nutrientQuantity}
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
							data={group.nutrientUnit}
							// data={local.measure}
							required
							items={["g", "kg", "/", "mL", "L"]}
							function={(e) => handleNutrientUnit(index, e)}
						/>
					</Col>
					<Col md={1}>
						{index >= 1 ? (
							<ClearIcon
								onClick={() => deleteNutrientHandler(index)}
							></ClearIcon>
						) : (
							""
						)}
					</Col>
				</InputGroup>
			</>
		);
	});

	const ChooseFarmType = () => {
		switch (farmType) {
			default:
			case "Horticulture":
				return (
					<div>
						<Form.Group>
							<Form.Label>Crop name</Form.Label>
							<Form.Control
								type="text"
								id="item"
								onChange={(e) => handleLocal(e)}
								value={local.item}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Quantity of crops</Form.Label>
							<InputGroup>
								<Form.Control
									id="quantity"
									type="number"
									min="0"
									step=".5"
									onChange={(e) => handleLocal(e)}
									value={local.quantity}
									required
								/>
								<Dropdown
									id="measure"
									styling="grey dropdown-input"
									data={local.measure}
									required
									items={[
										"g",
										"kg",
										"/",
										"mL",
										"L",
										"/",
										"bags",
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
							<Form.Label>Crop Nutrient</Form.Label>

							<AddButton onClick={addNutrientHandler} />

							<Row style={{ width: "100%", alignItems: "center" }}>
								{nutrientGroup}
							</Row>
						</Form.Group>

						<Form.Group>
							<Form.Label>Estimated Price Per Unit</Form.Label>
							<InputGroup>
								<Form.Control
									id="price"
									type="number"
									min="0"
									step="1"
									onChange={(e) => handleLocal(e)}
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
							<Form.Label>Harvest Date</Form.Label>
							<DatePicker
								selected={produceDate}
								onChange={(date) => setProduceDate(date)}
								dateFormat="dd/MM/yyyy"
							/>
						</Form.Group>
					</div>
				);
			case "Aquaculture":
				return (
					<div>
						<Form.Group>
							<Form.Label>Name of Specie</Form.Label>
							<Form.Control
								type="text"
								id="item"
								onChange={(e) => handleLocal(e)}
								value={local.item}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Number of specie</Form.Label>
							<InputGroup>
								<Form.Control
									id="quantity"
									type="number"
									min="0"
									step="1"
									onChange={(e) => handleLocal(e)}
									value={local.quantity}
								/>
								<Dropdown
									id="measure"
									styling="grey dropdown-input"
									data={local.measure}
									items={["units", "pcs"]}
									function={(e) => {
										setLocal({ ...local, measure: e });
									}}
								/>
							</InputGroup>
						</Form.Group>

						<Form.Group>
							<Form.Label>Estimated Price Per Unit</Form.Label>
							<InputGroup>
								<Form.Control
									id="price"
									type="number"
									min="0"
									step="1"
									onChange={(e) => handleLocal(e)}
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
							<Form.Label>Yield Date</Form.Label>
							<DatePicker
								selected={produceDate}
								onChange={(date) => setProduceDate(date)}
								dateFormat="dd/mm/yyyy"
							/>
						</Form.Group>
					</div>
				);
			case "Livestock":
				return (
					<div>
						<Form.Group>
							<Form.Label>Name of Specie</Form.Label>
							<Form.Control
								type="text"
								id="item"
								onChange={(e) => handleLocal(e)}
								value={local.item}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Number of Specie</Form.Label>
							<InputGroup>
								<Form.Control
									id="quantity"
									type="number"
									min="0"
									step="1"
									onChange={(e) => handleLocal(e)}
									value={local.quantity}
								/>
								<Dropdown
									id="measure"
									styling="grey dropdown-input"
									data={local.measure}
									items={["g", "kg", "/", "units", "pcs", "oz", "lbs"]}
									function={(e) => {
										setLocal({ ...local, measure: e });
									}}
								/>
							</InputGroup>
						</Form.Group>

						<Form.Group>
							<Form.Label>Estimated Price per Unit</Form.Label>
							<InputGroup>
								<Form.Control
									id="price"
									type="number"
									min="0"
									step="1"
									onChange={(e) => handleLocal(e)}
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
							<Form.Label>Yield Date</Form.Label>
							<DatePicker
								selected={produceDate}
								onChange={(date) => setProduceDate(date)}
								dateFormat="dd/mm/yyyy"
							/>
						</Form.Group>
					</div>
				);
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

	//fired when click "done"
	const handleSubmit = (e) => {
		const data = {
			upload: {
				farmType: farmType,
				item: local.item,
				measure: local.measure,
				quantity: local.quantity,
				price: local.price,
				currency: local.currency,
				//quantity: local.quantity
				date: moment(produceDate).format("DD/MM/yyyy"),
			},
		};

		if (data.upload.farmType === "horticulture") {
			data.upload.nutrients = inputGroups;
		}
		console.log(data, `this is the data of the form`);

		// props.addProduceData(data);
		// submitNotification("Success", "Item has been added");

		// forceUpdate();
	};

	return (
		<div>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
					// props.setUpdate(props.update + 1);
					props.handleFormClose();
				}}
			>
				<Form.Group>
					<Form.Label>Farming Type</Form.Label>
					<InputGroup>
						<Dropdown
							id="measure"
							styling="grey dropdown-input"
							data={farmType}
							items={["Horticulture", "Aquaculture", "Livestock"]}
							function={(e) => {
								setFarmType(e);
							}}
						/>
					</InputGroup>
				</Form.Group>

				{ChooseFarmType()}

				<div style={{ alignItems: "center" }}>
					<Button className="blue-btn shadow-none mt-3" type="submit">
						Done
					</Button>
				</div>
			</Form>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		produce: state.farmData.produce,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addProduceData: (data) => dispatch(addProduceData(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduceForm);
