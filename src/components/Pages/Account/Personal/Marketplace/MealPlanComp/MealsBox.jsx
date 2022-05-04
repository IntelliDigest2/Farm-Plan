import React, { useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ScheduleIcon from "@mui/icons-material/Schedule";

import { EditMeal } from "./EditMeal";
import AddSavedMeal from "./AddSavedMeal";

export default function MealsBox(props) {
  //shows edit modal
  const [show, setShow] = useState(false);
  //shows add to calendar modal only for saved meals tab
  const [showCalendar, setShowCalendar] = useState(false);
  const [selected, setSelected] = useState({});
  const [hover, setHover] = useState({});

  return (
    <>
      {props.meals.map((newMeal, index) => (
        <div
          className="meal-box"
          key={`meal-box${index}`}
          onMouseEnter={() => {
            setHover((prev) => ({ ...prev, [index]: true }));
          }}
          onMouseLeave={() => setHover((prev) => ({ ...prev, [index]: false }))}
        >
          <p key={`meal${index}`}>
            <b>{newMeal.meal}</b>
          </p>
          {hover[index] ? (
            <>
              <Tooltip title="Delete">
                <IconButton
                  className="delete"
                  aria-label="Delete"
                  sx={{ ml: 2 }}
                  onClick={() => props.handleDelete(newMeal.id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
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
              <EditMeal
                value={props.value}
                show={show}
                setShow={setShow}
                meal={newMeal.meal}
                ingredients={newMeal.ingredients}
                id={newMeal.id}
                forceUpdate={props.forceUpdate}
                handleEdit={props.handleEdit}
                saved={props.saved}
              />
              {props.saved ? (
                <Tooltip title="Add to Calendar">
                  <IconButton
                    className="add-to-calendar"
                    aria-label="Add to Calendar"
                    sx={{ ml: 2 }}
                    onClick={() => {
                      setShowCalendar(true);
                      setSelected({
                        meal: newMeal.meal,
                        ingredients: newMeal.ingredients,
                      });
                    }}
                  >
                    <ScheduleIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              ) : null}
            </>
          ) : null}
          <AddSavedMeal
            value={props.value}
            onChange={props.onChange}
            show={showCalendar}
            setShow={setShowCalendar}
            selected={selected}
          />
          <List key={`ingrs${index}`}>
            {newMeal.ingredients.map((ingredient, index) => (
              <ListItem key={`item${index}`} className="ingrs">
                <ListItemIcon key={`icon${index}`}>
                  <CheckBoxOutlineBlankIcon fontSize="1rem" />
                </ListItemIcon>
                {ingredient.item}: {ingredient.number}
                {ingredient.unit}
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </>
  );
}
