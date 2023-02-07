import React from "react";
import "./Accordion.css";
import DropDownArrowIcon from "../../icons/dropDownArrowIcon";
import StatusBulb from "./StatusBulb";

const Accordion = ({ status }) => {
	return (
		<div className="accordion">
			<div className="date">date</div>
			<div>
				<span> UserName</span>
				<span> Location</span>
			</div>
			Location Status
			<StatusBulb color={status} />
			<DropDownArrowIcon />
		</div>
	);
};

export default Accordion;
