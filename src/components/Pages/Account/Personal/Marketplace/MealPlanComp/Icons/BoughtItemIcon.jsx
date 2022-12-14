import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { removeFromShop, newRemoveFromShop } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";

import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function BoughtItemIcon(props) {
  const handleSelect = async () => {
    const data = {
      //need to send shopping list data to be bough the previous week from the day it is made
      week: props.value.format("w") - 1,
      day: props.value.format("DD"),
      upload: {
        ingredients: props.food,
      },
    };
    props.addToInventory(data);
    submitNotification("Success", "Item added to Inventory!");
  };

  const handleDelete = (id) => {
    const data = {
      week: props.value.format("w"),
      id: id, 
    };
    // console.log(props.id);
    props.removeFromShop(data);
    props.newRemoveFromShop(data);
    props.setUpdate(props.update + 1);
  };

  return (
    <>
      <Tooltip title="Bought Item">
        <IconButton
          aria-label="Bought Item"
          sx={{ ml: 2 }}
          onClick={() => {
            handleSelect();
            handleDelete(props.id);
          }}
        >
          <LocalMallIcon fontSize="25" />
        </IconButton>
      </Tooltip>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToInventory: (data) => dispatch(addToInventory(data)),
    removeFromShop: (data) => dispatch(removeFromShop(data)),
    newRemoveFromShop: (data) => dispatch(newRemoveFromShop(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoughtItemIcon);
