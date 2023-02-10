import React, { useEffect, useState, useRef } from "react";
import "./Accordion.css";
import "./Button.css";
import ArrowIcon from "../../icons/ArrowIcon";

import ExternalLink from "../../icons/externalLink";
import { v4 as uuidv4 } from "uuid";

const Accordion = () =>
	// { status, requestedProducts }

	{
		// const [color, setColor] = useState();
		const status = "progress";
		const [accordionOpen, setAccordionOpen] = useState(false);
		let color;

		// const gridItem = useRef([]);

		let requestDummy = {
			userName: "Jamed Deen",
			location: "Edinburgh",
			name: "Rice",
			price: 20,
			status: "progress",
			quantity: 8,
			measure: "kg",
		};

		const requestedProducts = Array.from(Array(10).keys());

		let dropDownOption1;
		let dropDownOption2;

		let productPricing = requestedProducts.map((product) => {
			return (
				<div>
					{/* {product.name} */}
					<div>Rice</div>
					<div className="accordion_productUpdate_input">
						<input type="number"></input>

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
						<label for="farmermail">SENT FARMER EMAIL </label>
						<input type="checkbox" id="farmermail" name="farmermail"></input>
					</>
				);
				color = "purple";
				dropDownOption2 = (
					<div className="accordion_dropdown_Option2">
						UPLOAD PRICING
						<form
							// ref={gridItem}
							key={`gridItem-${uuidv4()}`}
							className="accordion_productUpdate"
						>
							{/* <div></div> */}
							{productPricing}
						</form>
						<button className="accordion_productUpdateBtn">Submit</button>
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

		let productInfo = requestDummy.price ? (
			""
		) : (
			<div className="accordion_dropdown_info">
				<div>
					Qty : 8 <span>Price : {requestDummy.price}$</span>
				</div>
				<div>Farm : Divine Farms</div>
			</div>
		);

		let products = requestedProducts.map((product) => {
			return (
				<div
					// ref={(el)=>gridItem(el)}
					key={`gridItem-${uuidv4()}`}
					className="accordion_dropdown_productItem"
					onMouseEnter={() => extraInfoHandler(true)}
					onMouseLeave={() => extraInfoHandler(false)}
				>
					{/* {product.name} */}
					Rice
					{productInfo}
				</div>
			);
		});

		function accordionHandler() {
			if (accordionOpen) {
				setAccordionOpen(false);
			} else {
				setAccordionOpen(true);
			}
		}

		function extraInfoHandler() {}
		// let productName = product.name

		// if (product.name.length > 7){
		// 	function divide(str, index) {
		// 		const result = [str.slice(0, index), str.slice(index)];

		// 		return result;
		// 	  }
		// 	const [first,second]= divide(product.name, 4)
		// 	productName = <><span className="">{first}</span><span>{second}</span></>

		// }

		//         Name of user

		// let extraDetails = extraInfoShown ? (
		// 	<div className="accordion_dropdown_info">
		// 		<div>Qty : 8</div>
		// 		<div>Farm : Divine Farms</div>
		// 	</div>
		// ) : (
		// 	""
		// );

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
				<div className="accordion_dropdown_products">
					<div>
						requested Products :{/* <span>{products}</span> */}
						<div className="accordion_dropdown_productItems">{products}</div>
					</div>

					{dropDownOption2}
				</div>
			</div>
		) : (
			""
		);
		// let color1 = {--color2:${color}};

		return (
			<div className="accordion">
				<div onClick={accordionHandler} className="accordion_top">
					<div className="accordion_top_left">
						<div className="accordion_top_date">date</div>
						<div className="accordion_top_userInfo">
							<span> James Cameron</span>
							<span> Edinburgh</span>
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

						{/* <StatusBulb
							color={color}
							// color={color}
						/> */}
						{/* <button className="btn-plain" onClick={accordionHandler}> */}
						<ArrowIcon />
						{/* </button> */}
					</div>
				</div>
				{accordionDropDown}
			</div>
		);
	};

export default Accordion;
