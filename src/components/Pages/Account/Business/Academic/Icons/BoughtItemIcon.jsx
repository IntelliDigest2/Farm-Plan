import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { addToInventoryRes } from "../../../../../../store/actions/marketplaceActions/restaurantData";
import { removeFromShop, generatedRemoveFromShop } from "../../../../../../store/actions/marketplaceActions/restaurantData";

import { connect } from "react-redux";
import { submitNotification } from "../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function BoughtItemIcon(props) {

 // console.log("to inventory ==> ", props.food)
  const handleSelect = async () => {
    const data = {
      //need to send shopping list data to be bough the previous week from the day it is made
      week: props.value.format("w") - 1,
      day: props.value.format("DD"),
      upload: {
        ingredients: props.food,
        item: props.item,
        measure: props.measure,
        quantity: props.quantity,
      },
    };
    props.addToInventoryRes(data);
    submitNotification("Success", `${data.upload.item}` + " added to Inventory!");
  };

  const handleDelete = (id) => {
    const data = {
      id: id, 
    };
    // console.log(props.id);
    // props.removeFromShop(data);
    props.generatedRemoveFromShop(data);
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
    addToInventoryRes: (data) => dispatch(addToInventoryRes(data)),
    removeFromShop: (data) => dispatch(removeFromShop(data)),
    generatedRemoveFromShop: (data) => dispatch(generatedRemoveFromShop(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoughtItemIcon);
