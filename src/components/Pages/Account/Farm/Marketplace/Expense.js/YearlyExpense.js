import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { format } from "date-fns";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";

export const YearlyExpense = (props) => {
	const currentDate = new Date();

	let currentYear = format(currentDate, "yyyy");
	const [year, setYear] = useState(currentYear);

	// useEffect(() => {}, [getSoldProducts]);
	useEffect(() => {}, [year]);

	const endYear = 2050;
	const years = [];

	for (let year = currentYear; year <= endYear; year++) {
		years.push(year);
	}

	return (
		<div>
			<Row style={{ alignItems: "baseline" }}>
				<Col md={4}>
					<Dropdown
						id="year"
						styling="grey dropdown-input"
						data={year}
						// data={local.measure}
						required
						items={years}
						function={(e) => setYear(e)}
					/>
				</Col>
				<Col md={4}>Expense for {year}</Col>
			</Row>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(YearlyExpense);
