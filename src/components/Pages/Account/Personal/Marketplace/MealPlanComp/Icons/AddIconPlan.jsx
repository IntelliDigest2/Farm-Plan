import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';

import { connect } from "react-redux";
import { setSelectedRecipe } from "../../../../../../../store/actions/dataActions";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function AddIconPlan(props) {

  return (
    <>
      <Tooltip title="Add to Meal Plan">
        <IconButton
          aria-label="Add to Meal Plan"
          sx={{ ml: 2 }}
          onClick={() => {
            props.setSelectedRecipe(props.recipe);
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
    SelectedRecipe: state.data.SelectedRecipe,
  }; 
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedRecipe: (recipe) => dispatch(setSelectedRecipe(recipe)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddIconPlan);