import React, { useRef, useEffect } from "react";
import Accordion from "../SubComponents/Accordion";
import Paginator from "../SubComponents/Paginator";
import { v4 as uuidv4 } from "uuid";

const Admin = () => {
	// let userRequests = userRequests.map(userRequestInfo=>{
	// 	return <Accordion userRequestInfo={userRequestInfo}/>
	// })
	// const accordionRef = useRef([]);

	const productsDummy = {
		name: "Rice",
		price: 20,
		quantity: 8,
	};

	const requestedProducts = Array.from(Array(10).fill(productsDummy));

	console.log(requestedProducts);

	let requestDummy = {
		userName: "Jamed Deen",
		location: "Edinburgh",
		products: requestedProducts,

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
