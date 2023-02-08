import React, { useState } from "react";
import "./Accordion.css";
import DropDownArrowIcon from "../../icons/dropDownArrowIcon";
import StatusBulb from "./StatusBulb";

const Accordion = ({ status }) => {
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
	return (
		<div className="accordion">
			<div>
				<div className="date">date</div>
				<div>
					<span> UserName</span>
					<span> Location</span>
				</div>
			</div>
			Status
			<StatusBulb color={color} />
			<DropDownArrowIcon />
		</div>
	);
};

export default Accordion;
