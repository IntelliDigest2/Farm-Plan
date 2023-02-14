import React from "react";
import Accordion from "../SubComponents/Accordion";
import Paginator from "../SubComponents/Paginator";

const Admin = () => {
	// let userRequests = userRequests.map(userRequestInfo=>{
	// 	return <Accordion userRequestInfo={userRequestInfo}/>
	// })

	return (
		<div>
			<header></header>

			<Accordion />
			<Accordion />
			<Accordion />
			<Accordion />
			<Accordion />
			<Accordion />
			<Accordion />
			<Paginator />
		</div>
	);
	// <div className="adminCont">{/* {userRequests} */}</div>
};

export default Admin;
