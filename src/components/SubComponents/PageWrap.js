import React, { useEffect } from "react";

import "./PageWrap.css";
import { connect } from "react-redux";

import { SubButtonM } from "./Button";
import Divider from "@mui/material/Divider";
import { Container } from "react-bootstrap";
import NotificationIcon from "../Pages/Account/Personal/Marketplace/MealPlanComp/Icons/NotificationIcon";
import NotificationOrderIcon from "../Pages/Account/Personal/Marketplace/MealPlanComp/Icons/NotificationOrderIcon";
import WalletIcon from "../Pages/Account/Personal/Marketplace/MealPlanComp/Icons/WalletIcon";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const PageWrapper = (props) => {
	// console.log(props.header, `this is the header`);

	// console.log(props.profile, "this is the profile that was passed");
	useEffect(() => {}, [props.profile]);

	return (
		<>
			<div
				style={{
					width: "100vw",
					height: "60px",
					padding: "0 5%",
					display: "flex",
					borderBottom: "1px solid #e0e0e0",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: "20px",
				}}
			>
				<div style={{ width: "20%" }}>
					<SubButtonM styling="green" goTo={props.goTo} text="Back" />
				</div>
				{/* <div className="basic-title basic-lg">{props.header}</div> */}

				{/* <div>
					<NotificationOrderIcon />
				</div> */}

				<div style={{ display: "flex", alignItems: "center" }}>
					{props.profile.isLoaded === false ? (
						<div>...</div>
					) : (
						<div>
							<span>{`${props.profile?.email} `}</span>
							<span
								style={{ color: "grey", fontSize: "10px", marginLeft: "5px" }}
							>{`${props.profile?.buildingFunction?.toUpperCase()}`}</span>
						</div>
					)}

					<div style={{ position: "relative", marginLeft: "20px" }}>
						<NotificationIcon />
					</div>
					<div>
						<Tooltip title="Settings">
							<IconButton href="/settings" component="a">
								{/* < /> */}
								<SettingsApplicationsIcon />
							</IconButton>
						</Tooltip>
					</div>
				</div>
			</div>

			<Container className="mobile-style">
				{/* <div className="center">
          <h2 style={{ color: "#0c0847" }}>{props.subtitle}</h2>
        </div>
        <Divider variant="middle" /> */}
				{props.children}
				{/* <Divider variant="middle" /> */}
			</Container>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

const PageWrap = connect(mapStateToProps, mapDispatchToProps)(PageWrapper);
export { PageWrap };

export const PageWrapTop = (props) => {
	return (
		<div>
			<div className="top">
				<div style={{ width: "50%", paddingLeft: "1rem" }}>
					<SubButtonM styling="green" goTo={props.goTo} text="Back" />
				</div>
				<div className="basic-title basic-lg">{props.header}</div>
			</div>
			<Divider />
			{props.children}
		</div>
	);
};

export const PageWrapMini = (props) => {
	return (
		<Container className="account-style page-wrap-mini">
			{props.children}
		</Container>
	);
};
