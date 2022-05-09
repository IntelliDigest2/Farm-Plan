import React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { connect } from "react-redux";
import {
  deleteMealData,
  deleteSavedMeal,
} from "../../../../../../store/actions/marketplaceActions";

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
    if (props.saved) {
      props.deleteSavedMeal(data);
      props.forceUpdate();
    } else {
      props.deleteMealData(data);
      props.forceUpdate();
    }
  };

  return (
    <>
      <Tooltip title="Delete">
        <IconButton
          className="delete"
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
    deleteMealData: (data) => dispatch(deleteMealData(data)),
    deleteSavedMeal: (data) => dispatch(deleteSavedMeal(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
