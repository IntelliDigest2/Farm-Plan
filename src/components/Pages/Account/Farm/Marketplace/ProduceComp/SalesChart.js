import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
import { getSalesChartForDuration } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import { format } from "date-fns";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";
import DatePicker from "react-datepicker";
import { ListGroup, ListGroupItem } from "react-bootstrap";

Chart.register(...registerables);

export const SalesChart = (props) => {
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();
	const currentMonth = format(currentDate, "MMMM").substring(0, 3);
	const [day, setDay] = useState(new Date());
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

		props.getSalesData(filter, period);
	}, [filter]);

	useEffect(() => {
		if (filter === "Week") {
			console.log(`Week change`);
			props.getSalesData(filter, week);
		}
	}, [week]);

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
	useEffect(() => {
		if (filter === "Day") {
			console.log(`day change`);
			props.getSalesData(filter, day);
		}
	}, [day]);

	useEffect(() => {
		// console.log(props.salesData, `this is the produce returned`);
	}, [props.salesData]);

	let farmTypesSet = new Set();

	let saleTypeObjects = {};

	props.salesData?.forEach((sale) => {
		farmTypesSet.add(sale.productType);
		// console.log(sale, `this is sale number x`);

		if (!saleTypeObjects[sale.productType]) {
			saleTypeObjects[sale.productType] = {};
			saleTypeObjects[sale.productType].sales = [];
		}
		saleTypeObjects[sale.productType].sales.push(sale);
	});

	const calcDataInfo2 = (key) => {
		let products = saleTypeObjects[key].sales;

		const resultMap = new Map();

		console.log(products, `this the products for the farmType`);

		//this helps to add mutliple products of the same name and give a total quantity
		products.forEach((product) => {
			// console.log(product, `this is the item inthe first loop`);
			if (resultMap.has(product.productName)) {
				console.log(`this shows there is repetition`);
				let newQuantity =
					parseInt(resultMap.get(product.productName).quantity) +
					parseInt(product.quantity);

				resultMap.get(product.productName).quantity = `${newQuantity}`;
			} else {
				resultMap.set(product.productName, { ...product });
			}
		});

		let colorArray = [
			"#1f77b4",
			"#ff7f0e",
			"#2ca02c",
			"#d62728",
			"#9467bd",
			"#8c564b",
			"#e377c2",
			"#7f7f7f",
			"#bcbd22",
			"#17becf",
			"#aec7e8",
			"#ffbb78",
			"#98df8a",
			"#ff9896",
			"#c5b0d5",
			"#c49c94",
			"#f7b6d2",
			"#c7c7c7",
			"#dbdb8d",
			"#9edae5",
		];

		let salesResultArray = Array.from(resultMap.values());

		console.log(salesResultArray, `this is the accumulated product values`);

		let productColor = [];
		let salesQuantityArray = [];

		salesResultArray.forEach((produce, index) => {
			salesQuantityArray.push({
				name: produce.productName,
				quantity: produce.quantity,
				price: produce.price,
				unit: produce.unit,
			});
			productColor.push(colorArray[index]);
			index++;
		});

		console.log(salesResultArray, `this is the sales result`);

		let productsData = salesQuantityArray.map((product) => {
			return (
				<div style={{ margin: "0 4px" }}>
					{`${product.name.toUpperCase()} `}
					<span style={{ color: "blue" }}>
						{product.quantity}
						{product.unit}
					</span>
					{` at `}
					{product.price.amount}
					{product.price.currency} {` each`}
				</div>
			);
		});

		let productsLabel = salesResultArray.map((product) => {
			return product.productName;
		});

		console.log(productsLabel, `this is the product labels`);

		let productInfo = salesResultArray.map((product) => {
			return product.quantity;
		});

		let data = {
			labels: productsLabel,

			datasets: [
				{
					label: "Produce Summary",
					data: productInfo,
					backgroundColor: productColor,
				},
			],
		};
		return (
			<div style={{ width: "70%", margin: "30px auto" }}>
				<Doughnut data={data} />
				<div style={{ display: "flex", flexWrap: "wrap" }}>{productsData}</div>
			</div>
		);
	};

	let content2 = (key) => {
		return props.salesData?.length > 0 ? (
			calcDataInfo2(key)
		) : (
			<div>
				<p>You don't have any produce for this period</p>
			</div>
		);
	};

	let content =
		Object.keys(saleTypeObjects).length > 0 ? (
			Object.keys(saleTypeObjects).map((key) => {
				return (
					<ListGroupItem style={{ textAlign: "left" }}>
						<h5>Farm Practice: {key}</h5>

						{/* <ListGroup className="list-group-flush">{listItems(key)}</ListGroup> */}
						{content2(key)}
					</ListGroupItem>
				);
			})
		) : (
			<div style={{ marginTop: "20px" }}>
				<p>You don't have any produce for this period</p>
			</div>
		);

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

	// let dataDisplay = ? :

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
			{content}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		salesData: state.farmData.salesChartInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSalesData: (duration, period) => {
			dispatch(getSalesChartForDuration(duration, period));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesChart);
