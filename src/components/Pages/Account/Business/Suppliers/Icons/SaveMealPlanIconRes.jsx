import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { createMealPlannerDataRes } from "../../../../../../store/actions/marketplaceActions/restaurantData";
import { connect } from "react-redux";
import { submitNotification } from "../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function SaveMealPlanIcon(props) {
  const handleSelect = async () => {
    const data = {
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
    props.createMealPlannerDataRes(data);
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
    createMealPlannerDataRes: (mealPlanner) => dispatch(createMealPlannerDataRes(mealPlanner)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveMealPlanIcon);
