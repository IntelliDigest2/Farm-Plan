import React from "react";

import "./PageWrapPayment.css";

import { SubButtonM } from "./Button";
import Divider from "@mui/material/Divider";
import { Container } from "react-bootstrap";

export const PageWrapPayment = (props) => {
	return (
		<>
			<div>
				<div className="top">
					<div style={{ width: "50%", paddingLeft: "1rem" }}>
						{props.goTo ? (
							<SubButtonM styling="green" goTo={props.goTo} text="Back" />
						) : (
							""
						)}
					</div>
					<div className="basic-title basic-lg">{props.header}</div>
				</div>
				<Divider />
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

export const PageWrapTop = (props) => {
	console.log(props.goTo, `this will check the props.got`);
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
