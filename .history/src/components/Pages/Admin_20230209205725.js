import React, { useRef, useEffect } from "react";
import Accordion from "../SubComponents/Accordion";
import Paginator from "../SubComponents/Paginator";
import { v4 as uuidv4 } from "uuid";

const Admin = () => {
	// let userRequests = userRequests.map(userRequestInfo=>{
	// 	return <Accordion userRequestInfo={userRequestInfo}/>
	// })
	const accordionRef = useRef([]);

	// useEffect(() => {
	// 	console.log(accordionRef.current);
	// }, [accordionRef]);

	const entries = Array.from(Array(15).keys());

	let accordions = entries.map((product, i) => {
		return (
			<Accordion
				// useRef={(el) => (accordionRef.current[i] = el)}
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
