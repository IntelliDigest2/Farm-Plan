import React, { useEffect, useState } from "react";
import "./Accordion.css";
import "./Button.css";
import DropDownArrowIcon from "../../icons/dropDownArrowIcon";
import StatusBulb from "./StatusBulb";
import ExternalLink from "../../icons/externalLink";

const Accordion = () =>
	// { status, requestedProducts }
	{
		const [color, setColor] = useState();
		const [accordionOpen, setAccordionOpen] = useState(false);

		useEffect((value) => {}, [accordionOpen]);

		// const [dropDownContent , setDropDownContent] = useState(status)

		// switch (status) {
		// 	case "completed":
		// 		setColor("green");

		// 		break;
		// 	case "progress":
		// 		setColor("purple");
		// 		break;
		// 	case "canceled":
		// 		setColor("red");
		// 		break;
		// 	case "pending":
		// 		setColor("yellow");
		// 		break;

		// 	default:
		// 		setColor("grey");
		// }

		// let products = requestedProducts.map((product) => {
		// 	return (
		//
		// 			<span className>
		// 				{/* {product.name} */}
		// 				productName
		// 			</span>
		// 			<span>
		// 				productQuantity
		// 				{/* {product.quantity} */}
		// 			</span>
		//
		// 	);
		// });

		function accordionHandler() {
			console.log(accordionOpen);
			if (accordionOpen) {
				setAccordionOpen(false);
				console.log(accordionOpen);
			} else {
				setAccordionOpen(true);
			}
		}

		//         Name of user
		// Email
		// City
		// Name of item
		// Measure
		// Quantity

		let accordionDropDown = accordionOpen ? (
			<div className="accordion_dropDown">
				<div>
					<div>
						status : <span className="status-green">Completed</span>
						{/* {status className= */}
					</div>
					<div>
						Link to mail{" "}
						<span>
							<ExternalLink />
						</span>
					</div>
				</div>
				<div className="accordion_dropdown_products">
					requested Products :{/* <span>{products}</span> */}
					<div className="accordion_dropdown_productItems">
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
						<div className="accordion_dropdown_productItem">
							{/* {product.name} */}
							Name
						</div>
					</div>
				</div>
			</div>
		) : (
			""
		);

		return (
			<div className="accordion">
				<button className="accordion_top">
					<div className="accordion_top_left">
						<div className="accordion_top_date">date</div>
						<div className="accordion_top_userInfo">
							<span> UserName</span>
							<span> Location</span>
						</div>
					</div>
					<div className="accordion_top_right">
						{/* status: {status} */}
						<span>completed</span>

						<StatusBulb
							color={"red"}
							// color={color}
						/>
						{/* <button className="btn-plain" onClick={accordionHandler}> */}
						<DropDownArrowIcon />
						{/* </button> */}
					</div>
				</button>
				{accordionDropDown}
			</div>
		);
	};

export default Accordion;
