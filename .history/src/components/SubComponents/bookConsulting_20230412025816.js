import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchConsultantData } from "../../store/actions/consultingActions";
import DatePicker from "react-datepicker";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

function BookConsulting(props) {
	const [consultationType, setConsultationType] = useState("");
	const [consultationDate, setConsultationDate] = useState(new Date());
	const [result, setResult] = useState(null);

	const { consultingResult, getConsultants } = props;

	function chooseConsultationType(e) {
		setConsultationType(e.target.value);

		// console.log();
	}

	const submitQuery = () => {};

	useEffect(() => {
		if (consultationType) {
			let newFormat = format(consultationDate, "yyyy-MM-dd");
			getConsultants(consultationType, newFormat);
		}
	}, [consultationDate, consultationType, getConsultants]);

	useEffect(() => {
		if (consultingResult >= 0) {
			setResult(consultingResult);
		}
	}, [consultingResult]);

	let consultants = if(result.lenght> 0){
		result.map((eachResult)=>{
			return <div>{eachResult.fullName}</div>
		})
		

	};

	let consultRe =
		result === null ? (
			<div>
				<p>select consultant specialty and date</p>
			</div>
		) : result.lenght === 0 ? (
			<div>
				<p>There are no consultant available for that day</p>
			</div>
		) : (
			<div>ok there are results</div>
		);

	return (
		<div>
			<h1>Search for consultant</h1>
			<Row>
				<Col>
					<Form.Group className="form-group">
						<Form.Label className="form-label">
							Choose field of consultation
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
				</Col>
				<Col>
					<Form.Group className="form-group">
						<Form.Label className="form-label">
							pick data for consultation
						</Form.Label>
						<DatePicker
							selected={consultationDate}
							onChange={(date) => setConsultationDate(date)}
							// dateFormat="dd/m/yyyy"
						/>
					</Form.Group>
				</Col>
			</Row>
			<div>{consultRe}</div>
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
