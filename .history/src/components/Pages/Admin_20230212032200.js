import React, { useRef, useEffect } from "react";
import Accordion from "../SubComponents/Accordion";
import Paginator from "../SubComponents/Paginator";
import { v4 as uuidv4 } from "uuid";

const Admin = () => {
	// let userRequests = userRequests.map(userRequestInfo=>{
	// 	return <Accordion userRequestInfo={userRequestInfo}/>
	// })
	// const accordionRef = useRef([]);

	const productsDummy = [
		{
			name: "Rice",
			price: 20,
			quantity: 8,
			supplier: "dale farms",
			unit: "kg",
		},
		{
			name: "Beans",
			price: 15,
			quantity: 2,
			supplier: "sam farms",
			unit: "ltr",
		},
		{
			name: "garri",
			price: 10,
			quantity: 8,
			supplier: "steven farms",
			unit: "kg",
		},
		{
			name: "yam",
			price: 8,
			quantity: 5,
			supplier: "dale farms",
			unit: "ltr",
		},
	];

	// const requestedProducts = Array.from(Array(10).fill(productsDummy));

	// console.log(requestedProducts);

	let requestDummy = {
		userName: "Jamed Deen",
		location: "Edinburgh",
		products: productsDummy,
		date: "feb 15 2022",

		status: "pending",
	};

	const accordionInfos = Array.from(Array(10).fill(requestDummy));

	// const requestedProducts = Array.from(Array(10).keys());

	// useEffect(() => {
	// 	console.log(accordionRef.current);
	// }, [accordionRef]);

	// const entries = Array.from(Array(15).keys());

	let accordions = accordionInfos.map((accordionInfo, i) => {
		return (
			<Accordion
				userName={accordionInfo.userName}
				location={accordionInfo.location}
				status={accordionInfo.status}
				products={accordionInfo.products}
				date={accordionInfo.date}
				key={`accordion-${i}`}
			/>
		);
	});

	return (
		<div>
			<header className="admin_header"></header>
			<div className="adminCont">
				<main className="admin_left_section">
					{accordions}
					<div className="admin_paginator">
						<Paginator />
					</div>
				</main>
				<div className="admin_right_section">
					<div className="admin_calendar_mock"></div>
				</div>
			</div>
		</div>
	);
	// <div className="adminCont">{/* {userRequests} */}</div>
};

export default Admin;
