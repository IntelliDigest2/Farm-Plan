import React, { useEffect, useState } from "react";
import { Dropdown } from "./../../../../SubComponents/Dropdown";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

import {
	Form,
	Row,
	Col,
	Accordion,
	Button,
	ListGroup,
	ListGroupItem,
	Table,
} from "react-bootstrap";

function FilterComponent({ fetchData }) {
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();
	const currentMonth = format(currentDate, "MMMM").substring(0, 3);
	const [day, setDay] = useState(currentDate);
	const [filter, setFilter] = useState("Day");
	const [month, setMonth] = useState(currentMonth);
	const [week, setWeek] = useState("1");
	const [year, setYear] = useState(currentYear);
	const [show, setShow] = useState(false);
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

	const sendDataToParent = (duration, period) => {
		// console.log(duration, `this is the duration in the filter component`);
		// console.log(period, `this is the period in the filter component`);
		fetchData(duration, period);
	};

	useEffect(() => {
		let period;
		if (filter === "Week") {
			// console.log(`filter changed to week`);
			period = week;
		} else if (filter === "Month") {
			// console.log(`filter changed to month `);
			let monthNumber = months.indexOf(month) + 1;

			period = { monthNumber, monthYear };
		} else if (filter === "Year") {
			// console.log(`filter changed to year `);

			period = year;
		} else {
			period = day;
		}

		// console.log(filter, period);

		// props.getSalesData(filter, period);
		sendDataToParent(filter, period);
	}, [filter]);

	useEffect(() => {
		if (filter === "Week") {
			// console.log(`Week change`);
			// props.getSalesData(filter, week);
			sendDataToParent(filter, week);
		}
	}, [week]);

	useEffect(() => {
		if (filter === "Day") {
			// console.log(`day changed to ${day}`);
			// props.getSalesData(filter, day);
			sendDataToParent(filter, day);
		}
	}, [day]);

	useEffect(() => {
		if (filter === "Month") {
			// console.log(`month change`);
			let monthNumber = months.indexOf(month) + 1;

			// props.getSalesData(filter, monthNumber);
			sendDataToParent(filter, { monthNumber, monthYear });
		}
	}, [month]);
	useEffect(() => {
		if (filter === "Month") {
			// console.log(`month change`);
			let monthNumber = months.indexOf(month) + 1;

			// props.getSalesData(filter, monthNumber);
			sendDataToParent(filter, { monthNumber, monthYear });
		}
	}, [monthYear]);

	useEffect(() => {
		if (filter === "Year") {
			// console.log(`year change`);

			// props.getSalesData(filter, year);
			sendDataToParent(filter, year);
		}
	}, [year]);

	const endYear = 2030;
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
		<>
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
		</>
	);
}

export default FilterComponent;
