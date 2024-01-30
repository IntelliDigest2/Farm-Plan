import React, { useState} from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RestaurantIcon from "@mui/icons-material/Restaurant";

import { connect } from "react-redux";
import { editNewPlanData, getPlanData, updateNewPlanData } from "../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { editMealData, getSingleMealPlan } from "../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import {
  getInventory,
  RemoveFromInventory,
  updateQuantity
} from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { useEffect } from "react";
import { submitNotification } from "../../../../../../lib/Notifications";

//takes props value, id and forceUpdate from a meal item and whether or not it is saved
function AteMealIconPlan(props) {

  const [eaten, setEaten] = useState(false);

    //trigger this when editing/deleting items
    const [update, setUpdate] = useState(0);
    const forceUpdate = () => {
      setUpdate(update + 1);
    };

  //needs id passed to it from onClick
  const handleEat = (id) => {
   
    submitNotification(
      "Success",
      "Food has been marked as eaten"
    );

    var getMeal = props.meal
    //console.log("grr =====>", getMeal)
    var ingr = getMeal.ingredients

    ingr.forEach(e => {

      const updateQty = {
      
        id: e.food,
        quantity: e.quantity,
      };
      //console.log("we up again ==>", updateQty)
      props.updateQuantity(updateQty)
    });

    const data = {
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
      id: props.id,
      upload: {
       eaten: true,
        meal_name: getMeal.meal_name,
        //mealType: getMeal.mealType,
        ingredients: getMeal.ingredients,
        id: getMeal.id,
        nn: getMeal.nn,
        url: getMeal.url,
        total_nutrients: getMeal.total_nutrients,
        total_daily: getMeal.total_daily,
        recipe_yield: getMeal.recipe_yield,
      },
    };

    props.editMealData(data);
    props.updateNewPlanData(data)
    forceUpdate();
  };

  // // to add eaten value to meal plan to manage button activity. could be done better?
  // const handleEatIcon = (id) => {

  //   var getMeal = props.meal

  //   const data = {
  //     id: props.id,
  //     upload: {
  //       eaten: true,
  //     },
  //   };
    
  //   props.editNewPlanData(data);

  //   // props.forceUpdate();
  // };

  const getEatenState = (id) => {

    const data = {
      id: props.id,
    };
    
  props.getSingleMealPlan(data);

  // props.forceUpdate();
  };



  useEffect(() => {
   // getEatenState()

    // if (props.singleMealDiary.eaten == true) {
    //   setEaten(true)
    // }

  }, [props.editMealData, update]);


  useEffect(() => {
    // console.log(props.meal.ingredients);
    // for each ingredient
    // for each item in inventory
    // if ingredient in inventory
    // delete item from inventory
    // props.meal.ingredients.forEach((ingredient) => {
    //   props.inventory.forEach((inventoryItem) => {
    //     if (ingredient.food === inventoryItem.item) {
    //       console.log(ingredient.food, "- Item found in inventory, delete");
    //       const data = {
    //         id: inventoryItem.id,
    //       };
    //     }
    //   });
    // });
  }, [props.inventory]);

  return (
    <>
      <Tooltip title="Mark meal as eaten">
        <IconButton
          aria-label="Mark meal as eaten"
          sx={{ ml: 2 }}
          onClick={() => {
            // handleDelete(props.id);
            handleEat();
            // handleEatIcon();
            getEatenState()

          }}
        >
          { props.meal.eaten == true ? (
                    <><RestaurantIcon fontSize="inherit" color="secondary" /></>
                  ):(<><RestaurantIcon fontSize="inherit" /></>)}
                  {/* <RestaurantIcon fontSize="inherit" color="secondary" /> */}
        </IconButton>
      </Tooltip>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
    inventory: state.mealPlan.inventory,
    singleMealPlan: state.mealPlanner.singleMealPlan,
    newPlan: state.mealPlanner.newPlan,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // deleteMealData: (data) => dispatch(deleteMealData(data)),
    // deleteSavedMeal: (data) => dispatch(deleteSavedMeal(data)),
    getInventory: () => dispatch(getInventory()),
    removeFromInventory: (data) => dispatch(RemoveFromInventory(data)),
    editMealData: (data) => dispatch(editMealData(data)),
    editNewPlanData: (data) => dispatch(editNewPlanData(data)),
    updateQuantity: (data) => dispatch(updateQuantity(data)),
    getSingleMealPlan: (data) => dispatch(getSingleMealPlan(data)),
    getPlanData: (data) => dispatch(getPlanData(data)),
    updateNewPlanData: (data) => dispatch(updateNewPlanData(data))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AteMealIconPlan);
