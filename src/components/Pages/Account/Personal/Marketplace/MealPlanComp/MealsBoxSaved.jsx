import React from "react";

import "./MealsBox.css"


import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import SaveMealPlanIconPlan from "./Icons/SaveMealPlanIconPlan";

export default function MealsBoxSaved(props) {

  return (
    <>

      {props.meals.map((newMeal, index) => (
        <div className="meal-item" key={`meal-box${index}`}>
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
                  <SaveMealPlanIconPlan 
                    mealType={newMeal.mealType}
                    meal={newMeal.meal}
                    ingredients={newMeal.ingredients}
                    totalNutrients={newMeal.totalNutrients ? (newMeal.totalNutrients) : null}
                    totalDaily={newMeal.totalDaily ? (newMeal.totalDaily) : null}
                    recipeYield={newMeal.recipeYield ? (newMeal.recipeYield) : null}
                  />
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
              
            </List>
          </div>
        </div>
      ))}
    </>
  );
}
