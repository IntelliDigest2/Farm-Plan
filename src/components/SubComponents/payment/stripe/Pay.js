import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./Checkout";
import "./Pay.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51NXkNaIGzKA0OZY8ihs7V2nCScOl7CbJqzL2LVens74k7oAvDVxzmcpO8EQ6NAxJxCM9EQXDxZiqHwA0p3k7tRPo00sDDaiLBp");

export default function Pay(props) {

    const userID = props.userID
    const amount = props.amount

  const [clientSecret, setClientSecret] = useState("");

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        console.log("Fetching payment intent with amount:", amount);
        const response = await fetch(`${baseUrlDev}/v1/payment/create-payment-intent`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Payment intent data:", data);
          setClientSecret(data.clientSecret);
          console.log("Client secret after set:", clientSecret);
        } else {
          console.error("Failed to fetch payment intent");
        }
      } catch (error) {
        console.error("Error fetching payment intent:", error);
      }
    };
  
    fetchPaymentIntent();
  }, [props.amount]);
  

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm amount={amount} userID={userID}  />
        </Elements>
      )}
    </div>
  );
}