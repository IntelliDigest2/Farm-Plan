import React from "react";
import { IconButton } from "../../../../SubComponents/Button";
import "../../UserAccount.css";
// import { Colors } from "../../../lib/Colors";

export function Food({ setShow, setChooseModal }) {
	return (
		// <>
		//   <IconButton
		//     icon="notes"
		//     label="Meal Plan"
		//     color="turquoise"
		//     goTo="/meal-plan"
		//   />
		//   <IconButton
		//     icon="my-products"
		//     label="Meal Sold"
		//     color="turquoise"
		//     goTo="/view-products"
		//   />
		//   <IconButton
		//     icon="my-products"
		//     label="Meal Returned"
		//     color="turquoise"
		//     goTo="/view-products"
		//     disabled
		//   />
		//   <IconButton
		//     icon="chart"
		//     label="Meal Chart"
		//     color="yellow"
		//     goTo="/"
		//     disabled
		//   />
		//   <IconButton
		//     icon="notes"
		//     label="Turnover"
		//     color="turquoise"
		//     goTo="/"
		//     disabled
		//   />
		//   <IconButton
		//     icon="notes"
		//     label="Profit"
		//     color="turquoise"
		//     goTo="/"
		//     disabled
		//   />
		//   <IconButton
		//     icon="kitchen"
		//     label="Plan to Save"
		//     color="turquoise"
		//     onClick={() => {
		//       setShow(true);
		//       setChooseModal(true);
		//     }}
		//   />
		// </>
		<>
			<IconButton
				icon="notes"
				label="Meal Plan"
				color="turquoise"
				goTo="/school-meal-plan"
			/>

			<IconButton
				icon="notes"
				label="Restaurant details"
				color="yellow"
				goTo="/restaurant-meal-plan"
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
				title="Generate a code for parents & add Classes"
				icon="school"
				label="School Management"
				color="green"
				goTo="/manage-school"
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

export function Research({ setShow, setChooseModal }) {
	return (
		<>
			<IconButton
				icon="notes"
				label="Research Plan"
				color="turquoise"
				goTo="/"
				disabled
			/>
			<IconButton
				icon="my-products"
				label="Food Items Used"
				color="turquoise"
				goTo="/"
				disabled
			/>
			<IconButton
				icon="my-products"
				label="Food Items Not Used"
				color="turquoise"
				goTo="/"
				disabled
			/>
			<IconButton icon="chart" label="Chart" color="yellow" goTo="/" disabled />
			<IconButton
				icon="notes"
				label="Research Cost"
				color="turquoise"
				goTo="/"
				disabled
			/>
			<IconButton
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

export function Environment({ setShow, setChooseModal }) {
	return (
		<>
			<IconButton
				icon="waste"
				label="Food Waste"
				color="turquoise"
				goTo="/food-wasteAcademic"
			/>
			<IconButton
				icon="chart"
				label="Waste Chart"
				color="yellow"
				goTo="/chart"
			/>
			<IconButton
				icon="info"
				label="Food Waste Reduction Tips"
				color="green"
				goTo="/food-reduction"
			/>
			<IconButton
				icon="world"
				label="Users Map"
				color="yellow"
				goTo="/view-map"
			/>
			<IconButton
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
		</>
	);
}

export default { Food, Research, Environment, FSSP };
