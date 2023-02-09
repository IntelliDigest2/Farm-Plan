import React, { useState } from "react";
import "./Accordion.css";
import DropDownArrowIcon from "../../icons/dropDownArrowIcon";
import StatusBulb from "./StatusBulb";

const Accordion = ({ status, products }) => {
	const [color, setColor] = useState();

	switch (status) {
		case "completed":
			setColor("green");
			break;
		case "progress":
			setColor("purple");
			break;
		case "canceled":
			setColor("red");
			break;
		case "pending":
			setColor("yellow");
			break;

		default:
			setColor("grey");
	}

	let purchasedProducts = products.map((product) => {
		return (
			<div>
				<span>{product.name}</span>
				<span>{product.quantity}</span>
			</div>
		);
	});

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
					{/* {status} */}
					"status: completed"
					<StatusBulb color={"red"} />
					<DropDownArrowIcon />
				</div>
			</div>
			<div>
				<div className="dropdown">
					<div>
						<div>status {status}</div>
						<div>Link to mail</div>
					</div>
					<div>"purchasedProducts"</div>
				</div>
			</div>
		</div>
	);
};

export default Accordion;
