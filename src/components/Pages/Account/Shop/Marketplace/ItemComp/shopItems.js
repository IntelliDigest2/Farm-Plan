import React, { useState, useEffect } from "react";

import ItemsBox from "./ItemsBox";

import { connect } from "react-redux";
import SyncIcon from '@mui/icons-material/Sync';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { getItemsData } from "../../../../../../store/actions/shopActions/shopPlanData";

function ShopItems(props) {

  const [items, setItems] = useState([]);

  //trigger this when editing/deleting items
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
    props.getItemsData();
  }, [props.value, update]);

  
  const updateItems = async () => {
    //clears the meals array before each update- IMPORTANT
    setItems([]);
 
    //sets a new meal object in the array for every document with this date attached
    props.shopItems.forEach((doc) => {
      var item = doc.item;
      var id = doc.id;
      var imageURL = doc.imageURL
      var measure = doc.measure;
      var quantity = doc.quantity;
      var price = doc.price;
      var currency = doc. currency;

      setItems((items) => [
        ...items,
        {
          item: item,  
          id: id,
          imageURL: imageURL,
          measure: measure,
          quantity: quantity,
          price: price,
          currency: currency,
        },
      ]);
    });
  };
 
  useEffect(() => {
    updateItems();
  }, [props.shopItems, props.update]);

  return (
    <>
    <Refresh />
      {items.length ? (
        <div>
          <ItemsBox
            forceUpdate={forceUpdate}
            shopItems={items}
          />
        </div>
      ) : (
        <div className="empty basic-title-left">
          <p> No Item yet 🙂 use the add button </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    shopItems: state.shopData.shopItems,
  }; 
};

const mapDispatchToProps = (dispatch) => {
  return {
    getItemsData: (data) => dispatch(getItemsData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItems);
