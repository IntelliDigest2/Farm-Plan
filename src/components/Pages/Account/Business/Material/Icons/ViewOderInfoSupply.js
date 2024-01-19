import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import ConfirmItemIconSup from "./ConfirmItemIconSup"
import PayIconWallet from "./PayIconWallet";
import { useTranslation, Trans } from 'react-i18next';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { getPurchaseInfoSupply} from "../../../../../../store/actions/supplierActions/supplierData";
import { getCurrencySymbol } from '../../../../../../config/CurrerncyUtils'; 

function ViewOrderInfoSupply(props) {
  const { t } = useTranslation();

  const [list, setList] = useState([]);
  const [isDateEntered, setIsDateEntered] = useState(false);

  const userCountryCode = props.profile.country;
  const userCurrency = getCurrencySymbol(userCountryCode)
  
//this sends data request
useEffect(() => {
  props.getPurchaseInfoSupply();
  console.log("getting sup ==>", props.data)
}, []);

const getOrderInfoList = async () => {
  //clears the items array before each update- IMPORTANT
  setList([]);

  //sets a new item object in the array for every document
  props.infoSupply.forEach((doc) => {
    // id is the docref for deletion
    var id = doc.id;
    var companyID = doc.companyID
    var receiversID = doc.receiversID
    var address = doc.address
    var delivery_code = doc.delivery_code
    var status = doc.status;


    var cartWithPrices = doc.cart.map((cartItem) => {
      return {
        ...cartItem,
        price: 0,
        currency: getCurrencySymbol(userCountryCode)
      };
    });

    setList((list) => [
      ...list,
      {
        cart: cartWithPrices,
        companyID: companyID,
        receiversID: receiversID,
        address: doc.address,
        delivery_code: doc.delivery_code,
        status: status,
      }, 
    ]);
  });
};

//this sends data request
useEffect(() => {
  getOrderInfoList();
  //console.log("getting list ==>", list)
}, [props.infoSupply]);


  return (
    <>
      {list.length ? (
        <>
          <List>
            {list.map((item, index) => (
              <ListItem
                key={`item${index}`}
                // className="list"
                style={{ alignItems: "flex-end" }}
              >
                
                <Table striped bordered hover>
								
								<thead >
                  <tr>
                  <h6><b>Status: </b>{item.status}</h6>

                  </tr>
									<tr>
										<th className="table-header">Name</th>
                    <th className="table-header">Qty</th>

									</tr>
								</thead>
								<tbody>
                {item.cart.map((cartItem, cartIndex) => (
                    <tr key={`cart${cartIndex}`}>
                      <td>{cartItem.productName}</td>
                      <td>{cartItem.productQty}</td>
                      <td>
                        <InputGroup>
                        <InputGroup.Text>{userCurrency}</InputGroup.Text>
                          <Form.Control
                            type="number"
                            min="0"
                            step="1"
                            value={cartItem.price}
                            onChange={(e) => {
                              const newPrice = parseFloat(e.target.value);
                              const updatedCart = [...item.cart];
                              updatedCart[cartIndex].price = newPrice;
                              const updatedList = list.map((listItem) =>
                                listItem.id === item.id
                                  ? { ...listItem, cart: updatedCart }
                                  : listItem
                              );
                              setList(updatedList);
                            }}
                          />
                        </InputGroup>
                      </td>
                    </tr>
                  ))}
								</tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2">
                      {/* Conditionally render the ConfirmItemIconFarm button */}
                      {item.status !== "ACCEPTED" && isDateEntered &&  (
                        <ConfirmItemIconSup
                          item={item.cart}
                          supplierRef={item.id}
                          companyID={item.companyID}
                          receiversID={item.receiversID}
                          deliveryDueDate={item.deliveryDueDate}
                          delivery_code={item.delivery_code}
                          currency={userCurrency}
                        />
                      )}
                    </td>
                    <td colSpan="6">
                    <td colSpan="3">
                    <h5>Delivery Address: {item.address}</h5>
                    </td>
                    <td colSpan="3">
                    <h5>Add Delivery Date</h5>
                      <Form.Control
                        type="date"
                        value={list[0].deliveryDueDate || ""}
                        onChange={(e) => {
                          const newDueDate = e.target.value;
                          const updatedList = list.map((listItem) => ({
                            ...listItem,
                            deliveryDueDate: newDueDate,
                          }));
                          setList(updatedList);
                          setIsDateEntered(newDueDate !== "");
                        }}
                      />
                    </td>
                    </td>
                    
                  </tr>
                </tfoot>
								
								
							</Table>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <div className="empty basic-title-left">
          <p>{t('description.no_notifications')} </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    infoSupply: state.supplier.orderSupply,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPurchaseInfoSupply: (data) => dispatch(getPurchaseInfoSupply(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrderInfoSupply);
