import React, { useEffect, useState } from "react";
import { IconButton } from "../../../SubComponents/Button";

import "../UserAccount.css";

export function Food({ isSeller, profile }) {
	const [consultantService, setConsultantService] = useState("");

	// console.log(profile);
	useEffect(() => {
		if (profile.isloaded) {
			if (profile.buildingFunction === "Consultant") {
				setConsultantService(true);
			} else {
				setConsultantService(false);
			}
		}
	}, [profile]);

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
			{isSeller ? (
				<IconButton
					title="Start planning your farm with us. Coordinate your produce with consumers and grow into sustainability."
					icon="notes"
					label="My Farm Plan"
					color="turquoise"
					goTo="/farm-plan"
				/>
			) : (
				<IconButton
					title="Start planning your farm with us. Coordinate your produce with consumers and grow into sustainability."
					icon="notes"
					label="My Farm Plan"
					color="turquoise"
					goTo="/farm-auth"
				/>
			)}
			<IconButton
				title="Find out more about the Plan to Save campaign, and what you can do to help."
				icon="food"
				label="Plan to Save"
				color="purple"
				goTo="/pts"
			/>

			{/* <IconButton
        icon="my-products"
        label="Food Sold"
        color="turquoise"
        goTo="/view-products"
      /> */}
			{/* <IconButton
				icon="my-products"
				label="Food Returned"
				color="turquoise"
				goTo="/view-products"
				disabled
			/> */}
			<IconButton
				icon="chart"
				label="Produce Chart"
				color="green"
				goTo="/produce"
			/>
			<IconButton icon="chart" label="Expense" color="yellow" goTo="/expense" />
			{/* <IconButton icon="chart" label="Expense" color="yellow" goTo="/in-progress" /> */}
			{/* <IconButton
				icon="notes"
				label="Turnover/Profit"
				color="green"
				goTo="/in-progress"
				disabled
			/> */}
			<IconButton
				icon="notes"
				label="Turnover/Profit"
				color="green"
				goTo="/turnover"
				disabled
			/>
			<IconButton
				icon="delivery"
				label="Check Deliveries"
				color="cyan"
				goTo="/track-reservations-other"
			/>
			{/* <IconButton
				icon="notes"
				label="Profit"
				color="turquoise"
				goTo="/"
				disabled
			/> */}
			<IconButton
				icon="notes"
				label="Rent/Buy Item"
				color="blue"
				goTo="/supply"
			/>
			{consultingService}
		</>
	);
}

export function Environment() {
	return (
		<>
			<IconButton
				title="Record your food loss."
				icon="waste"
				label="Food Loss"
				color="turquoise"
				goTo="/food-loss"
			/>
			<IconButton
				title="View your food loss data."
				icon="chart"
				label="Waste Chart"
				color="yellow"
				goTo="/chart"
			/>
			<IconButton
				title="Useful tips on how to reduce food loss in your home."
				icon="info"
				label="Food Loss Reduction Tips"
				color="green"
				goTo="/food-reduction"
			/>
			<IconButton
				title="View the world map of WFT users!"
				icon="world"
				label="Users Map"
				color="blue"
				goTo="/view-map"
			/>
			<IconButton
				title="Find out more about the Plan to Save campaign, and what you can do to help."
				icon="food"
				label="Plan to Save"
				color="purple"
				goTo="/pts"
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
			<IconButton
				title="Create a coupon."
				icon="coupon"
				label="Create Coupon"
				color="purple"
				goTo="/create-coupon"
			/>
			<IconButton
				title="Redeem a coupon."
				icon="redeem"
				label="Redeem Coupon"
				color="cyan"
				goTo="/redeem-coupon"
			/>
			<IconButton
				title="View your transaction history."
				icon="list"
				label="View My Coupons"
				color="orange"
				goTo="/coupon-transactions"
			/>
			<IconButton
				title="Withdraw fund from your wallet."
				icon="list"
				label="Withdraw Fund"
				color="green"
				goTo="/withdraw-funds"
			/>
		</>
	);
}

export function FSSP() {
	return (
		<>
			<IconButton
				title="Find out about our Agrifood TechPreneur program."
				icon="plant"
				label="Agrifood Technpreneur"
				color="turquoise"
				goTo="https://intellidigest.com/services/food-system-sustainability/agrifood-techpreneur-club/"
			/>
			<IconButton
				title="Buff up the sustainability of your business with our online masterclasses."
				icon="book"
				label="Masterclasses"
				color="purple"
				goTo="https://intellidigest.com/masterclasses-overview/"
			/>
			<IconButton
				title="Buff up the sustainability of your business with our online masterclasses."
				icon="mind"
				label="Mastermind"
				color="blue"
				goTo="https://intellidigest.com/mastermind-sessions/"
			/>

			<IconButton
				title="Calculate the Food Industry Sustainability Index (FISI) of your business."
				icon="info"
				label="FISI"
				color="green"
				goTo="https://intellidigest.com/services/food-system-sustainability/food-industry-sustainability-index/"
			/>
			<IconButton
				title="Find out more about the Plan to Save campaign, and what you can do to help."
				icon="food"
				label="Plan to Save"
				color="yellow"
				goTo="/pts"
			/>
		</>
	);
}
