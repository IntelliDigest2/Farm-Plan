import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AddToCalendar from "./AddToCalendar";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function Add(props) {
  //shows add to calendar modal only for saved or searched meals tab
  const [showCalendar, setShowCalendar] = useState(false);
  //sets the selected meal to be passed down
  const [selected, setSelected] = useState({});

  const handleSelect = async () => {
    if (props.saved) {
      setSelected({
        meal: props.meal,
        mealType: props.mealType,
        ingredients: props.ingredients,
        id: props.id,
      });
    } else {
      setSelected({
        meal: props.meal,
        mealType: props.mealType,
        ingredients: props.ingredients,
        url: props.url,
      });
    }
  };

  return (
    <>
      <Tooltip title="Add to Calendar">
        <IconButton
          aria-label="Add to Calendar"
          sx={{ ml: 2 }}
          onClick={() => {
            setShowCalendar(true);
            handleSelect();
          }}
        >
          <ScheduleIcon fontSize="20" />
        </IconButton>
      </Tooltip>
      <AddToCalendar
        value={props.value}
        onChange={props.onChange}
        show={showCalendar}
        setShow={setShowCalendar}
        selected={selected}
        saved={props.saved}
      />
    </>
  );
}

export default Add;
