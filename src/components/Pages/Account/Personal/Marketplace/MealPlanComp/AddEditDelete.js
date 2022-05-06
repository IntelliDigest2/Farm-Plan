import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ScheduleIcon from "@mui/icons-material/Schedule";

import { EditMeal } from "./EditMeal";
import AddSavedMeal from "./AddSavedMeal";

import { connect } from "react-redux";
import {
  deleteMealData,
  deleteSavedMeal,
} from "../../../../../../store/actions/marketplaceActions";

function Delete(props) {
  const handleDelete = (id) => {
    const data = {
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
      id: id,
    };
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
