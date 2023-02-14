import React from "react";
import "./Accordion.css";
import DropDownArrowIcon from "../../icons/dropDownArrowIcon";
import StatusBulb from "./StatusBulb";

const Accordion = ({ status }) => {
	return (
		<div className="accordion">
			date Name Location Status
			<StatusBulb color={status} />
			<DropDownArrowIcon />
		</div>
	);
};

export default Accordion;
