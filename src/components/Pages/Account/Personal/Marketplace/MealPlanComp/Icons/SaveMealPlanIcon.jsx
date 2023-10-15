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
      upload: {
        meal_name: props.meal_name,
        meal_type: props.mealType,
        ingredients: props.ingredients,
        url: props.url,
        total_nutrients: props.totalNutrients,
        total_daily: props.totalDaily,
        recipe_yield: props.recipe_yield,
        non_native_data: true,
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
