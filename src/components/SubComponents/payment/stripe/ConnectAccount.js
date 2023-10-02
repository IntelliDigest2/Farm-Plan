import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, Card, Modal, Spinner } from "react-bootstrap";

import { connect } from "react-redux";

const ConnectAccount = ( props ) => {

  const [businessType, setBusinessType] = useState('');

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"
  const currentHost = window.location.origin;
  const successUrl = `${currentHost}/payment-success`;

  const handleSuccess = async (accountID) => {
    try {
        const response = await fetch(`${baseUrlDev}/v1/payment/create-account-link`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            accountID: accountID }),
        });
        // Handle the response from your backend
        if (response) {
          const data = await response.json();
          const accountLink = data.accountLink;
          console.log("account link", accountLink, "account ID:", accountID)

          const absoluteURL = new URL(accountLink.url, window.location.origin);

          window.location.href = absoluteURL.href;
        } else {
          console.log("error in generating account link")
        }
      } catch (err) {
        console.error(err)
      }
  }

  const handleSubmit = async (e) => {

    try {
      const response = await fetch(`${baseUrlDev}/v1/payment/connect-stripe-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          type: "express",
          business_type: businessType,
          userID: props.userID 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const accountID = data.accountID
        console.log("account id:", data.accountID);
        handleSuccess(accountID);
      } else {
        console.error("Failed to fetch account id");
      }

      } catch (error) {
        console.error(error);
      }};

      const handleBusinessTypeChange = (e) => {
        // Update the businessType state when the user selects a new option
        setBusinessType(e.target.value);
      };

  return (
    <form>
        <div className="form-group">
        {/* <label htmlFor="businessType">Business Type:</label> */}
        <select
          id="businessType"
          name="businessType"
          value={businessType} // Set the value of the select element to the state
          onChange={handleBusinessTypeChange} // Handle changes in the select element
        >
        <option value="company">Company</option>
        <option value="non-profit">Non-Profit</option>
        <option value="individual">Individual</option>
        <option value="government_entity">Government Entity</option>
        </select>
      </div>
      <Button 
      className="blue-btn shadow-none mt-3" 
      onClick={() => {handleSubmit()}} // Open the modal
      >
        Add
      </Button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(ConnectAccount);