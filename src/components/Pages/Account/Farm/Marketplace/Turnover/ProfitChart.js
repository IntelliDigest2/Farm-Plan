import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";
import { format } from "date-fns";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { getFarmTurnOverFunction } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";

export const ProfitChart = (props) => {
	const yearList = [];
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();
	const currentMonth = format(currentDate, "MMMM").substring(0, 3);
	const [month, setMonth] = useState(currentMonth);
	const [year, setYear] = useState(currentYear);
	const [filter, setFilter] = useState("Month");
	const [farmCycleStartMonth, setFarmCycleStartMonth] = useState("jan");
	const [farmCycleEndMonth, setFarmCycleEndMonth] = useState("jun");
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
			<div style={{ display: "flex" }}>
				{/* <Col> */}
				<div
					style={{
						display: "flex",
						alignItems: "baseline",
						marginLeft: "2rem",
					}}
				>
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
						// border: ".5px solid lightgrey",
						marginLeft: "auto",
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
		);

	const searchTurnOver = () => {
		if (filter === "Month") {
			console.log(`month clicked`);
			let monthNum = months.indexOf(month) + 1;
			props.getData("Month", { month: monthNum, year });
		} else {
			console.log(`cycle clicked`);
			props.getData("farmCycle", {
				startMonth: months.indexOf(farmCycleStartMonth) + 1,
				endMonth: months.indexOf(farmCycleEndMonth),
				startYear: farmCycleStartYear,
				endYear: farmCycleEndYear,
			});
		}
	};

	let farmTypesSet = new Set();

	let farmProduceTypeObjects = {};

	props.produceData?.forEach((produce) => {
		farmTypesSet.add(produce.farmType);

		if (!farmProduceTypeObjects[produce.farmType]) {
			farmProduceTypeObjects[produce.farmType] = {};
			farmProduceTypeObjects[produce.farmType].produces = [];
		}
		// If the farmType is already encountered, increment its count by 1
		farmProduceTypeObjects[produce.farmType].produces.push(produce);

		// produce.farmType === farmTypes[farmTypes.indexOf(produce.farmType)];
	});

	console.log(farmProduceTypeObjects, `thi si before the loop`);

	const calcDataInfo = (key) => {
		console.log(key, `thi si the key`);
		let products = farmProduceTypeObjects[key].produces;
		// console.log(props.)

		// console.log(products, `these are the products`);

		const resultMap = new Map();

		products.forEach((product) => {
			// console.log(product, `this is the item inthe first loop`);
			if (resultMap.has(product.item)) {
				let newQuantity =
					parseInt(resultMap.get(product.item).quantity) +
					parseInt(product.quantity);

				resultMap.get(product.item).quantity = `${newQuantity}`;
			} else {
				resultMap.set(product.item, { ...product });
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

		// console.log(resultMap, `this is the result map`);

		let resultArray = Array.from(resultMap.values());

		let productColor = [];
		console.log(resultArray, `thii s ithe result array`);

		let index = 0;
		resultArray.forEach((produce, index) => {
			// console.log(produce.item);
			// farmTypesSet.add(produce.item);

			// if (!productCount[produce.item]) {

			productColor.push(colorArray[index]);
			index++;
			// } else {
			// 	// If the farmType is already encountered, increment its count by 1
			// 	farmTypeCounts[produce.farmType].number++;
			// }
		});

		// let farmTypeArray = Array.from(farmTypesSet);
		// console.log(productCount, `thi sis the array my boy`);
		let productsLabel = resultArray.map((product) => {
			return product.item;
		});

		let productInfo = resultArray.map((product) => {
			return product.quantity;
		});

		// let dataColor = productCount.map((product) => {
		// 	return resultArray.color;
		// });
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
			</div>
		);
	};

	let content2 = (key) => {
		return props.produceData?.length > 0 ? (
			calcDataInfo(key)
		) : (
			// <div>me</div>
			<div>
				<p>You don't have any produce for this period</p>
			</div>
		);
	};

	let content = Object.keys(farmProduceTypeObjects).map((key) => {
		return (
			<ListGroupItem style={{ textAlign: "left" }}>
				<h5>Farm Practice: {key}</h5>

				{/* <ListGroup className="list-group-flush">{listItems(key)}</ListGroup> */}
				{content2(key)}
			</ListGroupItem>
		);
	});

	// const listItems = (key) => {
	// 	let productTypes = farmProduceTypeObjects[key];

	// 	const resultMap = new Map();

	// 	productTypes.produces.forEach((item) => {
	// 		console.log(item, `this is the item inthe first loop`);
	// 		if (resultMap.has(item.item)) {
	// 			let newQuantity =
	// 				parseInt(resultMap.get(item.item).quantity) + parseInt(item.quantity);

	// 			resultMap.get(item.item).quantity = `${newQuantity}`;
	// 		} else {
	// 			resultMap.set(item.item, { ...item });
	// 		}
	// 	});

	// 	let resultArray = Array.from(resultMap.values());
	// 	console.log(resultArray, `this is the result array`);

	// 	return resultArray.map((value) => {
	// 		return (
	// 			<ListGroupItem>
	// 				<p>Product name: {value.item.toUpperCase()}</p>
	// 				<p>Projected Output :</p>
	// 				<p>Quantity Harvested: {value.quantity}</p>
	// 				<p>Quantity Sold: </p>
	// 				{/* quantity sold * selling price */}
	// 				<p>Turnover: </p>
	// 				{/* <p></p> */}
	// 			</ListGroupItem>
	// 		);
	// 	});
	// };

	return (
		<div>
			<Row style={{ alignItems: "center", margin: "0 auto" }}>
				<Col md={1.5}>Filter By :</Col>
				<Col md={1.5}>
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
				<Col md={9}>
					<div style={{ display: "flex", flexWrap: "wrap" }}>
						{filterComponent}
						<div style={{ display: "flex", marginRight: "auto" }}>
							<Button
								onClick={searchTurnOver}
								className="green-btn shadow-none"
							>
								Search
							</Button>
						</div>
					</div>
				</Col>
			</Row>
			{content}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		produceData: state.farmData.produceForProfit,
		profitDataLoader: state.farmData.produceForProfitLoader,
		profitDataError: state.farmData.produceForProfitError,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getData: (duration, period) =>
			dispatch(getFarmTurnOverFunction(duration, period)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitChart);
