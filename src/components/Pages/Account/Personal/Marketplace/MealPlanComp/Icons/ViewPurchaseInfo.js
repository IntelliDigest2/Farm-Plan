import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { getPurchaseInfo } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";
import ConfirmItemIcon from "../Icons/ConfirmItemIcon";
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

import { getCurrencySymbol } from '../../../../../../../config/CurrerncyUtils'; 
import { fetchExchangeRates } from '../../../../../../../config/CurrerncyUtils';


function ViewPurchaseInfo(props) {
	const { t } = useTranslation();
	const [list, setList] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [paymentType, setPaymentType] = useState("");
	const [conversion, setConversion] = useState("")

	const userCountryCode = props.profile.country;
	const userCurrency = getCurrencySymbol(userCountryCode)

	// Function to convert price to user's currency
	const handleConversion = async (baseCurrency, userCurrency, price) => {
		
		await fetch(`https://v6.exchangerate-api.com/v6/e286ca59c055230262d2aa60/pair/${baseCurrency}/${userCurrency}/${price}`, {
	
		  method: 'GET', 
		  headers: {
			  'Content-type': 'application/json; charset=UTF-8',
		  },
		})
		.then((response) => response.json())
		.then((data) => {
			console.log("rate conv", data.conversion_result)
		  setConversion(data.conversion_result)
		})
		.catch((err) => {
		  console.log(err.message);
		})
	  
	 };
	
	

	//this sends data request
	useEffect(() => {
		props.getPurchaseInfo();
		props.getBookingsForPurchase();
		//console.log("getting inv ==>", props.data)
	}, []);

	const getPurchaseInfoList = async () => {
		//clears the items array before each update- IMPORTANT
		setList([]);

		//sets a new item object in the array for every document
		props.info.forEach((doc) => {
			// id is the docref for deletion
			var refID = doc.id;
			var item = doc.item;
			var currency = doc.currency;
			var farmerID = doc.farmerID;
			var farmerRef = doc.farmerRef;
			var receiversID = doc.receiversID;
			var status = doc.status;
			var deliveryDueDate = doc.deliveryDueDate;
			var delivery_code = doc.delivery_code;

			setList((list) => [
				...list,
				{
					item: item,
					refID: refID,
					currency: currency,
					farmerID: farmerID,
					farmerRef: farmerRef,
					receiversID: receiversID,
					status: status,
					deliveryDueDate: deliveryDueDate,
					delivery_code: delivery_code,
				},
			]);
		});
	};

	useEffect(() => {
		if (!props.loadingPay) {
			setisLoading(false);
		}
	}, [props.loadingPay]);

	//this sends data request
	useEffect(() => {
		getPurchaseInfoList();
		//console.log("getting inv ==>", props.data)
	}, [props.info]);

	useEffect(() => {}, [props.bookingsInfo]);

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

	useEffect(() => {
		async function convertPrices() {
		  // Iterate through cart items and convert prices
		  const convertedPrices = await Promise.all(
			list.map(async (cart) => {
			  const convertedItemPrices = await Promise.all(
				cart.item.map(async (cartItem) => {
				  if (cartItem.price) {
					try {
					  const response = await fetch(
						`https://v6.exchangerate-api.com/v6/e286ca59c055230262d2aa60/pair/${cart.currency}/${userCurrency}/${cartItem.price}`,
						{
						  method: 'GET',
						  headers: {
							'Content-type': 'application/json; charset=UTF-8',
						  },
						}
					  );
					  const data = await response.json();
					  console.log("rate conv", data.conversion_result);
					  return data.conversion_result;
					} catch (err) {
					  console.error(err);
					  return 0; // Handle cases where price conversion fails
					}
				  }
				  return 0; // Handle cases where price is not available
				})
			  );
	  
			  console.log("convertedItemPrices", convertedItemPrices);
	  
			  return {
				...cart,
				item: cart.item.map((cartItems, index) => ({
				  ...cartItems,
				  convertedPrice: convertedItemPrices[index],
				})),
			  };
			})
		  );
	  
		  setConversion(convertedPrices);
		  setisLoading(false); // Once all conversions are done
		}
	  
		convertPrices();
	  }, [list, userCurrency]);
	  
	

	return (
		<>
			{conversion.length ? (
				<>
					<List>
            {conversion.map((cart, index) => (
              <ListItem key={`item${index}`}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <h6>
                        <b>Order ID: </b>
                        {cart.refID}
                      </h6>
                      <h6>
						<span>
							<b>Status: {cart.status} </b>
							<b>Order Code: </b>{cart.delivery_code}
						</span>
                        
                      </h6>
                    </tr>
                    <tr>
                      <th className="table-header">Product</th>
                      <th className="table-header">Quantity</th>
                      <th className="table-header">Measure</th>
                      <th className="table-header">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.item.map((cartItems) => (
                      <tr key={`cart${index}`}>
                        <td>{cartItems.data}</td>
                        <td>{cartItems.quantity}</td>
                        <td>{cartItems.measure}</td>
                        <td>
                          {userCurrency} {isLoading ? "Loading..." : cartItems.convertedPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
				  <div className="">
						{cart.status == "CONFIRMED" ? (
							<>
							<PayIconWallet
								paytype="supplier"
								uid={cart.receiversID}
								order={cart}
								// convertedPrice={convertedPrice}
								currency={userCurrency}
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
			<hr></hr>
			{props.bookingsInfo.length ? (
				<>
					<h2>Consultant Booking Purchase</h2>
					<List>
						{props.bookingsInfo.map(({ bookingId, booking }, index) => {
							let eventType = booking.event.eventType;
							let consultantId = booking.consultant.consultantId;
							let consultantName = booking.consultant.consultantName;

							let date = format(parseISO(booking.event.start), "yyyy-MM-dd");
							let startTime = format(parseISO(booking.event.start), "hh:mm a");
							let endTime = format(parseISO(booking.event.end), "hh:mm a");
							return (
								<ListItem
									key={`item${index}`}
									// className="list"
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
													<b>Status:{booking.status} </b>
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
											// 	pay(
											// 		e,
											// 		bookingId,
											// 		consultantId,
											// 		consultantName,
											// 		eventType,
											// 		booking.event.start
											// 	)
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
					<p>You dont have any booking Notifications :( </p>
				</div>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		info: state.mealPlan.purchaseInfo,
		bookingsInfo: state.bookingPurchaseState.bookingPurchase,
		auth: state.firebase.auth,
		loadingPay: state.bookingPurchaseState.purchaseStatusChangeLoading,
		profile: state.firebase.profile,

	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPurchaseInfo: (data) => dispatch(getPurchaseInfo(data)),
		getBookingsForPurchase: () => dispatch(getConsultingBookingsForPurchase()),
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPurchaseInfo);
