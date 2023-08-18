import React from "react";
import {
	BrowserRouter as Router,
	Link,
} from "react-router-dom";

function FailedDeposit({ orderId, reason }) {
  return (
    <>
      <h2>
        <Link href={`/?order=${orderId}`}>
          <a>Checkout</a>
        </Link>
        {" / "}
        Confirmation
      </h2>
      <h3>
      {reason || "Payment was declined"} -{" "}
        <Link href={`/?order=${orderId}`}>
          <a>please try again</a>
        </Link>
      </h3>
    </>
  );
}

export default FailedDeposit;
