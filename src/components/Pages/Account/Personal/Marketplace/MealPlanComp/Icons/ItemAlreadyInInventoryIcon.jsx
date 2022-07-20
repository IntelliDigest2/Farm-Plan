import React, { useState, useEffect } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { getInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";

import { connect } from "react-redux";

export function ItemAlreadyInInventoryIcon(props) {
  return (
    <>
      <Tooltip title="Item already in inventory">
        <IconButton aria-label="Item already in inventory" sx={{ ml: 2 }}>
          <WarningAmberOutlinedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
