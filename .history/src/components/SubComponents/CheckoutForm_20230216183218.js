import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// import classes2 from "../modal.module.css";
// import * as actions from "../../../store/actions/index";
// import classes from "./checkoutForm.module.css";

import {
	PaymentElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = (props) => {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// console.log(props.auth.uid);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			// console.log(paymentIntent);
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
					return_url: "https://example.com", // this is supposed to be the page to redirect to after purhcase is completed the example.com i used here means it would not redirect anywhere
					receipt_email: props.auth.email, //this is going to be the email of the user which a receipt would be sent to after a purchase is completed
				},
				redirect: "if_required",
			})
			.then((result) => {
				setIsLoading(false);
				if (result.error) {
					if (
						result.error.type === "card_error" ||
						result.error.type === "validation_error"
					) {
						setMessage(result.error.message);
					} else {
						setMessage("An unexpected error occurred.");
					}
				}

				if (result.paymentIntent.status === "succeeded") {
					// console.log("this show that the payment was successful");
					// save  to database
				}
			});
	};

	let error = message ? <div>{message}</div> : "";

	// console.log(elements);

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement />
			<button disabled={!elements || isLoading || !stripe} id="submit">
				<span id="button-text">
					{isLoading ? <div>Loading...</div> : "Pay now"}
				</span>
			</button>
			{/* Show any error or success messages */}

			{error}
		</form>
	);
};
// const mapStateToProps = (state) => {
// 	return {
// 		auth: state.firebase.auth,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		savePurchaseInfo: (product, userId) => {
// 			dispatch(actions.savePurchaseInfo(product, userId));
// 		},
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);
export default CheckoutForm;
