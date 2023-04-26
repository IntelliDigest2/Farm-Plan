import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { getPurchaseInfoFarm } from "../../../../../../../store/actions/marketplaceActions/farmPlanData";
import ConfirmItemIconFarm from "../Icons/ConfirmItemIconFarm"
import { useTranslation, Trans } from 'react-i18next';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function ViewPurchaseInfoFarm(props) {
  const { t } = useTranslation();

  const [list, setList] = useState([]);

  
//this sends data request
useEffect(() => {
  props.getPurchaseInfoFarm();
  //console.log("getting inv ==>", props.data)
}, [props.infoFarm]);

const getPurchaseInfoList = async () => {
  //clears the items array before each update- IMPORTANT
  setList([]);

  //sets a new item object in the array for every document
  props.infoFarm.forEach((doc) => {
    // id is the docref for deletion
    var id = doc.id;
    var cart = doc.cart;
    var status = doc.status;


    setList((list) => [
      ...list,
      {
        cart: cart,
        id: id,
        status: status,
      },
    ]);
  });
};

//this sends data request
useEffect(() => {
  getPurchaseInfoList();
  //console.log("getting inv ==>", props.data)
}, [props.infoFarm]);

  

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
										<th className="table-header">{t('description.product')}</th>
										<th className="table-header">{t('description.quantity')}</th>
										<th className="table-header">{t('description.measure')}</th>
									
									</tr>
								</thead>
								<tbody>
									{item.cart.map((cart) => (
										<tr key={`cart${index}`}>
										<td>{cart.data}</td>
										<td>{cart.quantity}</td>
										<td>{cart.measure}</td>
									</tr>
									))}
									
								</tbody>
                <div className="table-header">
                      <ConfirmItemIconFarm
                        //value={props.value}
                        id={item.id}
                      />
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
    infoFarm: state.farmData.purchaseInfoFarm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPurchaseInfoFarm: (data) => dispatch(getPurchaseInfoFarm(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPurchaseInfoFarm);
