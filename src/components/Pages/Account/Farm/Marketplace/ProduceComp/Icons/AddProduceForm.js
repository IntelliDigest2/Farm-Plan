import React, { useEffect, useState, useRef } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import "../../../../../../SubComponents/Button.js";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import DatePicker from "react-datepicker";
import moment from "moment";

import { connect, useSelector } from "react-redux";
import { addProduceData } from "../../../../../../../store/actions/marketplaceActions/farmPlanData.js";
import { submitNotification } from "../../../../../../lib/Notifications.js";

// import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { AddButton } from "./../../../../../../SubComponents/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { Margin } from "@mui/icons-material";

const AddProduceForm = (props) => {
	// const [produceName, setProduceName] = useState("");

	const [farmType, setFarmType] = useState("Horticulture");
	// const [quantity, setQuantity] = useState(0);
	// const [measure, setMeasure] = useState("");
	// const [price, setPrice] = useState("");
	// const [currency, setCurrency] = useState("");
	const [submitLoading, setSubmitLoading] = useState(false);

	const [submitError, setSubmitError] = useState(false);
	// const [submitLoader, setSubmitLoader] = useState(false);
	const defaultLocal = {
		item: "",
		quantity: "",
		measure: "units",
		price: "",
		currency: "$",
		sellingPrice: "",
		cycleStartMonth: "Jan",
		cycleStartYear: "2023",
		cycleEndMonth: "Jun",
		cycleEndYear: "2023",
		batchNumber: "",
		// nutrients: inputGroups,
	};

	const defaultNutrient = [
		{ id: 1, nutrientName: "", nutrientQuantity: "", nutrientUnit: "%" },
	];

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const [show, setShow] = useState(true);
	const [produceDate, setProduceDate] = useState(new Date());
	const [inputGroups, setInputGroups] = useState(defaultNutrient);
	const [local, setLocal] = useState(defaultLocal);
	const formRef = useRef(null);
	const years = [];

	const endYear = 2030;

	for (let year = 2023; year <= endYear; year++) {
		years.push(year);
	}

	useEffect(() => {}, [inputGroups]);

	// console.log(produceDate, `this is the produceDate`);

	// useEffect(() => {
	// 	if (props.submitError !== null) setSubmitError(props.submitError);
	// }, [props.submitError]);

	// console.log(props.addProduceLoader, `initial stat of submitLoader`);

	// useEffect(() => {
	// 	console.log(props.addProduceLoader, `it has changed`);
	// 	if (props.addProduceLoader === false) {
	// 		submitNotification("Success", "Produce added to inventory");
	// 		formRef.current.reset();
	// 	}
	// }, [props.produce]);

	const handleLocal = (e) => {
		if (e.target.textContent) {
			setLocal({ ...local, [e.target.id]: e.target.textContent });
		} else {
			setLocal({ ...local, [e.target.id]: e.target.value });
		}
	};

	const handleNutrientQuantityChange = (index, value) => {
		const updatedInputGroups = inputGroups.map((group, i) =>
			i === index ? { ...group, nutrientQuantity: value } : group
		);
		setInputGroups(updatedInputGroups);
	};
	const handleNutrientUnit = (index, value) => {
		// console.log(value);
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
							onChange={(e) =>
								handleNutrientQuantityChange(index, e.target.value)
							}
							value={group.nutrientQuantity}
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
							items={["%"]}
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
							{/* <div style={{ display: "block" }}> */}
							<Form.Label>Crop name</Form.Label>
							{/* </div> */}

							<div
								style={{
									color: "grey",
									display: "inline-block",
									fontSize: "12px",
								}}
							>
								* Products with distinct descriptions that set them apart should
								be given names that reflect their differences, such as 'green
								apple' and 'red apple,' to facilitate straightforward grouping
							</div>

							<Form.Control
								type="text"
								id="item"
								onChange={(e) => handleLocal(e)}
								value={local.item}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label style={{ display: "block" }}>
								Crop farmCycle
							</Form.Label>

							<div
								style={{
									color: "grey",
									fontSize: "12px",
								}}
							>
								* Add the farm cycle to which the yield belongs
							</div>
							<Row>
								<Col md={6} style={{ display: "flex", alignItems: "baseline" }}>
									<div>Start period</div>
									<Dropdown
										id="cycleStartMonth"
										styling="grey dropdown-input"
										data={local.cycleStartMonth}
										// data={local.measure}
										required
										items={months}
										// function={(e) => }
										function={(e) => {
											setLocal({ ...local, cycleStartMonth: e });
										}}
									/>
									<Dropdown
										id="cycleStartYear"
										styling="grey dropdown-input"
										data={local.cycleStartYear}
										// data={local.measure}
										required
										items={years}
										// function={(e) => }
										function={(e) => {
											setLocal({ ...local, cycleStartYear: e });
										}}
									/>
								</Col>
								<Col md={6} style={{ display: "flex", alignItems: "baseline" }}>
									<div>End period</div>
									<Dropdown
										id="cycleEndMonth"
										styling="grey dropdown-input"
										data={local.cycleEndMonth}
										// data={local.measure}
										required
										items={months}
										function={(e) => {
											setLocal({ ...local, cycleEndMonth: e });
										}}
									/>
									<Dropdown
										id="cycleStartYear"
										styling="grey dropdown-input"
										data={local.cycleEndYear}
										// data={local.measure}
										required
										items={years}
										function={(e) => {
											setLocal({ ...local, cycleEndMonth: e });
										}}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Form.Label>Batch Number</Form.Label>
							<div
								style={{
									color: "grey",
									fontSize: "12px",
								}}
							>
								* Batch number should have the format Date-letter eg
								"15-06-2024-A"
							</div>
							<Form.Control
								type="text"
								id="batchNumber"
								onChange={(e) => handleLocal(e)}
								value={local.batchNumber}
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
									placeholder="0"
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
							<Form.Label>Selling Price Per Unit</Form.Label>
							<InputGroup>
								<Form.Control
									id="sellingPrice"
									type="number"
									min="0"
									step="1"
									onChange={(e) => handleLocal(e)}
									value={local.sellingPrice}
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
							<div
								style={{
									color: "grey",
									display: "inline-block",
									fontSize: "12px",
								}}
							>
								* Products with distinct descriptions that set them apart should
								be given names that reflect their differences, such as 'green
								apple' and 'red apple,' to facilitate straightforward grouping
							</div>
							<Form.Control
								type="text"
								id="item"
								onChange={(e) => handleLocal(e)}
								value={local.item}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Batch Number</Form.Label>
							<div
								style={{
									color: "grey",
									fontSize: "12px",
								}}
							>
								* Batch number should have the format Date-letter eg
								"15-06-2024-A"
							</div>
							<Form.Control
								type="text"
								id="batchNumber"
								onChange={(e) => handleLocal(e)}
								value={local.batchNumber}
								required
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label style={{ display: "block" }}>
								Crop farmCycle
							</Form.Label>

							<div
								style={{
									color: "grey",
									fontSize: "12px",
								}}
							>
								* Add the farm cycle to which the yield belongs
							</div>
							<Row>
								<Col md={6} style={{ display: "flex", alignItems: "baseline" }}>
									<div>Start period</div>
									<Dropdown
										id="cycleStartMonth"
										styling="grey dropdown-input"
										data={local.cycleStartMonth}
										// data={local.measure}
										required
										items={months}
										// function={(e) => }
										function={(e) => {
											setLocal({ ...local, cycleStartMonth: e });
										}}
									/>
									<Dropdown
										id="cycleStartYear"
										styling="grey dropdown-input"
										data={local.cycleStartYear}
										// data={local.measure}
										required
										items={years}
										// function={(e) => }
										function={(e) => {
											setLocal({ ...local, cycleStartYear: e });
										}}
									/>
								</Col>
								<Col md={6} style={{ display: "flex", alignItems: "baseline" }}>
									<div>End period</div>
									<Dropdown
										id="cycleEndMonth"
										styling="grey dropdown-input"
										data={local.cycleEndMonth}
										// data={local.measure}
										required
										items={months}
										function={(e) => {
											setLocal({ ...local, cycleEndMonth: e });
										}}
									/>
									<Dropdown
										id="cycleStartYear"
										styling="grey dropdown-input"
										data={local.cycleEndYear}
										// data={local.measure}
										required
										items={years}
										function={(e) => {
											setLocal({ ...local, cycleEndMonth: e });
										}}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Form.Label>Batch Number</Form.Label>
							<div
								style={{
									color: "grey",
									fontSize: "12px",
								}}
							>
								* Batch number should have the format Date-letter eg
								"15-06-2024-A"
							</div>
							<Form.Control
								type="text"
								id="batchNumber"
								onChange={(e) => handleLocal(e)}
								value={local.batchNumber}
								required
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Quantity/amount</Form.Label>
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
							<Form.Label>Selling Price Per Unit</Form.Label>
							<InputGroup>
								<Form.Control
									id="sellingPrice"
									type="number"
									min="0"
									step="1"
									onChange={(e) => handleLocal(e)}
									value={local.sellingPrice}
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
								dateFormat="dd/MM/yyyy"
							/>
						</Form.Group>
					</div>
				);
			case "Livestock":
				return (
					<div>
						<Form.Group>
							<Form.Label>Name of Specie</Form.Label>
							<div
								style={{
									color: "grey",
									display: "inline-block",
									fontSize: "12px",
								}}
							>
								* Products with distinct descriptions that set them apart should
								be given names that reflect their differences, such as 'green
								apple' and 'red apple,' to facilitate straightforward grouping
							</div>
							<Form.Control
								type="text"
								id="item"
								onChange={(e) => handleLocal(e)}
								value={local.item}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label style={{ display: "block" }}>
								Crop farmCycle
							</Form.Label>

							<div
								style={{
									color: "grey",
									fontSize: "12px",
								}}
							>
								* Add the farm cycle to which the yield belongs
							</div>
							<Row>
								<Col md={6} style={{ display: "flex", alignItems: "baseline" }}>
									<div>Start period</div>
									<Dropdown
										id="cycleStartMonth"
										styling="grey dropdown-input"
										data={local.cycleStartMonth}
										// data={local.measure}
										required
										items={months}
										// function={(e) => }
										function={(e) => {
											setLocal({ ...local, cycleStartMonth: e });
										}}
									/>
									<Dropdown
										id="cycleStartYear"
										styling="grey dropdown-input"
										data={local.cycleStartYear}
										// data={local.measure}
										required
										items={years}
										// function={(e) => }
										function={(e) => {
											setLocal({ ...local, cycleStartYear: e });
										}}
									/>
								</Col>
								<Col md={6} style={{ display: "flex", alignItems: "baseline" }}>
									<div>End period</div>
									<Dropdown
										id="cycleEndMonth"
										styling="grey dropdown-input"
										data={local.cycleEndMonth}
										// data={local.measure}
										required
										items={months}
										function={(e) => {
											setLocal({ ...local, cycleEndMonth: e });
										}}
									/>
									<Dropdown
										id="cycleStartYear"
										styling="grey dropdown-input"
										data={local.cycleEndYear}
										// data={local.measure}
										required
										items={years}
										function={(e) => {
											setLocal({ ...local, cycleEndMonth: e });
										}}
									/>
								</Col>
							</Row>
						</Form.Group>
						<Form.Group>
							<Form.Label>Batch Number</Form.Label>
							<div
								style={{
									color: "grey",
									fontSize: "12px",
								}}
							>
								* Batch number should have the format Date-letter eg
								"15-06-2024-A"
							</div>
							<Form.Control
								type="text"
								id="batchNumber"
								onChange={(e) => handleLocal(e)}
								value={local.batchNumber}
								required
							/>
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
							<Form.Label>Estimated Production Price Per Unit</Form.Label>

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
							<Form.Label>Selling Price Per Unit</Form.Label>
							<InputGroup>
								<Form.Control
									id="sellingPrice"
									type="number"
									min="0"
									step="1"
									onChange={(e) => handleLocal(e)}
									value={local.sellingPrice}
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
								dateFormat="dd/MM/yyyy"
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
			farmType: farmType,
			item: local.item,
			measure: local.measure,
			quantity: parseInt(local.quantity),
			price: parseInt(local.price),
			sellingPrice: parseInt(local.sellingPrice),
			cycleStartMonth: local.cycleStartMonth,
			cycleStartYear: local.cycleStartYear,
			cycleEndMonth: local.cycleEndMonth,
			cycleEndYear: local.cycleEndYear,

			currency: local.currency,
			//quantity: local.quantity
			date: produceDate,
		};

		if (data.farmType === "Horticulture") {
			// console.log(inputGroups, `this is the input groups that is shown`);
			data.nutrients = inputGroups;
		}

		// console.log(local.quantity.trim() === "", `quantity trim`);
		// console.log(local.quantity === "0", `quantity '0'`);
		// console.log(local.quantity === 0, `quantity 0`);
		// console.log(local.batchNumber.trim() === "", `batchNumber ''`);
		// console.log(local.price === "", `price ''`);
		// console.log(local.price === "0", `price ''`);
		// console.log(local.price === 0, `price ''`);
		// console.log(local.sellingPrice === "", `sellingprice ''`);
		// console.log(local.sellingPrice === "0", `sellingprice '0'`);
		// console.log(local.sellingPrice === "", `sellingprice 0`);
		// console.log(local.item.trim() === "", `price ''`);

		setSubmitLoading(true);

		props
			.addProduceData(data)
			.then((resp) => {
				// console.log(resp.id, `this is the id of the newly added sale`);
				setSubmitLoading(false);
				setLocal(defaultLocal);
				setInputGroups(defaultNutrient);
				submitNotification("Success", "Produce added to product Inventory");
			})
			.catch((err) => {
				// console.log(err, `an error occurred`);
				submitNotification("Error", "Something went wrong try again");
				setSubmitLoading(false);
				setSubmitError(true);
			});

		// forceUpdate();
	};

	return (
		<div>
			<Form ref={formRef}>
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
							(farmType === "Horticulture"
								? inputGroups[0].nutrientName.trim() === "" ||
								  inputGroups[0].nutrientQuantity.trim() === ""
								: "") ||
							local.item.trim() === "" ||
							local.quantity.trim() === "" ||
							local.quantity === "0" ||
							local.quantity === 0 ||
							local.batchNumber.trim() === "" ||
							local.price === "" ||
							local.price === "0" ||
							local.price === 0 ||
							local.sellingPrice === "" ||
							local.sellingPrice === "0" ||
							local.sellingPrice === 0
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
		produce: state.farmData.produce,
		// submitError: state.farmData.addProduceError,
		// addProduceLoader: state.farmData.addProduceLoader,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addProduceData: (data) => dispatch(addProduceData(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduceForm);
