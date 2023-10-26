import React, { useEffect, useState, useRef } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

import DatePicker from "react-datepicker";

import { connect, useSelector } from "react-redux";

import { Dropdown } from "./../../../../../SubComponents/Dropdown";
import { submitNotification } from "./../../../../../lib/Notifications";
import { addSaleData } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";

const AddSalesForm = (props) => {
	const [submitError, setSubmitError] = useState(false);
	const defaultLocal = {
		unit: "bags",
		quantity: "",
		productName: "",
		batchNumber: "",
		amount: "",
		currency: "$",
		customerName: "",
		medium: "ext",
	};
	const [submitLoading, setSubmitLoading] = useState(false);

	const [show, setShow] = useState(true);
	const [saleDate, setSaleDate] = useState(new Date());

	const [local, setLocal] = useState(defaultLocal);
	const [productType, setProductType] = useState("Horticulture");
	const formRef = useRef(null);

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

	const handleLocal = (e) => {
		setLocal({ ...local, [e.target.id]: e.target.value });
	};

	const handleForm = () => setShow(true);
	const handleFormClose = () => {
		setShow(false);
	};

	//fired when click "done"
	const handleSubmit = (e) => {
		const data = {
			medium: "ext",
			unit: local.unit,
			quantity: local.quantity,
			price: { amount: local.amount, currency: local.currency },
			currency: local.currency,
			date: saleDate,
			productName: local.productName.toLowerCase(),
			productType: productType,
			batchNumber: local.batchNumber,
			customerInfo: { customerName: local.customerName, customerId: null },
		};

		console.log(data, `this is the data returned`);
		setSubmitLoading(true);

		props
			.addSaleData(data)
			.then((resp) => {
				console.log(resp, `thi is the response before the notification`);
				if (resp === null) {
					setSubmitLoading(false);
					// setLocal(defaultLocal);
					submitNotification(
						"Error",
						"Please make sure your product name and batch number are correct (product must belong to the correct batch)"
					);
				} else if (resp === "currentQuantity deficit") {
					setSubmitLoading(false);
					// setLocal(defaultLocal);
					submitNotification(
						"Error",
						`Insufficient Quantity ( ${data.productName} with bactchNumber  ${data.batchNumber} does not contain the desired quantity available for sale).`
					);
				} else {
					setSubmitLoading(false);
					setLocal(defaultLocal);
					submitNotification("Success", "Produce added to sales");
				}
				// console.log(resp.id, `this is the id of the newly added sale`);
			})
			.catch((err) => {
				console.log(err, `an error occurred`);
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
					<Form.Label>Product Type</Form.Label>
					<InputGroup>
						<Dropdown
							id="productType"
							styling="grey dropdown-input"
							data={productType}
							items={["Horticulture", "Aquaculture", "Livestock"]}
							function={(e) => {
								setProductType(e);
							}}
						/>
					</InputGroup>
				</Form.Group>

				<div>
					<Form.Group>
						<Form.Label>Product name</Form.Label>
						<Form.Control
							type="text"
							id="productName"
							onChange={(e) => handleLocal(e)}
							value={local.productName}
							placeholder="eg mango"
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Batch Number</Form.Label>
						<div
							style={{
								color: "grey",
								display: "inline-block",
								fontSize: "12px",
							}}
						>
							products with same name but different batchNumbers should be added
							individually
						</div>

						<Form.Control
							type="text"
							id="batchNumber"
							onChange={(e) => handleLocal(e)}
							value={local.batchNumber}
							placeholder="add the Batch Number to which this product belongs"
							required
						/>
						{/* TODO ADD SMALL TEXT THAT FECTHES THE PRODUCT ID FROM THE FARMPLAN WHEN THE PRODUCT NAME HAS BEEN TYPED IN THE INPUT */}
					</Form.Group>

					<Form.Group>
						<Form.Label>Unit price</Form.Label>
						<InputGroup>
							<Form.Control
								id="amount"
								type="number"
								min="0"
								step="1"
								onChange={(e) => handleLocal(e)}
								value={local.amount}
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
								placeholder="0"
								required
							/>
							<Dropdown
								id="unit"
								styling="grey dropdown-input"
								data={local.unit}
								items={["kg", "bags", "g", "/", "oz", "lbs", "/", "l", "ml"]}
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
							local.quantity.trim() === "" ||
							local.productName.trim() === "" ||
							local.batchNumber.trim() === "" ||
							local.amount.trim() === "" ||
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
		addSaleData: (data) => dispatch(addSaleData(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSalesForm);
