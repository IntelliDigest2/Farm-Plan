import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { createSavedMeal } from "../../../../../../../store/actions/marketplaceActions/savedMealData";
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";

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
        meal_name: props.meal_name,
        meal_type: props.meal_type,
        ingredients: props.ingredients,
        url: props.url,
        total_nutrients: props.total_nutrients,
        total_daily: props.total_daily,
        recipe_yield: props.recipe_yield,
        non_native_data: true,
      },
    };
    props.createSavedMeal(data);
    submitNotification("Success", "Added to Saved Meals!");
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
    createSavedMeal: (data) => dispatch(createSavedMeal(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveMealIcon);
