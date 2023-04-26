import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import NotificationIcon from '@mui/icons-material/Notifications';
import { ViewOrderRes } from "./ViewOrderRes";

//takes props value, meal(name), ingredients, id, forceUpdate and whether or not it is saved
function NotificationIconRes(props) {
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
          <NotificationIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <ViewOrderRes
        show={show}
        setShow={setShow}
        cart={props.cart}
        id={props.id}
        uid={props.uid}
        forceUpdate={props.forceUpdate}
      />
    </>
  );
}

export default NotificationIconRes;
