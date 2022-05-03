import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { EditMeal } from "./EditMeal";

import { connect } from "react-redux";
import {
  getMealData,
  deleteMealData,
} from "../../../../../../store/actions/marketplaceActions";

function MyMeals(props) {
  const [meals, setMeals] = useState([]);
  const [hover, setHover] = useState({});
  const [show, setShow] = useState(false);
  // const [meal, setMeal] = useState("");
  // const [ingredients, setIngredients] = useState([]);

  const handleDelete = (id) => {
    const iDData = {
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
      id: id,
    };
    props.deleteMealData(iDData);
    props.forceUpdate();
  };

  //this sends data request
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
    };

    if (props.tab === 0) props.getMealData(data);
    // console.log(props.data);
  }, [props.value, props.update, props.tab]);

  const updateMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.data.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;

      setMeals((meals) => [
        ...meals,
        {
          meal: mealName,
          ingredients: ingredients,
          id: id,
        },
      ]);
    });
  };

  useEffect(() => {
    updateMeals();
  }, [props.data]);

  return (
    // <p>hewwp me</p>
    <>
      {meals.map((newMeal, index) => (
        <div
          className="meal-box"
          key={`meal-box${index}`}
          onMouseEnter={() => {
            setHover((prev) => ({ ...prev, [index]: true }));
          }}
          onMouseLeave={() => setHover((prev) => ({ ...prev, [index]: false }))}
        >
          <p key={`meal${index}`}>
            <b>{newMeal.meal}</b>
          </p>
          {hover[index] ? (
            <>
              <Tooltip title="Delete">
                <IconButton
                  className="delete"
                  aria-label="Delete"
                  sx={{ ml: 2 }}
                  onClick={() => handleDelete(newMeal.id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  className="edit"
                  aria-label="Edit"
                  sx={{ ml: 2 }}
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
          <EditMeal
            value={props.value}
            show={show}
            setShow={setShow}
            meal={newMeal.meal}
            ingredients={newMeal.ingredients}
            id={newMeal.id}
            forceUpdate={props.forceUpdate}
          />
          <List key={`ingrs${index}`}>
            {newMeal.ingredients.map((ingredient, index) => (
              <ListItem key={`item${index}`} className="ingrs">
                <ListItemIcon key={`icon${index}`}>
                  <CheckBoxOutlineBlankIcon fontSize="1rem" />
                </ListItemIcon>
                {ingredient.item}: {ingredient.number}
                {ingredient.unit}
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealData: (product) => dispatch(getMealData(product)),
    deleteMealData: (data) => dispatch(deleteMealData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMeals);
