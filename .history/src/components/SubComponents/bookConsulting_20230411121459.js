import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchConsultantData } from "../../store/actions/consultingActions";

function BookConsulting() {
	const [consultationType, setConsultationType] = useState("");

	function chooseConsultationType(e) {
		setConsultationType(e.target.value);
	}

	useEffect(() => {}, [consultationType]);

	return (
		<div>
			<Form.Group className="form-group">
				<Form.Label className="form-label">
					Choose field of consultation<span style={{ color: "red" }}>*</span>
				</Form.Label>
				<Form.Control
					as="select"
					className="form-control"
					onChange={chooseConsultationType}
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

const mapStateToProps = (state) => {
	return {
		consultingResult: state.consultingState.consultingData,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getConsultants: (consultationField, date) => {
			dispatch(fetchConsultantData(consultationField, date));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookConsulting);
