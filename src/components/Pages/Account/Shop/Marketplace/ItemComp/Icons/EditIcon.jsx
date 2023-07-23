import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { EditProduce } from "./EditProduce";

//takes props value, meal(name), ingredients, id, forceUpdate and whether or not it is saved
function Edit(props) {
  //shows edit modal
  const [show, setShow] = useState(false);

  return (
    <>
      <Tooltip title="Edit">
        <IconButton
          className="edit"
          aria-label="Edit"
          sx={{ ml: 2 }}
          onClick={() => {
            setShow(true);
          }}
        >
          <EditIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <EditProduce
        show={show}
        setShow={setShow}
        shopItems={props.shopItems}
        id={props.id}
        forceUpdate={props.forceUpdate}
      />
    </>
  );
}

export default Edit;
