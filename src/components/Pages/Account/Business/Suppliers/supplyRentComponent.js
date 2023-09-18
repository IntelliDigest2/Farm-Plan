import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
import { format } from "date-fns";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";

import DatePicker from "react-datepicker";
import { ListGroup, ListGroupItem } from "react-bootstrap";

import { Dropdown } from "./../../../../SubComponents/Dropdown";
import FilterComponent from "./../../Farm/Marketplace/filterComponent";
import { getRentForChart } from "./../../../../../store/actions/supplierActions/supplierData";
import YearFilterComponent from "./yearFilterComponent";

Chart.register(...registerables);

export const SupplyRentComponent = (props) => {
	const [duration, setDuration] = useState("Month");
	const handleFetchData = (duration, period) => {
		// console.log(`this is where we fetch the rent with the `, duration);
		// console.log(`this is where we fetch the rent with the `, period);
		setDuration(duration);

		props.getData(duration, period);
	};

	useEffect(() => {
		// console.log(props.salesData, `this is the produce returned`);
	}, [props.rentData]);

	// let rentProductTypesSet = new Set();

	// let saleTypeObjects = {};

	// props.rentData?.forEach((rent) => {
	// 	rentProductTypesSet.add(rent.productName);

	// 	if (!saleTypeObjects[rent.productType]) {
	// 		saleTypeObjects[sale.productType] = {};
	// 		saleTypeObjects[sale.productType].sales = [];
	// 	}
	// 	saleTypeObjects[sale.productType].sales.push(sale);
	// });

	const calcDataInfo2 = (key) => {
		let products = props.rentData;

		const resultMap = new Map();

		//this helps to add mutliple products of the same name and give a total quantity
		products.forEach((product, index) => {
			// console.log(product, `this is the item inthe first loop`);
			if (resultMap.has(product.productName)) {
				// console.log(`this shows there is repetition`);
				let totalTime =
					parseInt(product.duration) * parseInt(product.productQty);

				if (
					!resultMap.get(product.productName)[`${product.rateDuration}Rents`]
				) {
					let totalTime =
						parseInt(product.duration) * parseInt(product.productQty);
					resultMap.get(product.productName)[
						`${product.rateDuration}Rents`
					] = 1;

					resultMap.get(product.productName)[
						`total${product.rateDuration}Duration`
					] = totalTime;

					resultMap.get(product.productName)[
						`base${product.rateDuration}Price`
					] = product.rateAmount;
				} else {
					resultMap.get(product.productName)[`${product.rateDuration}Rents`] =
						parseInt(
							resultMap.get(product.productName)[`${product.rateDuration}Rents`]
						) + 1;

					let newCummulativeTime =
						parseInt(
							resultMap.get(product.productName)[
								`total${product.rateDuration}Duration`
							]
						) + totalTime;

					resultMap.get(product.productName)[
						`total${product.rateDuration}Duration`
					] = newCummulativeTime;
				}

				// let newCummulativeTime =
				// 	parseInt(
				// 		resultMap.get(product.productName)[
				// 			`total${product.rateDuration}Duration`
				// 		]
				// 	) + totalTime;

				// resultMap.get(product.productName)[
				// 	`total${product.rateDuration}Duration`
				// ] = newCummulativeTime;

				// resultMap.get(product.productName)[`${product.rateDuration}Rents`] =
				// 	parseInt(
				// 		resultMap.get(product.productName)[`${product.rateDuration}Rents`]
				// 	) + 1;

				let newQuantity =
					parseInt(resultMap.get(product.productName).productQty) +
					parseInt(product.productQty);

				resultMap.get(product.productName).productQty = `${newQuantity}`;
			} else {
				// console.log(product.duration, product.productQty);
				// console.log(index, `this is the index`);
				let totalTime =
					parseInt(product.duration) * parseInt(product.productQty);

				// console.log(totalTime, `this is the total time`);

				resultMap.set(product.productName, {
					productName: product.productName,
					productQty: product.productQty,
					[`total${product.rateDuration}Duration`]: totalTime,
					[`base${product.rateDuration}Price`]: product.rateAmount,
					currency: product.productCurrency,

					[`${product.rateDuration}Rents`]: 1,
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

		let rentsResultArray = Array.from(resultMap.values());

		let productColor = [];
		let salesQuantityArray = [];

		rentsResultArray.forEach((produce, index) => {
			salesQuantityArray.push({
				name: produce.productName,
				quantity: produce.productQty,
			});
			productColor.push(colorArray[index]);
			index++;
		});

		let productsLabel = rentsResultArray.map((product) => {
			return product.productName;
		});

		let productInfo = rentsResultArray.map((product) => {
			return product.productQty;
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

		let content = rentsResultArray.map((product) => {
			let hourRate = product.hourRents ? (
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div>Total Hourly rents made: {product.hourRents}</div>
					<div>
						Cummulative machine-hours rentage : {product.totalhourDuration}
					</div>
					<div>
						Hourly base rate : {product.basehourPrice}
						{product.currency}
					</div>
				</div>
			) : (
				""
			);
			let dayRate = product.dayRents ? (
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div>Total daily rents made: {product.dayRents}</div>
					<div>
						Cummulative machine-days rentage : {product.totaldayDuration}
					</div>
					<div>
						Daily base rate : {product.basedayPrice}
						{product.currency}
					</div>
				</div>
			) : (
				""
			);
			let weekRate = product.weekRents ? (
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div>Total weekly rents made: {product.weekRents}</div>
					<div>
						Cummulative machine-weeks rentage : {product.totalweekDuration}
					</div>
					<div>
						Weekly base rate : {product.baseweekPrice}
						{product.currency}
					</div>
				</div>
			) : (
				""
			);

			let monthRate = product.monthRents ? (
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div>Total monthly rents made: {product.monthRents}</div>
					<div>
						Cummulative machine-months rentage : {product.totalmonthDuration}
					</div>
					<div>
						Monthly base rate : {product.basemonthPrice}
						{product.currency}
					</div>
				</div>
			) : (
				""
			);
			let yearRate = product.yearRents ? (
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div>Total yearly rents made: {product.yearRents}</div>
					<div>
						Cummulative machine-years rentage : {product.totalyearDuration}
					</div>
					<div>
						Yearly base rate : {product.baseyearPrice}
						{product.currency}
					</div>
				</div>
			) : (
				""
			);

			return (
				<ListGroupItem style={{ textAlign: "left" }}>
					<div>Product Name: {product.productName.toUpperCase()}</div>
					<div>
						Number of {product.productName}(s) for rent :
						{/* {product.productQty} */}
					</div>
					{hourRate}
					{dayRate}
					{weekRate}
					{monthRate}
					{yearRate}
					{/* <div>{product.productName}</div>
					<div>{product.productName}</div>
					<div>{product.productName}</div> */}
				</ListGroupItem>
			);
		});
		return (
			<div>
				<div style={{ width: "35%", margin: "30px auto" }}>
					<Doughnut data={data} />
				</div>
				<div style={{ textAlign: "left" }}>Rent summary</div>
				{content}
			</div>
		);
	};

	let content2 = () => {
		return props.rentData?.length > 0 ? (
			calcDataInfo2()
		) : (
			<div>
				<p>You don't have any produce for this period</p>
			</div>
		);
	};

	let content =
		props.rentData?.length >= 0 ? (
			<ListGroup>{content2()}</ListGroup>
		) : (
			<div>...loading</div>
		);

	return (
		<div>
			<Row style={{ alignItems: "center" }}>
				<YearFilterComponent fetchData={handleFetchData} />
			</Row>
			<div>Total Rent for {duration}</div>
			{content}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		rentData: state.supplier.rentChartData,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getData: (duration, period) => {
			dispatch(getRentForChart(duration, period));
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SupplyRentComponent);
