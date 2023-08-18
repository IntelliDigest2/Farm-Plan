import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import { ViewWallet } from "./ViewWallet";
//takes props value, meal(name), ingredients, id, forceUpdate and whether or not it is saved
function WalletIcon(props) {
  //shows edit modal
  const [show, setShow] = useState(false);

  return (
    <>
      <Tooltip title="View Orders">
        <IconButton
          className="edit"
          aria-label="Edit"
          sx={{ ml: 2 }}
          onClick={() => {
            setShow(true);
          }}
        >
          <b>$500</b> <AddIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <ViewWallet
        show={show}
        setShow={setShow}
        forceUpdate={props.forceUpdate}
      />
    </>
  );
}

export default WalletIcon;
