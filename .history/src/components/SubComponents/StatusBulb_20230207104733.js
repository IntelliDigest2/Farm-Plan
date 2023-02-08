import React from "react";
import "./Accordion.css";

const StatusBulb = ({ color }) => {
	let bulbStatus = `bulb bulb-${color}`;
	return <div className={bulbStatus}> </div>;
};

export default StatusBulb;
