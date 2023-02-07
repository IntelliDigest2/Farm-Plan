import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Dropdown } from "../../../../../SubComponents/Dropdown";

import Delete from "./Icons/DeletePlanIcon"; 
import Edit from "./Icons/EditIcon";
import Add from "./Icons/AddIcon";
import AteMealIconPlan from "./Icons/AteMealIconPlan";

export default function MealsBox(props) {

  const [filter, setFilter] = useState([]);
  

  function selectGroup(e) {
    const value = e.target.value;
    const filteredMeal =
      value === "all" ? props.meals : props.meals.filter((p) => p.mealType[0] === value);
    setFilter(filteredMeal);
  }

  return (
    <>
    <br />
    <p>
      <select onChange={selectGroup}>
        <option value="all">All</option>
        <option value="breakfast">beakfast</option>
        <option value="lunch/dinner">lunch/dinner</option>
      </select>
    </p>

      {filter.map((newMeal, index) => (
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
                  {/* <Delete
                    value={props.value}
                    id={newMeal.id}
                    forceUpdate={props.forceUpdate}
                    saved={props.saved}
                  /> */}
                  {/* {props.saved ? (
                    <Add
                      value={props.value}
                      meal={newMeal.meal}
                      ingredients={newMeal.ingredients}
                      mealType={newMeal.mealType}
                      id={newMeal.id}
                      onChange={props.onChange}
                      saved={props.saved}
                      nonNativeData={newMeal.nonNativeData}
                      totalDaily={newMeal.totalDaily}
                      totalNutrients={newMeal.totalNutrients}
                      url={newMeal.url}
                      recipeYield={newMeal.recipeYield}
                    />
                  ) : null} */}
                  {/* {newMeal.nonNativeData ? null : (
                    <Edit
                      value={props.value}
                      meal={newMeal.meal}
                      ingredients={newMeal.ingredients}
                      id={newMeal.id}
                      forceUpdate={props.forceUpdate}
                      saved={props.saved}
                    />
                  )} */}
                  {props.isMealPlan ? (
                    <AteMealIconPlan
                      meal={newMeal}
                      value={props.value}
                      id={newMeal.id}
                    />
                  ) : null}
                </div>
              </ListSubheader>

              {newMeal.ingredients.map((ingredient, index) => (
                <ListItem
                  key={`item${index}`}
                  className="list"
                  style={{ alignItems: "baseline" }}
                >
                  {newMeal.nn ? (
                    <>
                      <p>{ingredient.text}</p>
                    </>
                  ) : (
                    <>
                      <p>
                        {ingredient.food}: {ingredient.quantity}
                        {ingredient.measure}
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
