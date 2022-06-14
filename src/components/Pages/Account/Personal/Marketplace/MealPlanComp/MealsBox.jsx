import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";

import ShoppingIcon from "./Icons/ShoppingIcon";
import Delete from "./Icons/DeleteIcon";
import Edit from "./Icons/EditIcon";
import Add from "./Icons/AddIcon";

export default function MealsBox(props) {
  return (
    <>
      {props.meals.map((newMeal, index) => (
        <div className="meal-box" key={`meal-box${index}`}>
          <div className="ingredients">
            <List
              key={`ingrs${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newMeal.meal}</div>
                {newMeal.mealType ? (
                  <div className="meal-type">{newMeal.mealType}</div>
                ) : null}
                <div className="icons">
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
                      mealType={newMeal.mealType}
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
                </div>
              </ListSubheader>

              {newMeal.ingredients.map((ingredient, index) => (
                <ListItem
                  key={`item${index}`}
                  className="list"
                  style={{ alignItems: "flex-end" }}
                >
                  {newMeal.nn ? (
                    <>
                      <ListItemIcon key={`icon${index}`}>
                        <ShoppingIcon
                          ingredient={ingredient.food}
                          value={props.value}
                          id={newMeal.id}
                          index={index}
                        />
                      </ListItemIcon>
                      <p>{ingredient.text}</p>
                    </>
                  ) : (
                    <>
                      <ListItemIcon key={`icon${index}`}>
                        <ShoppingIcon
                          ingredient={ingredient.item}
                          value={props.value}
                          id={newMeal.id}
                          index={index}
                        />
                      </ListItemIcon>
                      <p>
                        {ingredient.item}: {ingredient.number}
                        {ingredient.unit}
                      </p>
                    </>
                  )}
                </ListItem>
              ))}
              <ListItem>
                {newMeal.url ? <a href={newMeal.url}>{newMeal.url}</a> : null}
              </ListItem>
            </List>
          </div>
        </div>
      ))}
    </>
  );
}
