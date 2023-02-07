import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import ListHeader from "@mui/material/ListHeader";

// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

// import Delete from "./Icons/DeleteIcon";
// import Edit from "./Icons/EditIcon";
// import Add from "./Icons/AddIcon";
// import AteMealIcon from "./Icons/AteMealIcon";

export default function MenuItem(props) {
  return (
    <>
      {props.meals.map((newMeal, index) => (
        <div className="menu-item" key={`menu-item${index}`}>
          
          <div className="ingredients">
            
            <List
              // key={`ingrs${index}`}
              // styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newMeal.meal}</div>

                {/* {newMeal.mealType ? (
                  <div className="meal-type">{newMeal.mealType}</div>
                ) : null} */}

                {newMeal.menuSection ? (
                  <div className="menu-section">{newMeal.menuSection}</div>
                ) : null}
                
                {newMeal.mealDescription ? (
                  <div className="meal-description">{newMeal.mealDescription}</div>
                ) : null}            

                {newMeal.mealPrice ? (
                  <div className="meal-price">{newMeal.mealPrice}</div>
                ) : null}
               
              
              </ListSubheader>

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
