import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import { Modal, Row, Col } from "react-bootstrap";

const StripeCall = (props) => {
	// const itemsForPurchase = props.orderId; // ie the id of the order

	useEffect(() => {
		// Create PaymentIntent as soon as the page loads7
		// console.log([itemsForPurchase]);

		//this is the part that sends the post request containing the request id to the stripe backend

		fetch(
			//This is supposed to point to the url of the stripe payment function on firebase
			// which will be provided after the function as been deployed

			"https://us-central1-itracker-development.cloudfunctions.net/itrackerPaymentFunction/create-payment-intent", //this is just a sample
			// "http://localhost:5001/itracker-development/us-central1/itrackerPaymentFunction/create-payment-intent", //this is just a sample
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					orderId: props.orderId,
					userId: props.userId,
				}),
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setClientSecret(data.clientSecret);
			});
	}, []);

	const [stripePromise, setStripePromise] = useState(() =>
		loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`)
	);
	const [clientSecret, setClientSecret] = useState("");

	const appearance = {
		theme: "stripe",
	};

	const options = {
		clientSecret,
		appearance,
	};

	let showElement =
		clientSecret !== "" ? (
			<div>
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			</div>
		) : (
			<div>Loading...</div>
		);

	return (
		<Modal size="lg" centered>
			{showElement}
		</Modal>
	);
};

export default StripeCall;
