import React, { useEffect, useState, useRef } from "react";
import "./Accordion.css";
import "./Button.css";
import ArrowIcon from "../../icons/ArrowIcon";
import ProductRequestInfo from "./ProductRequestInfo";
import { useFormik } from "formik";

import ExternalLink from "../../icons/externalLink";
import { v4 as uuidv4 } from "uuid";

const Accordion = ({ userName, location, products, status, date }) => {
	const [accordionOpen, setAccordionOpen] = useState(false);
	let color;
	let newObj = {};

	const copyProduct = [...products];

	copyProduct.forEach((product, i) => {
		newObj[`${product.name}-qty${i}`] = "";
	});

	const extraInfoRef = useRef();

	//used formik to get details to get pricing information

	const productPricingForm = useFormik({
		initialValues: {},
		onSubmit: submitAccordionForm,
	});

	// console.log(productPricingForm.values);

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

	// console.log(productPricingForm.values);

	// const gridItem = useRef([]);

	let dropDownOption1;
	let dropDownOption2;

	let productPricing = products.map((product, i) => {
		return (
			<div>
				{/* {product.name} */}
				<div>{product.name}</div>
				<div className="accordion_productUpdate_input">
					<input
						id={`${product.name}-qty${i}`}
						name={`${product.name}-qty${i}`}
						type="number"
						placeholder="0"
						onChange={productPricingForm.handleChange}
						value={productPricingForm.values[`${product.name}`]}
					></input>

					<select name="units" id="unit-select">
						<option value="kg">kg</option>
						<option value="g">g</option>
						<option value="ltr">ltr</option>
						<option value="unit">unit</option>
					</select>
				</div>
			</div>
		);
	});

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
			dropDownOption2 = (
				<div className="accordion_dropdown_Option2">
					UPLOAD PRICING
					<form
						key={`gridItem-${uuidv4()}`}
						className="accordion_productUpdate"
					>
						{productPricing}
					</form>
					<button type="submit" className="accordion_productUpdateBtn">
						Submit
					</button>
				</div>
			);

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

	// console.log(products);

	// let productsInfo = products.map((product, i) => {
	// 	return (
	// 		<div
	// 			// ref={(el)=>gridItem(el)}
	// 			key={`gridItem-${uuidv4()}`}
	// 			className="accordion_dropdown_productItem"
	// 			onMouseEnter={() => extraInfoHandler(true)}
	// 			onMouseLeave={() => extraInfoHandler(false)}
	// 		>
	// 			{product.name}

	// 			<ProductRequestInfo
	// 				id={`extraInfo-${i}`}
	// 				key={`extraInfo-${i}`}
	// 				ref={extraInfoRef}
	// 			/>
	// 		</div>
	// 	);
	// });

	function accordionHandler() {
		if (accordionOpen) {
			setAccordionOpen(false);
		} else {
			setAccordionOpen(true);
		}
	}

	function extraInfoHandler(value) {
		if (value) {
			extraInfoRef.current.style.display = "block";
			// console.log(extraInfoRef.current.id);
		} else {
			extraInfoRef.current.style.display = "none";
		}
	}

	// if (name.length > 7){
	// 	function divide(str, index) {
	// 		const result = [str.slice(0, index), str.slice(index)];

	// 		return result;
	// 	  }
	// 	const [first,second]= divide(product.name, 4)
	// 	productName = <><span className="">{first}</span><span>{second}</span></>

	// }

	let Row = (product) => {
		// console.log(productInfo);
		const { name, price, quantity } = productInfo;
		// console.log(name, quantity);
		return (
			<tr>
				<td>{productInfo.name}</td>
				<td>{quantity}</td>
				<td>
					<input
						id={`${name}-price`}
						name={`${name}-price`}
						type="number"
						placeholder="0"
						onChange={productPricingForm.handleChange}
						value={productPricingForm.values[`${name}`]}
					></input>
				</td>
				<td>
					<select name={`${name}-unit`} id="unit-select">
						<option value="kg">kg</option>
						<option value="g">g</option>
						<option value="ltr">ltr</option>
						<option value="unit">unit</option>
					</select>
				</td>
				<td>
					<input
						id={`${name}`}
						name={`${name}-sply`}
						type="text"
						placeholder="farm"
						onChange={productPricingForm.handleChange}
						value={productPricingForm.values[`${name}-sply`]}
					></input>
				</td>
			</tr>
		);
	};

	// console.log(products);
	let productsData = products.map((product) => {
		console.log(product);
		return <Row productInfo={product}></Row>;
	});

	let table = (
		<table className="table">
			<thead>
				<tr>
					<th>Product</th>
					<th>Quantity</th>
					<th>price</th>
					<th>Unit</th>
					<th>Supplier</th>
				</tr>
			</thead>
			<tbody className="tbody">{productsData}</tbody>
		</table>
	);

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
			{/*  begining */}
			{/* <div className="accordion_dropdown_products"> */}
			{/* <div> */}
			{/* <div className="accordion_dropdown_productItems">{productsInfo}</div> */}
			{/* </div> */}
			{/* {dropDownOption2} */}
			{/* </div> */}
			{/* end */}
			<div>requested Products :{table}</div>
		</div>
	) : (
		""
	);
	// let color1 = {--color2:${color}};

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
