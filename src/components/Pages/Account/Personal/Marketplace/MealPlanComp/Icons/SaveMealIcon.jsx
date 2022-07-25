import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SaveIcon from "@mui/icons-material/Save";
import { createRecipe } from "../../../../../../../store/actions/marketplaceActions/savedMealData";
import { connect } from "react-redux";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function SaveMealIcon(props) {
  const handleSelect = async () => {
    const data = {
      // month and day are used for the MealPlan db, year and week for the shopping list.
      year: props.value.format("YYYY"),
      month: props.value.format("YYYYMM"),
      //need to send shopping list data to be bough the previous week from the day it is made
      week: props.value.format("w") - 1,
      day: props.value.format("DD"),
      upload: {
        meal: props.meal,
        mealType: props.mealType,
        ingredients: props.ingredients,
        url: props.url,
        totalNutrients: props.totalNutrients,
        totalDaily: props.totalDaily,
        yield: props.yield,
        nonNativeData: true,
      },
    };
    props.createRecipe(data);
  };

  return (
    <>
      <Tooltip title="Add to Saved Meals">
        <IconButton
          aria-label="Add to Saved Meals"
          sx={{ ml: 2 }}
          onClick={() => {
            handleSelect();
          }}
        >
          <FavoriteIcon fontSize="20" />
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
    createRecipe: (data) => dispatch(createRecipe(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveMealIcon);
