import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import ConfirmItemIconRes from "./ConfirmItemIconRes"
import { useTranslation, Trans } from 'react-i18next';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { getPurchaseInfoSupply} from "../../../../../../store/actions/supplierActions/supplierData";

function ViewOrderInfoSupply(props) {
  const { t } = useTranslation();

  const [list, setList] = useState([]);

  
//this sends data request
useEffect(() => {
  props.getPurchaseInfoSupply();
  console.log("getting sup ==>", props.data)
}, [props.infoSupply]);

const getOrderInfoList = async () => {
  //clears the items array before each update- IMPORTANT
  setList([]);

  //sets a new item object in the array for every document
  props.infoSupply.forEach((doc) => {
    // id is the docref for deletion
    var id = doc.id;
    var uid = doc.uid
    var productName = doc.cartList.productName;
    var productPrice = doc.cartList.productPrice;
    var productCurrency = doc.cartList.productCurrency;
    var status = doc.status;


    setList((list) => [
      ...list,
      {
        productName: productName,
        productPrice: productPrice,
        id: id,
        uid: uid,
        productCurrency: productCurrency,
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
                    <th className="table-header">Price</th>

									</tr>
								</thead>
								<tbody>
									{/* {item.order.map((order) => (
										<tr key={`order${index}`}>
										<td>{order.meal}</td>
										<td>{order.price}</td>
									</tr>
									))} */}
                  <td>{item.productName}</td>
									<td>{item.productCurrency}{item.productPrice}</td>

								</tbody>
                <div className="">
                      {/* <ConfirmItemIconRes
                        //value={props.value}
                        id={item.id}
                        item={item}
                      /> */}
                  </div>
								
								
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPurchaseInfoSupply: (data) => dispatch(getPurchaseInfoSupply(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrderInfoSupply);
