import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSoldProducts } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import {
	Form,
	Row,
	Col,
	Accordion,
	Button,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";

import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { getMonth } from "date-fns";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";
import List from "@mui/material/List";
// import { ListItem, ListGroupItem } from "@mui/material/ListItem";
import { getSalesForDuration } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";

export const Sales = (props) => {
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();
	const currentMonth = format(currentDate, "MMMM").substring(0, 3);
	const [day, setDay] = useState(currentDate);
	const [filter, setFilter] = useState("Day");
	const [month, setMonth] = useState(currentMonth);
	const [week, setWeek] = useState("1");
	const [year, setYear] = useState(currentYear);

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

	// useEffect(() => {
	// 	props.getSalesData("Month", 8);
	// }, []);

	useEffect(() => {}, [props.salesData]);

	//changes the period value
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

		console.log(filter, period);

		props.getSalesData(filter, period);
	}, [filter]);

	useEffect(() => {
		if (filter === "Week") {
			console.log(`Week change`);
			props.getSalesData(filter, week);
		}
	}, [week]);

	useEffect(() => {
		if (filter === "Day") {
			console.log(`day changed to ${day}`);
			props.getSalesData(filter, day);
		}
	}, [day]);

	useEffect(() => {
		if (filter === "Month") {
			console.log(`month change`);
			let monthNumber = months.indexOf(month) + 1;

			props.getSalesData(filter, monthNumber);
		}
	}, [month]);

	useEffect(() => {
		if (filter === "Year") {
			console.log(`year change`);

			props.getSalesData(filter, year);
		}
	}, [year]);

	console.log(props.salesData, `this is the sales data`);

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

	let content =
		props.salesData === null ? (
			"...loading"
		) : props.salesData.length > 0 ? (
			props.salesData.map((sale, index) => (
				<div
					key={`sale-${index}`}
					style={{
						padding: "10px",
						textAlign: "left",

						margin: "5px",
						border: "1px solid grey",
						borderRadius: "5px",
						// height: "100px",
					}}
				>
					<p>Date: {format(sale.date.toDate(), "MMMM d, yyyy")}</p>

					<p style={{ backgroundColor: "#D3D3D3" }}>
						Sale Id number: {sale.salesId}
					</p>
					<p>Product: {sale.productName}</p>
					<p style={{ backgroundColor: "#D3D3D3" }}>
						Customer Name: {sale.customerInfo.customerName}
					</p>
					<p>
						Price:<span>{sale.price.currency}</span>
						{sale.price.amount}
					</p>
					<p style={{ backgroundColor: "#D3D3D3" }}>
						Quantity: {sale.quantity}
						{sale.units}
					</p>
				</div>
			))
		) : (
			<div>You have not made any sales for this period</div>
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

			<div>
				<div
					style={{
						margin: "10px auto",
					}}
				>
					{content}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		salesData: state.farmData.salesInfo,
		salesDataLoader: state.farmData.salesInfoLoader,
		salesDataError: state.farmData.salesInfoError,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSalesData: (duration, period) => {
			dispatch(getSalesForDuration(duration, period));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
