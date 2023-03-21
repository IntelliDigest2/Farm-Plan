import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { getPurchaseInfo } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";
import ConfirmItemIcon from "../Icons/ConfirmItemIcon"
import { useTranslation, Trans } from 'react-i18next';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PayIcon from "./PayIcon";

function ViewPurchaseInfo(props) {
  const { t } = useTranslation();

  const [list, setList] = useState([]);

  
//this sends data request
useEffect(() => {
  props.getPurchaseInfo();
  //console.log("getting inv ==>", props.data)
}, []);

const getPurchaseInfoList = async () => {
  //clears the items array before each update- IMPORTANT
  setList([]);

  //sets a new item object in the array for every document
  props.info.forEach((doc) => {
    // id is the docref for deletion
    var id = doc.id;
    var cart = doc.cart;
    var refID = doc.refID;
    var uid = doc.uid;
    var status = doc.status;


    setList((list) => [
      ...list,
      {
        cart: cart,
        id: id,
        refID: refID,
        uid: uid,
        status: status,
      },
    ]);
  });
};

//this sends data request
useEffect(() => {
  getPurchaseInfoList();
  //console.log("getting inv ==>", props.data)
}, [props.info]);

  

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
                  <h6><b>{t('description.order_id')} </b>{item.refID}</h6>
                  <h6><b>{t('description.order_status')} </b>{item.status}</h6>

                  </tr>
									<tr>
										<th className="table-header">{t('description.product')}</th>
										<th className="table-header">{t('description.quantity')}</th>
										<th className="table-header">{t('description.measure')}</th>
										<th className="table-header">{t('description.price')}</th>
										<th className="table-header">{t('description.supplier')}</th>
									</tr>
								</thead>
								<tbody>
									{item.cart.map((cart) => (
										<tr key={`cart${index}`}>
										<td>{cart.data}</td>
										<td>{cart.quantity}</td>
										<td>{cart.measure}</td>
										{ cart.price ? (<td>{cart.price}</td>):(<td>0</td>)}
										{ cart.supplier ? (<td>{cart.supplier}</td>):(<td></td>)}
									</tr>
									))}
									
								</tbody>
                <div className="">
                      <ConfirmItemIcon
                        //value={props.value}
                        refID={item.refID}
                        id={item.id}
                      />
                      {
                        item.status == "CONFIRMED" ? (
                        <PayIcon
                          //value={props.value}
                          refID={item.refID}
                          id={item.id}
                          uid={item.uid}
                        />
                        ):(
                          ""
                        )
                      }
                      

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
    info: state.mealPlan.purchaseInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPurchaseInfo: (data) => dispatch(getPurchaseInfo(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPurchaseInfo);
