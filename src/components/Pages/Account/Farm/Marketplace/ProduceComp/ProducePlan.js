import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

import { AddProduceModal } from "./Icons/AddProduceModal";

import ProduceItems from "./produce";

export const ProducePlan = ({ value, onChange }) => {
	const [calendar, setCalendar] = useState([]);
	const [show, setShow] = useState(false);

	function chosenDay() {
		return value.format("dddd DD/MM");
	}

	return (
		<>
			<div className="row">
				<div className="col-8" style={{ textAlign: "left" }}>
					Add item to your harvest Inventory 🙂
				</div>
				<div className="col-4" style={{ textAlign: "right" }}>
					<AddProduceModal value={value} show={show} setShow={setShow} />
				</div>
			</div>
			<div className="plan-box">
				<div className="header">{chosenDay()}</div>
				<div>
					<ProduceItems value={value} show={show} />
				</div>
			</div>
		</>
	);
};
