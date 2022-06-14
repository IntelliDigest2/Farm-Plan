//dont think I will use this anywhere
import React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CampaignIcon from "@mui/icons-material/Campaign";

export default function AuthIcon() {
  return (
    <Tooltip title="Authenticate your farm">
      <IconButton aria-label="Authenticate your farm">
        <CampaignIcon fontSize="large" color="warning" />
      </IconButton>
    </Tooltip>
  );
}
