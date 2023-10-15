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
      if (props.nonNativeData) {
        // saved and non native
        setSelected({
          meal_name: props.meal_name,
          meal_type: props.meal_type,
          ingredients: props.ingredients,
          id: props.id,
          non_native_data: props.non_native_data,
          total_daily: props.total_daily,
          total_nutrients: props.total_nutrients,
          url: props.url,
          recipe_yield: props.recipe_yield,
        });
      } else {
        // saved and native
        setSelected({
          meal_name: props.meal_name,
          meal_type: props.meal_type,
          ingredients: props.ingredients,
          id: props.id,
        });
      }
    } else {
      // not saved
      setSelected({
        meal_name: props.meal_name,
        meal_type: props.meal_type,
        ingredients: props.ingredients,
        url: props.url,
        total_nutrients: props.total_nutrients,
        total_daily: props.total_daily,
        recipe_yield: props.recipe_yield,
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
