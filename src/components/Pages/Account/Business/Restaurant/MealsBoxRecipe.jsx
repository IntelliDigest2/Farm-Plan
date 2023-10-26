import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

// import Delete from "./Icons/DeleteIcon";
// import Edit from "./Icons/EditIcon";
import { Row, Col } from "react-bootstrap";


export default function MealsBoxRecipe(props) {

  //console.log("let fetch what weekly props is ==> ", props)
  console.log(props.meals,`these are all the menus`)

  const mealIngredients = (ingredients)=>{
   return ingredients.map((ingredient)=>{
      return <span>{ingredient.food} {ingredient.metric}{ingredient.metricUnit}</span>
    })
  }
  return (
    <>
      {props.meals.map((meal, index) => (
        <div className="meal-box" key={`meal-box${index}`}>
          <div >
             <List
              key={`ingrs${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{meal.meal}</div>
                </ListSubheader>
                <ListItem>
                <Row >
                  <Col md='4'>
                  {/* <div > */}
                <img style={{display: 'cover'}} src={meal.imageURL} alt={meal.meal} width={'250px'}></img>

                  {/* </div> */}
                  </Col>
                  <Col md='8'>
                  <div style={{padding: '10px'}}>
                  <div className="meal-type"> {meal.menuSection}</div>
                  {/* <div >Meal Id: {meal.id}</div> */}
                 <div>
                  Ingredients:
                 { mealIngredients(meal.ingredients)}
                 </div>
                 
                  <div >Meal Description: {meal.mealDescription}</div>
                  <div >Meal Price: {meal.mealPrice}</div>
                  </div></Col>
                  
                  
                </Row>
                </ListItem>
                
                  
                
                <div className="icons">
                  {/* <Delete
                    value={props.value}
                    id={newMeal.id}
                    forceUpdate={props.forceUpdate}
                    saved={props.saved}
                  /> */}
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
                </div>
             

              {/* {newMeal.ingredients.map((ingredient, index) => (
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
              ))} */}
              {/* <ListItem>
                {newMeal.url ? <a href={newMeal.url}>{newMeal.url}</a> : null}
              </ListItem> */}
            </List>
          </div>
        </div>
      ))}
    </>
  );
}
