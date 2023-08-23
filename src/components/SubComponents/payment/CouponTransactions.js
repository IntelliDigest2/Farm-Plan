import React, { useState, useEffect } from 'react';
import { Badge, ListGroup, Button, Card, Modal, Spinner } from "react-bootstrap";
import { PageWrap } from '../PageWrap';
import "../Button.css";
import "./Transactions.css"

import moment from 'moment';

import { connect } from "react-redux";

// Loading component to be displayed while waiting for data
const SpinnerComponent = () => {
  return (
    <Spinner animation="border" />
  );
};

const CouponTransaction = (props) => {
  const [transactions, setTransactions] = useState([]);

  console.log("profile", props.profile)

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://34.123.239.70:5000"

  // Fetch the user's wallet balance from the backend
  useEffect(() => {

    fetch(`${baseUrlDev}/v1/coupon/coupon-transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: props.profile.uid }),
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.userTransactions)) {
          setTransactions(data.userTransactions);
        } else {
          console.error('Invalid data format for transactions:', data);
        }
      })

      .catch(error => {
        console.error('Error fetching transanctions:', error);
      });
  }, [props.profile]);  // Empty dependency array ensures this effect runs only once

  //console.log("transactions", transactions)

  return (
    <PageWrap goTo="/account" header="Wallet">

      <div className="page-container">
        <div className="list-container">
          {transactions.map((item, index) => (
            <div key={index} className={`list-item ${index !== 0 ? 'list-separator' : ''}`}>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    <div className="d-flex align-items-center">
                      {/* <span className={`item-operation ${item.type === "Debit" ? "debit" : "credit"}`}>
                        {item.type}
                      </span> */}
                      <span className="item-amount">{item.code}</span>
                      
                    </div>
                    <div style={{ display: "block", color: "green" }}>
                        <span className="item-amount">£{item.amount}</span>
                      </div>
                    <div className="date">
                      {moment(item.createdAt).format("D MMM YYYY [at] HH:mm")}
                    </div>
                  </div>
                  </div>
                  <Badge bg="primary" pill className="transaction-id">
                    <div className="transaction-id-content">
                      <span className="operation">{item.totalRedemptions}</span>
                      {/* <span className="transaction-id">{item.transactionID}</span> */}
                    </div>
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </div>
          ))}
        </div>
      </div>


		</PageWrap>
  );
};

const mapStateToProps = (state) => {
    return {
      profile: state.firebase.profile,
    };
  };
 
export default connect(mapStateToProps)(CouponTransaction);