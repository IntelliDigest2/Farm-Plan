import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdbreact";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import { format } from "date-fns";
import { Dropdown } from "./../../../SubComponents/Dropdown";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { getFarmProductsForDuration } from "./../../../../store/actions/marketplaceActions/farmPlanData";

Chart.register(...registerables);

const ChartProduce = (props) => {
	let defaultPeriod = {};
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();
	const currentMonth = format(currentDate, "MMMM").substring(0, 3);
	const [day, setDay] = useState(new Date());
	const [filter, setFilter] = useState("day");
	const [month, setMonth] = useState(currentMonth);
	const [week, setWeek] = useState("1");
	const [year, setYear] = useState(currentYear);
	// Sample data

	let months = [
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
	];

	useEffect(() => {
		let period;
		if (filter === "Week") {
			console.log(`filter changed to week`);
			period = week;
		} else if (filter === "Month") {
			console.log(`filter changed to month `);
			let monthNumber = months.indexOf(month) + 1;

			period = monthNumber;
		} else if (filter === "Year") {
			console.log(`filter changed to year `);

			period = year;
		} else {
			period = day;
		}

		props.getData(filter, period);
	}, [filter]);

	useEffect(() => {
		if (filter === "Week") {
			console.log(`Week change`);
			props.getData(filter, week);
		}
	}, [week]);
	useEffect(() => {
		if (filter === "Month") {
			console.log(`month change`);
			let monthNumber = months.indexOf(month) + 1;

			props.getData(filter, monthNumber);
		}
	}, [month]);
	useEffect(() => {
		if (filter === "Year") {
			console.log(`year change`);

			props.getData(filter, year);
		}
	}, [year]);

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
				items={months}
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
			//  filter === "Farm Cycle"?():
			// <Form.Group className="mb-3 land">
			// 					<Form.Label>Farm Cycle</Form.Label>
			// 					<InputGroup>
			// 						<Form.Control
			// 							type="number"
			// 							id="farmCycle"
			// 							onChange={(e) => setFarmCycle(e.target.value)}
			// 							value={land}
			// 							min={1}
			// 							max={20}
			// 							required
			// 						/>
			// 						<Dropdown
			// 							id="cycleUnit"
			// 							styling="green dropdown-input-right"
			// 							data={cycleUnit}
			// 							function={(e) => {
			// 								setCycleUnit(e);
			// 							}}
			// 							items={["months", "years"]}
			// 						/>
			// 					</InputGroup>
			// 				</Form.Group>
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
	const data = {
		labels: ["Horticulture", "Aquaculture", "Livestock"],
		datasets: [
			{
				label: "Produce Summary",
				data: [2, 5, 6],
				backgroundColor: ["blue", "green", "orange"],
			},
		],
	};

	return (
		<MDBContainer>
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
			<Doughnut data={data} />
		</MDBContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		produce: state.farmData.produce,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getData: (duration, period) => {
			dispatch(getFarmProductsForDuration(duration, period));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartProduce);
