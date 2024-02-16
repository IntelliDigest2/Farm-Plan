import React, { useState, useEffect } from "react";
import { Button,Modal } from "react-bootstrap";
import { connect } from "react-redux";

import "./SchoolMealBox.css"
import Form from 'react-bootstrap/Form';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Dropdown } from "../../../../../SubComponents/Dropdown";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Tooltip from "@mui/material/Tooltip";
import { submitNotification } from "../../../../../lib/Notifications";

import Delete from "./Icons/DeletePlanIcon"; 
import EditIconPlan from "./Icons/EditIconPlan";
import Add from "./Icons/AddIcon";
import AteMealIconPlan from "./Icons/AteMealIconPlan";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { addToMealPlannerData } from "../../../../../../store/actions/marketplaceActions/mealPlannerData";

function SchoolMealsBox(props) {


  //trigger this when updating items
 const [update, setUpdate] = useState(0);
 
 function notify(item) {
  submitNotification(`${item}` + " added to list");
}

 const forceUpdate = () => {
   setUpdate(update + 1);
 };

 // State to keep track of selected meals
const [selectedMeals, setSelectedMeals] = useState([]);
const [selectedMealIsEmpty, setSelectedMealIsEmpty] = useState(true);
const [showModal, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const addToSelectedMeals = (item) => {
  // Check if the item is already in selectedMeals
  const isAlreadySelected = selectedMeals.some((selectedItem) => selectedItem.id === item.id);
  
  // If the item is not already selected, add it
  if (!isAlreadySelected) {
    setSelectedMeals([...selectedMeals, item]);
    setSelectedMealIsEmpty(false);
  }
};

const removeFromSelectedMeal = (item) => {
  let hardCopy = [...selectedMeals];
  hardCopy = hardCopy.filter((mealItem) => mealItem.id !== item.id);
  setSelectedMeals(hardCopy);
};

const mealItems = selectedMeals.map((item, index) => (
  <List>
    <ListItem
      key={`ingr${index}`}
      className="list"
      style={{ alignItems: "flex-end" }}
    >
      <b>{`${item.meal_name}: `} </b>
      &nbsp;
      {/* <input type="text" value={ingr.data} /> */}
      {/* <input type="submit" value="remove" onClick={() => removeFromCart(ingr)} /> */}
      <Tooltip title="Remove">
        <IconButton
          aria-label="Remove"
          sx={{ ml: 2 }}
          onClick={() => {
            removeFromSelectedMeal(item);
          }}
        >
          <HighlightOffIcon fontSize="50" />
        </IconButton>
      </Tooltip>
    </ListItem>
  </List>
));


const addToMealPlanner = () => {
  const mealList = selectedMeals;

  const data = {
    uid: props.profile.uid,
    upload: {
      mealList,
    },
  };

  props.addToMealPlannerData(data);
  submitNotification(
    "Selected Meals has been added to your Meal Planner",
  );
};



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
                <div className="meal-name">{newMeal.meal_name}</div>
                {newMeal.mealType ? (
                  <div className="meal-type">{newMeal.meal_type}</div>
                ) : null}
                <div className="icons">
                  {/* Replace delete and edit buttons with the select button */}
                  
                   <IconButton
                    aria-label="Add to Calendar"
                    sx={{ ml: 2 }}
                    onClick={(e) => {
                      addToSelectedMeals(newMeal)
                      notify(newMeal.meal_name);
                    }}
                  >
                    <AddCircleOutlineIcon fontSize="20" />
                  </IconButton>
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
                      {ingredient.food}: {ingredient.quantity}
                        {ingredient.measure}
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
       <Button
							className="blue-btn shadow-none"
							type="submit"
							onClick={handleShow}
						>
							View Cart
				</Button>
      <Modal show={showModal} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Selected Meals </Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{mealItems.length > 0 ? (
								<>
									{/* Render cart items if the cart is not empty */}
									{mealItems}
								</>
							) : (
								// Display a message when the cart is empty
								<p>Your cart is empty.</p>
							)}
						</Modal.Body>

						<Modal.Footer>
							<Button
								variant="secondary"
								onClick={() => {
                  addToMealPlanner()
									setSelectedMeals([]);
									handleClose();
								}}
							>
								Confirm
							</Button>
							<Button variant="secondary" onClick={handleClose}>
								Cancel
							</Button>
						</Modal.Footer>
					</Modal>

    </>
  );
}

const mapStateToProps = (state) => {
	return {
		profile: state.firebase.profile,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addToMealPlannerData: (item) => dispatch(addToMealPlannerData(item)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolMealsBox);



