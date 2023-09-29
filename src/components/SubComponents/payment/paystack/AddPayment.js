import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button, Card, Modal, Spinner } from "react-bootstrap";

import { connect } from "react-redux";
import Swal from 'sweetalert2';

const AddPayment = ( props ) => {

  const [currency, setCurrency] = useState('NGN');
  const [bankList, setBankList] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState(""); // State variable for account number
  const [accountName, setAccountName] = useState(""); // State variable to store account name

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"
  const currentHost = window.location.origin;
  const successUrl = `${currentHost}/payment-success`;

  const createRecipient = async (account_name, account_number, bank_code) => {
    try {
      let type;
  
      // Set the 'type' based on the currency
      switch (currency) {
        case "NGN":
          type = "nuban";
          break;
        case "KES":
        case "GHS":
          type = "mobile_money";
          break;
        case "ZAR":
          type = "basa";
          break;
        default:
          // Handle any other currencies here
          break;
      }
  
      const data = {
        type: type,
        account_name: account_name,
        account_number: account_number,
        bank_code: bank_code,
        currency: currency,
        userID: props.profile.uid,
      };
  
      const response = await fetch(`${baseUrlProd}/v1/payment/create-transfer-recipient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Recipient created successfully:", responseData);
        Swal.fire({
          title: 'Sucess!',
          text: 'Payment method added successfuly',
          icon: 'success',
        });
      } else {
        console.error("Failed to create recipient:", response.status, response.statusText);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add payment. Please check your bank details',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error("Error creating recipient:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add payment. Please check your bank details',
        icon: 'error',
      });
    }
  };
  
  const handleSuccess = async (accountNumber, selectedBank) => {
    try {
      if (currency === "GHS" || currency === "KES") {
        // If currency is GHS or KES, call createRecipient directly
        createRecipient(accountName, accountNumber, selectedBank);
      } else {
        // Otherwise, fetch and resolve the bank account
        const response = await fetch(`${baseUrlProd}/v1/payment/resolve-bank-account?number=${accountNumber}&code=${selectedBank}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          const bankInfo = data.data;
          const account_name = bankInfo.account_name;
          const account_number = bankInfo.account_number;
          const bank_code = selectedBank;
          console.log("account number", account_number, "account name:", account_name);
  
          createRecipient(account_name, account_number, bank_code);
        } else {
          console.log("error in fetching account details");
          Swal.fire({
            title: 'Error!',
            text: 'Failed to fectch account details',
            icon: 'error',
          });
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong!',
        icon: 'error',
      });
    }
  };
  

  useEffect(() => {
    // Define the API endpoints based on the currency value
    let apiEndpoint;
    if (currency === "NGN" || currency === "ZAR") {
      apiEndpoint = `${baseUrlProd}/v1/payment/get-bank-list-nuban?currency=${currency}`;
    } else if (currency === "KES" || currency === "GHS") {
      apiEndpoint = `${baseUrlProd}/v1/payment/get-bank-list-mobile?currency=${currency}`;
    } else {
      // Handle unsupported currencies or default case
      console.error("Unsupported currency");
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong!',
        icon: 'error',
      });
      return;
    }
  
    // Fetch the bank list
    const fetchBankList = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          const list = data.data;
          setBankList(list);
          console.log("bank list", list);
        } else {
          console.error("Failed to fetch bank list");
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong! Please refresh',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong!',
          icon: 'error',
        });
      }
    };
  
    // Call the fetchBankList function when currency changes
    if (currency) {
      fetchBankList();
    }
  }, [currency]);
  
  const handleCurrencyChange = (e) => {
    // Update the businessType state when the user selects a new option
    setCurrency(e.target.value);
  };

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };
      
  return (
    <>

<form>
      <div className="form-group">
        <select
          id="businessType"
          name="businessType"
          value={currency}
          onChange={handleCurrencyChange}
        >
          <option value="">Select a currency</option>
          <option value="NGN">NGN</option>
          <option value="ZAR">ZAR</option>
          <option value="GHS">GHS</option>
          <option value="KES">KES</option>
        </select>
      </div>
      <div className="form-group">
        <select
          id="bankSelect"
          name="bankSelect"
          value={selectedBank}
          onChange={handleBankChange}
        >
          <option value="">Select a bank</option>
          {bankList.map((bank) => (
            <option key={bank.id} value={bank.code}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
         {/* Conditional rendering of the "Name" field */}
          {currency === "GHS" || currency === "KES" ? (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
          ) : null}
      <Button
        className="blue-btn shadow-none mt-3"
        onClick={() => {
          handleSuccess(accountNumber, selectedBank ); // Pass the selected bank to the handleSuccess function
        }}
        disabled={!selectedBank} // Disable the button if no bank is selected
      >
        Add
      </Button>
    </form>

    </>
   
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(AddPayment);