import React, { useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import Delete from "./DeleteIcon";
import Edit from "./EditIcon";
import Add from "./AddIcon";

export default function MealsBox(props) {
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
              <Delete
                value={props.value}
                id={newMeal.id}
                forceUpdate={props.forceUpdate}
                saved={props.saved}
              />
              {props.saved ? (
                <Add
                  value={props.value}
                  meal={newMeal.meal}
                  ingredients={newMeal.ingredients}
                  id={newMeal.id}
                  onChange={props.onChange}
                  saved={props.saved}
                />
              ) : null}
              {newMeal.nn ? null : (
                <Edit
                  value={props.value}
                  meal={newMeal.meal}
                  ingredients={newMeal.ingredients}
                  id={newMeal.id}
                  forceUpdate={props.forceUpdate}
                  saved={props.saved}
                />
              )}
            </>
          ) : null}
          <List key={`ingrs${index}`}>
            {newMeal.ingredients.map((ingredient, index) => (
              <ListItem key={`item${index}`} className="ingrs">
                <ListItemIcon key={`icon${index}`}>
                  <CheckBoxOutlineBlankIcon fontSize="1rem" />
                </ListItemIcon>
                {newMeal.nn ? (
                  <p>{ingredient.text}</p>
                ) : (
                  <p>
                    {ingredient.item}: {ingredient.number}
                    {ingredient.unit}
                  </p>
                )}
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </>
  );
}
