import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AddToCalendar from "./AddToCalendar";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function AddSchoolMealIcon(props) {


  //sets the selected meal to be passed down
  const [selected, setSelected] = useState({});

// State to keep track of selected meals
const [selectedMeals, setSelectedMeals] = useState([]);

// Function to handle adding a meal to the selected meals array
const handleAddMeal = (meal) => {
  setSelectedMeals([...selectedMeals, meal]);
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

export default AddSchoolMealIcon;
