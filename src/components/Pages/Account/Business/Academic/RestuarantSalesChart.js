import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FilterComponent from "./../../Farm/Marketplace/filterComponent";
import { Chart, registerables } from "chart.js";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";

import { getRestuarantSalesForChart } from "./../../../../../store/actions/marketplaceActions/restaurantData";

export const RestuarantSalesChart = (props) => {
	const currentYear = new Date().getFullYear();

	const [filter, setFilter] = useState("Day");

	const [show, setShow] = useState(false);
	const [currentDuration, setcurrentDuration] = useState("Day");

	useEffect(() => {
		setFilter(currentDuration);
	}, [currentDuration, props.salesData]);

	const handleFetchData = (duration, period) => {
		setcurrentDuration(duration);

		props.getSalesInfo(duration, period);
	};
	useEffect(() => {
		console.log(props.salesData, `this is the sales info`);
	}, [props.salesData]);

	let saleTypeObjects = {};

	const calcDataInfo = (key) => {
		let products = props.salesData;

		const resultMap = new Map();

		//this helps to add mutliple products of the same name and give a total quantity
		products.forEach((product) => {
			// console.log(product, `this is the item inthe first loop`);
			if (resultMap.has(product.meal)) {
				console.log(`this shows there is repetition`);
				let newQuantity =
					parseInt(resultMap.get(product.meal).quantity) +
					parseInt(product.quantity);

				resultMap.get(product.meal).quantity = `${newQuantity}`;
			} else {
				resultMap.set(product.meal, { ...product });
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

		let productColor = [];
		let salesQuantityArray = [];

		salesResultArray.forEach((produce, index) => {
			salesQuantityArray.push({
				name: produce.meal,
				quantity: produce.quantity,
				price: produce.mealPrice,
				unit: produce.unit,
			});
			productColor.push(colorArray[index]);
			index++;
		});

		console.log(salesResultArray, `this is the sales result`);

		let productsData = salesQuantityArray.map((product) => {
			return (
				<div style={{ margin: "0 4px", fontSize: "13px" }}>
					{`${product.name} `}
					<span style={{ color: "blue" }}>
						{product.quantity}
						{`${product.unit}(s)`}
					</span>
				</div>
			);
		});

		let productsLabel = salesResultArray.map((product) => {
			return product.meal;
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

	let content = () => {
		return props.salesData === null ? (
			<div>...loading</div>
		) : props.salesData?.length > 0 ? (
			calcDataInfo()
		) : (
			<div>
				<p>You don't have any produce for this period</p>
			</div>
		);
	};

	return (
		<div>
			<Row>
				<FilterComponent fetchData={handleFetchData} />
			</Row>
			{content()}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		salesData: state.restaurant.salesChart,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSalesInfo: (duration, period) => {
			dispatch(getRestuarantSalesForChart(duration, period));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RestuarantSalesChart);
