import React, { useEffect, useState } from "react";
import "./Accordion.css";
import "./Button.css";
import ArrowIcon from "../../icons/ArrowIcon";
import { useFormik } from "formik";

import ExternalLink from "../../icons/externalLink";
import { v4 as uuidv4 } from "uuid";

const Accordion = ({ userName, location, products, status, date }) => {
	const [accordionOpen, setAccordionOpen] = useState(false);
	let color;
	let newObj = {}; 

	const copyProduct = [...products];

	copyProduct.forEach((product) => {
		newObj[`${product.name}_unit`] = "";
		newObj[`${product.name}_price`] = "";
		newObj[`${product.name}_sply`] = "";
	});

	//console.log(newObj);

	//used formik to get details to get pricing information

	const productPricingForm = useFormik({
		initialValues: newObj,

		onSubmit: submitAccordionForm,
	});

	//used formik to get details to know if farmer has been sent an email
	const farmerMailForm = useFormik({
		initialValues: {
			sentFarmerMail: false,
		},
	});

	// function to submit the forms
	function submitAccordionForm() {
		// productPricingForm.values
		// farmerMailForm.values
	}

	let dropDownOption1;

	let EditableRow = ({ productInfo }) => {
		const { name, quantity } = productInfo;

		return (
			<tr>
				<td>{name}</td>
				<td>{quantity}</td>
				<td>
					<input
						id={`${name}_price`}
						name={`${name}_price`}
						type="number"
						placeholder="0"
						onChange={productPricingForm.handleChange}
						value={productPricingForm.values[`${name}_price`]}
					></input>
				</td>
				<td>
					<select name={`${name}_unit`} id="unit_select">
						<option value="kg">kg</option>
						<option value="g">g</option>
						<option value="ltr">ltr</option>
						<option value="unit">unit</option>
					</select>
				</td>
				<td>
					<input
						id={`${name}`}
						name={`${name}_sply`}
						type="text"
						placeholder="farm"
						onChange={productPricingForm.handleChange}
						value={productPricingForm.values[`${name}_sply`]}
					></input>
				</td>
			</tr>
		);
	};

	let Row = ({ productInfo }) => {
		const { name, quantity, price, unit, supplier } = productInfo;

		return (
			<tr>
				<td>{name}</td>
				<td>{quantity}</td>
				<td>{price}</td>
				<td>{unit}</td>
				<td>{supplier}</td>
			</tr>
		);
	};

	let tableRowType = products.map((product) => {
		if (status === "progress") {
			return (
				<EditableRow
					key={`gridItem-${uuidv4()}`}
					productInfo={product}
				></EditableRow>
			);
		} else {
			return <Row key={`gridItem-${uuidv4()}`} productInfo={product}></Row>;
		}
	});

	let submitBtn =
		status === "progress" ? (
			<button type="submit" className="accordion_productUpdateBtn">
				Submit
			</button>
		) : (
			""
		);

	switch (status) {
		case "completed":
			dropDownOption1 = "";
			color = "green";

			break;
		case "progress":
			dropDownOption1 = (
				<>
					{" "}
					<form>
						<label for="farmermail">SENT FARMER EMAIL </label>
						<input
							onChange={farmerMailForm.handleChange}
							value={farmerMailForm.values.sentFarmerMail}
							type="checkbox"
							id="sentFarmerMail"
							name="sentFarmerMail"
						></input>
					</form>
				</>
			);
			color = "purple";

			break;
		case "canceled":
			dropDownOption1 = <>reason for cancellation: </>;
			color = "red";

			break;
		case "pending":
			dropDownOption1 = <>pending payment</>;
			color = "yellow";

			break;

		default:
			dropDownOption1 = "";
	}

	let tableInfo = (
		<>
			<table className="accordion_table">
				<thead className="accordion_table_head">
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>price</th>
						<th>Unit</th>
						<th>Supplier</th>
					</tr>
				</thead>
				<tbody className="tbody">{tableRowType}</tbody>
			</table>
			{submitBtn}
		</>
	);

	function accordionHandler() {
		if (accordionOpen) {
			setAccordionOpen(false);
		} else {
			setAccordionOpen(true);
		}
	}

	let accordionDropDown = accordionOpen ? (
		<div className="accordion_dropDown">
			<div className="accordion_dropDown_left">
				<div>
					status :{" "}
					<span className="accordion_status_name" data-color={color}>
						{status}
					</span>
				</div>
				<div>
					Link to mail{" "}
					<span>
						<ExternalLink />
					</span>
				</div>
				{dropDownOption1}
			</div>

			<div className=".accordion_dropdown_products">
				requested Products :{tableInfo}
			</div>
		</div>
	) : (
		""
	);

	return (
		<div className="accordion">
			<div onClick={accordionHandler} className="accordion_top">
				<div className="accordion_top_left">
					<div className="accordion_top_date">{date}</div>
					<div className="accordion_top_userInfo">
						<span> {userName}</span>
						<span> {location}</span>
					</div>
				</div>
				<div className="accordion_top_right">
					{/* status: {status} */}
					<span
						// style={color2}
						data-color={color}
						className="accordion_status"
					>
						{status}
					</span>

					<ArrowIcon />
				</div>
			</div>
			{accordionDropDown}
		</div>
	);
};

export default Accordion;
