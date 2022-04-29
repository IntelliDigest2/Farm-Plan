import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import AddSavedMeal from "./AddSavedMeal";
import { connect } from "react-redux";
import { getSavedMeals } from "../../../../../../store/actions/marketplaceActions";

const SavedMeals = (props) => {
  const [sMeals, setSMeals] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({});

  //this sends data request
  useEffect(() => {
    if (props.tab === 1) props.getSavedMeals();
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
    // const sorted = sMeals.sort((a, b) => a.meal.localeCompare(b.meal));
    updateSMeals();
    // .then(setSMeals(sorted));
    // console.log(sMeals);
  }, [props.data]);

  return (
    <>
      <AddSavedMeal
        value={props.value}
        onChange={props.onChange}
        show={show}
        setShow={setShow}
        selected={selected}
      />
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
          {sMeals.map((newMeal, index) => (
            <div
              className="meal-box"
              key={`meal-box${index}`}
              title="Add to Calendar"
              onClick={() => {
                setShow(true);
                setSelected({
                  meal: newMeal.meal,
                  ingredients: newMeal.ingredients,
                });
              }}
            >
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
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedMeals: (saved) => dispatch(getSavedMeals(saved)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMeals);
