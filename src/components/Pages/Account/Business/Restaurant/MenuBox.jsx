import React, { useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Form, InputGroup } from "react-bootstrap";

import SendToRes from "./Icons/SendToResIcon";
// import Edit from "./Icons/EditIcon";

export default function MenuBox(props) {

  const [seat, setSeat] = useState("");
  const [fullname, setFullname] = useState("");



  console.log("find props", props)
  //console.log("let fetch what weekly props is ==> ", props)
  return (
    <>
      {props.menu.map((newMenu, index) => (
        <div className="meal-box" key={`meal-box${index}`}>
          <div className="ingredients">
             <List
              key={`ingrs${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newMenu.meal}</div>
                {newMenu.restaurantName ? (
                  <div className="meal-type">{newMenu.restaurantName}</div>
                ) : null}

                <div className="meal-name">{newMenu.mealDescription}</div>
                <div className="icons">
                  <SendToRes
                    order={newMenu}
                    forceUpdate={props.forceUpdate}
                    seat={seat}
                    fullname={fullname}
                  />
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
              </ListSubheader>

              {newMenu.ingredients.map((ingredient, index) => (
                <ListItem
                  key={`item${index}`}
                  className="list"
                  style={{ alignItems: "baseline" }}
                >
                    <>
                      <p>
                        {ingredient.food}: {ingredient.quantity}
                        {ingredient.measure}
                      </p>
                    </>
                </ListItem>
              ))}
              <ListItem>
                Price: <div className="meal-name"> {newMenu.mealPrice}</div>
              </ListItem>
              <ListItem>
                <Form>
                <Form.Group>
                  <Form.Label>Seat Reservation</Form.Label>
                  <InputGroup>
                    <Form.Control
                      id="quantity"
                      type="number"
                      min="0"
                      step=".1"
                      onChange={(e) => {
                        setSeat(e.target.value);
                      }}
                      value={seat}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Fullname</Form.Label>
                  <InputGroup>
                    <Form.Control
                      id="quantity"
                      type="text"
                      onChange={(e) => {
                        setFullname(e.target.value);
                      }}
                      value={fullname}
                    />
                  </InputGroup>
                </Form.Group>
                </Form>
              </ListItem>
            </List>
          </div>
        </div>
      ))}
    </>
  );
}
