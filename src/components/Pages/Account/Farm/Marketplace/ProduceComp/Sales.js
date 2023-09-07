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
	Table,
} from "react-bootstrap";

import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { getMonth } from "date-fns";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";
import List from "@mui/material/List";
// import { ListItem, ListGroupItem } from "@mui/material/ListItem";
import { getSalesForDuration } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import { AddSalesModal } from "./AddSalesModal";
import FilterComponent from "./../filterComponent";

export const Sales = (props) => {
	const currentYear = new Date().getFullYear();
	// const currentDate = new Date();
	// const currentMonth = format(currentDate, "MMMM").substring(0, 3);
	// const [day, setDay] = useState(currentDate);
	const [filter, setFilter] = useState("Day");
	// const [month, setMonth] = useState(currentMonth);
	// const [week, setWeek] = useState("1");
	// const [year, setYear] = useState(currentYear);
	const [show, setShow] = useState(false);
	const [currentDuration, setcurrentDuration] = useState("Day");

	// let months = [
	// 	"Jan",
	// 	"Feb",
	// 	"Mar",
	// 	"Apr",
	// 	"May",
	// 	"Jun",
	// 	"Jul",
	// 	"Aug",
	// 	"Sep",
	// 	"Oct",
	// 	"Nov",
	// 	"Dec",
	// ];

	useEffect(() => {
		setFilter(currentDuration);
	}, [props.salesData]);

	const handleFetchData = (duration, period) => {
		setcurrentDuration(duration);

		props.getSalesData(duration, period);
	};

	// useEffect(() => {
	// 	let period;
	// 	if (filter === "Week") {
	// 		console.log(`filter changed to week`);
	// 		period = week;
	// 	} else if (filter === "Month") {
	// 		console.log(`filter changed to month `);
	// 		let monthNumber = months.indexOf(month) + 1;

	// 		period = monthNumber;
	// 	} else if (filter === "Year") {
	// 		console.log(`filter changed to year `);

	// 		period = year;
	// 	} else {
	// 		period = day;
	// 	}

	// 	console.log(filter, period);

	// 	props.getSalesData(filter, period);
	// }, [filter]);

	// useEffect(() => {
	// 	if (filter === "Week") {
	// 		console.log(`Week change`);
	// 		props.getSalesData(filter, week);
	// 	}
	// }, [week]);

	// useEffect(() => {
	// 	if (filter === "Day") {
	// 		console.log(`day changed to ${day}`);
	// 		props.getSalesData(filter, day);
	// 	}
	// }, [day]);

	// useEffect(() => {
	// 	if (filter === "Month") {
	// 		console.log(`month change`);
	// 		let monthNumber = months.indexOf(month) + 1;

	// 		props.getSalesData(filter, monthNumber);
	// 	}
	// }, [month]);

	// useEffect(() => {
	// 	if (filter === "Year") {
	// 		console.log(`year change`);

	// 		props.getSalesData(filter, year);
	// 	}
	// }, [year]);

	// console.log(props.salesData, `this is the sales data`);

	const endYear = 2050;
	const years = [];

	for (let year = currentYear; year <= endYear; year++) {
		years.push(year);
	}

	const generatesalesTable = () => {
		return props.salesData.map((sale, index) => {
			let formattedDate = format(sale.date.toDate(), "MMMM d, yyyy");
			return (
				<tbody>
					<tr key={`${index}`}>
						<td>{formattedDate}</td>
						<td>{sale.salesId}</td>
						<td>{sale.productName}</td>
						<td>{sale.customerInfo.customerName}</td>
						<td>{`${sale.price.currency}
						${sale.price.amount}`}</td>
						<td>
							{sale.quantity}
							{sale.units}
						</td>
						<td>
							{sale.medium}
							{sale.units}
						</td>
					</tr>
				</tbody>

				// 	// {/* {actualDay.toUpperCase()} */}
			);
		});
	};

	// let componentToRender =
	// 	filter === "Week" ? (
	// 		<>
	// 			<Dropdown
	// 				id="week"
	// 				styling="grey dropdown-input"
	// 				data={week}
	// 				// data={local.measure}
	// 				required
	// 				items={["1", "2", "3", "4"]}
	// 				function={(e) => setWeek(e)}
	// 			/>
	// 			<span style={{ marginLeft: "5px" }}> of {currentMonth}</span>
	// 		</>
	// 	) : filter === "Month" ? (
	// 		<Dropdown
	// 			id="month"
	// 			styling="grey dropdown-input"
	// 			data={month}
	// 			// data={local.measure}
	// 			required
	// 			items={[
	// 				"Jan",
	// 				"Feb",
	// 				"Mar",
	// 				"Apr",
	// 				"May",
	// 				"Jun",
	// 				"Jul",
	// 				"Aug",
	// 				"Sep",
	// 				"Oct",
	// 				"Nov",
	// 				"Dec",
	// 			]}
	// 			function={(e) => setMonth(e)}
	// 		/>
	// 	) : filter === "Year" ? (
	// 		<Dropdown
	// 			id="year"
	// 			styling="grey dropdown-input"
	// 			data={year}
	// 			// data={local.measure}
	// 			required
	// 			items={years}
	// 			function={(e) => setYear(e)}
	// 		/>
	// 	) : (
	// 		<div style={{ display: "flex" }}>
	// 			<span>pick date</span>
	// 			<span>
	// 				<DatePicker
	// 					selected={day}
	// 					onChange={(date) => setDay(date)}
	// 					// dateFormat="dd/m/yyyy"
	// 				/>
	// 			</span>
	// 		</div>
	// 	);

	let content =
		props.salesData === null ? (
			"...loading"
		) : props.salesData.length > 0 ? (
			<div>
				<h4>Sale for {filter}</h4>

				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Date</th>
							<th>Sale Id number</th>
							<th>Product</th>
							<th>Customer Name</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Medium</th>
						</tr>
					</thead>
					{generatesalesTable()}
				</Table>
			</div>
		) : (
			<div>You have not made any sales for this period</div>
		);

	return (
		<div>
			<Row style={{ alignItems: "baseline" }}>
				<FilterComponent fetchData={handleFetchData} />
				<Col style={{ display: "flex", alignItems: "center" }} md={2}>
					<AddSalesModal show={show} setShow={setShow} />
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
