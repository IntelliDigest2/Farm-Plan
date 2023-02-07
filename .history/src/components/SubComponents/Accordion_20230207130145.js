import React, { useState } from "react";
import "./Accordion.css";
import DropDownArrowIcon from "../../icons/dropDownArrowIcon";
import StatusBulb from "./StatusBulb";

const Accordion = () =>
	// { status, requestedProducts }
	{
		const [color, setColor] = useState();

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
				<div>
					<div>
						<div className="date">date</div>
						<div className="userInfo">
							<span> UserName</span>
							<span> Location</span>
						</div>
					</div>
					<div>
						{/* status: {status} */}
						status: completed
						<StatusBulb
							color={"red"}
							// color={color}
						/>
						<DropDownArrowIcon />
					</div>
				</div>
				<div>
					<div className="accordion_dropDown">
						<div>
							<div>
								status: Completed
								{/* {status} */}
							</div>
							<div>Link to mail</div>
						</div>
						<div>
							requestedProducts
							{/* <span>{products}</span> */}
							<span>list of requested products</span>
						</div>
					</div>
				</div>
			</div>
		);
	};

export default Accordion;
