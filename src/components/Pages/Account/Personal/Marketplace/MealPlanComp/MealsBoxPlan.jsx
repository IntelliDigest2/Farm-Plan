import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import Delete from "./Icons/DeletePlanIcon";
import Edit from "./Icons/EditIcon";
import Add from "./Icons/AddIcon";
import AteMealIcon from "./Icons/AteMealIcon";

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
                      nonNativeData={newMeal.nonNativeData}
                      totalDaily={newMeal.totalDaily}
                      totalNutrients={newMeal.totalNutrients}
                      url={newMeal.url}
                      recipeYield={newMeal.recipeYield}
                    />
                  ) : null}
                  {newMeal.nonNativeData ? null : (
                    <Edit
                      value={props.value}
                      meal={newMeal.meal}
                      ingredients={newMeal.ingredients}
                      id={newMeal.id}
                      forceUpdate={props.forceUpdate}
                      saved={props.saved}
                    />
                  )}
                  {props.isMealPlan ? (
                    <AteMealIcon
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
