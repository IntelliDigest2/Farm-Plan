import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import swal from "sweetalert2";
//import withReactContent from 'sweetalert2-react-content'

// import classes2 from "../modal.module.css";
// import * as actions from "../../../store/actions/index";
// import classes from "./checkoutForm.module.css";./
import { changePurchaseStatus } from "./../../store/actions/marketplaceActions/consultingBookingData";

import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = (props) => {
	const location = useLocation();
	const myparam = location.state.params.sec;
	const consulInfo = location.state.params.consultInfo;
	console.log(consulInfo, `this is the consulInfo`);
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = `${myparam}`;

		// const clientSecret = new URLSearchParams.get(
		// 	"payment_intent_client_secret"
		// );

		console.log("client secret from checkout", clientSecret);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			console.log("payment status", paymentIntent);

			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");

					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			setIsLoading(false);
			return;
		}

		stripe
			.confirmPayment({
				elements,

				// Make sure to change this to your payment completion page
				confirmParams: {
					return_url: "https://worldfoodtracker.com/meal-plan", // this is supposed to be the page to redirect to after purhcase is completed the example.com i used here means it would not redirect anywhere
					receipt_email: "alexyikeh@gmail.com", //this is supposed to be the email of the user which a receipt would be sent to after a purchase is completed
				},
				redirect: "if_required",
			})
			.then((result) => {
				if (consulInfo && !result.error) {
					changePurchaseStatus(...consulInfo);
				}

				console.log("payment result", result);
				setIsLoading(false);
				if (result.error) {
					if (
						result.error.type === "card_error" ||
						result.error.type === "validation_error"
					) {
						setMessage(result.error.message);
						new swal("Failed", result.error.message, "error", {
							buttons: false,
							timer: 2000,
						});
					} else {
						setMessage("An unexpected error occurred.");
					}
				}

				// if (result.paymentIntent.status === "succeeded") {
				// 	// console.log("this show that the payment was successful");
				// 	// save  to database to show purchase history🤷‍♀️
				// } else {
				// 	setMessage("An unexpected error occurred.");
				// }
			});
	};

	let error = message ? <div>{message}</div> : "";

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement />
			<button
				disabled={!elements || isLoading || !stripe}
				id="submit"
				style={{
					height: "38px",
					width: "243px",
					borderRadius: "20px",
					backgroundColor: "#00CB79",
					fontSize: "16px",
					color: "white",
					marginTop: "15px",
				}}
			>
				<span id="button-text">
					{isLoading ? <div>Loading...</div> : "Pay now"}
				</span>
			</button>
			{/* Show any error or success messages */}

			{error}
		</form>
	);
};

export default CheckoutForm;
