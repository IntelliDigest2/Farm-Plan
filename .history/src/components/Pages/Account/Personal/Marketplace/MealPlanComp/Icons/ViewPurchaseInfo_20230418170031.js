import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { getPurchaseInfo } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";
import ConfirmItemIcon from "../Icons/ConfirmItemIcon";
import {
	getConsultingBookingsForPurchase,
	editBookingPurchaseStatus,
} from "../../../../../../../store/actions/marketplaceActions/consultingBookingData";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PayIcon from "./PayIcon";
import { format, parseISO } from "date-fns";

function ViewPurchaseInfo(props) {
	const [list, setList] = useState([]);

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

	props.bookingsInfo.map((booking) => {
		return;
	});

	useEffect(() => {}, []);

	//this sends data request
	useEffect(() => {
		getPurchaseInfoList();
		//console.log("getting inv ==>", props.data)
	}, [props.info]);

	function pay() {
		editBookingPurchaseStatus(bookingId, eventType, userId, consultantId);
	}

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
												<b>Order ID: </b>
												{item.refID}
											</h6>
											<h6>
												<b>Status: </b>
												{item.status}
											</h6>
										</tr>
										<tr>
											<th className="table-header">Product</th>
											<th className="table-header">Quantity</th>
											<th className="table-header">Measure</th>
											<th className="table-header">Price</th>
											<th className="table-header">Supplier</th>
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
					<p>You dont have any Notifications :( </p>
				</div>
			)}
			<hr></hr>
			{list.length ? (
				<>
					<List>
						{props.bookingsInfo.map(({ bookingId, booking }, index) => {
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
											{booking.map((event) => {
												let date = format(parseISO(event.start), "yyyy-mm-dd");
												let startTime = format(
													parseISO(event.start),
													"hh:mm a"
												);
												let endTime = format(parseISO(event.end), "hh:mm a");

												<tr key={`cart${index}`}>
													<td>{event.eventType}</td>
													<td>{date}</td>
													<td>{startTime}</td>
													<td>{startTime}</td>
													<td>{event.description}</td>
													<td>{event.price}</td>

													<td>{event.price}</td>
												</tr>;
											})}
										</tbody>
										<div className="">
											{/* <ConfirmItemIcon
												//value={props.value}
												
												id={item.id}
											/> */}
											<button onClick={pay}>confirm item</button>
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
									</Table>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPurchaseInfo: (data) => dispatch(getPurchaseInfo(data)),
		getBookingsForPurchase: () => dispatch(getConsultingBookingsForPurchase()),
		editBookingPurchaseStatus: (
			bookingPurchaseId,
			eventType,
			userId,
			consultantId
		) =>
			dispatch(
				editBookingPurchaseStatus(
					bookingPurchaseId,
					eventType,
					userId,
					consultantId
				)
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPurchaseInfo);
