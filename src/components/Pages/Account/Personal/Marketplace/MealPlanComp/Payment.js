import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useLocation } from "react-router-dom";
import { PageWrapPayment } from '../../../../../SubComponents/PageWrapPayment';
import CheckoutForm from './CheckoutForm';
import Checkout from '../../../../../SubComponents/CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripeKey= 'pk_live_51IdK0FEtXlP6Uv4NAZ15ILAzo8f2s24jyEiimLaYVQrfiHjstZGc4g8XwE526R3XDol3xqaIuZ8tRiaQsfpYOGLs00xzffdRzA'

const stripeKeyTest= 'pk_test_51IdK0FEtXlP6Uv4NYdmAfh6EQQojmRjVoJGh3kR260nGyMnC1OnD6588P0jOME50KRzSrKnakRXOrAwrSkpWUqlI00Jb1Rr951'

const stripePromise = loadStripe(stripeKey);
export default function Payment() {

  const appearance = {
    theme: "stripe",
    labels: "floating",
    
  };

    const location = useLocation();
    const myparam = location.state.params;

  const options = {
    // passing the client secret obtained from the server
    clientSecret: `${myparam}`,
    appearance,
  };

  return (
    <PageWrapPayment goTo="/meal-plan" header="Payment">
        <Elements stripe={stripePromise} options={options}>
            <Checkout />
        </Elements>
    </PageWrapPayment>
    
  );
};