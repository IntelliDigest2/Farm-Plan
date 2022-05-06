import React from "react";
import { Row, Col } from "react-bootstrap";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export default function RecipeList({ recipes, query }) {
  return (
    <>
      {query &&
        recipes.map((item, i) => (
          <div className="search-box" key={i}>
            <Row>
              <Col className="image">
                <img src={item.recipe.image} alt={`${item.recipe.label}`} />
              </Col>
              <Col className="ingredients">
                <List styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
                  <ListSubheader styles={{ lineHeight: "0.1rem", margin: 0 }}>
                    {item.recipe.label}
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
