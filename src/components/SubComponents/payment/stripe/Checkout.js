import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm( props ) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"
  const currentHost = window.location.origin;
  const successUrl = `${currentHost}/payment-success`;

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

  const handleSuccess = async => {
    try {
        const response = fetch(`${baseUrlProd}/v1/transaction/deposit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: props.amount, userID: props.userID}),
        });
  
        // Handle the response from your backend
        if (response) {
          setMessage("Payment succeeded!");
  
          const currentHost = window.location.origin;
          const successUrl = `${currentHost}/payment-success`;
  
          // Redirect to the return_url after the API call is successful
          window.location.href = successUrl;
        } else {
          setMessage("Payment succeeded, but balance update failed.");
        }
      } catch (err) {
        setMessage("An error occurred while updating the balance.");
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    try {
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: successUrl,
          },
          redirect: "if_required",
        });

        if (error) {
          console.error(error);
          // handleError();
        } else if (paymentIntent && paymentIntent.status === "succeeded" || paymentIntent.status == "processing") {
          console.log("Payment succeeded");
          await handleSuccess();
          setIsLoading(false);
        } else {
          console.log("Payment failed");
          // handleOther();
        }
      } catch (error) {
        console.error(error);
      }

      };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}