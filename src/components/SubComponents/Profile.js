import React from "react";
import "../Pages/Account/UserAccount.css";

import { Container, Row, Col } from "react-bootstrap";

import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import { Heading } from "./Heading";
import Avatar from "./Avatar"; // Assuming you have a custom Avatar component
import { AppNotifications } from "./../Pages/Account/Personal/Marketplace/MealPlanComp/Icons/appNotifications";
import NotificationIcon from "./../Pages/Account/Personal/Marketplace/MealPlanComp/Icons/NotificationIcon";

export function Profile(props) {
	// if (props.profile.buildingFunction !== "Restaurants") {

	let content = props.profile.isLoaded ? (
		<>
			<div style={{ display: "flex", alignItems: "center" }}>
				<Avatar initials={props.profile.initials} />
				<span>{props.profile.firstName + " " + props.profile.lastName}</span>
			</div>
			<div>
				<p>{props.profile.email}</p>
			</div>
			<div>
				<p style={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
					{props.profile.buildingFunction} Account
				</p>
			</div>
		</>
	) : (
		<div
		// style={{
		// 	margin: "auto",
		// 	position: "absolute",
		// 	top: "0",
		// 	bottom: "0",
		// 	left: "0",
		// 	right: "0",
		// }}
		>
			...
		</div>
	);
	return (
		// <div className=" ">
		<div className="web-center">
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					textAlign: "center",
					alignItems: "center",
				}}
			>
				<div
				// style={{
				// 	width: "180px",
				// 	height: "124px",
				// 	position: "relative",
				// }}
				>
					{content}
				</div>

				<div style={{ display: "flex" }}>
					<div>
						<NotificationIcon />
					</div>
					<div>
						<Tooltip title="Settings">
							<IconButton href="/settings" component="a">
								<SettingsApplicationsIcon />
							</IconButton>
						</Tooltip>
					</div>
				</div>
			</div>
		</div>
		/* </div> */
	);
	// }
	//  else {
	// 	console.log(props);
	// 	return (
	// 		<Container fluid className="profile">
	// 			<Heading
	// 				priority="4"
	// 				text={
	// 					props.profile.firstName +
	// 					" " +
	// 					props.profile.lastName +
	// 					", " +
	// 					props.profile.restaurantName
	// 				}
	// 			/>
	// 			<Heading priority="5" text={props.profile.email} />
	// 			<p>{props.profile.buildingFunction} Account</p>
	// 			<Tooltip title="Settings">
	// 				<IconButton href="/settings" component="a" style={{ float: "right" }}>
	// 					<SettingsApplicationsIcon />
	// 				</IconButton>
	// 			</Tooltip>
	// 			{/* </Col> */}
	// 			{/* </Row> */}
	// 		</Container>
	// 	);
	// }
}
