import React from "react";
import { Row, Col } from "react-bootstrap";
import "../MealsBox.css"

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Add from "../Icons/AddIcon";
import SaveMealIcon from "../Icons/SaveMealIcon";

export default function RecipeList(props) {
  return (
    <>
      {props.query &&
        props.recipes.map((item, i) => (
          <div className="meal-item" key={i}>
            <Row>
              <Col className="image">
                <img src={item.recipe.image} alt={`${item.recipe.label}`} />
              </Col>
              <Col className="ingredients">
                <List styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                  <ListSubheader className="heading">
                    <div className="meal-name">{item.recipe.label}</div>
                    <div className="icons">
                      <Add
                        value={props.value}
                        meal_type={item.recipe.mealType}
                        meal_name={item.recipe.label}
                        ingredients={item.recipe.ingredients}
                        url={item.recipe.url}
                        total_nutrients={item.recipe.totalNutrients}
                        total_daily={item.recipe.totalDaily}
                        recipe_yield={item.recipe.yield}
                        onChange={props.onChange}
                        saved={false}
                      />
                      <SaveMealIcon 
                        value={props.value}
                        meal_type={item.recipe.mealType}
                        meal_name={item.recipe.label}
                        ingredients={item.recipe.ingredients}
                        url={item.recipe.url}
                        total_nutrients={item.recipe.totalNutrients}
                        total_daily={item.recipe.totalDaily}
                        recipe_yield={item.recipe.yield}
                      /> 
                    </div>
                  </ListSubheader>
                  {item.recipe.ingredients &&
                    item.recipe.ingredients.map((ingredient, i) => (
                      <ListItem key={i} className="list">
                        <ListItemIcon>
                          <CheckBoxOutlineBlankIcon fontSize="1rem" />
                        </ListItemIcon>
                        {ingredient.text}
                      </ListItem>
                    ))}
                  <a className="meal-url" href={item.recipe.url} target="_blank" rel="noopener noreferrer">View Steps</a>
                </List>
              </Col>
            </Row>
          </div>
        ))}
    </>
  );
}
