import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Alert } from "react-bootstrap";

import { AddProduceModal } from "./Icons/AddProduceModal";

import ProduceItems from "./produceItems";
import FilterComponent from "./../filterComponent";
import { getProduceData2 } from "./../../../../../../store/actions/marketplaceActions/farmPlanData";

import { Row } from "react-bootstrap";

export const ProducePlan = (props) => {
	const [calendar, setCalendar] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentDuration, setcurrentDuration] = useState("Day");
	const [filter, setFilter] = useState("Day");

	const [show, setShow] = useState(false);
	// { value, onChange } = props;

	function chosenDay() {
		return props.value.format("dddd DD/MM");
	}

	useEffect(() => {
		setFilter(currentDuration);
	}, [props.produce]);

	const handleFetchData = (duration, period) => {
		console.log(duration, `this is the duration`);
		console.log(period, `this is the period`);
		setcurrentDuration(duration);
		props.getProduceData(duration, period);
	};

	console.log(props.produce, `result state`);
	// console.log(props.getProductData, `this is the function`);
	// console.log(props.salesData, `this is the sales data`);

	// useEffect(() => {
	// 	props.getProduceData2(filter,);

	// }, []);

	let content2 =
		props.produce?.length === 0 ? (
			<div> you dont have any produce for this period</div>
		) : (
			<div>
				<ProduceItems
					products={props.produce}
					value={props.value}
					show={show}
				/>
			</div>
		);

	let content =
		props.produce === null ? (
			"...loading"
		) : (
			<>
				<h4>Inventory info for {filter}</h4>
				{content2}
			</>
		);

	return (
		<>
			<div className="row">
				<div className="col-8" style={{ textAlign: "left" }}>
					Add item to your harvest Inventory 🙂
				</div>
				<div className="col-4" style={{ textAlign: "right" }}>
					<AddProduceModal value={props.value} show={show} setShow={setShow} />
				</div>
			</div>
			<Row style={{ alignItems: "baseline" }}>
				<FilterComponent fetchData={handleFetchData} />
			</Row>

			<div className="plan-box">
				{/* <div className="header">{chosenDay()}</div> */}
				{/* <h4>Inventory info for {filter}</h4>

				<div>
					<ProduceItems
						products={props.produce}
						value={props.value}
						show={show}
					/>
				</div> */}

				{content}
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		produce: state.farmData.produce,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProduceData: (duration, period) =>
			dispatch(getProduceData2(duration, period)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProducePlan);

// import React from 'react'
// import { connect } from 'react-redux'

// export const ProducePlan = (props) => {
//   return (
// 	<div>ProducePlan</div>
//   )
// }

// const mapStateToProps = (state) => ({})

// const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(ProducePlan)
