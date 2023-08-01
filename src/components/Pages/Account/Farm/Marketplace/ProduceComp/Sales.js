import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSoldProducts } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { getMonth } from "date-fns";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";

export const Sales = (props) => {
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();

	const currentMonth = format(currentDate, "MMMM");
	const [day, setDay] = useState(new Date());
	const [filter, setFilter] = useState("day");
	const [month, setMonth] = useState("jan");
	const [week, setWeek] = useState("1");
	const [year, setYear] = useState(currentYear);

	// useEffect(() => {}, [getSoldProducts]);
	useEffect(() => {}, [filter]);

	const endYear = 2050;
	const years = [];

	for (let year = currentYear; year <= endYear; year++) {
		years.push(year);
	}

	let componentToRender =
		filter === "Week" ? (
			<>
				<Dropdown
					id="week"
					styling="grey dropdown-input"
					data={week}
					// data={local.measure}
					required
					items={["1", "2", "3", "4"]}
					function={(e) => setWeek(e)}
				/>
				<span style={{ marginLeft: "5px" }}> of {currentMonth}</span>
			</>
		) : filter === "Month" ? (
			<Dropdown
				id="month"
				styling="grey dropdown-input"
				data={month}
				// data={local.measure}
				required
				items={[
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec",
				]}
				function={(e) => setMonth(e)}
			/>
		) : filter === "Year" ? (
			<Dropdown
				id="year"
				styling="grey dropdown-input"
				data={year}
				// data={local.measure}
				required
				items={years}
				function={(e) => setYear(e)}
			/>
		) : (
			<div style={{ display: "flex" }}>
				<span>pick date</span>
				<span>
					<DatePicker
						selected={day}
						onChange={(date) => setDay(date)}
						// dateFormat="dd/m/yyyy"
					/>
				</span>
			</div>
		);

	return (
		<div>
			<Row style={{ alignItems: "center" }}>
				<Col md={2}>Filter by</Col>
				<Col md={4}>
					<Dropdown
						// id="nutrientUnit"
						styling="grey dropdown-input"
						data={filter}
						// data={local.measure}
						required
						items={["Day", "Week", "Month", "Year"]}
						function={(e) => setFilter(e)}
					/>
				</Col>
				<Col style={{ display: "flex", alignItems: "center" }} md={4}>
					{componentToRender}
				</Col>
			</Row>

			<div></div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
