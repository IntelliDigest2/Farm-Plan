import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { getPurchaseInfo } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";
import ConfirmItemIcon from "./ConfirmItemIcon";

import { useTranslation, Trans } from "react-i18next";
import {
	getConsultingBookingsForPurchase,
	changePurchaseStatus,
} from "../../../../../../../store/actions/marketplaceActions/consultingBookingData";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PayIconWallet from "./PayIconWallet";
import PayIcon from "./PayIcon";
import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import ConfirmItemIconRes from "../../../../Business/Restaurant/Icons/ConfirmItemIconRes";

// import  from './../../../../../../../store/actions/marketplaceActions/mealPlanData';
import { getPurchaseInfoRes } from "../../../../../../../store/actions/marketplaceActions/restaurantData";
import { getPurchaseInfoSupply } from "../../../../../../../store/actions/supplierActions/supplierData";
import { getOrderInfo } from "./../../../../../../../store/actions/marketplaceActions/mealPlanData";
import { getPurchaseInfoFarm } from "./../../../../../../../store/actions/marketplaceActions/farmPlanData";
import { getCurrencySymbol } from "./../../../../../../../config/CurrerncyUtils";

function ViewAppNotifications(props) {
	const { t } = useTranslation();
	const [list, setList] = useState([]);
	// const [userPurchaseList, setUserPurchaseList] = useState(null);
	// const [otherUserPurchaselist, setOtherUserPurchaseList] = useState(null);
	const [suppliersOrderlist, setSuppliersOrderList] = useState(null);
	const [otherUsersSupplyOrderList, setOtherUsersSupplyOrderList] =
		useState(null);
	const [restaurantsOrderList, setRestaurantsOrderList] = useState(null);
	const [otherUsersRestaurantOrderList, setOtherUsersRestaurantOrderList] =
		useState(null);
	const [farmersShoppingList, setFarmersShoppingList] = useState(null);
	const [otherUsersShoppingList, setOtherUsersShoppingList] = useState(null);
	const [supplylist, setSupplyList] = useState([]);
	const [restaurantList, setRestaurantList] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [paymentType, setPaymentType] = useState("");

	// const [list, setList] = useState([]);
	const [isDateEntered, setIsDateEntered] = useState(false);

	const userCountryCode = props.profile.country;
	const userCurrency = getCurrencySymbol(userCountryCode);

	//this sends data request
	// useEffect(() => {
	// 	props.getPurchaseInfoForSupplier();
	// 	console.log("getting sup ==>", props.data);
	// }, [props.infoSupply]);

	// useEffect(() => {
	// 	if (!props.loadingPay) {
	// 		setisLoading(false);
	// 	}
	// }, [props.loadingPay]);

	// //this sends data request
	// useEffect(() => {
	// 	getOrderInfoList();
	// 	//console.log("getting list ==>", list)
	// }, [props.infoSupply]);

	// //this sends data request
	// useEffect(() => {
	// 	props.getPurchaseInfo();
	// 	props.getBookingsForPurchase();
	// 	//console.log("getting inv ==>", props.data)
	// }, []);

	// useEffect(() => {
	// 	props.getPurchaseInfoForRes();
	// 	//console.log("getting inv ==>", props.data)
	// }, [props.infoRes]);

	// //this sends data request
	// useEffect(() => {
	// 	getPurchaseInfoList();
	// 	//console.log("getting inv ==>", props.data)
	// }, [props.infoPurchase]);

	// useEffect(() => {}, [props.bookingsInfo]);

	// useEffect(() => {
	// 	// props.getOrderInfo();
	// 	//console.log("getting inv ==>", props.data)
	// }, []);

	const userType1 =
		props.profile.buildingFunction === "Households" ||
		props.profile.buildingFunction === "Library" ||
		props.profile.buildingFunction === "Machinery/Supply" ||
		props.profile.buildingFunction === "Offices" ||
		props.profile.buildingFunction === "Other" ||
		props.profile.buildingFunction === "Personal" ||
		props.profile.buildingFunction === "Restaurants" ||
		props.profile.buildingFunction === "Schools";

	const otherUsersRestaurantNotification =
		props.profile.buildingFunction === "Households" ||
		props.profile.buildingFunction === "Library" ||
		props.profile.buildingFunction === "Machinery/Supply" ||
		props.profile.buildingFunction === "Offices" ||
		props.profile.buildingFunction === "Other" ||
		props.profile.buildingFunction === "Personal" ||
		props.profile.buildingFunction === "Schools";

	const farmOnlyNotif = props.profile.buildingFunction === "Farm";
	const consultantOnlyNotif = props.profile.buildingFunction === "Consultant";
	const restaurantOnlyNotif = props.profile.buildingFunction === "Restaurants";
	const machinerysupplierOnlyNotif =
		props.profile.buildingFunction === "Machinery/Supply";

	useEffect(() => {
		if (userType1) {
			// fetch shopping notifications (notifications from farmers)
		}
		if (otherUsersRestaurantNotification) {
			// fetch notifications from restaurants
			props.getUsersRestaurantNotif();
		}

		if (farmOnlyNotif) {
			// fetch notifications for farmer for when a shopping order comes in
			// when a supplier order comes in
			getPurchaseInfoFarm();
		}
		if (consultantOnlyNotif) {
			// fetch notifications for when a consultation request comes in
		}
		if (restaurantOnlyNotif) {
			// fetch notifications for farmer alone//
			props.getPurchaseInfoForRes();
		}
		if (machinerysupplierOnlyNotif) {
			// fetch notifications for farmer alone
			props.getPurchaseInfoForSupplier();
		}
	}, []);

	const getSupplyOrderInfoList = async () => {
		//clears the items array before each update- IMPORTANT
		setList([]);

		//sets a new item object in the array for every document
		props.infoSupply.forEach((doc) => {
			// id is the docref for deletion
			var id = doc.id;
			var uid = doc.uid;
			var productName = doc.cartList.productName;
			var productPrice = doc.cartList.productPrice;
			var productCurrency = doc.cartList.productCurrency;
			var status = doc.status;

			setSupplyList((supplylist) => [
				...supplylist,
				{
					productName: productName,
					productPrice: productPrice,
					id: id,
					uid: uid,
					productCurrency: productCurrency,
					status: status,
				},
			]);
		});
	};

	const getOrderInfoList = async () => {
		//clears the items array before each update- IMPORTANT
		setList([]);

		//sets a new item object in the array for every document
		props.infoRes.forEach((doc) => {
			// id is the docref for deletion
			var id = doc.id;
			var uid = doc.uid;
			var order = doc.order;
			var seat = doc.seat;
			var fullname = doc.fullname;
			var status = doc.status;

			setList((restaurantList) => [
				...restaurantList,
				{
					order: order,
					seat: seat,
					id: id,
					uid: uid,
					fullname: fullname,
					status: status,
				},
			]);
		});
	};

	const getPurchaseInfoList = async () => {
		//clears the items array before each update- IMPORTANT
		setList([]);

		//sets a new item object in the array for every document
		props.infoPurchase.forEach((doc) => {
			// id is the docref for deletion
			var refID = doc.id;
			var item = doc.item;
			var farmerID = doc.farmerID;
			var farmerRef = doc.farmerRef;
			var receiversID = doc.receiversID;
			var status = doc.status;
			var deliveryDueDate = doc.deliveryDueDate;

			setList((list) => [
				...list,
				{
					item: item,
					refID: refID,
					farmerID: farmerID,
					farmerRef: farmerRef,
					receiversID: receiversID,
					status: status,
					deliveryDueDate: deliveryDueDate,
				},
			]);
		});
	};

	const pay = (e, bookingId, consultantId, consultantName, eventType, date) => {
		e.preventDefault();

		// console.log(
		// 	bookingId,
		// 	consultantId,
		// 	consultantName,
		// 	eventType,
		// 	`this is from the north side`
		// );

		// const ndate = parseISO(date);

		// // Convert to UTC
		// const utcDate = utcToZonedTime(ndate, "UTC");

		// console.log(utcDate instanceof Date, utcDate, `this is the utc date `);

		props.purchaseBooking(
			bookingId,
			consultantId,
			consultantName,
			eventType,
			date
		);
	};

	return (
		<>
			{/* Shopping Notification */}
			{userType1 ? (
				<div>
					<h2 style={{ fontSize: "14px", fontWeight: "600", color: "#0c0847" }}>
						Shopping Notifications
					</h2>
					{otherUsersShoppingList.length ? (
						<>
							<List>
								{otherUsersShoppingList.map((cart, index) => (
									<ListItem
										key={`item${index}`}
										style={{ alignItems: "flex-end" }}
									>
										<Table striped bordered hover>
											<thead>
												<tr>
													<h6>
														<b>{t("description.order_id")} </b>
														{cart.refID}
													</h6>
													<h6>
														<b>{t("description.order_status")} </b>
														{cart.status}
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
													<th className="table-header">
														{t("description.price")}
													</th>
												</tr>
											</thead>
											<tbody>
												{cart.item.map((cartItems) => (
													<tr key={`cart${index}`}>
														<td>{cartItems.data}</td>
														<td>{cartItems.quantity}</td>
														<td>{cartItems.measure}</td>
														{cartItems.price ? (
															<td>
																{cartItems.currency}
																{cartItems.price}
															</td>
														) : (
															<td>0</td>
														)}
														{/* {cartItems.supplier ? <td>{cartItems.supplier}</td> : <td></td>} */}
													</tr>
												))}
											</tbody>
											<div className="">
												{cart.status === "CONFIRMED" ? (
													<>
														<PayIconWallet
															paytype="supplier"
															uid={cart.receiversID}
															order={cart}
															refID={cart.refID}
														/>
														{/* <PayIcon
                        paytype="supplier"
                        //value={props.value}
                        refID={cart.refID}
                        // id={item.id}
                        // uid={item.uid}
                      /> */}
													</>
												) : (
													<ConfirmItemIcon
														//value={props.value}
														refID={cart.refID}
														// id={item.id}
													/>
												)}
											</div>
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
				</div>
			) : (
				""
			)}
			{/* Farmers Shopping Notification */}
			{farmOnlyNotif ? (
				<div>
					<h2 style={{ fontSize: "14px", fontWeight: "600", color: "#0c0847" }}>
						Shopping Notifications
					</h2>
					{farmersShoppingList.length ? (
						<>
							<List>
								{farmersShoppingList.map((cart, index) => (
									<ListItem
										key={`item${index}`}
										style={{ alignItems: "flex-end" }}
									>
										<Table striped bordered hover>
											<thead>
												<tr>
													<h6>
														<b>{t("description.order_id")} </b>
														{cart.refID}
													</h6>
													<h6>
														<b>{t("description.order_status")} </b>
														{cart.status}
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
													<th className="table-header">
														{t("description.price")}
													</th>
												</tr>
											</thead>
											<tbody>
												{cart.item.map((cartItems) => (
													<tr key={`cart${index}`}>
														<td>{cartItems.data}</td>
														<td>{cartItems.quantity}</td>
														<td>{cartItems.measure}</td>
														{cartItems.price ? (
															<td>
																{cartItems.currency}
																{cartItems.price}
															</td>
														) : (
															<td>0</td>
														)}
														{/* {cartItems.supplier ? <td>{cartItems.supplier}</td> : <td></td>} */}
													</tr>
												))}
											</tbody>
											<div className="">
												{cart.status === "CONFIRMED" ? (
													<>
														<PayIconWallet
															paytype="supplier"
															uid={cart.receiversID}
															order={cart}
															refID={cart.refID}
														/>
														{/* <PayIcon
                        paytype="supplier"
                        //value={props.value}
                        refID={cart.refID}
                        // id={item.id}
                        // uid={item.uid}
                      /> */}
													</>
												) : (
													<ConfirmItemIcon
														//value={props.value}
														refID={cart.refID}
														// id={item.id}
													/>
												)}
											</div>
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
				</div>
			) : (
				""
			)}
			{/*requestFromAdmin*/}
			{farmOnlyNotif ? (
				<div>
					<h2 style={{ fontSize: "14px", fontWeight: "600", color: "#0c0847" }}>
						Purchase Notifications
					</h2>
					{userPurchaseList.length ? (
						<>
							<List>
								{userPurchaseList.map((item, index) => (
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
																<InputGroup.Text>
																	{userCurrency}
																</InputGroup.Text>
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
				</div>
			) : (
				""
			)}

			{/* Consulting Notification */}
			{userType1 || props.profile.buildingFunction === "Farm" ? (
				<div>
					<hr />
					<h2 style={{ fontSize: "14px", fontWeight: "600", color: "#0c0847" }}>
						Consultant Booking Notifications
					</h2>
					{props.bookingsInfo.length ? (
						<>
							<List>
								{props.bookingsInfo.map(({ bookingId, booking }, index) => {
									let eventType = booking.event.eventType;
									let consultantId = booking.consultant.consultantId;
									let consultantName = booking.consultant.consultantName;

									let date = format(
										parseISO(booking.event.start),
										"yyyy-MM-dd"
									);
									let startTime = format(
										parseISO(booking.event.start),
										"hh:mm a"
									);
									let endTime = format(parseISO(booking.event.end), "hh:mm a");
									return (
										<ListItem
											key={`item${index}`}
											style={{ alignItems: "flex-end" }}
										>
											<Table striped bordered hover>
												<thead>
													<tr>
														<h6>
															<b>Order ID: </b>
															{bookingId}
														</h6>

														<h6>
															<b>Status: {booking.status} </b>
															{}
														</h6>
													</tr>
													<tr>
														<th className="table-header">Event Type</th>
														<th className="table-header">Date</th>
														<th className="table-header">Start time</th>
														<th className="table-header">End Time</th>
														<th className="table-header">Description</th>
														<th className="table-header">Price</th>
													</tr>
												</thead>
												<tbody>
													<tr key={`cart${index}`}>
														<td>{eventType}</td>
														<td>{date}</td>
														<td>{startTime}</td>
														<td>{endTime}</td>
														<td>{booking.event.description}</td>
														<td>{booking.event.price}</td>
													</tr>
												</tbody>
											</Table>
											<div className="">
												{/* <ConfirmItemIcon
                    //value={props.value}
                    id={item.id}
                  /> */}
												{/* <Button
                    disabled={booking.status === "completed"}
                    // onClick={(e) =>
                    //   pay(
                    //     e,
                    //     bookingId,
                    //     consultantId,
                    //     consultantName,
                    //     eventType,
                    //     booking.event.start
                    //   )
                    // }
                  >
                    {isLoading
                      ? "loading"
                      : booking.status === "completed"
                      ? "payment made"
                      : "pay"}
                  </Button> */}
												{booking.status === "completed" ? (
													"PAID"
												) : (
													<PayIcon
														payType="consultant"
														//value={props.value}
														// refID={item.refID}
														consultantPaymentInfo={[
															bookingId,
															consultantId,
															consultantName,
															eventType,
															booking.event.start,
														]}
														id={bookingId}
														uid={props.auth.uid}
													/>
												)}

												{/* {item.status == "CONFIRMED" ? (
                      <PayIcon
                        //value={props.value}
                        refID={item.refID}
                        id={item.id}
                        uid={item.uid}
                      />
                    ) : (
                      ""
                    )} */}
											</div>
										</ListItem>
									);
								})}
							</List>
						</>
					) : (
						<div className="empty basic-title-left">
							<p>You don't have any booking Notifications </p>
						</div>
					)}
				</div>
			) : (
				""
			)}
			{/* Consultant Notification */}
			{consultantOnlyNotif ? (
				<div>
					<hr />
					<h2 style={{ fontSize: "14px", fontWeight: "600", color: "#0c0847" }}>
						Consultant Booking Notifications
					</h2>
					{props.bookingsInfo.length ? (
						<>
							<List>
								{props.bookingsInfo.map(({ bookingId, booking }, index) => {
									let eventType = booking.event.eventType;
									let consultantId = booking.consultant.consultantId;
									let consultantName = booking.consultant.consultantName;

									let date = format(
										parseISO(booking.event.start),
										"yyyy-MM-dd"
									);
									let startTime = format(
										parseISO(booking.event.start),
										"hh:mm a"
									);
									let endTime = format(parseISO(booking.event.end), "hh:mm a");
									return (
										<ListItem
											key={`item${index}`}
											style={{ alignItems: "flex-end" }}
										>
											<Table striped bordered hover>
												<thead>
													<tr>
														<h6>
															<b>Order ID: </b>
															{bookingId}
														</h6>

														<h6>
															<b>Status: {booking.status} </b>
															{}
														</h6>
													</tr>
													<tr>
														<th className="table-header">Event Type</th>
														<th className="table-header">Date</th>
														<th className="table-header">Start time</th>
														<th className="table-header">End Time</th>
														<th className="table-header">Description</th>
														<th className="table-header">Price</th>
													</tr>
												</thead>
												<tbody>
													<tr key={`cart${index}`}>
														<td>{eventType}</td>
														<td>{date}</td>
														<td>{startTime}</td>
														<td>{endTime}</td>
														<td>{booking.event.description}</td>
														<td>{booking.event.price}</td>
													</tr>
												</tbody>
											</Table>
											<div className="">
												{/* <ConfirmItemIcon
                    //value={props.value}
                    id={item.id}
                  /> */}
												{/* <Button
                    disabled={booking.status === "completed"}
                    // onClick={(e) =>
                    //   pay(
                    //     e,
                    //     bookingId,
                    //     consultantId,
                    //     consultantName,
                    //     eventType,
                    //     booking.event.start
                    //   )
                    // }
                  >
                    {isLoading
                      ? "loading"
                      : booking.status === "completed"
                      ? "payment made"
                      : "pay"}
                  </Button> */}
												{booking.status === "completed" ? (
													"PAID"
												) : (
													<PayIcon
														payType="consultant"
														//value={props.value}
														// refID={item.refID}
														consultantPaymentInfo={[
															bookingId,
															consultantId,
															consultantName,
															eventType,
															booking.event.start,
														]}
														id={bookingId}
														uid={props.auth.uid}
													/>
												)}

												{/* {item.status == "CONFIRMED" ? (
                      <PayIcon
                        //value={props.value}
                        refID={item.refID}
                        id={item.id}
                        uid={item.uid}
                      />
                    ) : (
                      ""
                    )} */}
											</div>
										</ListItem>
									);
								})}
							</List>
						</>
					) : (
						<div className="empty basic-title-left">
							<p>You don't have any booking Notifications </p>
						</div>
					)}
				</div>
			) : (
				""
			)}

			{/* Macinery/supply  Notification*/}
			{farmOnlyNotif ? (
				<div>
					<hr />
					<h2 style={{ fontSize: "14px", fontWeight: "600", color: "#0c0847" }}>
						Machinery/Supply Notifications
					</h2>

					<>
						{otherUsersSupplyOrderList.length ? (
							<>
								<List>
									{otherUsersSupplyOrderList.map((item, index) => (
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
														<th className="table-header">Name</th>
														<th className="table-header">Price</th>
													</tr>
												</thead>
												<tbody>
													{/* {item.order.map((order) => (
														  <tr key={`order${index}`}>
														  <td>{order.meal}</td>
														  <td>{order.price}</td>
													  </tr>
													  ))} */}
													<td>{item.productName}</td>
													<td>
														{item.productCurrency}
														{item.productPrice}
													</td>
												</tbody>
												<div className="">
													{/* <ConfirmItemIconRes
										  //value={props.value}
										  id={item.id}
										  item={item}
										/> */}
												</div>
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
				</div>
			) : (
				""
			)}
			{/* Macinery/supply only  Notification*/}
			{machinerysupplierOnlyNotif ? (
				<div>
					<hr />
					<h2 style={{ fontSize: "14px", fontWeight: "600", color: "#0c0847" }}>
						Machinery/Supply Notifications
					</h2>

					<>
						{suppliersOrderlist.length ? (
							<>
								<List>
									{suppliersOrderlist.map((item, index) => (
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
														<th className="table-header">Name</th>
														<th className="table-header">Price</th>
													</tr>
												</thead>
												<tbody>
													{/* {item.order.map((order) => (
														  <tr key={`order${index}`}>
														  <td>{order.meal}</td>
														  <td>{order.price}</td>
													  </tr>
													  ))} */}
													<td>{item.productName}</td>
													<td>
														{item.productCurrency}
														{item.productPrice}
													</td>
												</tbody>
												<div className="">
													{/* <ConfirmItemIconRes
										  //value={props.value}
										  id={item.id}
										  item={item}
										/> */}
												</div>
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
				</div>
			) : (
				""
			)}
			{/* Restaurant only Notification  */}
			{restaurantOnlyNotif ? (
				<div>
					<hr />
					<h2 style={{ fontSize: "14px", fontWeight: "600", color: "#0c0847" }}>
						Restaurant Order Notifications
					</h2>
					{/* {props.bookingsInfo.length ? (
						<>
							<List>
								{props.bookingsInfo.map(({ bookingId, booking }, index) => {
									let eventType = booking.event.eventType;
									let consultantId = booking.consultant.consultantId;
									let consultantName = booking.consultant.consultantName;

									let date = format(
										parseISO(booking.event.start),
										"yyyy-MM-dd"
									);
									let startTime = format(
										parseISO(booking.event.start),
										"hh:mm a"
									);
									let endTime = format(parseISO(booking.event.end), "hh:mm a");
									return (
										<ListItem
											key={`item${index}`}
											style={{ alignItems: "flex-end" }}
										>
											<Table striped bordered hover>
												<thead>
													<tr>
														<h6>
															<b>Order ID: </b>
															{bookingId}
														</h6>

														<h6>
															<b>Status: {booking.status} </b>
															{}
														</h6>
													</tr>
													<tr>
														<th className="table-header">Event Type</th>
														<th className="table-header">Date</th>
														<th className="table-header">Start time</th>
														<th className="table-header">End Time</th>
														<th className="table-header">Description</th>
														<th className="table-header">Price</th>
													</tr>
												</thead>
												<tbody>
													<tr key={`cart${index}`}>
														<td>{eventType}</td>
														<td>{date}</td>
														<td>{startTime}</td>
														<td>{endTime}</td>
														<td>{booking.event.description}</td>
														<td>{booking.event.price}</td>
													</tr>
												</tbody>
											</Table>
											<div className="">
												{booking.status === "completed" ? (
													"PAID"
												) : (
													<PayIcon
														payType="consultant"
														consultantPaymentInfo={[
															bookingId,
															consultantId,
															consultantName,
															eventType,
															booking.event.start,
														]}
														id={bookingId}
														uid={props.auth.uid}
													/>
												)}
											</div>
										</ListItem>
									);
								})}
							</List>
						</>
					) : (
						<div className="empty basic-title-left">
							<p>You don't have any booking Notifications</p>
						</div>
					)} */}
					<>
						{restaurantsOrderList.length ? (
							<>
								<List>
									{restaurantsOrderList.map((item, index) => (
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
														<th className="table-header">Meal</th>
														<th className="table-header">Price</th>
														<th className="table-header">Name</th>
														<th className="table-header">Seat</th>
													</tr>
												</thead>
												<tbody>
													{/* {item.order.map((order) => (
										<tr key={`order${index}`}>
										<td>{order.meal}</td>
										<td>{order.price}</td>
									</tr>
									))} */}
													<td>{item.order.meal}</td>
													<td>{item.order.mealPrice}</td>
													<td>{item.fullname}</td>
													<td>{item.seat}</td>
												</tbody>
												<div className="">
													<ConfirmItemIconRes
														//value={props.value}
														id={item.id}
														item={item}
													/>
												</div>
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
				</div>
			) : (
				""
			)}
			{/* other users Restaurant Notification  */}

			{otherUsersRestaurantNotification ? (
				<div>
					<hr />
					<h2 style={{ fontSize: "14px", fontWeight: "600", color: "#0c0847" }}>
						Restaurant Notifications
					</h2>
					{/* {props.bookingsInfo.length ? (
						<>
							<List>
								{props.bookingsInfo.map(({ bookingId, booking }, index) => {
									let eventType = booking.event.eventType;
									let consultantId = booking.consultant.consultantId;
									let consultantName = booking.consultant.consultantName;

									let date = format(
										parseISO(booking.event.start),
										"yyyy-MM-dd"
									);
									let startTime = format(
										parseISO(booking.event.start),
										"hh:mm a"
									);
									let endTime = format(parseISO(booking.event.end), "hh:mm a");
									return (
										<ListItem
											key={`item${index}`}
											style={{ alignItems: "flex-end" }}
										>
											<Table striped bordered hover>
												<thead>
													<tr>
														<h6>
															<b>Order ID: </b>
															{bookingId}
														</h6>

														<h6>
															<b>Status: {booking.status} </b>
															{}
														</h6>
													</tr>
													<tr>
														<th className="table-header">Event Type</th>
														<th className="table-header">Date</th>
														<th className="table-header">Start time</th>
														<th className="table-header">End Time</th>
														<th className="table-header">Description</th>
														<th className="table-header">Price</th>
													</tr>
												</thead>
												<tbody>
													<tr key={`cart${index}`}>
														<td>{eventType}</td>
														<td>{date}</td>
														<td>{startTime}</td>
														<td>{endTime}</td>
														<td>{booking.event.description}</td>
														<td>{booking.event.price}</td>
													</tr>
												</tbody>
											</Table>
											<div className="">
												{booking.status === "completed" ? (
													"PAID"
												) : (
													<PayIcon
														payType="consultant"
														consultantPaymentInfo={[
															bookingId,
															consultantId,
															consultantName,
															eventType,
															booking.event.start,
														]}
														id={bookingId}
														uid={props.auth.uid}
													/>
												)}
											</div>
										</ListItem>
									);
								})}
							</List>
						</>
					) : (
						<div className="empty basic-title-left">
							<p>You don't have any booking Notifications</p>
						</div>
					)} */}
					<>
						{otherUsersRestaurantOrderList.length ? (
							<>
								<List>
									{otherUsersRestaurantOrderList.map((item, index) => (
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
														<th className="table-header">Meal</th>
														<th className="table-header">Price</th>
														<th className="table-header">Name</th>
														<th className="table-header">Seat</th>
													</tr>
												</thead>
												<tbody>
													{/* {item.order.map((order) => (
										<tr key={`order${index}`}>
										<td>{order.meal}</td>
										<td>{order.price}</td>
									</tr>
									))} */}
													<td>{item.order.meal}</td>
													<td>{item.order.mealPrice}</td>
													<td>{item.fullname}</td>
													<td>{item.seat}</td>
												</tbody>
												<div className="">
													<ConfirmItemIconRes
														//value={props.value}
														id={item.id}
														item={item}
													/>
												</div>
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
				</div>
			) : (
				""
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		infoPurchase: state.mealPlan.purchaseInfo,
		bookingsInfo: state.bookingPurchaseState.bookingPurchase,
		auth: state.firebase.auth,
		loadingPay: state.bookingPurchaseState.purchaseStatusChangeLoading,
		profile: state.firebase.profile,
		infoOrder: state.mealPlan.OrderInfo,
		infoForRes: state.restaurant.orderRes,
		infoForSupplier: state.supplier.orderSupply,
		infoFarm: state.farmData.purchaseInfoFarm,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPurchaseInfoForMealPlanFromFarmers: (data) =>
			dispatch(getPurchaseInfo(data)),
		getConsultingBookingNotifFromConsultants: () =>
			dispatch(getConsultingBookingsForPurchase()),
		getUsersRestaurantNotif: () => dispatch(getOrderInfo()),

		purchaseBooking: (
			bookingPurchaseId,
			consultantId,
			consultantName,
			eventType,
			date
		) =>
			dispatch(
				changePurchaseStatus(
					bookingPurchaseId,
					consultantId,
					consultantName,
					eventType,
					date
				)
			),
		//getPurchaseRequestInfoForFarmers
		//getConsultationRequestForConsultants
		//getPurchaseRequestInfoForFarmers

		getPurchaseInfoForRes: (data) => dispatch(getPurchaseInfoRes(data)),
		getPurchaseInfoForSupplier: (data) => dispatch(getPurchaseInfoSupply(data)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ViewAppNotifications);
