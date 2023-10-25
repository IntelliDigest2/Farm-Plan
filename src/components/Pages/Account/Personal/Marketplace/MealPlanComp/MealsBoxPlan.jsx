import React, { useState, useEffect } from "react";

import "./MealsBox.css"
import Form from 'react-bootstrap/Form';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Dropdown } from "../../../../../SubComponents/Dropdown";

import Delete from "./Icons/DeletePlanIcon"; 
import EditIconPlan from "./Icons/EditIconPlan";
import Add from "./Icons/AddIcon";
import AteMealIconPlan from "./Icons/AteMealIconPlan";

export default function MealsBox(props) {


  //trigger this when updating items
 const [update, setUpdate] = useState(0);
 
 const forceUpdate = () => {
   setUpdate(update + 1);
 };


  const [filter, setFilter] = useState([]);


  function selectGroup(e) {
    const value = e.target.value;
    const filteredMeal =
      value === "all" ? props.meals : props.meals.filter((p) => p.meal_type[0] === value);
    setFilter(filteredMeal);
  }

  return (
    <>
    <br />
    <p>
      <select onChange={selectGroup}>
        <option value="all">Meal Plan List</option>
        <option value="breakfast">breakfast</option>
        <option value="lunch/dinner">lunch/dinner</option>
        <option value="snack">snack</option>
      </select>
    </p>

      {filter.map((newMeal, index) => (
        <div className="meal-item" key={`meal-box${index}`}>
          <div className="ingredients">
            <List
              key={`ingrs${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newMeal.meal_name}</div>
                {newMeal.mealType ? (
                  <div className="meal-type">{newMeal.meal_type}</div>
                ) : null}
                <div className="icons">
                  <Delete
                    value={props.value}
                    id={newMeal.id}
                    meal_name={newMeal.meal_name}
                    saved={props.saved}
                    forceUpdate={forceUpdate}
                  />
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
                  {newMeal.nonNativeData ? null : (
                    <EditIconPlan
                      value={props.value}
                      meal_name={newMeal.meal_name}
                      ingredients={newMeal.ingredients}
                      id={newMeal.id}
                      forceUpdate={forceUpdate}
                      saved={props.saved}
                    />
                  )}
                  {/* {props.isMealPlan ? (
                    <AteMealIconPlan
                      meal={newMeal}
                      value={props.value}
                      id={newMeal.id}
                    />
                  ) : null} */}
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
                  {newMeal.url ? <a className="meal-url" href={newMeal.url} target="_blank" rel="noopener noreferrer">View Steps</a> : null}
                </ListItem>
            </List>
          </div>
        </div>
      ))}
    </>
  );
}
