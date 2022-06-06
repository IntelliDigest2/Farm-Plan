import React, { useState, useEffect } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { addToShoppingList } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import { connect } from "react-redux";

function ShoppingIcon(props) {
  const [checked, setChecked] = useState(false);
  //checked prop should also be sent to the ingredient itself in the mealplandata
  // section of firebase, so once an item is checked it will remain checked.
  // pass checked from mealsbox.js

  //when uploading a meal, instead of current system, have ingredient uploaded
  // with a special id.
  const handleSelect = () => {
    const data = {
      year: props.value.format("YYYY"),
      month: props.value.format("YYYYMM"),
      week: props.value.format("w"),
      day: props.value.format("DD"),
      upload: {
        mealId: props.id,
        food: props.ingredient,
        index: props.index,
      },
    };
    if (checked) {
      setChecked(false);
      //delete from shopping list :)
    } else {
      setChecked(true);
      props.addToShoppingList(data);
    }
  };

  return (
    <>
      <Tooltip title="Add to Shopping List">
        <IconButton
          aria-label="Add to Shopping List"
          sx={{ ml: 2 }}
          onClick={() => {
            handleSelect();
          }}
        >
          {/* <SetCheckIcon checked={checked} /> */}
          {checked ? (
            <CheckBoxIcon fontSize="inherit" />
          ) : (
            <CheckBoxOutlineBlankIcon fontSize="inherit" />
          )}
        </IconButton>
      </Tooltip>{" "}
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
    addToShoppingList: (data) => dispatch(addToShoppingList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingIcon);
