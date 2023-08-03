import React, { useState } from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import DatePicker from "react-datepicker";

export const DailyExpense = (props) => {
	const currentDate = new Date();
	const [date, setDate] = useState(currentDate);

	const currentDay = format(currentDate, "MMMM d, yyyy");

	return (
		<div>
			<Row>
				<Col>All expense cost for today {currentDay} </Col>
				<Col>
					Select other dates {currentDay}
					<DatePicker
						selected={date}
						onChange={(date) => setDate(date)}
						// dateFormat="dd/m/yyyy"
					/>
				</Col>
			</Row>
			<div style={{ textAlign: "left", marginTop: "10px" }}>
				<div>Labour</div>
				<div>Material</div>
				<div>Equipment</div>
				<div>Energy</div>
				<div>Water</div>
				<div>Seed</div>
				<div>Nutrient</div>
				<div>Nutrient</div>
				<div>Land lease</div>
				<div>others</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DailyExpense);
