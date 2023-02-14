import React from "react";
import Accordion from "../SubComponents/Accordion";

const Admin = () => {
	// let userRequests = userRequests.map(userRequestInfo=>{
	// 	return <Accordion userRequestInfo={userRequestInfo}/>
	// })

	return (
		<div>
			<Accordion />
			<Accordion />
			<Accordion />
			<Accordion />
			<Accordion />
			<Accordion />
			<Accordion />
		</div>
	);
	// <div className="adminCont">{/* {userRequests} */}</div>
};

export default Admin;
