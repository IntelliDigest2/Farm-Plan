import React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { connect } from "react-redux";
import { deleteItemData } from "../../../../../../../store/actions/shopActions/shopPlanData";
import { submitNotification } from "../../../../../../lib/Notifications";


//takes props value, id and forceUpdate from a meal item and whether or not it is saved
function Delete(props) {
  //needs id passed to it from onClick
  const handleDelete = (id) => {
    const data = {
      id: id,
    };
    
      props.deleteItemData(data);
      submitNotification("Success","Item has been deleted");
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
    deleteItemData: (data) => dispatch(deleteItemData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
