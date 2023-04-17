import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { EditShop } from "./EditShop";

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
      <EditShop
        //value={props.value} 
        show={show}
        setShow={setShow}
        //meal={props.meal}
        food={props.food}
        data={props.data}
        week={props.week}
        measure={props.measure}
        quantity={props.quantity}
        id={props.id}
        update={props.update}
        setUpdate={props.setUpdate}
        //forceUpdate={props.forceUpdate}
        //saved={props.saved}
      />
    </>
  );
}

export default Edit;
