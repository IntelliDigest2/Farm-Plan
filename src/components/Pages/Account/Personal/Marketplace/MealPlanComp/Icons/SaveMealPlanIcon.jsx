import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { createMealPlannerData } from "../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function SaveMealPlanIcon(props) {
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
    props.createMealPlannerData(data);
    submitNotification("Success", "Added to Meal Plan!");
  };

  return (
    <>
      <Tooltip title="Add to Meal Plan">
        <IconButton
          aria-label="Add to Meal Plan"
          sx={{ ml: 2 }}
          onClick={() => {
            handleSelect();
          }}
        >
          <AddBoxIcon fontSize="40" />
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
    createMealPlannerData: (mealPlanner) => dispatch(createMealPlannerData(mealPlanner)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveMealPlanIcon);
