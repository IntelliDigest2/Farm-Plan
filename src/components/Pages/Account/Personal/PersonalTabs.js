import React, { useState, useEffect } from "react";
import { IconButton } from "../../../SubComponents/Button";
import "../UserAccount.css";
import { Colors } from "../../../lib/Colors";

import { useTranslation, Trans } from "react-i18next";

// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";

export function Food({ setShow, setChooseModal, profile }) {
	const { t } = useTranslation();
	const [consultantService, setConsultantService] = useState("");

	console.log(profile);
	useEffect(() => {
		// if (profile.isloaded) {
		console.log(
			profile.verification === "pending",
			`this shows that the account is pending`
		);
		if (profile.buildingFunction === "Consultant") {
			setConsultantService(true);
		} else {
			setConsultantService(false);
		}
		// }
	}, [profile.buildingFunction]);

	let consultingService = consultantService ? (
		<IconButton
			title="Become a consultant"
			icon="consultant"
			label="Consultant"
			color="turquoise"
			goTo="/consultant"
		/>
	) : (
		<IconButton
			title="connect with a consultant."
			icon="consult"
			label="Consult"
			color="yellow"
			goTo="/consult"
		/>
	);

	return (
		<>
			<IconButton
				title="Plan your meals with us, search a range of delicious recipes."
				icon="notes"
				label={t("description.icon_diary")}
				color="turquoise"
				goTo="/meal-plan"
			/>

			<IconButton
				title="Generate a shopping list and buy from vendors."
				icon="notes"
				label="Shop"
				color="green"
				goTo="/search-shop"
			/>

			<IconButton
				title="Find out more about the Plan to Save campaign, and what you can do to help."
				icon="food"
				label={t("description.icon_save")}
				color="turquoise"
				onClick={() => {
					setShow(true);
					setChooseModal(true);
				}}
				goTo="#"
			/>
			{consultingService}
		</>
	);
}

export function Health({ setShow, setChooseModal }) {
	return (
		<>
			<IconButton
				icon="plant"
				label="Nutrient Gap"
				color="yellow"
				goTo="/nutrient-gap"
				// disabled="true"
			/>
			<IconButton
				title="Find out more about the Plan to Save campaign, and what you can do to help."
				icon="food"
				label="Plan to Save"
				color="turquoise"
				onClick={() => {
					setShow(true);
					setChooseModal(true);
				}}
				goTo="#"
			/>

			<IconButton
				icon="plant"
				label="Composition"
				color="green"
				goTo="/nutrient-composition"
				// disabled="true"
			/>
			{/* <Accordion
        style={{
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
          display: "block",
          margin: "auto",
          backgroundColor: Colors.brandGreen,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1a-header">
          <Typography>Disclaimer</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <b>DISCLAIMER: </b>The Global Food Loss & Waste Tracker is designed,
            in part, to help users develop healthy eating habits. The
            nutritional information and dietary recommendations provided are
            merely suggestions which may or may not improve users' eating habits
            and/or overall health. This app is a self-regulatory tool, not
            intended to replace professional medical advice. Please always
            consult a dietician or medical professional for professional medical
            advice regarding your health.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
		</>
	);
}

export function Environment() {
	return (
		<>
			<IconButton
				title="Record your food waste."
				icon="waste"
				label="Food Waste"
				color="turquoise"
				goTo="/food-waste"
			/>
			<IconButton
				title="View your food waste data."
				icon="chart"
				label="Waste Chart"
				color="yellow"
				goTo="/chart"
			/>
			<IconButton
				title="Gift a Food Item."
				icon="gift"
				label="Gift Item"
				color="pink"
				goTo="/gift-food"
			/>
			<IconButton
				title="View your gifted food data."
				icon="chart"
				label="Gifted Items Chart"
				color="yellow"
				goTo="/gift-chart"
			/>
			<IconButton
				title="View the world map of WFT users!"
				icon="world"
				label="Users Map"
				color="yellow"
				goTo="/view-map"
			/>
			<IconButton
				title="Useful tips on how to reduce food waste in your home."
				icon="info"
				label="Food Loss Tips"
				color="green"
				goTo="/food-reduction"
			/>
		</>
	);
}

export function Funds() {
	return (
		<>
			<IconButton
				title="Transfer voucher or deposit funds."
				icon="wallet"
				label="Wallet"
				color="turquoise"
				goTo="/wallet"
			/>
			<IconButton
				title="View your transaction history."
				icon="transactions"
				label="Transactions"
				color="yellow"
				goTo="/transactions"
			/>
		</>
	);
}
// export function Consulting() {
// 	return (
// 		<>
// 			<IconButton
// 				title="connect with a consultant."
// 				icon="consult"
// 				label="Consult"
// 				color="yellow"
// 				goTo="/consult"
// 			/>
// 			<IconButton
// 				title="Become a consultant"
// 				icon="consultant"
// 				label="Consultant"
// 				color="turquoise"
// 				goTo="/consultant"
// 			/>
// 		</>
// 	);
// }

export function Sustainability() {
	return (
		<>
			<IconButton
				icon="plant"
				label="Agrifood Technpreneur"
				color="turquoise"
				goTo="https://intellidigest.com/services/food-system-sustainability/agrifood-techpreneur-club/"
			/>
			<IconButton
				icon="book"
				label="Masterclasses"
				color="turquoise"
				goTo="https://intellidigest.com/masterclasses-overview/"
			/>
			<IconButton
				icon="info"
				label="FISI"
				color="green"
				goTo="https://intellidigest.com/services/food-system-sustainability/food-industry-sustainability-index/"
			/>
			<IconButton
				icon="kitchen"
				label="Plan to Save"
				color="turquoise"
				goTo="/pts"
			/>
		</>
	);
}
