import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import { connect } from "react-redux";
import { getSavedMeals } from "../../../../../../store/actions/dataActions";

const SavedMeals = (props) => {
  const [sMeals, setSMeals] = useState([]);

  function fetchSMeals() {
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
    };

    props.getSavedMeals(data);
  }

  //this sends data request
  useEffect(() => {
    if (props.tab === 1) fetchSMeals();
  }, [props.tab]);

  const updateSMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setSMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.data.forEach((doc) => {
      var mealName = doc.meal;
      var ingredients = doc.ingredients;

      setSMeals((sMeals) => [
        ...sMeals,
        {
          meal: mealName,
          ingredients: ingredients,
        },
      ]);
    });
  };

  useEffect(() => {
    updateSMeals();
    console.log(props.data);
  }, [props.data]);

  return (
    <>
      <div className="header" style={{ paddingLeft: "1%" }}>
        My Saved Meals
      </div>
      <div
        style={{
          overflowY: "scroll",
          maxHeight: "25rem",
          marginBottom: "2%",
        }}
      >
        <div className="saved-meals">
          {sMeals.sort().map((newMeal, index) => (
            <div className="meal-box" key={`meal-box${index}`}>
              <p key={`meal${index}`}>
                <b>{newMeal.meal}</b>
              </p>
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
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedMeals: (saved) => dispatch(getSavedMeals(saved)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMeals);
