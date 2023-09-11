import React, { useEffect, useState, useRef } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

import DatePicker from "react-datepicker";

import { connect, useSelector } from "react-redux";

import { Dropdown } from "./../../../../SubComponents/Dropdown";
import { submitNotification } from "./../../../../lib/Notifications";
import { addToSales } from "./../../../../../store/actions/supplierActions/supplierData";

const AddToSupplierSaleForm = (props) => {
	const [submitError, setSubmitError] = useState(false);
	const defaultLocal = {
		unit: "bags",
		quantity: "",

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
			productPrice: local.amount,
			productCurrency: local.currency,
			productMeasure: local.unit,
			brandName: props.productInfo.brandName,

			createdAt: saleDate,
			batchNumber: props.productInfo.batchNumber,
			productName: props.productInfo.productName,
			customerName: local.customerName,
		};

		// console.log(data, `this is the data returned`);
		setSubmitLoading(true);

		props
			.addSupplierSaleData(data, currentQuantity)
			.then((resp) => {
				// console.log(resp.id, `this is the id of the newly added sale`);
				setSubmitLoading(false);
				setLocal(defaultLocal);
				submitNotification("Success", "Product added to sales");
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

					<div>
						<p>
							Unit price:{" "}
							<span>
								{props.productInfo.productPrice}
								{props.productInfo.productCurrency}
							</span>
						</p>
					</div>

					<Form.Group>
						<Form.Label>Selling price</Form.Label>
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
						<Form.Label>Customer Name</Form.Label>
						<InputGroup>
							<Form.Control
								type="text"
								id="customerName"
								required
								placeholder="mr/mrs ..."
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
							local.quantity <= currentQuantity ||
							local.quantity.trim() === "" ||
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
		addSupplierSaleData: (data, currentQuantity) =>
			dispatch(addToSales(data, currentQuantity)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddToSupplierSaleForm);
