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
				<div className="userInfo">
					<span> UserName</span>
					<span> Location</span>
				</div>
			</div>
			<div>
				{/* {status} */}
				completed
				<StatusBulb color={"red"} />
				<DropDownArrowIcon />
			</div>
		</div>
	);
};

export default Accordion;
