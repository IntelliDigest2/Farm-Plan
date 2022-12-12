import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getInventory } from "../../../../../../store/actions/marketplaceActions/inventoryData";
import RemoveFromInventoryIcon from "./Icons/RemoveFromInventoryIcon";
import Edit from "./Icons/EditIconInventory.jsx"
import moment from "moment";

function InventoryItems(props) {
  const [list, setList] = useState([]);
  const [expiryDate, setExpiryDate] = useState("DD-MM-YYYY");


  //this sends data request
  useEffect(() => {
    props.getInventory();
    console.log("this a props", props)
  }, [props.value, props.update]);

  const updateInventoryList = async () => {
    //clears the items array before each update- IMPORTANT
    setList([]);

    //sets a new item object in the array for every document
    props.data.forEach((doc) => {
      // id is the docref for deletion
      var id = doc.id;
      var item = doc.ingredients;
      var expiry = doc.expiry;
      var purchase = doc.purchase;
      var storage = doc.storage;

      var daysUntil = new moment().to(moment(expiry));

      setList((list) => [
        ...list,
        {
          item: item,
          purchase: purchase,
          storage: storage,
          expiry: expiry,
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
  }, [props.data]);

  return (
    <>
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
                  <p>{item.item}</p>
                  <p><b >Expiry Date: </b>{item.expiry}</p>
                  <p><b >Item expires: </b>{item.daysUntil}</p>
                  <p><b >Place of purchase: </b>{item.purchase}</p>
                  <p><b >Storage:</b>{item.storage}</p>
                </div>
                
                <div className="icons">
                <Edit
                      //value={props.value}
                      ingredients={item.item}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInventory: (item) => dispatch(getInventory(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryItems);
