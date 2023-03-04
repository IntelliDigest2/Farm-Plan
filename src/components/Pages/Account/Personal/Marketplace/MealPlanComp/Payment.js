import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useLocation } from "react-router-dom";
import { PageWrapPayment } from '../../../../../SubComponents/PageWrapPayment';
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

export default function Payment() {

    const location = useLocation();
    const myparam = location.state.params;

  const options = {
    // passing the client secret obtained from the server
    clientSecret: `${myparam}`,
  };

  return (
    <PageWrapPayment goTo="/meal-plan" header="Payment">
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    </PageWrapPayment>
    
  );
};