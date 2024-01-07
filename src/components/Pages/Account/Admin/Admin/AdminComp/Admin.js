import React, { useRef, useEffect, useState } from "react";

import { connect } from "react-redux";
import { useTranslation, Trans } from "react-i18next";

// import Accordion from "../SubComponents/Accordion";
import {
	Accordion,
	Card,
	Table,
	ListGroup,
	ListGroupItem,
} from "react-bootstrap";

import Paginator from "../../../../../SubComponents/Paginator";
// import { v4 as uuidv4 } from "uuid";
import { getPurchaseData } from "../../../../../../store/actions/dataActions";
import SendItemIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/SendItemIcon";
import EditPurchaseIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/EditPurchaseIcon";
import { PageWrapAdmin } from "../../../../../SubComponents/PageWrapAdmin";
import FarmerListIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/FarmerListIcon";

function Admin(props) {
	const { t } = useTranslation();

	const [list, setList] = useState([]);
	const [update, setUpdate] = useState(0);
	const [filterValue, setFilterValue] = useState("all");

	//trigger this when updating items
	const forceUpdate = () => {
		setUpdate(update + 1);
	};

	//this sends data request
	useEffect(() => {
		props.getPurchaseData(props.profile.region);
		//forceUpdate()
	}, [props.data]);

	const purchaseList = async () => {
		//clears the items array before each update- IMPORTANT
		setList([]);

		//sets a new item object in the array for every document
		props.purchase.forEach((doc) => {
			// id is the docref for deletion

			//array of object
			var cartList = doc.cartList;

			//array of object
			var profile = doc.profile;
			const buyers_account_type = doc.profile.buildingFunction;

			var date = doc.date;
			var status = doc.status;
			var id = doc.id;
			var uid = doc.uid;
			var address = doc.address;
			var delivery_option = doc.delivery_option;
			var phone_number = doc.phone_number;
			var delivery_code = doc.delivery_code;
			var userChoice = doc.userChoice;

			if (address === null) {
				address = props.profile.address !== null ? props.profile.address : null;
			}

			setList((list) => [
				...list,
				{
					cartList: cartList,
					profile: profile,
					date: date,
					status: status,
					id: id,
					uid: uid,
					address: address,
					delivery_option: delivery_option,
					delivery_code: delivery_code,
					phone_number: phone_number,
					buyers_account_type: buyers_account_type,
				},
			]);
		});
	};

	//this sends data request
	useEffect(() => {
		purchaseList();
	}, [props.purchase]);

	return (
		<>
			<div>
				<main>

				<select
					value={filterValue}
					onChange={(e) => setFilterValue(e.target.value)}
				>
					<option value="all">All</option>
					<option value="pickup">Pickup</option>
					<option value="delivery">Delivery</option>
				</select>

				{list.length === 0 ? (
            <p>There is no purchase request from your location.</p>
          ) : (
            list.map((item, index) => {
              // Filter the items based on the selected filter value
              if (
                filterValue === "all" ||
                (filterValue === "pickup" && item.delivery_option === "pickup") ||
                (filterValue === "delivery" && item.delivery_option === "delivery")
              ) {
                return (
					<Accordion key={`item${index}`}>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							<p>{item.date}</p>
							<p>{item.delivery_option}</p>
							<span>{item.phone_number}</span>
							<p>
								{item.profile.firstName} {item.profile.city},{" "}
								{item.profile.country}
							</p>
							<p>
								{item.delivery_code &&
									`Order code: ${item.delivery_code}`}
							</p>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<Table striped bordered hover>
									<thead>
										<tr>
											<th>{t("description.product")}</th>
											<th>{t("description.quantity")}</th>
											<th>{t("description.measure")}</th>
											<th>{t("description.price")}</th>
											<th>{t("description.supplier")}</th>
										</tr>
									</thead>
									<tbody>
										{item.cartList.map((cart) => (
											<tr key={`cart${index}`}>
												<td>{cart.data}</td>
												<td>{cart.quantity}</td>
												<td>{cart.measure}</td>
												{cart.price ? <td>{cart.price}</td> : <td>0</td>}
												{cart.supplier ? (
													<td>{cart.supplier}</td>
												) : (
													<td></td>
												)}
											</tr>
										))}
									</tbody>
								</Table>

								<div>
									<p>
										<SendItemIcon
											refID={item.id}
											uid={item.uid}
											cart={item.cartList}
										/>
										<EditPurchaseIcon
											id={item.id}
											uid={item.uid}
											cart={item.cartList}
										/>
										<FarmerListIcon
											id={item.id}
											uid={item.uid}
											receiversID={item.profile.uid}
											buyers_account_type={item.profile.buildingFunction}
											cart={item.cartList}
											address={item.address}
											delivery_code={item.delivery_code}
											city={item.profile.city}
											admin_id={props.profile.uid}
										/>
									</p>
									<ListGroup className="list-group-flush">
										<ListGroupItem>
											{t("description.status")}: {item.status}
										</ListGroupItem>
										<ListGroupItem>
											Vendor Choice: {item.userChoice}
										</ListGroupItem>
										<ListGroupItem>
											{t("description.ref_num")}: {item.id}
										</ListGroupItem>
									</ListGroup>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
                );
              }
              return null; // If the item doesn't match the filter, return null to hide it
            })
          )}

					{/* {list.length === 0 ? (
						<p>There is no purchase request from your location.</p>
					) : (
						list.map((item, index) => (
							<Accordion key={`item${index}`}>
								<Card>
									<Accordion.Toggle as={Card.Header} eventKey="0">
										<p>{item.date}</p>
										<p>{item.delivery_option}</p>
										<span>{item.phone_number}</span>
										<p>
											{item.profile.firstName} {item.profile.city},{" "}
											{item.profile.country}
										</p>
										<p>
											{item.delivery_code &&
												`Order code: ${item.delivery_code}`}
										</p>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<Table striped bordered hover>
												<thead>
													<tr>
														<th>{t("description.product")}</th>
														<th>{t("description.quantity")}</th>
														<th>{t("description.measure")}</th>
														<th>{t("description.price")}</th>
														<th>{t("description.supplier")}</th>
													</tr>
												</thead>
												<tbody>
													{item.cartList.map((cart) => (
														<tr key={`cart${index}`}>
															<td>{cart.data}</td>
															<td>{cart.quantity}</td>
															<td>{cart.measure}</td>
															{cart.price ? <td>{cart.price}</td> : <td>0</td>}
															{cart.supplier ? (
																<td>{cart.supplier}</td>
															) : (
																<td></td>
															)}
														</tr>
													))}
												</tbody>
											</Table>

											<div>
												<p>
													<SendItemIcon
														refID={item.id}
														uid={item.uid}
														cart={item.cartList}
														buyers_account_type={item.buyers_account_type}
													/>
													<EditPurchaseIcon
														id={item.id}
														uid={item.uid}
														cart={item.cartList}
													/>
													<FarmerListIcon
														id={item.id}
														uid={item.uid}
														receiversID={item.profile.uid}
														cart={item.cartList}
														address={item.address}
														delivery_code={item.delivery_code}
														city={item.profile.city}
														admin_id={item.profile.uid}
													/>
												</p>
												<ListGroup className="list-group-flush">
													<ListGroupItem>
														{t("description.status")}: {item.status}
													</ListGroupItem>
													<ListGroupItem>
														{t("description.ref_num")}: {item.id}
													</ListGroupItem>
												</ListGroup>
											</div>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
						))
					)} */}
					{/* <div className="admin_paginator">
					<Paginator />
				</div> */}
				</main>
			</div>
		</>
	);
	// <div className="adminCont">{/* {userRequests} */}</div>
}

const mapStateToProps = (state) => {
	return {
		purchase: state.data.purchaseData,
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getPurchaseData: (item) => dispatch(getPurchaseData(item)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
