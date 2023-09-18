import React, { useEffect, useState, useRef } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

import DatePicker from "react-datepicker";

import { connect, useSelector } from "react-redux";

import { addToRent } from "./../../../../../../store/actions/supplierActions/supplierData";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";
import { submitNotification } from "./../../../../../lib/Notifications";

const AddToSupplierRentForm = (props) => {
	const [submitError, setSubmitError] = useState(false);
	const defaultLocal = {
		unit: "bags",
		quantity: "",
		duration: "",
		rateDuration: "day",

		rateAmount: "",
		currency: "$",
		customerName: "",
		medium: "ext",
	};
	const [submitLoading, setSubmitLoading] = useState(false);

	const [show, setShow] = useState(true);
	const [rentDate, setRentDate] = useState(new Date());

	const [local, setLocal] = useState(defaultLocal);
	const formRef = useRef(null);

	const handleLocal = (e) => {
		setLocal({ ...local, [e.target.id]: e.target.value });
	};

	const handleForm = () => setShow(true);
	const handleFormClose = () => {
		setShow(false);
	};

	let currentQuantity = props.productInfo.currentQuantity;

	//fired when click "done"
	const handleSubmit = (e) => {
		const data = {
			medium: "ext",

			productQty: local.quantity,
			rateAmount: local.rateAmount,
			rateDuration: local.rateDuration,
			duration: local.duration,
			totalCost: local.duration * local.rateAmount,
			productCurrency: local.currency,
			productMeasure: local.unit,
			brandName: props.productInfo.brandName,

			createdAt: rentDate,
			batchNumber: props.productInfo.batchNumber,
			productName: props.productInfo.productName,
			customerName: local.customerName,
		};

		// console.log(data, `this is the data returned`);
		setSubmitLoading(true);

		props
			.addSupplierRentData(data, currentQuantity)
			.then((resp) => {
				// console.log(resp.id, `this is the id of the newly added sale`);
				setSubmitLoading(false);
				setLocal(defaultLocal);
				submitNotification("Success", "Product added to rent");
			})
			.catch((err) => {
				console.log(err, `an error occurred`);
				submitNotification("Error", "Something went wrong try again");
				setSubmitLoading(false);
				setSubmitError(true);
			});
	};

	return (
		<div>
			<Form ref={formRef}>
				<div>
					<div>
						<p>
							Product Name: <span>{props.productInfo.productName}</span>
						</p>
					</div>
					<div>
						<p>
							Brand Name: <span>{props.productInfo.brandName}</span>
						</p>
					</div>
					<div>
						<p>
							Batch Number: <span>{props.productInfo.batchNumber}</span>
						</p>
					</div>

					{/* <div>
						<p>
							Unit price:{" "}
							<span>
								{props.productInfo.productPrice}
								{props.productInfo.productCurrency}
							</span>
						</p>
					</div> */}

					<Form.Group>
						<Form.Label>Renting price</Form.Label>

						<InputGroup style={{ alignItems: "baseline" }}>
							<Form.Control
								id="rateAmount"
								type="number"
								min="0"
								step="1"
								onChange={(e) => handleLocal(e)}
								value={local.rateAmount}
								placeholder="0"
								required
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
							per
							<Dropdown
								id="rateDuration"
								styling="grey dropdown-input"
								data={local.rateDuration}
								items={["hour", "day", "week", "month", "year"]}
								function={(e) => {
									setLocal({ ...local, rateDuration: e });
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
								max={currentQuantity}
								step="1"
								onChange={(e) => handleLocal(e)}
								value={local.quantity}
								placeholder="0"
								required
							/>
							<Dropdown
								id="unit"
								styling="grey dropdown-input"
								data={local.unit}
								items={[
									"kg",
									"units",
									"bags",
									"g",
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
						<Form.Label>Duration</Form.Label>
						<InputGroup>
							<Form.Control
								id="duration"
								type="number"
								min="0"
								step="1"
								onChange={(e) => handleLocal(e)}
								value={local.duration}
								placeholder="0"
								required
							/>
							<Dropdown
								id="period"
								styling="grey dropdown-input"
								data={local.rateDuration}
								items={["hour", "day", "week", "month", "year"]}
								function={(e) => {
									setLocal({ ...local, rateDuration: e });
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
								placeholder="mr/mrs/company name ..."
								onChange={(e) => handleLocal(e)}
								// style={{ maxHeight: "300px" }}
								value={local.customerName}
							/>
						</InputGroup>
					</Form.Group>

					<Form.Group>
						<Form.Label>Date</Form.Label>
						<DatePicker
							selected={rentDate}
							onChange={(date) => setRentDate(date)}
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
							local.quantity > currentQuantity ||
							// local.duration === "" ||
							// // local.duration === 0 ||
							// local.duration === "0" ||
							// local.quantity === 0 ||
							// local.quantity === "0" ||
							// local.rateAmount === "0" ||
							// local.rateAmount === 0 ||
							local.quantity === "" ||
							local.rateAmount === "" ||
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
		// produce: state.farmData.produce,
		// submitError: state.farmData.addSaleError,
		// addSaleLoader: state.farmData.addSaleLoader,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addSupplierRentData: (data, currentQuantity) =>
			dispatch(addToRent(data, currentQuantity)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddToSupplierRentForm);
