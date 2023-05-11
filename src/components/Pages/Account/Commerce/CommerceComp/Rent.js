import React, { useRef, useEffect, useState } from "react";

import { connect } from "react-redux";
import { useTranslation, Trans } from 'react-i18next';
import Image from "../../../../SubComponents/Image"
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import Accordion from "../SubComponents/Accordion";
import { Accordion, Card, Table, ListGroup, ListGroupItem } from 'react-bootstrap';

import Paginator from "../../../../SubComponents/Paginator";
// import { v4 as uuidv4 } from "uuid";
// import { getPurchaseDataRes } from "../../../../../../store/actions/dataActions";
// import SendItemIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/SendItemIcon";
// import EditPurchaseIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/EditPurchaseIcon";
// import FarmerListIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/FarmerListIcon";

function Rent(props) {
	const { t } = useTranslation();

	const [list, setList ] = useState([])
	const [update, setUpdate] = useState(0);

	 //trigger this when updating items
	 const forceUpdate = () => {
	   setUpdate(update + 1);
	 };

	 
	 	
	//this sends data request
	useEffect(() => {
		props.getPurchaseDataRes(props.profile.region);
		//forceUpdate()
	  }, [props.data]);


	  const purchaseList = async () => {
		//clears the items array before each update- IMPORTANT
		setList([]);
	
		//sets a new item object in the array for every document
		props.purchaseRes.forEach((doc) => {
		  // id is the docref for deletion

		  //array of object
		  var cartList = doc.cartList;

		  //array of object
		  var profile = doc.profile;

		  var date = doc.date;
		  var status = doc.status;
		  var id = doc.id;
		  var uid = doc.uid;
	
		  setList((list) => [
			...list,
			{
			  cartList: cartList,
			  profile: profile,
			  date: date,
			  status: status,
			  id: id,
			  uid: uid,
			},
		  ]);
		});
	  };

	  //this sends data request
	useEffect(() => {
		purchaseList()
	  }, [props.purchase]);

	

	return (
		<>
			<div>
				<main>
				{list.map((item, index) => (
					<Accordion key={`item${index}`}>
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<p>{item.date}</p>
								{item.profile.firstName} {item.profile.city},{item.profile.country}
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="meal-box" key={`meal-box${index}`}>
								<div className="ingredients">
									<List
									styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
									>
										<ListItem
										className="list"
										style={{ alignItems: "baseline" }}
									>
										<div>
											<Image imageUrl={item.imageURL} />
											<p>
											{item.productName}
											</p>
											<p>
											{item.productDescription}
											</p>
											<p>
											</p>
											<p>
											{item.productCurrency} {item.productPrice} 
											</p>
										</div>
									</ListItem>
									</List>
								</div>
								</div>	
							</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				))}	
				<div className="admin_paginator">
					<Paginator />
				</div>
				</main>
				{/* <div className="admin_right_section">
					<div className="admin_calendar_mock"></div>
				</div> */}
		</div>
		</>
		
	);
	// <div className="adminCont">{/* {userRequests} */}</div>
};

const mapStateToProps = (state) => {
	return {
	  purchaseRes: state.data.purchaseDataRes,
	  profile: state.firebase.profile,
	};
  };
  
  const mapDispatchToProps = (dispatch) => {
	return {
		//getPurchaseDataRes: (item) => dispatch(getPurchaseDataRes(item)),
	};
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Rent);
  

