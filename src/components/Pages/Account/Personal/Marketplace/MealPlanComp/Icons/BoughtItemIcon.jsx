import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { createRecipe } from "../../../../../../../store/actions/marketplaceActions/savedMealData";
import { addToInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function BoughtItemIcon(props) {
  const handleSelect = async () => {
    const data = {
      // month and day are used for the MealPlan db, year and week for the shopping list.
      year: props.value.format("YYYY"),
      month: props.value.format("YYYYMM"),
      //need to send shopping list data to be bough the previous week from the day it is made
      week: props.value.format("w") - 1,
      day: props.value.format("DD"),
      upload: {
        ingredients: props.food,
        expiry: props.expiry
      },
    };
    props.addToInventory(data);
    submitNotification("Success", "Item added to Inventory!");
  };

  return (
    <>
      <Tooltip title="Bought Item">
        <IconButton
          aria-label="Bought Item"
          sx={{ ml: 2 }}
          onClick={() => {
            handleSelect();
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoughtItemIcon);
