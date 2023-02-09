import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { removeFromShop, newRemoveFromShop } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";

import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function inputIcon(props) {

  return (
    <>
      <Tooltip title="Bought Item">
        <IconButton
          aria-label="Bought Item"
          sx={{ ml: 2 }}
          // onClick={() => {
          //   handleSelect();
          //   handleDelete(props.id);
          // }}
        >
          <LocalMallIcon fontSize="25" />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default inputIcon;
