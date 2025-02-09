import React from "react";
import { IconButton } from "../../../../SubComponents/Button";
import "../../UserAccount.css";

export function Food({ setShow, setChooseModal, isSeller }) {
	return (
		<>
		{ isSeller ? (
			<IconButton
				icon="notes"
				label="Meal Plan"
				color="turquoise"
				goTo="/restaurant-meal-plan"
			/>

		):(
			<IconButton
					icon="notes"
					label="Meal Plan"
					color="turquoise"
					goTo="/res-auth"
				/>
		)}
			
			<IconButton
				icon="notes"
				label="Restaurant details"
				color="yellow"
				goTo="/restaurant-meal-plan"
			/>

			<IconButton
				icon="delivery"
				label="Check Deliveries"
				color="cyan"
				goTo="/track-reservations-other"
			/>

			{/* 
      <IconButton
        icon="notes"
        label="Shopping List"
        color="turquoise"
        goTo="/restaurant-shopping-list"
      />

      <IconButton
        icon="notes" 
        label="Inventory" 
        color="turquoise"
        goTo="/restaurant-inventory"
        />

      <IconButton
        icon="notes" 
        label="Inventory and Shopping List" 
        color="turquoise"
        goTo="/restaurant-dashboard"
        />
         */}
			<IconButton
				icon="my-products"
				label="Meal Sold"
				color="purple"
				goTo="/restaurant-sale"
				disabled
			/>

			{/* <IconButton
				icon="my-products"
				label="Meal Returned"
				color="blue"
				goTo="/"
				disabled
			/> */}
			{/* <IconButton
				icon="chart"
				label="Meal Chart"
				color="yellow"
				goTo="/"
				disabled
			/> */}
			<IconButton
				icon="notes"
				label="Turnover"
				color="turquoise"
				goTo="/restaurant-turnover"
				disabled
			/>
			<IconButton
				icon="notes"
				label="Expense"
				color="blue"
				goTo="/restaurant-expense"
				disabled
			/>
			<IconButton
				title="Find out more about the Plan to Save campaign, and what you can do to help."
				icon="kitchen"
				label="Plan to Save"
				color="green"
				onClick={() => {
					setShow(true);
					setChooseModal(true);
				}}
			/>
		</>
	);
}

export function Environment({ setShow, setChooseModal }) {
	return (
		<>
			<IconButton
				title="Record your food waste."
				icon="waste"
				label="Food Waste"
				color="turquoise"
				goTo="/food-wasteBusiness"
			/>
			<IconButton
				title="View your food waste data."
				icon="chart"
				label="Waste Chart"
				color="yellow"
				goTo="/chart"
			/>
			<IconButton
				title="Useful tips on how to reduce food waste in your home."
				icon="info"
				label="Food Waste Reduction Tips"
				color="green"
				goTo="/food-reduction"
			/>
			<IconButton
				title="View the world map of WFT users!"
				icon="world"
				label="Users Map"
				color="purple"
				goTo="/view-map"
			/>
			<IconButton
				title="Find out more about the Plan to Save campaign, and what you can do to help."
				icon="kitchen"
				label="Plan to Save"
				color="turquoise"
				onClick={() => {
					setShow(true);
					setChooseModal(true);
				}}
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
				icon="mind"
				label="Mastermind"
				color="purple"
				goTo="https://intellidigest.com/mastermind-sessions/"
			/>
			<IconButton
				title="Buff up the sustainability of your business with our online masterclasses."
				icon="book"
				label="Masterclasses"
				color="blue"
				goTo="https://intellidigest.com/masterclasses-overview/"
			/>
			<IconButton
				title="Calculate the Food Industry Sustainability Index (FISI) of your business."
				icon="info"
				label="FISI"
				color="green"
				goTo="https://intellidigest.com/services/food-system-sustainability/food-industry-sustainability-index/"
			/>
		</>
	);
}
