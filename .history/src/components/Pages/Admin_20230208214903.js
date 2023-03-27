import React from "react";
import Accordion from "../SubComponents/Accordion";
import Paginator from "../SubComponents/Paginator";

const Admin = () => {
	// let userRequests = userRequests.map(userRequestInfo=>{
	// 	return <Accordion userRequestInfo={userRequestInfo}/>
	// })

	return (
		<div>
			<header className="admin_header"></header>
			<div className="adminCont">
				<main className="admin_left_section">
					<Accordion />
					<Accordion />
					<Accordion />
					<Accordion />
					<Accordion />
					<Accordion />
					<Accordion />
				</main>
				<section className="admin_right_section"></section>
			</div>

			{/* <div>
				<Paginator />
			</div> */}
		</div>
	);
	// <div className="adminCont">{/* {userRequests} */}</div>
};

export default Admin;
