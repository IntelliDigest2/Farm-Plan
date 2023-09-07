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
import { getTurnOverChartFunction } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import CycleFilterComponent from "./../cycleFilterComponent";

export const ProfitChart = (props) => {
	const yearList = [];
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();
	const currentMonth = format(currentDate, "MMMM").substring(0, 3);

	// Generate the list of years from now to 2050
	for (let year = currentYear; year <= 2050; year++) {
		yearList.push(year);
	}

	let farmTypesSet = new Set();

	let farmProduceTypeObjects = {};

	const handleFetchData = (duration, period) => {
		props.getData(duration, period);
	};

	props.salesData?.forEach((produce) => {
		farmTypesSet.add(produce.farmType);

		if (!farmProduceTypeObjects[produce.productType]) {
			farmProduceTypeObjects[produce.productType] = {};
			farmProduceTypeObjects[produce.productType].produces = [];
		}
		// If the farmType is already encountered, increment its count by 1
		farmProduceTypeObjects[produce.productType].produces.push(produce);
	});

	const calcDataInfo = (key) => {
		let salesProducts = farmProduceTypeObjects[key].produces;
		// let productTypes = farmProduceTypeObjects[key];
		let producesForKey = props.produceData?.filter((produces) => {
			return key === produces.farmType;
		});

		// console.log(producesForKey, `these are the produces for key`);

		const resultMap = new Map();
		const salesMap = new Map();

		//reduce repetitive sales produces and accummulate their quantity
		salesProducts?.forEach((product) => {
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

		let salesArray = Array.from(salesMap.values());

		//reduce repetitive produces and accummulate their quantity

		// console.log(producesForKey, `produces for key`);

		producesForKey.forEach((product) => {
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

		let productsArray = Array.from(resultMap.values());

		let productColor = [];

		let produceArray = [];

		salesArray.forEach((value, index) => {
			productsArray.forEach((obj) => {
				if (
					value.productId === obj.id ||
					value.productName.toLowerCase() === obj.item.toLowerCase()
				) {
					produceArray.push(obj);
				}
			});

			productColor.push(colorArray[index]);
			index++;
		});

		console.log(produceArray, `these are the produces`);
		console.log(salesArray, `these are the sales array`);
		let productsLabel = salesArray.map((product) => {
			return product.productName;
		});

		let productInfo = salesArray.map((salesProd, index) => {
			const percProfit =
				(salesProd.price.amount * salesProd.quantity) /
				(produceArray[index].quantity * produceArray[index].price);
			return `${percProfit}`;
		});

		let data = {
			labels: productsLabel,

			datasets: [
				{
					label: "Percentage profit",
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

	let chartContent = (key) => {
		return calcDataInfo(key);
	};

	let content =
		props.produceData?.length > 0 ? (
			Object.keys(farmProduceTypeObjects).map((key) => {
				return (
					<ListGroupItem style={{ textAlign: "left" }}>
						<h5>Farm Practice: {key}</h5>

						{/* <ListGroup className="list-group-flush">{listItems(key)}</ListGroup> */}
						{chartContent(key)}
					</ListGroupItem>
				);
			})
		) : (
			<div>
				<p>You don't have any sale for this period</p>
			</div>
		);

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
			<div>
				{/* TODO THIS IS NOT SUPPOSED TO BE A DONUT CHART, A BETTER GRAPHICAL REPRESENTATION SHOULD BE USED */}
				<CycleFilterComponent fetchData={handleFetchData} />
			</div>

			{content}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		produceData: state.farmData.produceInfoForProfitchart,

		salesData: state.farmData.salesInfoForProfitchart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getData: (duration, period) =>
			dispatch(getTurnOverChartFunction(duration, period)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitChart);
