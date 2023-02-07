import React, { useState } from "react";
import "./Accordion.css";
import DropDownArrowIcon from "../../icons/dropDownArrowIcon";
import StatusBulb from "./StatusBulb";
import ExternalLink from "../../icons/externalLink";

const Accordion = () =>
	// { status, requestedProducts }
	{
		const [color, setColor] = useState();
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
		// 		<div>
		// 			<span>
		// 				{/* {product.name} */}
		// 				productName
		// 			</span>
		// 			<span>
		// 				productQuantity
		// 				{/* {product.quantity} */}
		// 			</span>
		// 		</div>
		// 	);
		// });

		return (
			<div className="accordion">
				<div className="accordion_top">
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
						<DropDownArrowIcon />
					</div>
				</div>

				<div className="accordion_dropDown">
					<div>
						<div>
							status :<span className="status-green">Completed</span>
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
						requestedProducts
						{/* <span>{products}</span> */}
						<dvi className="accordion_dropdown_productItems">
							list of requested products
						</dvi>
					</div>
				</div>
			</div>
		);
	};

export default Accordion;
