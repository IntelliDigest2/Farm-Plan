import React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { connect } from "react-redux";
import { deleteMealPlannerData } from "../../../../../../../store/actions/marketplaceActions/mealPlannerData";

//takes props value, id and forceUpdate from a meal item and whether or not it is saved
function Delete(props) {
  //needs id passed to it from onClick
  const handleDelete = (id) => {
    const data = {
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
      id: id,
    };
    //saved meals and calendar meals are in different places in firestore
      props.deleteMealPlannerData(data);
      props.forceUpdate();
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton
          aria-label="Delete"
          sx={{ ml: 2 }}
          onClick={() => {
            handleDelete(props.id);
          }}
        >
          <DeleteIcon fontSize="inherit" />
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
    deleteMealPlannerData: (data) => dispatch(deleteMealPlannerData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
