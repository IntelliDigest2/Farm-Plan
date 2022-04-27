import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import { connect } from "react-redux";
import { getMealData } from "../../../../../../store/actions/dataActions";

function MyMeals(props) {
  const [meals, setMeals] = useState([]);

  function fetchMeals() {
    var uid;
    switch (props.profile.type) {
      case "business_admin":
        uid = props.auth.uid;
        break;
      case "business_sub":
        uid = props.profile.admin;
        break;
      case "academic_admin":
        uid = props.auth.uid;
        break;
      case "academic_sub":
        uid = props.profile.admin;
        break;
      case "household_admin":
        uid = props.auth.uid;
        break;
      case "household_sub":
        uid = props.profile.admin;
        break;
      default:
        uid = props.auth.uid;
        break;
    }

    const data = {
      uid: uid,
      //decided to group year and month together, should this be changed?
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
    };

    props.getMealData(data);
  }

  //this sends data request
  useEffect(() => {
    if (props.tab === 0) fetchMeals();
  }, [props.value, props.update, props.tab]);

  const updateMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.data.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;

      setMeals((meals) => [
        ...meals,
        {
          meal: mealName,
          ingredients: ingredients,
        },
      ]);
    });
  };

  useEffect(() => {
    updateMeals();
  }, [props.data]);

  return (
    // <p>hewwp me</p>
    <div className="box">
      {meals.map((newMeal, index) => (
        <div className="meal-box" key={`meal-box${index}`}>
          <div className="header">
            <div className="name">
              <p key={`meal${index}`}>
                <b>{newMeal.meal}</b>
              </p>
            </div>
            <div className="close" aria-label="delete meal entry">
              x
            </div>
          </div>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealData: (product) => dispatch(getMealData(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMeals);
