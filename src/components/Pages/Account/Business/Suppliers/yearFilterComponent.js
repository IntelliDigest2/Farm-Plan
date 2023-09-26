import React, { useState, useEffect } from "react";
import { Dropdown } from "./../../../../SubComponents/Dropdown";
import { format } from "date-fns";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";

function YearFilterComponent({ fetchData }) {
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();
	const currentMonth = format(currentDate, "MMMM").substring(0, 3);

	const [filter, setFilter] = useState("Month");
	const [month, setMonth] = useState(currentMonth);
	const [year, setYear] = useState(currentYear);
	const [monthYear, setMonthYear] = useState(currentYear);

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

	const endYear = 2030;
	const years = [];

	for (let year = currentYear; year <= endYear; year++) {
		years.push(year);
	}

	const sendDataToParent = (duration, period) => {
		fetchData(duration, period);
	};

	useEffect(() => {
		let period;
		if (filter === "Month") {
			console.log(`filter changed to month `);
			let monthNumber = months.indexOf(month) + 1;

			period = { monthNumber, monthYear };
		} else {
			console.log(`filter changed to year `);

			period = year;
		}

		// console.log(filter, period);

		// props.getSalesData(filter, period);
		sendDataToParent(filter, period);
	}, [filter]);

	useEffect(() => {
		if (filter === "Month") {
			console.log(`month change`);
			let monthNumber = months.indexOf(month) + 1;

			sendDataToParent(filter, { monthNumber, monthYear });
		}
	}, [month]);
	useEffect(() => {
		if (filter === "Month") {
			console.log(`month change`);
			let monthNumber = months.indexOf(month) + 1;

			sendDataToParent(filter, { monthNumber, monthYear });
		}
	}, [monthYear]);

	useEffect(() => {
		if (filter === "Year") {
			console.log(`year change`);

			// props.getSalesData(filter, year);
			sendDataToParent(filter, year);
		}
	}, [year]);

	let componentToRender =
		filter === "Month" ? (
			<>
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
				<Dropdown
					id="year"
					styling="grey dropdown-input"
					data={monthYear}
					// data={local.measure}
					required
					items={years}
					function={(e) => setMonthYear(e)}
				/>
			</>
		) : (
			<Dropdown
				id="year"
				styling="grey dropdown-input"
				data={year}
				// data={local.measure}
				required
				items={years}
				function={(e) => setYear(e)}
			/>
		);
	return (
		<>
			<Col md={2}>Filter by</Col>
			<Col md={4}>
				<Dropdown
					// id="nutrientUnit"
					styling="grey dropdown-input"
					data={filter}
					// data={local.measure}
					required
					items={["Month", "Year"]}
					function={(e) => setFilter(e)}
				/>
			</Col>
			<Col style={{ display: "flex", alignItems: "center" }} md={4}>
				{componentToRender}
			</Col>
		</>
	);
}

export default YearFilterComponent;
