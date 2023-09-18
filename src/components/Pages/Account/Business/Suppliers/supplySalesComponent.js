import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { getSalesForChart } from "./../../../../../store/actions/supplierActions/supplierData";
import YearFilterComponent from "./yearFilterComponent";

Chart.register(...registerables);

export const SupplySalesComponent = (props) => {
	const handleFetchData = (duration, period) => {
		props.getData(duration, period);
	};

	useEffect(() => {
		// console.log(props.salesData, `this is the produce returned`);
	}, [props.salesData]);

	// let salesSet = new Set();
	// let faTypesSet = new Set();

	// let saleTypeObjects = {};

	// props.salesData?.forEach((sale) => {
	// 	salesSet.add(sale.productType);
	// 	// console.log(sale, `this is sale number x`);

	// 	if (!saleTypeObjects[sale.productType]) {
	// 		saleTypeObjects[sale.productType] = {};
	// 		saleTypeObjects[sale.productType].sales = [];
	// 	}
	// 	saleTypeObjects[sale.productType].sales.push(sale);
	// });

	const calcDataInfo2 = () => {
		let sales = props.salesData;
		let stockProducts = props.stockData.filter((product) => {
			return product.stockType === "Sale";
		});

		const resultMap = new Map();
		const stockMap = new Map();

		// console.log(sales, `this the products for the farmType`);

		//this helps to add mutliple products of the same name and give a total quantity
		sales.forEach((product) => {
			// console.log(product, `this is the item inthe first loop`);
			if (resultMap.has(product.productName)) {
				let newQuantity =
					parseInt(resultMap.get(product.productName).productQty) +
					parseInt(product.productQty);

				resultMap.get(product.productName).productQty = `${newQuantity}`;
			} else {
				resultMap.set(product.productName, {
					currency: product.productCurrency,
					productName: product.productName,
					productQty: product.productQty,
					price: product.productPrice,

					unit: product.productMeasure,
				});
			}
		});
		stockProducts.forEach((product) => {
			// console.log(product, `this is the item inthe first loop`);
			if (stockMap.has(product.productName)) {
				if (!resultMap.get(product.productName)[`${product.brandName}`]) {
					// let totalTime =
					// 	parseInt(product.duration) * parseInt(product.productQty);
					resultMap.get(product.productName)[`${product.brandName}`] = 1;

					// resultMap.get(product.productName)[
					// 	`total${product.rateDuration}Duration`
					// ] = totalTime;

					// resultMap.get(product.productName)[
					// 	`base${product.rateDuration}Price`
					// ] = product.rateAmount;
				} else {
					resultMap.get(product.productName)[`${product.rateDuration}Rents`] =
						parseInt(
							resultMap.get(product.productName)[`${product.branchName}`]
						) + 1;

					// let newCummulativeTime =
					// 	parseInt(
					// 		resultMap.get(product.productName)[
					// 			`total${product.rateDuration}Duration`
					// 		]
					// 	) + totalTime;

					// resultMap.get(product.productName)[
					// 	`total${product.rateDuration}Duration`
					// ] = newCummulativeTime;
				}

				let newQuantity =
					parseInt(stockMap.get(product.productName).productQty) +
					parseInt(product.productQty);

				stockMap.get(product.productName).productQty = `${newQuantity}`;
			} else {
				stockMap.set(product.productName, {
					currency: product.productCurrency,
					productName: product.productName,
					productQty: product.productQty,
					price: product.productPrice,

					unit: product.productMeasure,
				});
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
		let stockResultArray = Array.from(stockMap.values());

		// console.log(salesResultArray, `this is the accumulated product values`);
		console.log(stockResultArray, `this is the accumulated stock values`);

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

		// let productsData = salesQuantityArray.map((product) => {
		// 	return (
		// 		<div style={{ margin: "0 4px", fontSize: "13px" }}>
		// 			{`${product.name.toUpperCase()} `}
		// 			<span style={{ color: "blue" }}>
		// 				{product.quantity}
		// 				{product.unit}
		// 			</span>
		// 			{` at `}
		// 			{product.price.currency}
		// 			{product.price.amount}
		// 			{` each`}
		// 		</div>
		// 	);
		// });

		let productsLabel = salesResultArray.map((product) => {
			return product.productName;
		});

		console.log(productsLabel, `this is the product labels`);

		let productInfo = salesResultArray.map((product) => {
			return product.productQty;
		});

		let content = stockResultArray.map((product) => {
			return (
				<ListGroupItem style={{ textAlign: "left" }}>
					<div>Product Name: {product.productName.toUpperCase()}</div>
					<div>
						Number of {product.productName}(s) for rent :
						{/* {product.productQty} */}
					</div>

					{/* <div>{product.productName}</div>
					<div>{product.productName}</div>
					<div>{product.productName}</div> */}
				</ListGroupItem>
			);
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
			<div>
				<div style={{ width: "30%", margin: "30px auto" }}>
					<Doughnut data={data} />
				</div>

				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						marginTop: "14px",
						justifyContent: "center",
					}}
				>
					{/* {productsData} */}
				</div>
			</div>
		);
	};
	console.log(props.salesData, `these are the saled data`);
	console.log(props.stockData, `these are the stock data`);

	let content2 = () => {
		return props.salesData?.length > 0 ? (
			calcDataInfo2()
		) : (
			<div>
				<p>You don't have any produce for this period</p>
			</div>
		);
	};

	let content =
		props.salesData?.length >= 0 ? (
			<ListGroup>{content2()}</ListGroup>
		) : (
			<div style={{ marginTop: "20px" }}>
				<p>You don't have any produce for this period</p>
			</div>
		);

	return (
		<div>
			<Row style={{ alignItems: "center" }}>
				<YearFilterComponent fetchData={handleFetchData} />
			</Row>

			{content}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		salesData: state.supplier.salesChartData,
		stockData: state.supplier.productsSalesChartData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getData: (duration, period) => {
			dispatch(getSalesForChart(duration, period));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SupplySalesComponent);
