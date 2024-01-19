import React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SyncIcon from '@mui/icons-material/Sync';
import { connect } from "react-redux";

//need props id
function RefreshIcon(props) {

  //id passed from onClick
  const refreshItems = () => {
    props.setUpdate(props.update + 1);
  };

  return (
    <>
      <Tooltip title="Refresh">
        <IconButton
          aria-label="Refresh"
          sx={{ ml: 2 }}
          onClick={() => {
            refreshItems();
          }}
        >
          <SyncIcon style={{ fontSize: 35 }} 
          />
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

export default connect(
  mapStateToProps,
)(RefreshIcon);
