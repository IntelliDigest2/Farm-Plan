import React, { useEffect, useState, useRef } from "react";
import { Form, InputGroup, Button, Row, Col } from "react-bootstrap";

import DatePicker from "react-datepicker";

import { connect, useSelector } from "react-redux";

import { Dropdown } from "./../../../../../SubComponents/Dropdown";
import { submitNotification } from "./../../../../../lib/Notifications";
import { addExpenseData } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";

const AddExpenseForm = (props) => {
	const [expenseType, setExpenseType] = useState("Water");

	const [submitError, setSubmitError] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);
	const defaultLocal = {
		supplier: "",
		cost: "",
		currency: "$",
		description: "",
	};

	const [show, setShow] = useState(true);
	const [expenseDate, setExpenseDate] = useState(new Date());

	const [local, setLocal] = useState(defaultLocal);
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
			expenseType: expenseType,
			supplier: { name: local.supplier, id: null },
			medium: "ext",
			// measure: local.measure,
			description: local.description,
			cost: { amount: parseInt(local.cost), currency: local.currency },
			// sellingPrice: local.sellingPrice,

			date: expenseDate,
		};

		setSubmitLoading(true);

		props
			.addExpenseData(data)
			.then((resp) => {
				// console.log(resp.id, `this is the id of the newly added sale`);
				setSubmitLoading(false);
				submitNotification("Success", "Expense added to expense list");
				setLocal(defaultLocal);
			})
			.catch((err) => {
				// console.log(err, `an error occurred`);
				submitNotification("Error", "Something went wrong try again");
				setSubmitLoading(false);
				setSubmitError(true);
			});
	};

	// console.log(props.addExpenseLoader, `this is the add Expense loader`);

	return (
		<div>
			<Form ref={formRef}>
				<Form.Group>
					<Form.Label>Expense Type</Form.Label>
					<InputGroup>
						<Dropdown
							id="measure"
							styling="grey dropdown-input"
							data={expenseType}
							items={[
								"Equipment",
								"Energy",
								"Water",
								"Nutrient",
								"Land lease",
								"others",
							]}
							function={(e) => {
								setExpenseType(e);
							}}
						/>
					</InputGroup>
				</Form.Group>

				<div>
					<Form.Group>
						<Form.Label>Supplier name</Form.Label>
						<Form.Control
							type="text"
							id="supplier"
							onChange={(e) => handleLocal(e)}
							value={local.supplier}
							required
						/>
					</Form.Group>

					<Form.Group>
						<Form.Label>Cost</Form.Label>
						<InputGroup>
							<Form.Control
								id="cost"
								type="number"
								min="0"
								step="1"
								onChange={(e) => handleLocal(e)}
								value={local.cost}
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
						<Form.Label>Description</Form.Label>
						<InputGroup>
							<Form.Control
								as="textarea"
								type="text"
								id="description"
								required
								onChange={(e) => handleLocal(e)}
								// style={{ maxHeight: "300px" }}
								value={local.description}
							/>
						</InputGroup>
					</Form.Group>

					<Form.Group>
						<Form.Label>Date</Form.Label>
						<DatePicker
							selected={expenseDate}
							onChange={(date) => setExpenseDate(date)}
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
							local.supplier.trim() === "" ||
							local.cost.trim() === "" ||
							local.description === ""
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
		// submitError: state.farmData.addExpenseError,
		// addExpenseLoader: state.farmData.addExpenseLoader,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addExpenseData: (data) => dispatch(addExpenseData(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
