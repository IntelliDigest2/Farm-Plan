import React, { useRef, useEffect, useState } from "react";

import { connect } from "react-redux";

// import Accordion from "../SubComponents/Accordion";
import { Accordion, Card, Table, ListGroup, ListGroupItem } from 'react-bootstrap';

import Paginator from "../SubComponents/Paginator";
// import { v4 as uuidv4 } from "uuid";
import { getPurchaseData } from "../../store/actions/dataActions";
import SendItemIcon from "./Account/Personal/Marketplace/MealPlanComp/Icons/SendItemIcon";
import EditPurchaseIcon from "./Account/Personal/Marketplace/MealPlanComp/Icons/EditPurchaseIcon";


function AdminS(props) {

	const [list, setList ] = useState([])
	const [update, setUpdate] = useState(0);

	 //trigger this when updating items
	 const forceUpdate = () => {
	   setUpdate(update + 1);
	 };
	
	//this sends data request
	useEffect(() => {
		props.getPurchaseData();
		//forceUpdate()
	  }, [props.data]);


	  const purchaseList = async () => {
		//clears the items array before each update- IMPORTANT
		setList([]);
	
		//sets a new item object in the array for every document
		props.purchase.forEach((doc) => {
		  // id is the docref for deletion
		  var cartList = doc.cartList;
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
		console.log("xxxxxxx>>>>>>>>>", list)
	  }, [props.purchase]);

	// let userRequests = userRequests.map(userRequestInfo=>{
	// 	return <Accordion userRequestInfo={userRequestInfo}/>
	// })
	// const accordionRef = useRef([]);

	// const productsDummy = [
	// 	{
	// 		name: "Rice",
	// 		price: 20,
	// 		quantity: 8,
	// 		supplier: "dale farms",
	// 		unit: "kg",
	// 	},
	// 	{
	// 		name: "Beans",
	// 		price: 15,
	// 		quantity: 2,
	// 		supplier: "sam farms",
	// 		unit: "ltr",
	// 	},
	// 	{
	// 		name: "garri",
	// 		price: 10,
	// 		quantity: 8,
	// 		supplier: "steven farms",
	// 		unit: "kg",
	// 	},
	// 	{
	// 		name: "yam",
	// 		price: 8,
	// 		quantity: 5,
	// 		supplier: "dale farms",
	// 		unit: "ltr",
	// 	},
	// ];

	// const requestedProducts = Array.from(Array(10).fill(productsDummy));

	// console.log(requestedProducts);

	// let requestDummy = {
	// 	userName: "Jamed Deen",
	// 	location: "Edinburgh",
	// 	products: productsDummy,
	// 	date: "feb 15 2022",

	// 	status: "progress",
	// };

	//const accordionInfos = Array.from(Array(10).fill(requestDummy));

	// const requestedProducts = Array.from(Array(10).keys());

	// useEffect(() => {
	// 	console.log(accordionRef.current);
	// }, [accordionRef]);

	// const entries = Array.from(Array(15).keys());

	// let accordions = accordionInfos.map((accordionInfo, i) => {
	// 	return (
	// 		<Accordion
	// 			userName={accordionInfo.userName}
	// 			location={accordionInfo.location}
	// 			status={accordionInfo.status}
	// 			products={accordionInfo.products}
	// 			date={accordionInfo.date}
	// 			key={`accordion-${i}`}
	// 		/>
	// 	);
	// });

	return (
		<>
			<div>
			<header className="admin_header"></header>
			<div className="adminCont">
				<main className="admin_left_section">
				{list.map((item, index) => (
					<Accordion key={`item${index}`}>
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<p>{item.date}</p>
								{item.profile.firstName} {item.profile.city},{item.profile.country}
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
							<Card.Body>
							<Table striped bordered hover>
								
								<thead>
									<tr>
										<th>Product</th>
										<th>Quantity</th>
										<th>Measure</th>
										<th>Price</th>
										<th>Supplier</th>
									</tr>
								</thead>
								<tbody>
									{item.cartList.map((cart) => (
										<tr key={`cart${index}`}>
										<td>{cart.data}</td>
										<td>{cart.quantity}</td>
										<td>{cart.measure}</td>
										{ cart.price ? (<td>{cart.price}</td>):(<td>0</td>)}
										{ cart.supplier ? (<td>{cart.supplier}</td>):(<td></td>)}
									</tr>
									))}
									
								</tbody>
								
								
							</Table>
							
							<div>
							<p>
								<SendItemIcon 
									id={item.id}
									uid={item.uid}
									cart={item.cartList}
								/>
								<EditPurchaseIcon 
									id={item.id}
									uid={item.uid}
									cart={item.cartList}
								/>
							</p>
							<ListGroup className="list-group-flush">
								<ListGroupItem>Status: {item.status}</ListGroupItem>
								<ListGroupItem>Link To Email</ListGroupItem>
								<ListGroupItem>Ref Number: {item.id}</ListGroupItem>
							</ListGroup>
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
				<div className="admin_right_section">
					<div className="admin_calendar_mock"></div>
				</div>
			</div>
		</div>
		</>
		
	);
	// <div className="adminCont">{/* {userRequests} */}</div>
};

const mapStateToProps = (state) => {
	return {
	  purchase: state.data.purchaseData,
	};
  };
  
  const mapDispatchToProps = (dispatch) => {
	return {
	  getPurchaseData: (item) => dispatch(getPurchaseData(item)),
	};
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminS);
  

