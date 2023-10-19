import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { getSoldProducts } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
// import DatePicker from "react-datepicker";
import { format } from "date-fns";
// import { getMonth, getYear } from "date-fns";
// import { Dropdown } from "./../../../../../SubComponents/Dropdown";
// import { getFarmTurnOverFunction } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import YearFilterComponent from "./../Suppliers/yearFilterComponent";

export const RestaurantProfitDataComponent = (props) => {
	const yearList = [];
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();
	const currentMonth = format(currentDate, "MMMM").substring(0, 3);
	const [month, setMonth] = useState(currentMonth);
	const [year, setYear] = useState(currentYear);
	const [filter, setFilter] = useState("Month");

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
			// props.getProfitData("Month", { month: monthNumber, year });
		}
		// (filter === "Year")
		else {
			// console.log(`filter changed to Cycle `);

			period = year;
		}
	}, [filter]);

	// useEffect(() => {
	// 	if (filter === "Month") {
	// 		console.log(`month change`);
	// 		let monthNumber = months.indexOf(month) + 1;

	// 		props.getData(filter, { month: monthNumber, year });
	// 	}
	// }, [month]);

	// useEffect(() => {
	// 	if (filter === "Month") {
	// 		console.log(`month change`);
	// 		let monthNumber = months.indexOf(month) + 1;

	// 		props.getData(filter, { month: monthNumber, year });
	// 	}
	// }, [year]);
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

	let harvestQuantity = props.mealProfitData?.length;

	let mealTypesSet = new Set();

	let mealTypeObjects = {};

	props.mealProfitData?.forEach((meal) => {
		mealTypesSet.add(meal.menuSection);

		if (!mealTypeObjects[meal.menuSection]) {
			mealTypeObjects[meal.menuSection] = {};
			mealTypeObjects[meal.menuSection].meals = [];
		}
		// If the farmType is already encountered, increment its count by 1
		mealTypeObjects[meal.menuSection].meals.push(meal);

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

	let mealTypes = Array.from(mealTypesSet);
	let productTypeTurnOver = {};

	console.log(mealTypeObjects, `these are the meal types objects`);

	// const handleFetchData = (duration, period) => {
	// 	console.log(duration, `this is the current durations`);
	// 	console.log(period, `this is the current period`);
	// 	props.getData(duration, period);
	// };

	const listItems = (key) => {
		let productTypes = mealTypeObjects[key];
		let salesForKey = props.mealProfitData?.filter((meal) => {
			return key === meal.menuSection;
		});
		// console.log(salesForKey, `thes are the sales for ${key}`);

		const resultMap = new Map();
		const salesMap = new Map();

		productTypes.meals.forEach((item) => {
			// console.log(item, `this is the item inthe first loop`);
			if (resultMap.has(item.meal)) {
				let newQuantity =
					parseInt(resultMap.get(item.meal).quantity) + parseInt(item.quantity);

				resultMap.get(item.meal).quantity = `${newQuantity}`;
			} else {
				resultMap.set(item.meal, { ...item });
			}
		});

		salesForKey?.forEach((product) => {
			// console.log(product, `this is the item inthe first loop`);
			if (salesMap.has(product.meal)) {
				// console.log(`this shows there is repetition`);
				let newQuantity =
					parseInt(salesMap.get(product.meal).quantity) +
					parseInt(product.quantity);

				salesMap.get(product.meal).quantity = `${newQuantity}`;
			} else {
				salesMap.set(product.meal, { ...product });
			}
		});

		let resultArray = Array.from(resultMap.values());
		let salesArray = Array.from(salesMap.values());
		// console.log(salesArray, `this is the result array`);

		return resultArray.map((value, index) => {
			let saleProduce;
			salesArray.forEach((obj) => {
				if (
					value.meal.toLowerCase() === obj.meal.toLowerCase() ||
					value.id === obj.productId
				) {
					saleProduce = obj;
				}
			});

			let profit =
				saleProduce?.quantity * saleProduce?.price -
				value.price * value.quantity;

			let turnOver = saleProduce?.quantity * saleProduce?.price;
			// +
			// saleProduce?.price.currency;

			// console.log(saleProduce, `this is the saleProduce`);
			return (
				<ListGroupItem>
					<p>Product name: {value.meal.toUpperCase()}</p>

					<p>
						Quantity Sold: {saleProduce ? saleProduce?.quantity : "No sale yet"}{" "}
					</p>
					{/*  */}

					{/* quantity sold * selling price */}
					{/* <p>Turnover: {saleProduce ? turnOver : "Pending"}</p>

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
					</p> */}
					{/* <p></p> */}
				</ListGroupItem>
			);
		});
	};

	let content = Object.keys(mealTypeObjects).map((key) => {
		return (
			<ListGroupItem style={{ textAlign: "left" }}>
				<h5>Meal Types: {key}</h5>

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
			console.log(`year clicked`);
			props.getData("year", {
				year,
			});
		}
	};

	let mainContent =
		props.produceData === null ? (
			<>...loading</>
		) : (
			// : props.produceData === undefined ? (
			// 	<div>'You do not have a farmCycle for the duration specified '</div>
			// )
			<div style={{ marginTop: "15px" }}>
				<h3>
					Result for {filter}:{" "}
					<span>{filter === "Month" ? `${month}-${year}` : `${year}`}</span>
				</h3>
				<h4>Number of Sales : {}</h4>

				{/* <ListGroup className="list-group-flush"> */}
				{content}
				{/* </ListGroup> */}
			</div>
		);
	return (
		<div>
			<Row>
				<YearFilterComponent fetchData={props.getProfitData} />
			</Row>

			{/* {mainContent} */}
			<div>
				<p>Meal Sales quantity : {harvestQuantity}</p>
				{content}
			</div>
		</div>
	);
};

export default RestaurantProfitDataComponent;
