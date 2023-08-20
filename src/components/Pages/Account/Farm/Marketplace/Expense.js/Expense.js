import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import { getExpenseForDuration } from "../../../../../../store/actions/marketplaceActions/farmPlanData";
import { Dropdown } from "../../../../../SubComponents/Dropdown";
import {
	Accordion,
	Card,
	Table,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";
// import { format } from "date-fns";

export const Expense = (props) => {
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

	useEffect(() => {}, [props.expenseData]);

	console.log(props.expenseData, `thi si shte data for the expense`);

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

		props.getExpenseData(filter, period);
	}, [filter]);

	useEffect(() => {
		if (filter === "Week") {
			console.log(`Week change`);
			props.getExpenseData(filter, week);
		}
	}, [week]);

	useEffect(() => {
		if (filter === "Day") {
			console.log(`day changed to ${day}`);
			props.getExpenseData(filter, day);
		}
	}, [day]);

	useEffect(() => {
		if (filter === "Month") {
			console.log(`month change`);
			let monthNumber = months.indexOf(month) + 1;

			props.getExpenseData(filter, monthNumber);
		}
	}, [month]);

	useEffect(() => {
		if (filter === "Year") {
			console.log(`year change`);

			props.getExpenseData(filter, year);
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

	let groupedData = props.expenseData?.reduce((result, item) => {
		const { date, ...rest } = item;
		const formattedDate = format(date.toDate(), "M/d/yyyy");
		console.log(formattedDate);
		if (!result[formattedDate]) {
			result[formattedDate] = [];
		}
		result[formattedDate].push(rest);
		return result;
	}, {});

	console.log(groupedData, `this is the grouped Data`);

	let table;
	if (props.expenseData) {
		table = Object.keys(groupedData).map(
			(date, index) => {
				// console.log(expense,);

				return (
					<tbody>
						<tr key={`${index}`}>
							<td>{date}</td>
							<td>{groupedData[date][index].category}</td>
							<td>
								{groupedData[date][index].cost.amount}
								{groupedData[date][index].cost.currency}
							</td>
							<td>{groupedData[date][index].supplier.name}</td>
						</tr>
					</tbody>
				);
			}

			// 	// {/* {actualDay.toUpperCase()} */}
		);
	}

	let content =
		props.expenseData === null ? (
			"...loading"
		) : props.expenseData.length > 0 ? (
			Object.keys(groupedData).map((date, index) => {
				return (
					<div>
						<div style={{ textAlign: "left" }}>Date: {date}</div>

						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Date</th>
									<th>Expense Type</th>
									<th>Cost</th>

									<th>Supplier</th>
								</tr>
							</thead>
							{table}
						</Table>
					</div>
				);
			})
		) : (
			<div>You have not made any expense for this period</div>
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
		expenseData: state.farmData.expenseInfo,
		expenseLoader: state.farmData.expenseLoader,
		expenseError: state.farmData.expenseError,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getExpenseData: (duration, period) => {
			dispatch(getExpenseForDuration(duration, period));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Expense);
