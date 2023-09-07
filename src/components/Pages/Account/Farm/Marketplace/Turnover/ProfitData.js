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
import CycleFilterComponent from "./../cycleFilterComponent";

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

	useEffect(() => {
		if (filter === "Month") {
			console.log(`month change`);
			let monthNumber = months.indexOf(month) + 1;

			props.getData(filter, { month: monthNumber, year });
		}
	}, [month]);

	useEffect(() => {
		if (filter === "Month") {
			console.log(`month change`);
			let monthNumber = months.indexOf(month) + 1;

			props.getData(filter, { month: monthNumber, year });
		}
	}, [year]);
	// useEffect(() => {
	// 	if (filter !== "Month") {
	// 		console.log(`year change`);

	// 		props.getData(filter, year);
	// 	}
	// }, [year]);

	useEffect(() => {
		if (props.produceData === undefined) {
			console.log(`FARM CYCLE NOT FOUND`);
		}
	}, [props.produceData]);

	useEffect(() => {}, [year]);

	// useEffect(() => {

	// }, [])

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
	// console.log(props.produceData);

	let farmTypes = Array.from(farmTypesSet);
	let productTypeTurnOver = {};

	const handleFetchData = (duration, period) => {
		console.log(duration, `this is the current durations`);
		console.log(period, `this is the current period`);
		props.getData(duration, period);
	};

	const listItems = (key) => {
		let productTypes = farmProduceTypeObjects[key];
		let salesForKey = props.salesData?.filter((saleProduct) => {
			return key === saleProduct.productType;
		});
		// console.log(salesForKey, `thes are the sales for ${key}`);

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
				// console.log(`this shows there is repetition`);
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
		// console.log(salesArray, `this is the result array`);

		return resultArray.map((value, index) => {
			let saleProduce;
			salesArray.forEach((obj) => {
				if (
					value.item.toLowerCase() === obj.productName.toLowerCase() ||
					value.id === obj.productId
				) {
					saleProduce = obj;
				}
			});

			let profit =
				saleProduce?.quantity * saleProduce?.price.amount -
				value.price * value.quantity;

			let turnOver =
				saleProduce?.quantity * saleProduce?.price.amount +
				saleProduce?.price.currency;

			// console.log(saleProduce, `this is the saleProduce`);
			return (
				<ListGroupItem>
					<p>Product name: {value.item.toUpperCase()}</p>
					<p>Projected Output :</p>
					<p>Quantity Harvested: {value.quantity}</p>
					<p>
						Quantity Sold: {saleProduce ? saleProduce?.quantity : "No sale yet"}{" "}
					</p>
					{/*  */}

					{/* quantity sold * selling price */}
					<p>Turnover: {saleProduce ? turnOver : "Pending"}</p>

					<p>
						Profit/Loss:{" "}
						<span
							style={{
								color: saleProduce ? (profit > 0 ? "blue" : "red") : "grey",
							}}
						>
							{saleProduce
								? `${profit} ${saleProduce?.price.currency}`
								: "No sale yet"}{" "}
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

	let origin =
		props.produceData === null ? (
			<>...loading</>
		) : (
			// : props.produceData === undefined ? (
			// 	<div>'You do not have a farmCycle for the duration specified '</div>
			// )
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
			<CycleFilterComponent fetchData={handleFetchData} />

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
