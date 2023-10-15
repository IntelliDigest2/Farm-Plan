import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import "./MealsBox.css"
import Delete from "./Icons/DeleteIcon";
import Edit from "./Icons/EditIcon";
import Add from "./Icons/AddIcon";
import AteMealIcon from "./Icons/AteMealIcon";
import AteMealIconPlan from "./Icons/AteMealIconPlan";

export default function MealsBox(props) {

  return (
    <>
      {props.weeklyMeals.map((newMeal, index) => (
        <div className="meal-item" key={`meal-box${index}`}>
          <div className="ingredients">
            <List
              key={`ingrs${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newMeal.meal_name}</div>
                {newMeal.meal_type ? (
                  <div className="meal-type">{newMeal.meal_type}</div>
                ) : null}
                <div className="icons">
                  {/* <Delete
                    value={props.value}
                    id={newMeal.id}
                    forceUpdate={props.forceUpdate}
                    saved={props.saved}
                  /> */}
                  {props.saved ? (
                    <Add
                      value={props.value}
                      meal_name={newMeal.meal_name}
                      ingredients={newMeal.ingredients}
                      meal_type={newMeal.meal_type}
                      id={newMeal.id}
                      onChange={props.onChange}
                      saved={props.saved}
                      non_native_data={newMeal.non_native_data}
                      total_daily={newMeal.total_daily}
                      total_nutrients={newMeal.total_nutrients}
                      url={newMeal.url}
                      recipe_yield={newMeal.recipe_yield}
                    />
                  ) : null}
                  {newMeal.nonNativeData ? null : (
                    <Edit
                      value={props.value}
                      meal_name={newMeal.meal_name}
                      ingredients={newMeal.ingredients}
                      id={newMeal.id}
                      forceUpdate={props.forceUpdate}
                      saved={props.saved}
                    />
                  )}
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
                  {newMeal.url ? <a className="meal-url" href={newMeal.url} target="_blank" rel="noopener noreferrer">View Steps</a> : null}
                </ListItem>
            </List>
          </div>
        </div>
      ))}

{props.meals.map((newMeal, index) => (
        <div className="meal-item" key={`meal-box${index}`}>
          <div className="ingredients">
             <List
              key={`ingrs${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newMeal.meal_name}</div>
                {newMeal.meal_type ? (
                  <div className="meal-type">{newMeal.meal_type}</div>
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
                      meal_name={newMeal.meal_name}
                      ingredients={newMeal.ingredients}
                      meal_type={newMeal.meal_type}
                      id={newMeal.id}
                      onChange={props.onChange}
                      saved={props.saved}
                      non_native_data={newMeal.non_native_data}
                      total_daily={newMeal.total_daily}
                      total_nutrients={newMeal.total_nutrients}
                      url={newMeal.url}
                      recipe_yield={newMeal.recipe_yield}
                    />
                  ) : null}
                  {newMeal.non_native_data ? null : (
                    <Edit
                      value={props.value}
                      meal_name={newMeal.meal_name}
                      ingredients={newMeal.ingredients}
                      id={newMeal.id}
                      forceUpdate={props.forceUpdate}
                      saved={props.saved}
                    />
                  )}
                  {props.isMealPlan || newMeal.eaten == true ? (
                    <AteMealIcon
                      meal={newMeal}
                      value={props.value}
                      id={newMeal.id}
                      eaten={true}
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
                  {newMeal.url ? <a className="meal-url" href={newMeal.url} target="_blank" rel="noopener noreferrer">View Steps</a> : null}
                </ListItem>
            </List>
          </div>
        </div>
      ))}
    </>
  );
}
