import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getSoldProducts } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { getMonth, getYear } from "date-fns";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";
import { getFarmTurnOverFunction } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export const ProfitData = (props) => {
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

	useEffect(() => {
		let period;
		if (filter === "Month") {
			// console.log(`filter changed to month `);
			let monthNumber = months.indexOf(month) + 1;

			period = monthNumber;
			props.getData("Month", { month: monthNumber, year });
		}
		// (filter === "Year")
		else {
			// console.log(`filter changed to Cycle `);

			period = year;

			props.getData("farmCycle", {
				startMonth: months.indexOf(farmCycleStartMonth) + 1,
				endMonth: months.indexOf(farmCycleEndMonth),
				startYear: farmCycleStartYear,
				endYear: farmCycleEndYear,
			});
		}
	}, [filter]);

	useEffect(() => {}, [props.produceData]);

	useEffect(() => {}, [year]);

	// Generate the list of years from now to 2050
	for (let year = currentYear; year <= 2050; year++) {
		yearList.push(year);
	}

	let profitContent = props.produceData ? (
		props.produceData?.length === 0 ? (
			<div>You don't have any produce for this period </div>
		) : (
			props.produceData.map((produce) => {
				return <div>me</div>;
			})
		)
	) : (
		<>'..loading'</>
	);

	console.log(
		props.salesData,
		`this is the sales data here for teh profitData`
	);

	let harvestQuantity = props.produceData?.length;

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

	// let saleTypeObjects = {};

	// props.salesData?.forEach((sale)=>{
	// 	farmTypesSet.add(sale.productType);
	// 	// console.log(sale, `this is sale number x`);

	// 	if (!saleTypeObjects[sale.productType]) {
	// 		saleTypeObjects[sale.productType] = {};
	// 		saleTypeObjects[sale.productType].sales = [];
	// 	}
	// 	saleTypeObjects[sale.productType].sales.push(sale);

	// })

	// console.log(farmProduceTypeObjects);

	let farmTypes = Array.from(farmTypesSet);
	let productTypeTurnOver = {};

	const listItems = (key) => {
		let productTypes = farmProduceTypeObjects[key];
		let salesForKey = props.salesData?.filter((saleProduct) => {
			return key === saleProduct.productType;
		});
		console.log(salesForKey, `thes are the sales for ${key}`);

		const resultMap = new Map();
		const salesMap = new Map();

		productTypes.produces.forEach((item) => {
			// console.log(item, `this is the item inthe first loop`);
			if (resultMap.has(item.item)) {
				let newQuantity =
					parseInt(resultMap.get(item.item).quantity) + parseInt(item.quantity);

				resultMap.get(item.item).quantity = `${newQuantity}`;
			} else {
				resultMap.set(item.item, { ...item });
			}
		});

		salesForKey?.forEach((product) => {
			// console.log(product, `this is the item inthe first loop`);
			if (salesMap.has(product.productName)) {
				console.log(`this shows there is repetition`);
				let newQuantity =
					parseInt(salesMap.get(product.productName).quantity) +
					parseInt(product.quantity);

				salesMap.get(product.productName).quantity = `${newQuantity}`;
			} else {
				salesMap.set(product.productName, { ...product });
			}
		});

		let resultArray = Array.from(resultMap.values());
		let salesArray = Array.from(salesMap.values());
		console.log(salesArray, `this is the result array`);

		return resultArray.map((value, index) => {
			console.log(value.item, `thsi is the value of zzzzz`);

			let saleProduce = salesArray.filter((obj) => {
				return value.item === obj.productName;
			});
			let profit =
				saleProduce[0]?.quantity * saleProduce[0]?.price.amount -
				saleProduce[0]?.price.amount * value.quantity;

			console.log(saleProduce[0]?.quantity, `this is the saleProduce`);
			return (
				<ListGroupItem>
					<p>Product name: {value.item.toUpperCase()}</p>
					<p>Projected Output :</p>
					<p>Quantity Harvested: {value.quantity}</p>
					<p>
						Quantity Sold:{" "}
						{saleProduce[0] ? saleProduce[0]?.quantity : "No sale yet"}{" "}
					</p>
					{/*  */}

					{/* quantity sold * selling price */}
					<p>
						Turnover:{" "}
						{saleProduce[0]
							? saleProduce[0]?.quantity * saleProduce[0]?.price.amount +
							  saleProduce[0]?.price.currency
							: "pending"}
					</p>

					<p>
						Profit/Loss:{" "}
						<span style={{ color: profit > 0 ? "blue" : "red" }}>
							{saleProduce[0] ? profit : null}{" "}
						</span>
					</p>
					{/* <p></p> */}
				</ListGroupItem>
			);
		});
	};

	let content = Object.keys(farmProduceTypeObjects).map((key) => {
		return (
			<ListGroupItem style={{ textAlign: "left" }}>
				<h5>Farm Practice: {key}</h5>

				<ListGroup className="list-group-flush">{listItems(key)}</ListGroup>
			</ListGroupItem>
		);
	});

	// let farmProductType1 = props.produceData.filter((produce, index) => {
	// 	return produce.farmTypes === farmTypes[index];
	// });
	// let horticultureProducts = props.produceData.filter((produce) => {
	// 	return produce.farmType === "Horticulture";
	// });

	// const { farmCycle, setFarmCycle } = useState("1");

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

	let origin =
		props.produceData === null ? (
			<>search for produce</>
		) : (
			<div style={{ marginTop: "15px" }}>
				<div style={{ textAlign: "left" }}>
					<Row>
						<Col>Projected Turnover For Farm Cycle {farmCycleStartYear}</Col>
						<Col>Projected Profit For Farm Cycle {farmCycleEndYear}</Col>
					</Row>
					<Row>
						<Col>Actual Turnover For Farm Cycle {farmCycleEndYear}</Col>
						<Col>Actual Profit For Farm Cycle {farmCycleEndYear}</Col>
					</Row>
				</div>
				<h3>
					Result for {filter}:{" "}
					<span>
						{filter === "Month"
							? `${month}-${year}`
							: `${farmCycleStartMonth}-${farmCycleStartYear} to ${farmCycleEndMonth}-${farmCycleEndYear}`}
					</span>
				</h3>
				<h4>Number of products : {harvestQuantity}</h4>

				{/* <ListGroup className="list-group-flush"> */}
				{content}
				{/* </ListGroup> */}
			</div>
		);
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
			{origin}
			{/* <div>
				<p>Product Harvest quantity : {harvestQuantity}</p>
				{content}
			</div> */}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		produceData: state.farmData.produceForProfit,
		profitDataLoader: state.farmData.produceForProfitLoader,
		profitDataError: state.farmData.produceForProfitError,
		salesData: state.farmData.salesInfoForProfit,
		salesDataLoader: state.farmData.salesForProfitLoader,
		salesDataError: state.farmData.salesForProfitError,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getData: (duration, period) =>
			dispatch(getFarmTurnOverFunction(duration, period)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitData);
