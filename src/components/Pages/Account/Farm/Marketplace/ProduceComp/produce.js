import React, { useState, useEffect } from "react";

import ProduceBox from "./ProduceBox";

import { connect } from "react-redux";
import SyncIcon from "@mui/icons-material/Sync";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {
	getProduceData,
	getProduceData2,
} from "../../../../../../store/actions/marketplaceActions/farmPlanData";
import { format } from "date-fns";

function ProduceItems(props) {
	const [produce, setProduce] = useState([]);

	//trigger this when editing/deleting items
	const [update, setUpdate] = useState(0);
	const forceUpdate = () => {
		setUpdate(update + 1);
	};

	function Refresh() {
		return (
			<>
				<Tooltip title="Refresh">
					<IconButton
						aria-label="Refresh"
						sx={{ ml: 2 }}
						onClick={() => {
							forceUpdate();
						}}
					>
						<SyncIcon style={{ fontSize: 35 }} />
					</IconButton>
				</Tooltip>
			</>
		);
	}

	//this sends data request
	// useEffect(() => {
	// 	props.getProduceData();
	// }, [props.value, update]);
	useEffect(() => {
		props.getProduceData2();
	}, []);

	useEffect(() => {
		console.log(props.produce, `these are the produces`);
		// props.produce.forEach((doc) => {
		// 	let formatedDate = format(doc.date.toDate(), "MMMM d, yyyy");

		// 	doc.date = formatedDate;
		// });

		setProduce(props.produce);

		// setProduce(props.produce);
	}, [props.produce]);

	// const updateProduce = async () => {
	// 	//clears the meals array before each update- IMPORTANT
	// 	setProduce([]);

	// 	//sets a new meal object in the array for every document with this date attached
	// 	props.produce.forEach((doc) => {
	// 		let formatedDate = format(doc.date.toDate(), "MMMM d, yyyy");

	// 		let item = doc.item;
	// 		let id = doc.id;
	// 		let farmType = doc.farmType;
	// 		let measure = doc.measure;
	// 		let quantity = doc.quantity;
	// 		let price = doc.price;
	// 		let currency = doc.currency;
	// 		let date = formatedDate;
	// 		let sellingPrice = doc.sellingPrice;

	// 		setProduce((produce) => [
	// 			...produce,
	// 			{
	// 				item: item,
	// 				farmType: farmType,
	// 				id: id,
	// 				measure: measure,
	// 				quantity: quantity,
	// 				price: price,
	// 				currency: currency,
	// 				date: date,
	// 				sellingPrice: sellingPrice,
	// 			},
	// 		]);
	// 	});
	// };

	// useEffect(() => {
	// 	updateProduce();
	// }, [props.produce, props.update]);
	let content =
		produce === null ? (
			"...loading"
		) : produce.length === 0 ? (
			<div className="empty basic-title-left">
				<p> No Item yet 🙂 use the add button </p>
			</div>
		) : (
			<div>
				<h2>Inventory</h2>
				<ProduceBox forceUpdate={forceUpdate} produce={produce} />
			</div>
		);

	return (
		<>
			{/* <Refresh />

			{produce.length ? (
				<div>
					<h2>Inventory</h2>
					<ProduceBox forceUpdate={forceUpdate} produce={produce} />
				</div>
			) : (
				<div className="empty basic-title-left">
					<p> No Item yet 🙂 use the add button </p>
				</div>
			)} */}

			{content}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		produce: state.farmData.produce,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// getProduceData: (data) => dispatch(getProduceData(data)),
		getProduceData2: (data) => dispatch(getProduceData2(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProduceItems);
