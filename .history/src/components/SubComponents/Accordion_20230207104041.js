import React from "react";
import "./Accordion.css";
import DropDownArrowIcon from "../../icons/dropDownArrowIcon";
import StatusBulb from "./StatusBulb";

const Accordion = () => {
	return (
		<div className="accordion">
			date Name Location Status
			<StatusBulb />
			<DropDownArrowIcon />
		</div>
	);
};

export default Accordion;
