import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";

function BookConsulting() {
	const [consultationType, setConsultationType] = useState("");
	return (
		<div>
			<Form.Group className="form-group">
				<Form.Label className="form-label">
					6. Field of Expertise<span style={{ color: "red" }}>*</span>
				</Form.Label>
				<Form.Control
					as="select"
					className="form-control"
					onChange={(e) => setConsultationType(e.target.value)}
					required
				>
					<option>Select</option>
					<option>Dietician</option>
					<option>Nutrition</option>
					<option>Food and Beverage</option>
					<option>Food Safety</option>
					<option>Sustainable Food Packaging</option>
					<option>Aquaculture</option>
					<option>Horticulture</option>
					<option>Agro-Feed</option>
					<option>Account and Legal</option>
					<option>Supply Chain</option>
				</Form.Control>
			</Form.Group>
		</div>
	);
}

export default BookConsulting;
