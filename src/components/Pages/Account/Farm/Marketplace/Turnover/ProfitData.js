import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getSoldProducts } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { getMonth, getYear } from "date-fns";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";
export const ProfitData = (props) => {
	const currentDate = new Date();

	const yearList = [];
	const currentYear = getYear(currentDate);

	// Generate the list of years from now to 2050
	for (let year = currentYear; year <= 2050; year++) {
		yearList.push(year);
	}

	const currentMonth = format(currentDate, "MMMM");
	const [filter, setFilter] = useState("Month");
	const [farmCycleStartMonth, setFarmCycleStartMonth] = useState("jan");
	const [farmCycleEndMonth, setFarmCycleEndMonth] = useState("june");
	const [farmCycleStartYear, setFarmCycleStartYear] = useState(currentYear);
	const [farmCycleEndYear, setFarmCycleEndYear] = useState(
		parseInt(currentYear + 1)
	);
	const [month, setMonth] = useState(currentMonth);
	const [year, setYear] = useState(currentYear);
	// const { farmCycle, setFarmCycle } = useState("1");

	let filterComponent =
		filter === "Month" ? (
			<div style={{ display: "flex" }}>
				<div>
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
				</div>
				<div>
					<Dropdown
						id="year"
						styling="grey dropdown-input"
						data={year}
						// data={local.measure}
						required
						items={yearList}
						function={(e) => setYear(e)}
					/>
				</div>
			</div>
		) : (
			<>
				<div style={{ display: "flex" }}>
					<div style={{ display: "flex", alignItems: "baseline" }}>
						Start Month
						<Dropdown
							id="farmCycleStartMonth"
							styling="grey dropdown-input"
							data={farmCycleStartMonth}
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
							function={(e) => setFarmCycleStartMonth(e)}
						/>
						Start Year
						<Dropdown
							id="farmCycleStartYear"
							styling="grey dropdown-input"
							data={farmCycleStartYear}
							// data={local.measure}
							required
							items={yearList}
							function={(e) => {
								setFarmCycleStartYear(e);
							}}
						/>
					</div>
					<div
						style={{
							display: "flex",
							alignItems: "baseline",
							border: ".5px solid lightgrey",
						}}
					>
						End Month
						<Dropdown
							id="farmCycleEndMonth"
							styling="grey dropdown-input"
							data={farmCycleEndMonth}
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
							function={(e) => setFarmCycleEndMonth(e)}
						/>
						End Year
						<Dropdown
							id="farmCycleEndYear"
							styling="grey dropdown-input"
							data={farmCycleEndYear}
							// data={local.measure}
							required
							items={yearList}
							function={(e) => setFarmCycleEndYear(e)}
						/>
					</div>
				</div>
			</>
		);

	return (
		<div>
			<Row style={{ alignItems: "center" }}>
				<Col md={2}>Filter By :</Col>
				<Col md={2}>
					{" "}
					<>
						<Dropdown
							id="filter"
							styling="grey dropdown-input"
							data={filter}
							// data={local.measure}
							required
							items={["Month", "FarmCycle"]}
							function={(e) => setFilter(e)}
						/>
					</>
				</Col>
				<Col md={8}>{filterComponent}</Col>
			</Row>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitData);
