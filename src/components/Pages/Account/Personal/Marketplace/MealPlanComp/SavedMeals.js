import React, { useState, useEffect } from "react";

import MealsBox from "./MealsBox";
import { connect } from "react-redux";
import {
  getSavedMeals,
  deleteMealData,
} from "../../../../../../store/actions/marketplaceActions";

const SavedMeals = (props) => {
  const [sMeals, setSMeals] = useState([]);

  //this sends data request
  useEffect(() => {
    if (props.tab === 1) props.getSavedMeals();
  }, [props.tab]);

  const handleDelete = (id) => {
    const iDData = {
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
      id: id,
    };
    props.deleteMealData(iDData);
    props.forceUpdate();
  };

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
        <MealsBox
          forceUpdate={props.forceUpdate}
          meals={sMeals}
          saved={true}
          handleDelete={handleDelete}
          value={props.value}
        />
        {/* <div className="saved-meals">
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
        </div> */}
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
    deleteMealData: (data) => dispatch(deleteMealData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedMeals);
