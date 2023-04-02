import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { ViewOrder } from "./ViewOrder";

//takes props value, meal(name), ingredients, id, forceUpdate and whether or not it is saved
function EditPurchaseIcon(props) {
  //shows edit modal
  const [show, setShow] = useState(false);

  return (
    <>
      <Tooltip title="View Restaurant Orders">
        <IconButton
          className="edit"
          aria-label="Edit"
          sx={{ ml: 2 }}
          onClick={() => {
            setShow(true);
          }}
        >
          <LocalBarIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <ViewOrder
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

export default EditPurchaseIcon;
