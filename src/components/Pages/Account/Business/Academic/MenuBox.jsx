import React, { useState } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Form, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import SendToRes from "./Icons/SendToResIconOther";
// import Edit from "./Icons/EditIcon";
import { useTranslation, Trans } from 'react-i18next';


export default function MenuBox(props) {

  const { t } = useTranslation();

  const [seat, setSeat] = useState("0");
  const [reservationDate, setReservationDate] = useState(Date.now());
  const [fullname, setFullname] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message


  // const handleSendToResClick = () => {
  //   // Check if fullname and reservationDate are empty
  //   if (fullname.trim() === "" || !reservationDate) {
  //     setErrorMessage("Please enter fullname and reservation date");
  //   } else {
  //     // Clear any previous error messages
  //     setErrorMessage("");
  //     // Proceed with the logic for sending to reservation
  //     // You may want to update the state or perform other actions here
  //   }
  // };

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
                <div className="meal-name">{newMenu.meal_name}</div>
                {newMenu.restaurantName ? (
                  <div className="meal-type">{newMenu.restaurant_name}</div>
                ) : null}

                <div className="icons">
                  <SendToRes
                    order={newMenu}
                    forceUpdate={props.forceUpdate}
                    seat={seat}
                    fullname={fullname}
                    reservationDate={reservationDate}
                    // onSendToResClick={handleSendToResClick} // Pass the function to handle click

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
                <div className="meal-name">{newMenu.mealDescription}</div>
              </ListItem>
              <ListItem>
                Price: <div className="meal-name"> {newMenu.mealPrice}{newMenu.mealCurrency}</div>
              </ListItem>
            </List>
            </div>
        </div>
      ))}

<List>
            <ListItem>
                <Form>
                <Form.Group>
                  <Form.Label>Seat Reservation</Form.Label>
                  <InputGroup>
                    <Form.Control
                      id="quantity"
                      type="number"
                      min="0"
                      step="1"
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
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <DatePicker 
                    type="text"
                    id="expiry"
                    selected={reservationDate} 
                    onChange={(e) => setReservationDate(e)} 
                    dateFormat="dd/MM/yyyy"  
                  />
                </Form.Group>
                </Form>
              </ListItem>
            </List>
    </>
  );
}
