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
			<div className="adminCont">
				<section>
					<Accordion />
					<Accordion />
					<Accordion />
					<Accordion />
					<Accordion />
					<Accordion />
					<Accordion />
				</section>
				<section></section>
			</div>

			{/* <div>
				<Paginator />
			</div> */}
		</div>
	);
	// <div className="adminCont">{/* {userRequests} */}</div>
};

export default Admin;
