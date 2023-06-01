import React, { useRef, useEffect, useState } from "react";

import { connect } from "react-redux";
import { useTranslation, Trans } from 'react-i18next';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { submitNotification } from "../../../../lib/Notifications";
import {Button, Modal } from "react-bootstrap";
import Stack from '@mui/material/Stack';

// import Accordion from "../SubComponents/Accordion";
import { Accordion, Card, Table, ListGroup, ListGroupItem } from 'react-bootstrap';
import Image from "../../../../SubComponents/Image"
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Paginator from "../../../../SubComponents/Paginator";
// import { v4 as uuidv4 } from "uuid";
import { getSalesData } from "../../../../../store/actions/dataActions";
import Search from "./Search";
// import SendItemIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/SendItemIcon";
// import EditPurchaseIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/EditPurchaseIcon";
// import FarmerListIcon from "../../../Personal/Marketplace/MealPlanComp/Icons/FarmerListIcon";

function Buy(props) {
	const { t } = useTranslation();

	const [list, setList ] = useState([])
	const [update, setUpdate] = useState(0);
	const [showModal, setShow] = useState(false);

	 //trigger this when updating items
	 const forceUpdate = () => {
	   setUpdate(update + 1);
	 };
	 	
	//this sends data request
	useEffect(() => {
		props.getSalesData();
		//forceUpdate()
	  }, [props.data]);


	  const salesList = async () => {
		//clears the items array before each update- IMPORTANT
		setList([]);
	
		//sets a new item object in the array for every document
		props.sales.forEach((doc) => {
		  // id is the docref for deletion


		  //array of object
		  var productName = doc.productName;
		  var createdAt = doc.createdAt;
		  var productDescription = doc.productDescription;
		  var productID = doc.productID;
		  var imageURL = doc.imageURL;
		  var productMeasure = doc.productMeasure;
		  var productQty = doc.productQty;
		  var productPrice = doc.productPrice;
		  var productCurrency = doc.productCurrency;
		  var companyID = doc.companyID;
		  var companyName = doc.companyName;
		  var city = doc.city;
		  var region = doc.region;
	
		  setList((list) => [
			...list,
			{
			  productName: productName,
			  createdAt: createdAt,
			  productDescription: productDescription,
			  productID: productID,
			  imageURL: imageURL,
			  productMeasure: productMeasure,
			  productQty: productQty,
			  productPrice: productPrice,
			  productCurrency: productCurrency,
			  companyID: companyID,
			  companyName: companyName,
			  city: city,
			  region: region,
			},
		  ]);
		});
	  };

	  //this sends data request
	useEffect(() => {
		salesList()
		console.log('items list', list)
	  }, [props.sales]);


	return (
		<>
		<p>Search by Keywords, Product Name, Price or Location</p>
			<Search profile={props.profile}/>
		</>
		
	);
	// <div className="adminCont">{/* {userRequests} */}</div>
};

const mapStateToProps = (state) => {
	return {
	  sales: state.data.salesData,
	  profile: state.firebase.profile,
	};
  };
  
  const mapDispatchToProps = (dispatch) => {
	return {
	  getSalesData: (item) => dispatch(getSalesData(item)),
	};
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Buy);
  

