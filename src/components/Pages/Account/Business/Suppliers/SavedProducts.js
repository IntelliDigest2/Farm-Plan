import React, { useState, useEffect } from "react";

import { useTranslation, Trans } from "react-i18next";

import ProductBox from "./ProductBox";
import { connect } from "react-redux";
import { getProducts } from "../../../../../store/actions/supplierActions/supplierData";
import FilterComponent from "./../../Farm/Marketplace/filterComponent";
import { Row } from "react-bootstrap";

const SavedProducts = (props) => {
	const { t } = useTranslation();

	const [sProducts, setSProducts] = useState([]);

	//trigger this when editing/deleting items
	// const [update, setUpdate] = useState(0);
	// const forceUpdate = () => {
	// 	setUpdate(update + 1);
	// };

	//this sends data request
	// useEffect(() => {
	// 	props.getProducts();
	// }, [update]);

	const updateSProducts = async () => {
		//clears the meals array before each update- IMPORTANT
		setSProducts([]);

		//sets a new meal object in the array for every document with this date attached
		props.Products.forEach((doc) => {
			var productName = doc.productName;
			var productDescription = doc.productDescription;
			var id = doc.id;
			var companyID = doc.companyID;
			var region = doc.region;
			var city = doc.city;
			var companyName = doc.companyName;
			var imageURL = doc.imageURL;
			var productCurrency = doc.productCurrency;
			var productPrice = doc.productPrice;
			var productMeasure = doc.productMeasure;
			var productQty = doc.productQty;
			var createdAt = doc.createdAt;

			setSProducts((sProducts) => [
				...sProducts,
				{
					productName: productName,
					productDescription: productDescription,
					productCurrency: productCurrency,
					id: id,
					companyID: companyID,
					region: doc.region,
					city: doc.city,
					companyName: doc.companyName,
					imageURL: imageURL,
					productPrice: productPrice,
					productMeasure: productMeasure,
					productQty: productQty,
					createdAt: createdAt,
				},
			]);
		});
	};

	// useEffect(() => {
	// 	// const sorted = sMeals.sort((a, b) => a.meal.localeCompare(b.meal));
	// 	updateSProducts();
	// 	console.log("Saved Meals", sProducts);
	// 	// .then(setSMeals(sorted));
	// 	// console.log(props.data);
	// }, [props.Products]);

	console.log(props.Products);

	const handleFetchData = (duration, period) => {
		props.getProducts(duration, period);
	};

	return (
		<>
			<Row style={{ alignItems: "baseline" }}>
				<FilterComponent fetchData={handleFetchData} />
			</Row>
			{props.Products.length ? (
				<>
					<div className="row">
						<div className="col-8 basic-title-left mb-3">
							PRODUCTS INVENTORY
						</div>
					</div>
					<div className="meals">
						<ProductBox
							// forceUpdate={forceUpdate}
							onChange={props.onChange}
							products={props.Products}
						/>
					</div>
				</>
			) : (
				<div className="empty basic-title-left">
					<p> No item yet 🙂 add a product from ADD PRODUCT tab</p>
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		Products: state.supplier.savedProducts,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getProducts: (duration, period) => dispatch(getProducts(duration, period)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedProducts);
