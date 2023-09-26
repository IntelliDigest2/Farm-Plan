import React, { useState, useEffect } from "react";

import { useTranslation, Trans } from "react-i18next";

import SalesBox from "./SalesBox";
import { connect } from "react-redux";
import { getSales } from "../../../../../store/actions/supplierActions/supplierData";
import FilterComponent from "./../../Farm/Marketplace/filterComponent";
import { Row } from "react-bootstrap";

const SavedSales = (props) => {
	const { t } = useTranslation();
	const [duration, setDuration] = useState("Day");

	// const [sSales, setSSales] = useState([]);

	//trigger this when editing/deleting items
	// const [update, setUpdate] = useState(0);
	// const forceUpdate = () => {
	// 	setUpdate(update + 1);
	// };

	//this sends data request
	// useEffect(() => {
	// 	props.getSales();
	// }, [update]);

	const handleFetchData = (duration, period) => {
		setDuration(duration);
		console.log(duration, `this is the duration in the saved Sales`);
		console.log(period, `this is the period in the saved Sales`);
		props.getSales(duration, period);
	};

	// const updateSSales = async () => {
	// 	//clears the meals array before each update- IMPORTANT
	// 	setSSales([]);

	// 	//sets a new meal object in the array for every document with this date attached
	// 	props.Sales.forEach((doc) => {
	// 		var productName = doc.productName;
	// 		var productDescription = doc.productDescription;
	// 		var id = doc.id;
	// 		var companyID = doc.companyID;
	// 		var imageURL = doc.imageURL;
	// 		var productCurrency = doc.productCurrency;
	// 		var productPrice = doc.productPrice;
	// 		var productMeasure = doc.productMeasure;
	// 		var productQty = doc.productQty;

	// 		setSSales((sSales) => [
	// 			...sSales,
	// 			{
	// 				productName: productName,
	// 				productDescription: productDescription,
	// 				productCurrency: productCurrency,
	// 				id: id,
	// 				companyID: companyID,
	// 				imageURL: imageURL,
	// 				productPrice: productPrice,
	// 				productMeasure: productMeasure,
	// 				productQty: productQty,
	// 			},
	// 		]);
	// 	});
	// };

	// useEffect(() => {
	// 	// const sorted = sMeals.sort((a, b) => a.meal.localeCompare(b.meal));
	// 	updateSSales();
	// 	console.log("Saved Meals", sSales);
	// 	// .then(setSMeals(sorted));
	// 	// console.log(props.data);
	// }, [props.Sales]);

	return (
		<>
			<Row style={{ alignItems: "baseline" }}>
				<FilterComponent fetchData={handleFetchData} />
			</Row>
			<div className="row">
				<div className="col-8 basic-title-left mb-3">Sales for {duration}</div>
			</div>

			{props.Sales.length ? (
				<>
					<div className="meals">
						<SalesBox
							// forceUpdate={forceUpdate}
							onChange={props.onChange}
							sales={props.Sales}
						/>
					</div>
				</>
			) : (
				<div className="empty basic-title-left">
					<p> No item yet 🙂 add a product from the stock tab </p>
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		Sales: state.supplier.savedSales,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSales: (duration, period) => dispatch(getSales(duration, period)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedSales);
