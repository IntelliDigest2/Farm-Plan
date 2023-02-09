import React, { useState, useEffect, useRef } from "react";
import emailjs, { init } from "@emailjs/browser";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getInventory } from "../../../../../../store/actions/marketplaceActions/inventoryData";
import RemoveFromInventoryIcon from "./Icons/RemoveFromInventoryIcon";
import RefreshIcon from "./Icons/RefreshIcon";
import RemoveFoodWasteIcon from "./Icons/RemoveFoodWasteIcon";
import GiftFoodIcon from "./Icons/GiftFoodIcon";
import PurchaseIcon from "./Icons/PurchaseIcon";
import Edit from "./Icons/EditIconInventory.jsx"
import moment from "moment";
import { Button } from "react-bootstrap";
import { SubButtonInventory } from "../../../../../SubComponents/Button";
import SyncIcon from '@mui/icons-material/Sync';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

function InventoryItems(props) {

  // console.log("let get it, park well", props)

  const [list, setList] = useState([]);
  const [expiryDate, setExpiryDate] = useState("DD-MM-YYYY");

  var today = moment(new Date()).format("dd/mm/yyyy")

   //trigger this when updating items
 const [update, setUpdate] = useState(0);
 
 const forceUpdate = () => {
   setUpdate(update + 1);
 };

  function Refresh() {
    return (
      <>
        <Tooltip title="Refresh">
          <IconButton
            aria-label="Refresh"
            sx={{ ml: 2 }}
            onClick={() => {
              forceUpdate();
              console.log("update", update)

            }}
          >
            <SyncIcon style={{ fontSize: 35 }} 
            />
          </IconButton>
        </Tooltip>
    </>
    );
   }


  //this sends data request
  useEffect(() => {
    props.getInventory();
    //console.log("getting inv ==>", props.data)
  }, [props.value, props.update]);

  const updateInventoryList = async () => {
    //clears the items array before each update- IMPORTANT
    setList([]);

    //sets a new item object in the array for every document
    props.data.forEach((doc) => {
      // id is the docref for deletion
      var id = doc.id;
      var food = doc.ingredients;
      var item = doc.item;
      var measure = doc.measure;
      var updatedMeasure = doc.updatedMeasure;
      var quantity = doc.quantity;
      var updatedQty = doc.updatedQty;
      var expiry = doc.expiry;
      var purchase = doc.purchase;
      var storage = doc.storage;

      var daysUntil = new moment().to(moment(expiry, 'DD-MM-YYYY').format('ll'));

      setList((list) => [
        ...list,
        {
          food: food + " " + quantity + " " + measure,
          item: item,
          quantity: quantity,
          updatedQty: updatedQty,
          measure: measure,
          updatedMeasure: updatedMeasure,
          purchase: purchase,
          storage: storage,
          expiry: moment(expiry, 'DD-MM-YYYY').format('ll'),
          id: id,
          daysUntil,
        },
      ]);
    });

    setList((list) => {
      let newList = [...list];
      newList.sort((a, b) => {
        return a.item < b.item ? -1 : a.item > b.item ? 1 : 0;
      });
      // console.log("list sorted");
      return newList;
    });
  };

  useEffect(() => {
    updateInventoryList();
    forceUpdate()
  }, [props.data]);

  function sendMail(item) {
    emailjs.send("service_33mgmp6","template_o8lxppf",{
      from_name: "intellidigest",
      to_name: props.profile.firstName,
      message: item + " is about to expire!! please use it before the expiry date",
      reply_to: props.profile.email,
      to_email: props.profile.email,
      }, 
      "pG3M3Ncz-i7qCJ2GD");  
  }
  
  return (
    <>
    <RefreshIcon update={props.update} setUpdate={props.setUpdate} />
      {list.length ? (
        <>
          <List>
            {list.map((item, index) => (
              <ListItem
                key={`item${index}`}
                className="list"
                style={{ alignItems: "flex-end" }}
              >
                <div>
                  <p>{item.item + " " + item.quantity + " " + item.measure}</p>
                  <p><b >Weight/Vol: </b>{item.updatedQty} {item.updatedMeasure}</p>
                  <p><b >Expiry Date: </b>{item.expiry}</p>
                  <p><b >Item expires: </b>{item.daysUntil}</p>
                  <p><b >Place of purchase: </b>{item.purchase}</p>
                  <p><b >Storage:</b>{item.storage}</p>
                 
                    <>
                      {/* <SubButtonInventory
                        text="Add Waste"
                        goTo="/food-waste-edible"
                        styling="green"
                        onClick={console.log("dddddddddddddddddddddddddd")}
                      /> */}
                       <RemoveFoodWasteIcon
                        id={item.id}
                        value={props.value}
                        update={props.update}
                        setUpdate={props.setUpdate}
                        item={item}

                      />
                      <GiftFoodIcon
                        id={item.id}
                        value={props.value}
                        update={props.update}
                        setUpdate={props.setUpdate}
                        item={item}
                      />

                      <PurchaseIcon
                        id={item.id}
                        value={props.value}
                        update={props.update}
                        setUpdate={props.setUpdate}
                        item={item}
                        profile={props.profile}
                      />

                    </>
                  { }
                  {(() => {
                    if (today == moment(item.expiry).subtract(7,'d').format('dd/mm/yyyy') ) {
                      return (
                        sendMail(item.food)
                      )
                    } else {
                      return (
                        <div></div>
                      )
                    }
                  })()}
                  
                </div>
                
                <div className="icons">
                <Edit
                      //value={props.value}
                      food={item.item}
                      measure={item.measure}
                      quantity={item.quantity}
                      updatedQty={item.updatedQty}
                      updatedMeasure={item.updatedMeasure}
                      expiry={item.expiry}
                      id={item.id}
                      update={props.update}
                      setUpdate={props.setUpdate}
                      //expiry={list.expiry}
                    />

                  <RemoveFromInventoryIcon
                    id={item.id}
                    value={props.value}
                    update={props.update}
                    setUpdate={props.setUpdate}
                  />
                </div>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <div className="empty basic-title-left">
          <p>There are no items in the list :( </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.mealPlan.inventory,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInventory: (item) => dispatch(getInventory(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryItems);
