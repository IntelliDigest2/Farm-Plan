import React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { connect } from "react-redux";
import { removeFromShop } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";

//need props id
function RemoveFromShop(props) {
  //id passed from onClick
  const handleDelete = (id) => {
    const data = {
      id: id,
    };
    // console.log(props.id);
    props.removeFromShop(data);
  };

  return (
    <>
      <Tooltip title="Remove">
        <IconButton
          aria-label="Remove"
          sx={{ ml: 2 }}
          onClick={() => {
            handleDelete(props.id);
          }}
        >
          <RemoveCircleOutlineIcon />
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
    removeFromShop: (data) => dispatch(removeFromShop(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemoveFromShop);
