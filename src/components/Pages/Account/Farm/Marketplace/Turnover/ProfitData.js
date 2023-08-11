import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getSoldProducts } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";
import { Form, Row, Col, Accordion, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { getMonth, getYear } from "date-fns";
import { Dropdown } from "./../../../../../SubComponents/Dropdown";
import { getFarmTurnOverFunction } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";

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
	const [farmCycleEndYear, setFarmCycleEndYear] = useState(
		parseInt(currentYear + 1)
	);

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

	// useEffect(() => {
	// 	let period;
	// 	if (filter === "Month") {
	// 		console.log(`filter changed to month `);
	// 		let monthNumber = months.indexOf(month) + 1;

	// 		period = monthNumber;
	// 	}
	// 	// (filter === "Year")
	// 	else {
	// 		console.log(`filter changed to Cycle `);

	// 		period = year;
	// 	}

	// }, [filter]);

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

	console.log(farmProduceTypeObjects);

	let farmTypes = Array.from(farmTypesSet);

	const listItems = (key) => {
		return farmProduceTypeObjects[key].produces.map((value) => {
			console.log(value, `value`);
			return (
				<>
					<div>Product name: {value.item}</div>
					<div>quantity: {value.quantity}</div>
				</>
			);
		});
	};

	let content = Object.keys(farmProduceTypeObjects).map((key) => {
		return (
			<>
				<p>Result for {filter} </p>
				{filter === "Month"
					? month
					: `${farmCycleStartMonth}-${farmCycleStartYear} to ${farmCycleEndMonth}-${farmCycleEndYear}`}
				<div>Farm Practice: {key}</div>
				{listItems(key)}
			</>
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
			<div>
				<p>Product Harvest quantity : {harvestQuantity}</p>
				{content}
			</div>
		);
	return (
		<div>
			<Row style={{ alignItems: "center" }}>
				<Col md={2}>Filter By :</Col>
				<Col md={2}>
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
				<Col md={8}>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getData: (duration, period) =>
			dispatch(getFarmTurnOverFunction(duration, period)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfitData);
