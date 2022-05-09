import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import Add from "./AddIcon";

export default function RecipeList(props) {
  return (
    <>
      {props.query &&
        props.recipes.map((item, i) => (
          <div className="search-box" key={i}>
            <Row>
              <Col className="image">
                <img src={item.recipe.image} alt={`${item.recipe.label}`} />
              </Col>
              <Col className="ingredients">
                <List styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                  <ListSubheader className="heading">
                    <div className="meal-name">{item.recipe.label}</div>
                    <div className="add">
                      <Add
                        value={props.value}
                        meal={item.recipe.label}
                        ingredients={item.recipe.ingredients}
                        onChange={props.onChange}
                        saved={false}
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
                </List>
              </Col>
            </Row>
          </div>
        ))}
    </>
  );
}
