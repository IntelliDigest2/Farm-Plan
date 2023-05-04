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

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PayIcon from "./PayIcon";
import { format, parseISO } from "date-fns";

function ViewPurchaseInfo(props) {
	const { t } = useTranslation();
	const [list, setList] = useState([]);
	const [isLoading, setisLoading] = useState(false);

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
			var id = doc.id;
			var cart = doc.cart;
			var refID = doc.refID;
			var uid = doc.uid;
			var status = doc.status;

			setList((list) => [
				...list,
				{
					cart: cart,
					id: id,
					refID: refID,
					uid: uid,
					status: status,
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

	console.log(props.bookingsInfo);

	const pay = (e, bookingId, consultantId, consultantName, eventType) => {
		e.preventDefault();

		props.purchaseBooking(bookingId, consultantId, consultantName, eventType);
	};

	console.log(props.auth.uid);

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
												<b>{t("description.order_id")} </b>
												{item.refID}
											</h6>
											<h6>
												<b>{t("description.order_status")} </b>
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
											<th className="table-header">{t("description.price")}</th>
											<th className="table-header">
												{t("description.supplier")}
											</th>
										</tr>
									</thead>
									<tbody>
										{item.cart.map((cart) => (
											<tr key={`cart${index}`}>
												<td>{cart.data}</td>
												<td>{cart.quantity}</td>
												<td>{cart.measure}</td>
												{cart.price ? <td>{cart.price}</td> : <td>0</td>}
												{cart.supplier ? <td>{cart.supplier}</td> : <td></td>}
											</tr>
										))}
									</tbody>
									<div className="">
										<ConfirmItemIcon
											//value={props.value}
											refID={item.refID}
											id={item.id}
										/>
										{item.status == "CONFIRMED" ? (
											<PayIcon
												//value={props.value}
												refID={item.refID}
												id={item.id}
												uid={item.uid}
											/>
										) : (
											""
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
							console.log(booking, `this is the booking information`);
							let eventType = booking.event.eventType;
							let consultantId = booking.consultant.consultanId;
							let consultantName = booking.consultant.consultantName;

							let date = format(parseISO(booking.event.start), "yyyy-mm-dd");
							let startTime = format(parseISO(booking.event.start), "hh:mm a");
							let endTime = format(parseISO(booking.event.start), "hh:mm a");

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
										<Button
											disabled={booking.status === "completed"}
											onClick={(e) =>
												pay(
													e,
													bookingId,
													consultantId,
													consultantName,
													eventType
												)
											}
										>
											{isLoading
												? "loading"
												: booking.status === "completed"
												? "payment made"
												: "pay"}
										</Button>
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
			eventType
		) =>
			dispatch(
				changePurchaseStatus(
					bookingPurchaseId,
					consultantId,
					consultantName,
					eventType
				)
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPurchaseInfo);
