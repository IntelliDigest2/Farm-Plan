import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { getFarmProductsForDuration } from "./../../../../store/actions/marketplaceActions/farmPlanData";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import FilterComponent from "./../Farm/Marketplace/filterComponent";
import { Filter } from "@mui/icons-material";

Chart.register(...registerables);

const ChartProduce = (props) => {
	useEffect(() => {}, [props.produce]);

	let farmTypesSet = new Set();

	let farmProduceTypeObjects = {};

	props.produce?.forEach((produce) => {
		farmTypesSet.add(produce.farmType);

		if (!farmProduceTypeObjects[produce.farmType]) {
			farmProduceTypeObjects[produce.farmType] = {};
			farmProduceTypeObjects[produce.farmType].produces = [];
		}
		farmProduceTypeObjects[produce.farmType].produces.push(produce);
	});

	const handleFetchData = (duration, period) => {
		props.getData(duration, period);
	};

	const calcDataInfo2 = (key) => {
		let products = farmProduceTypeObjects[key].produces;

		const resultMap = new Map();

		//this helps to add mutliple products of the same name and give a total quantity
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
		let farmProductQuantityArray = [];
		console.log(resultArray, `thii s ithe result array`);

		resultArray.forEach((produce, index) => {
			farmProductQuantityArray.push({
				name: produce.item,
				quantity: produce.quantity,
				measure: produce.measure,
			});
			productColor.push(colorArray[index]);
			index++;
		});

		console.log(farmProductQuantityArray, `this is the product quantity array`);

		let productsData = farmProductQuantityArray.map((product) => {
			return (
				<div style={{ margin: "0 4px", fontSize: "13px" }}>
					{product.name.toUpperCase()}
					<span style={{ color: "blue", fontSize: "13px", marginLeft: "3px" }}>
						{product.quantity}
						{product.measure}
					</span>
				</div>
			);
		});

		let productsLabel = resultArray.map((product) => {
			return product.item;
		});

		let productInfo = resultArray.map((product) => {
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
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						marginTop: "14px",
						justifyContent: "center",
					}}
				>
					{productsData}
				</div>
			</div>
		);
	};

	let content2 = (key) => {
		return props.produce?.length > 0 ? (
			calcDataInfo2(key)
		) : (
			<div>
				<p>You don't have any produce for this period</p>
			</div>
		);
	};

	let content =
		Object.keys(farmProduceTypeObjects).length > 0 ? (
			Object.keys(farmProduceTypeObjects).map((key) => {
				return (
					<ListGroupItem style={{ textAlign: "left" }}>
						<h5>Farm Practice: {key}</h5>

						{content2(key)}
					</ListGroupItem>
				);
			})
		) : (
			<div style={{ marginTop: "20px" }}>
				<p>You don't have any produce for this period</p>
			</div>
		);

	return (
		<div>
			<Row style={{ alignItems: "baseline" }}>
				<FilterComponent fetchData={handleFetchData} />
			</Row>
			{content}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		produce: state.farmData.produceForChart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getData: (duration, period) => {
			dispatch(getFarmProductsForDuration(duration, period));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartProduce);
