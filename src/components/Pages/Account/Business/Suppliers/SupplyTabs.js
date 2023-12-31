import React from "react";
import { IconButton } from "../../../../SubComponents/Button";
import "../../UserAccount.css";

export function Items({ setShow, setChooseModal, isSeller }) {

	console.log("isSeller", isSeller)
	return (
		<>
		{/* {isSeller ? (
			<IconButton
			icon="kitchen"
			label="Items"
			color="turquoise"
			goTo="/supply-plan"
		/>
		):(
			<IconButton
				icon="Kitchen"
				label="Items"
				color="turquoise"
				goTo="/sup-auth"
			/>	
		)} */}
			
			<IconButton
			icon="kitchen"
			label="Items"
			color="turquoise"
			goTo="/supply-plan"
			/>

			<IconButton
				icon="delivery"
				label="Check Deliveries"
				color="cyan"
				goTo="/track-reservations-other"
			/>

			<IconButton
				icon="chart"
				label="Revenue"
				color="yellow"
				goTo="/supply-revenue"
				disabled
			/>
			{/* <IconButton icon="chart" label="Expense" color="yellow" goTo="/expense" /> */}

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

export function Revenue({ setShow, setChooseModal }) {
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
				color="blue"
				goTo="/view-map"
			/>
			<IconButton
				title="Find out more about the Plan to Save campaign, and what you can do to help."
				icon="kitchen"
				label="Plan to Save"
				color="purple"
				onClick={() => {
					setShow(true);
					setChooseModal(true);
				}}
			/>
		</>
	);
}
