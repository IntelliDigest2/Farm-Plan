import React, { useEffect, useState } from "react";
import { Dropdown } from "./../../../../SubComponents/Dropdown";
import { format } from "date-fns";
import { connect } from "react-redux";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";

export function CycleFilterComponent(props) {
	const yearList = [];
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();
	const currentMonth = format(currentDate, "MMMM").substring(0, 3);
	const [month, setMonth] = useState(currentMonth);
	const [year, setYear] = useState(currentYear);
	const [filter, setFilter] = useState("Month");
	const [farmCycleStartMonth, setFarmCycleStartMonth] = useState("Jan");
	const [farmCycleEndMonth, setFarmCycleEndMonth] = useState("Jun");
	const [farmCycleStartYear, setFarmCycleStartYear] = useState(currentYear);
	const [farmCycleEndYear, setFarmCycleEndYear] = useState(currentYear);

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

	const sendDataToParent = (duration, period) => {
		props.fetchData(duration, period);
	};

	useEffect(() => {
		let period;
		if (filter === "Month") {
			let monthNumber = months.indexOf(month) + 1;

			period = monthNumber;
			sendDataToParent("Month", { month: monthNumber, year });
		} else {
			console.log(farmCycleEndMonth, `this is the farmCycle endMOnth `);
			sendDataToParent("farmCycle", {
				startMonth: months.indexOf(farmCycleStartMonth) + 1,
				endMonth: months.indexOf(farmCycleEndMonth),
				startYear: farmCycleStartYear,
				endYear: farmCycleEndYear,
			});
		}
	}, [filter]);

	const endYear = 2030;
	const years = [];
	// farmCycleStartYear= []
	// farmCycleEndYear = [];

	for (let year = 2023; year <= endYear; year++) {
		years.push(year);
	}

	useEffect(() => {
		if (filter === "Month") {
			let monthNumber = months.indexOf(month) + 1;

			sendDataToParent(filter, { month: monthNumber, year });
		}
	}, [month]);

	useEffect(() => {
		if (filter === "Month") {
			console.log(`month change`);
			let monthNumber = months.indexOf(month) + 1;

			sendDataToParent(filter, { month: monthNumber, year });
		}
	}, [year]);

	const searchFarmCycleTurnOver = () => {
		console.log(`cycle clicked`);
		sendDataToParent("farmCycle", {
			startMonth: months.indexOf(farmCycleStartMonth) + 1,
			endMonth: months.indexOf(farmCycleEndMonth),
			startYear: farmCycleStartYear,
			endYear: farmCycleEndYear,
		});
	};

	let filterComponent = (
		// filter === "Month" ? (
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
					items={years}
					function={(e) => setYear(e)}
				/>
			</div>
		</div>
	);
	// TODO COMMENTING THIS OUT SO I CAN ADD WHEN I FINISH THE FILTER BY FARMCYCLE FUNCTION
	// )
	// : (
	// 	<div style={{ display: "flex", justifyContent: "space-around" }}>
	// 		{/* <Col> */}

	// 		<span
	// 			style={{
	// 				display: "flex",
	// 				alignItems: "baseline",
	// 				marginLeft: "2rem",
	// 				border: "1px solid #d3d3d3",
	// 				backgroundColor: "#d3d3d3",
	// 				borderRadius: "8px",
	// 				padding: "0px 8px",
	// 			}}
	// 		>
	// 			<div>Start Period</div>

	// 			<Dropdown
	// 				id="farmCycleStartMonth"
	// 				styling="grey dropdown-input"
	// 				data={farmCycleStartMonth}
	// 				// data={local.measure}
	// 				required
	// 				items={[
	// 					"Jan",
	// 					"Feb",
	// 					"Mar",
	// 					"Apr",
	// 					"May",
	// 					"Jun",
	// 					"Jul",
	// 					"Aug",
	// 					"Sep",
	// 					"Oct",
	// 					"Nov",
	// 					"Dec",
	// 				]}
	// 				function={(e) => setFarmCycleStartMonth(e)}
	// 			/>
	// 			<Dropdown
	// 				id="farmCycleStartYear"
	// 				styling="grey dropdown-input"
	// 				data={farmCycleStartYear}
	// 				// data={local.measure}
	// 				required
	// 				items={years}
	// 				function={(e) => {
	// 					setFarmCycleStartYear(e);
	// 				}}
	// 			/>
	// 		</span>

	// 		<span
	// 			style={{
	// 				display: "flex",
	// 				alignItems: "baseline",
	// 				// border: ".5px solid lightgrey",
	// 				marginLeft: "2rem",
	// 				border: "1px solid #d3d3d3",
	// 				backgroundColor: "#d3d3d3",
	// 				borderRadius: "8px",
	// 				padding: "0px 8px",
	// 			}}
	// 		>
	// 			<div>End Period</div>
	// 			<Dropdown
	// 				id="farmCycleEndMonth"
	// 				styling="grey dropdown-input"
	// 				data={farmCycleEndMonth}
	// 				// data={local.measure}
	// 				required
	// 				items={[
	// 					"Jan",
	// 					"Feb",
	// 					"Mar",
	// 					"Apr",
	// 					"May",
	// 					"Jun",
	// 					"Jul",
	// 					"Aug",
	// 					"Sep",
	// 					"Oct",
	// 					"Nov",
	// 					"Dec",
	// 				]}
	// 				function={(e) => setFarmCycleEndMonth(e)}
	// 			/>
	// 			<Dropdown
	// 				id="farmCycleEndYear"
	// 				styling="grey dropdown-input"
	// 				data={farmCycleEndYear}
	// 				// data={local.measure}
	// 				required
	// 				items={years}
	// 				function={(e) => setFarmCycleEndYear(e)}
	// 			/>
	// 		</span>
	// 		<Button
	// 			style={{ float: "right", marginLeft: "10px" }}
	// 			type="button"
	// 			onClick={(e) => searchFarmCycleTurnOver(e)}
	// 		>
	// 			{props.searchLoading ? "...loading" : "Search"}
	// 		</Button>
	// 	</div>
	// );
	return (
		<>
			<Row style={{ alignItems: "center", margin: "0 auto" }}>
				<Col md={1.8}>Filter By :</Col>
				<Col md={2}>
					{" "}
					<>
						<Dropdown
							id="filter"
							styling="grey dropdown-input"
							data={filter}
							// data={local.measure}
							required
							items={[
								"Month",
								//  "FarmCycle"
							]}
							function={(e) => setFilter(e)}
						/>
					</>
				</Col>
				<Col md={8.2}>
					<div style={{ display: "flex", flexWrap: "wrap" }}>
						{filterComponent}
					</div>
				</Col>
			</Row>
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		searchLoading: state.farmData.salesInfo,
	};
};

export default connect(mapStateToProps)(CycleFilterComponent);
