import React from "react";
import { IconButton, TabLink } from "../../../SubComponents/Button";
import "../UserAccount.css";
import { Colors } from "../../../lib/Colors";

import { useTranslation, Trans } from "react-i18next";

// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";

export function Food({ setShow, setChooseModal }) {
	const { t } = useTranslation();

	return (
		<>
			<IconButton
				title="Plan your meals with us, search a range of delicious recipes."
				icon="notes"
				label={t("description.icon_diary")}
				color="turquoise"
				goTo="/meal-plan"
			/>
			<TabLink
				// icon={<RecordsIcon />}
				link={"/meal-plan"}
				text="My meal-plan"
				backgroundColor="#afba15"
			/>

			<IconButton
				title="Find out more about the Plan to Save campaign, and what you can do to help."
				icon="food"
				label={t("description.icon_save")}
				color="yellow"
				onClick={() => {
					setShow(true);
					setChooseModal(true);
				}}
			/>
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
				label="Gifted Items Chart"
				color="turquoise"
				goTo="/gift-food"
			/>
			<IconButton
				title="View your gifted food data."
				icon="chart"
				label="Gifted Item Chart"
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
				label="Waste Tips"
				color="green"
				goTo="/food-reduction"
			/>
		</>
	);
}

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
