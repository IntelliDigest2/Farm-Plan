import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import ConfirmItemIconRes from "../Icons/ConfirmItemIconRes"
import { useTranslation, Trans } from 'react-i18next';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { getPurchaseInfoRes } from "../../../../../../store/actions/marketplaceActions/restaurantData";

function ViewOrderInfoRes(props) {
  const { t } = useTranslation();

  const [list, setList] = useState([]);

  
//this sends data request
useEffect(() => {
  props.getPurchaseInfoRes();
  //console.log("getting inv ==>", props.data)
}, [props.infoRes]);

const getOrderInfoList = async () => {
  //clears the items array before each update- IMPORTANT
  setList([]);

  //sets a new item object in the array for every document
  props.infoRes.forEach((doc) => {
    // id is the docref for deletion
    var id = doc.id;
    var uid = doc.uid
    var order = doc.order;
    var seat = doc.seat;
    var fullname = doc.fullname;
    var status = doc.status;


    setList((list) => [
      ...list,
      {
        order: order,
        seat: seat,
        id: id,
        uid: uid,
        fullname: fullname,
        status: status,
      }, 
    ]);
  });
};

//this sends data request
useEffect(() => {
  getOrderInfoList();
  console.log("getting list ==>", list)
}, [props.infoRes]);


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
										<th className="table-header">Meal</th>
                    <th className="table-header">Price</th>
										<th className="table-header">Name</th>
                    <th className="table-header">Seat</th>

									</tr>
								</thead>
								<tbody>
									{/* {item.order.map((order) => (
										<tr key={`order${index}`}>
										<td>{order.meal}</td>
										<td>{order.price}</td>
									</tr>
									))} */}
                  <td>{item.order.meal}</td>
									<td>{item.order.mealPrice}</td>
                  <td>{item.fullname}</td>
                  <td>{item.seat}</td>

								</tbody>
                <div className="">
                      <ConfirmItemIconRes
                        //value={props.value}
                        id={item.id}
                        item={item}
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
    infoRes: state.restaurant.orderRes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPurchaseInfoRes: (data) => dispatch(getPurchaseInfoRes(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrderInfoRes);
