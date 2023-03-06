import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { Form, InputGroup, Button } from "react-bootstrap";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://worldfoodtracker.com/order/123/complete",
      },
    });


    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <br/>
      <button 
      disabled={!stripe} variant="outline-success"
      style={{
        height: "38px",
        width: "243px",
        borderRadius: "20px",
        backgroundColor: "#00CB79",
        fontSize: "16px",
        color: "white",
      }}
      >Submit</button>
    </form>
  )
};

export default CheckoutForm;