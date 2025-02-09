import React, { useState, useEffect } from "react";
import { Table, Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { getPurchaseInfoFarm } from "../../../../../../../store/actions/marketplaceActions/farmPlanData";
import ConfirmItemIconFarm from "../Icons/ConfirmItemIconFarm";
import { useTranslation, Trans } from "react-i18next";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { getCurrencySymbol } from "../../../../../../../config/CurrerncyUtils";

function ViewPurchaseInfoFarm(props) {
	const { t } = useTranslation();

	const [list, setList] = useState([]);
	const [isDateEntered, setIsDateEntered] = useState(false);

	const userCountryCode = props.profile.country;
	const userCurrency = getCurrencySymbol(userCountryCode);

	// Function to retrieve currency symbol based on country code
	// const getCurrencySymbol = (countryCode) => {
	//   const countryData = currencyData.countries.country.find(
	//     (country) => country.countryName === countryCode
	//   );
	//   return countryData ? countryData.currencyCode : '$'; // Default to '$' if not found
	// };

	//this sends data request
	useEffect(() => {
		props.getPurchaseInfoFarm();
		//console.log("getting inv ==>", props.data)
	}, []);

	const getPurchaseInfoList = async () => {
		//clears the items array before each update- IMPORTANT
		setList([]);

		//sets a new item object in the array for every document
		props.infoFarm.forEach((doc) => {
			// id is the docref for deletion
			var id = doc.id;
			// var cart = doc.cart;
			var status = doc.status;
			var receiversID = doc.receiversID;
			var farmerID = doc.farmerId;
			var address = doc.address;
			var delivery_code = doc.delivery_code;
			const buyers_account_type = doc.buyers_account_type;

			var cartWithPrices = doc.cart.map((cartItem) => {
				return {
					...cartItem,
					price: 0,
					currency: getCurrencySymbol(userCountryCode),
				};
			});

			setList((list) => [
				...list,
				{
					cart: cartWithPrices,
					id: id,
					status: status,
					farmerID: farmerID,
					receiversID: receiversID,
					address: address,
					delivery_code: delivery_code,
					buyers_account_type: buyers_account_type,
				},
			]);
		});
	};

	//this sends data request
	useEffect(() => {
		getPurchaseInfoList();
		// console.log("list data", list)
		//console.log("getting inv ==>", props.data)
	}, [props.infoFarm]);

	return (
		<>
			{list.length ? (
				<>
					<List>
						{list.map((item, index) => (
							<ListItem
								key={`item${index}`}
								// className="list"
								style={{ alignItems: "flex-end" }}
							>
								<Table striped bordered hover>
									<thead>
										<tr>
											<h6>
												<b>Status: </b>
												{item.status}
											</h6>
										</tr>
										<tr>
											<th className="table-header">
												{t("description.product")}
											</th>
											<th className="table-header">
												{t("description.quantity")}
											</th>
											<th className="table-header">
												{t("description.measure")}
											</th>
										</tr>
									</thead>
									<tbody>
										{item.cart.map((cartItem, cartIndex) => (
											<tr key={`cart${cartIndex}`}>
												<td>{cartItem.data}</td>
												<td>{cartItem.quantity}</td>
												<td>{cartItem.measure}</td>
												<td>
													<InputGroup>
														<InputGroup.Text>{userCurrency}</InputGroup.Text>
														<Form.Control
															type="number"
															min="0"
															step="1"
															value={cartItem.price}
															onChange={(e) => {
																const newPrice = parseFloat(e.target.value);
																const updatedCart = [...item.cart];
																updatedCart[cartIndex].price = newPrice;
																const updatedList = list.map((listItem) =>
																	listItem.id === item.id
																		? { ...listItem, cart: updatedCart }
																		: listItem
																);
																setList(updatedList);
															}}
														/>
													</InputGroup>
												</td>
											</tr>
										))}
									</tbody>

									<tfoot>
										<tr>
											<td colSpan="2">
												{/* Conditionally render the ConfirmItemIconFarm button */}
												{item.status !== "ACCEPTED" && isDateEntered && (
													<ConfirmItemIconFarm
														id={item.id}
														item={item.cart}
														farmerID={item.farmerID}
														farmerRef={item.id}
														receiversID={item.receiversID}
														deliveryDueDate={item.deliveryDueDate}
														delivery_code={item.delivery_code}
														currency={userCurrency}
														buyers_account_type={item.buyers_account_type}
													/>
												)}
											</td>
											<td colSpan="6">
												<td colSpan="3">
													<h5>Delivery Address: {item.address}</h5>
												</td>
												<td colSpan="3">
													<h5>Add Delivery Date</h5>
													<Form.Control
														type="date"
														value={list[0].deliveryDueDate || ""}
														onChange={(e) => {
															const newDueDate = e.target.value;
															const updatedList = list.map((listItem) => ({
																...listItem,
																deliveryDueDate: newDueDate,
															}));
															setList(updatedList);
															setIsDateEntered(newDueDate !== "");
														}}
													/>
												</td>
											</td>
										</tr>
									</tfoot>
								</Table>
							</ListItem>
						))}
					</List>
				</>
			) : (
				<div className="empty basic-title-left">
					<p>{t("description.no_notifications")} </p>
				</div>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		infoFarm: state.farmData.purchaseInfoFarm,
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPurchaseInfoFarm: (data) => dispatch(getPurchaseInfoFarm(data)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ViewPurchaseInfoFarm);
