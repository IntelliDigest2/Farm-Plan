import React, { useState, useEffect } from 'react';
import { Badge, ListGroup, Button, Card, Modal, Spinner } from "react-bootstrap";
import "../Button.css";
import "./Reservations.css"

import moment from 'moment';

import { connect } from "react-redux";
import ConfirmDeliveryFarmer from '../../Pages/Account/Farm/Marketplace/ProduceComp/Icons/ConfirmDeliveryFarmer';

export const ReservationsOther = (props) => {
  const [reservations, setReservations] = useState([]);

  console.log("profile", props.profile)

  const baseUrlDev="http://localhost:5000"
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"

  // Fetch the user's wallet balance from the backend
  useEffect(() => {

    fetch(`${baseUrlDev}/v1/payment/track-reservations-other`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ farmerID: props.profile.uid }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Data received from others:", data.userReservations);
          if (data.userReservations) {
            setReservations(data.userReservations);
            console.log("print reservations:", reservations);

          } else {
            setReservations([]);
          }
       
      })

      .catch(error => {
        console.error('Error fetching reservations:', error);
      });
  }, [props.profile]);  // Empty dependency array ensures this effect runs only once

  //console.log("transactions", transactions)

  const measurementUnits = {
    '&lt;unit>': 'unit', // Add other mappings as needed
  };

  return (
      <>
      <p>Orders to be received</p>
      <div className="page-container">
              <div className="list-container">
              {reservations && reservations.length > 0 ? (
                    reservations.map((item, index) => (
                      <div key={index} className={`list-item ${index !== 0 ? 'list-separator' : ''}`}>
                        <ListGroup variant="flush">
                          <ListGroup.Item className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">
                              <div className="d-flex align-items-center">
                                <span className={`item-operation ${item.status === "completed" ? "completed" : "pending"}`}>
                                  {item.status || "pending"}
                                </span>
                                <span className="item-amount">{item.convertedCurrency}{item.convertedTotalAmount}{' '}</span>
                              </div>
                              <div className="cart-items">
                                {item.cartItems.map((cartItem, cartIndex) => (
                                  <div key={cartIndex}>
                                    {cartItem.data} {cartItem.quantity} ({measurementUnits[cartItem.measure] || cartItem.measure}) - {cartItem.convertedPrice * cartItem.quantity}
                                  </div>
                                ))}
                              </div>

                              <div className="date">
                                {`Delivery due in ${moment(item.deliveryDueDate).fromNow(true)}`}
                              </div>
                            </div>
                            </div>
                            <Badge bg="primary" pill className="transaction-id">
                              <div className="transaction-id-content">
                                <span className="operation">{moment(item.createdAt).format("D MMM YYYY")}</span>
                                <span className="transaction-id">{item.trackingID}</span>
                                {(item.status == "PENDING") ? (
                                  <ConfirmDeliveryFarmer
                                    trackingID={item.trackingID}
                                    deliveryDuration={item.deliveryDuration}
                                  />
                                ) : (
                                  <></>
                                )}


                              </div>
                            </Badge>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    ))
                  ) : (
                    <div className="no-reservations-message">No Item available</div>
                  )}
                          
                        </div>
                      </div>
      </>
            
                  );
                };

// const mapStateToProps = (state) => {
//     return {
//       profile: state.firebase.profile,
//     };
//   };
 
export default ReservationsOther;