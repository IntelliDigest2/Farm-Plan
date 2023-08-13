import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdbreact";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment"; // or another adapter to avoid moment
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import { format } from "date-fns";
import { Dropdown } from "./../../../SubComponents/Dropdown";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { getFarmProductsForDuration } from "./../../../../store/actions/marketplaceActions/farmPlanData";
import { ListGroup, ListGroupItem } from "react-bootstrap";

Chart.register(...registerables);

const ChartProduce = (props) => {
	const currentYear = new Date().getFullYear();
	const currentDate = new Date();
	const currentMonth = format(currentDate, "MMMM").substring(0, 3);
	const [day, setDay] = useState(new Date());
	const [filter, setFilter] = useState("day");
	const [month, setMonth] = useState(currentMonth);
	const [week, setWeek] = useState("1");
	const [year, setYear] = useState(currentYear);

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
		if (filter === "Week") {
			console.log(`filter changed to week`);
			period = week;
		} else if (filter === "Month") {
			console.log(`filter changed to month `);
			let monthNumber = months.indexOf(month) + 1;

			period = monthNumber;
		} else if (filter === "Year") {
			console.log(`filter changed to year `);

			period = year;
		} else {
			period = day;
		}

		props.getData(filter, period);
	}, [filter]);

	console.log(props.produce, `this is how the produce data looks like`);

	useEffect(() => {
		if (filter === "Week") {
			console.log(`Week change`);
			props.getData(filter, week);
		}
	}, [week]);
	useEffect(() => {
		if (filter === "Month") {
			console.log(`month change`);
			let monthNumber = months.indexOf(month) + 1;

			props.getData(filter, monthNumber);
		}
	}, [month]);
	useEffect(() => {
		if (filter === "Year") {
			console.log(`year change`);

			props.getData(filter, year);
		}
	}, [year]);

	useEffect(() => {
		console.log(props.produce, `this is the produce returned`);
	}, [props.produce]);

	let farmTypesSet = new Set();

	let farmTypeCounts = [];

	// let colorArray = ["blue", "green", "orange", "pink"];

	let farmProduceTypeObjects = {};

	props.produce?.forEach((produce) => {
		farmTypesSet.add(produce.farmType);

		if (!farmProduceTypeObjects[produce.farmType]) {
			farmProduceTypeObjects[produce.farmType] = {};
			farmProduceTypeObjects[produce.farmType].produces = [];
		}
		farmProduceTypeObjects[produce.farmType].produces.push(produce);
	});

	// const calcDataInfo = () => {
	// 	let index = 0;
	// 	props.produce.forEach((produce) => {
	// 		farmTypesSet.add(produce.farmType);

	// 		if (!farmTypeCounts[produce.farmType]) {
	// 			farmTypeCounts[produce.farmType] = {};
	// 			farmTypeCounts[produce.farmType].number = 1;
	// 			farmTypeCounts[produce.farmType]["color"] = colorArray[index];
	// 			index++;
	// 		} else {
	// 			// If the farmType is already encountered, increment its count by 1
	// 			farmTypeCounts[produce.farmType].number++;
	// 		}
	// 	});

	// 	let farmTypeArray = Array.from(farmTypesSet);

	// 	let productInfo = farmTypeArray.map((farmType) => {
	// 		return farmTypeCounts[farmType].number;
	// 	});

	// 	let dataColor = farmTypeArray.map((farmType) => {
	// 		return farmTypeCounts[farmType].color;
	// 	});
	// 	let data = {
	// 		labels: farmTypeArray,

	// 		datasets: [
	// 			{
	// 				label: "Produce Summary",
	// 				data: productInfo,
	// 				backgroundColor: dataColor,
	// 			},
	// 		],
	// 	};
	// 	return (
	// 		<div style={{ width: "70%", margin: "30px auto" }}>
	// 			<Doughnut data={data} />
	// 		</div>
	// 	);
	// };

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
				<div style={{ margin: "0 4px" }}>
					{product.name.toUpperCase()}
					<span style={{ color: "blue" }}>
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
				<div style={{ display: "flex", flexWrap: "wrap" }}>{productsData}</div>
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

	// let content =
	// 	props.produce?.length > 0 ? (
	// 		calcDataInfo()
	// 	) : (
	// 		<div>
	// 			<p>You don't have any produce for this period</p>
	// 		</div>
	// 	);

	let content =
		Object.keys(farmProduceTypeObjects).length > 0 ? (
			Object.keys(farmProduceTypeObjects).map((key) => {
				return (
					<ListGroupItem style={{ textAlign: "left" }}>
						<h5>Farm Practice: {key}</h5>

						{/* <ListGroup className="list-group-flush">{listItems(key)}</ListGroup> */}
						{content2(key)}
					</ListGroupItem>
				);
			})
		) : (
			<div style={{ marginTop: "20px" }}>
				<p>You don't have any produce for this period</p>
			</div>
		);

	const endYear = 2050;
	const years = [];

	for (let year = currentYear; year <= endYear; year++) {
		years.push(year);
	}

	let componentToRender =
		filter === "Week" ? (
			<>
				<Dropdown
					id="week"
					styling="grey dropdown-input"
					data={week}
					// data={local.measure}
					required
					items={["1", "2", "3", "4"]}
					function={(e) => setWeek(e)}
				/>
				<span style={{ marginLeft: "5px" }}> of {currentMonth}</span>
			</>
		) : filter === "Month" ? (
			<Dropdown
				id="month"
				styling="grey dropdown-input"
				data={month}
				// data={local.measure}
				required
				items={months}
				function={(e) => setMonth(e)}
			/>
		) : filter === "Year" ? (
			<Dropdown
				id="year"
				styling="grey dropdown-input"
				data={year}
				// data={local.measure}
				required
				items={years}
				function={(e) => setYear(e)}
			/>
		) : (
			//  filter === "Farm Cycle"?():
			// <Form.Group className="mb-3 land">
			// 					<Form.Label>Farm Cycle</Form.Label>
			// 					<InputGroup>
			// 						<Form.Control
			// 							type="number"
			// 							id="farmCycle"
			// 							onChange={(e) => setFarmCycle(e.target.value)}
			// 							value={land}
			// 							min={1}
			// 							max={20}
			// 							required
			// 						/>
			// 						<Dropdown
			// 							id="cycleUnit"
			// 							styling="green dropdown-input-right"
			// 							data={cycleUnit}
			// 							function={(e) => {
			// 								setCycleUnit(e);
			// 							}}
			// 							items={["months", "years"]}
			// 						/>
			// 					</InputGroup>
			// 				</Form.Group>
			<div style={{ display: "flex" }}>
				<span>pick date</span>
				<span>
					<DatePicker
						selected={day}
						onChange={(date) => setDay(date)}
						// dateFormat="dd/m/yyyy"
					/>
				</span>
			</div>
		);

	// let dataDisplay = ? :

	return (
		<div>
			<Row style={{ alignItems: "center" }}>
				<Col md={2}>Filter by</Col>
				<Col md={4}>
					<Dropdown
						// id="nutrientUnit"
						styling="grey dropdown-input"
						data={filter}
						// data={local.measure}
						required
						items={["Day", "Week", "Month", "Year"]}
						function={(e) => setFilter(e)}
					/>
				</Col>
				<Col style={{ display: "flex", alignItems: "center" }} md={4}>
					{componentToRender}
				</Col>
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
