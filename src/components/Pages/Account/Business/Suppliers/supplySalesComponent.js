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
	const [time, setTime] = useState("Month");
	const handleFetchData = (duration, period) => {
		console.log(duration, `this is ithe duration`);
		console.log(duration, `this is ithe period`);
		props.getData(duration, period);
		// .then(() => {
		setTime(duration);
		// });
	};

	useEffect(() => {
		console.log(props.salesData);
	}, [props.salesData]);

	const calcDataInfo2 = () => {
		let sales = props.salesData;

		const resultMap = new Map();

		//this helps to add mutliple products of the same name and give a total quantity
		sales.forEach((product) => {
			let brandName = product.brandName;
			if (resultMap.has(product.productName)) {
				let newQuantity =
					parseInt(resultMap.get(product.productName).productQty) +
					parseInt(product.productQty);
				if (
					resultMap.get(product.productName).brandInfo.some((exp) => {
						return exp.name === brandName;
					})
				) {
					let index = resultMap
						.get(product.productName)
						.brandInfo.findIndex((product) => product.name === brandName);

					let newQuantityVal =
						parseInt(
							resultMap.get(product.productName).brandInfo[index].saleCount
						) + 1;

					let newTotal =
						parseInt(
							resultMap.get(product.productName).brandInfo[index].amountSold
						) + parseInt(product.productQty);

					resultMap.get(product.productName).brandInfo[index].saleCount =
						newQuantityVal;
					resultMap.get(product.productName).brandInfo[index].amountSold =
						newTotal;
				} else {
					resultMap.get(product.productName).brandInfo.push({
						name: brandName,
						saleCount: 1,
						amountSold: product.productQty,
					});
				}

				resultMap.get(product.productName).productQty = `${newQuantity}`;
			} else {
				resultMap.set(product.productName, {
					currency: product.productCurrency,
					productName: product.productName,
					productQty: product.productQty,
					price: product.productPrice,

					unit: product.productMeasure,
					brandInfo: [
						{
							name: product.brandName,
							saleCount: 1,
							amountSold: product.productQty,
						},
					],
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

		let productColor = [];

		salesResultArray.forEach((produce, index) => {
			productColor.push(colorArray[index]);
			index++;
		});

		let productsLabel = salesResultArray.map((product) => {
			return product.productName;
		});

		let productInfo = salesResultArray.map((product) => {
			return product.productQty;
		});

		let brandCont = (saleProduct, index) => {
			return saleProduct.brandInfo.map((saleProductBrand) => {
				return (
					<div
						style={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "space-between",
						}}
					>
						<span> Brand name: {saleProductBrand.name} </span>{" "}
						<span> Total products sold:{saleProductBrand.amountSold} </span>{" "}
						<span>
							{" "}
							No of sales made:
							{saleProductBrand.saleCount}
						</span>
					</div>
				);
			});
		};

		let content = salesResultArray.map((product) => {
			return (
				<ListGroupItem style={{ textAlign: "left" }}>
					<div>Product Name: {product.productName.toUpperCase()}</div>
					<div>
						Number of sales for {time} :{product.productQty}
					</div>
					{brandCont(product)}
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
					chart for sold products
					<Doughnut data={data} />
				</div>

				<div>{content}</div>
			</div>
		);
	};

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
		props.salesData === null ? (
			<div>...loading</div>
		) : (
			<ListGroup>{content2()}</ListGroup>
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
		// stockData: state.supplier.productsSalesChartData,
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
