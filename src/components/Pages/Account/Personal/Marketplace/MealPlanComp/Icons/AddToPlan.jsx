import React, { useState } from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RestaurantIcon from "@mui/icons-material/Restaurant";

import { connect } from "react-redux";
import { editDiaryData, editMealData, getSingleMealDiary } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";
import {
  getInventory,
  RemoveFromInventory,
  updateQuantity,
} from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { useEffect } from "react";
import { submitNotification } from "../../../../../../lib/Notifications";

//takes props value, id and forceUpdate from a meal item and whether or not it is saved
function AteMealIcon(props) {

  const [eaten, setEaten] = useState(false);


  //needs id passed to it from onClick
  const handleEat = (id) => {
   
    submitNotification(
      "Success",
      "Food has just been marked as eaten"
    );

    var getMeal = props.meal

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
        meal: getMeal.meal,
        //mealType: getMeal.mealType,
        ingredients: getMeal.ingredients,
        id: getMeal.id,
        nn: getMeal.nn,
        url: getMeal.url,
        totalNutrients: getMeal.totalNutrients,
        totalDaily: getMeal.totalDaily,
        recipeYield: getMeal.recipeYield,
      },
    };
    
    props.editMealData(data);
    // props.forceUpdate();
  };
  
  // to add eaten value to meal plan to manage button activity. could be done better?
  const handleEatIcon = (id) => {

    var getMeal = props.meal

    const data = {
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
      id: props.id,
      upload: {
        eaten: true,
      },
    };
    
    props.editDiaryData(data);

    // props.forceUpdate();
  };

  const getEatenState = (id) => {

    var getMeal = props.meal

    const data = {
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
      id: props.id,
    };
    
    props.getSingleMealDiary(data);
    // console.log("getting id ...", props.singleMealDiary)
    // props.forceUpdate();
  };

  useEffect(() => {
    getEatenState()
    // if (props.singleMealDiary.eaten == true) {
    //   setEaten(true)
    // }
  }, [props.editDiaryData]);


  return (
    <>
      <Tooltip title="Mark meal as eaten">
        <IconButton
          aria-label="Mark meal as eaten"
          sx={{ ml: 2 }}
          onClick={() => {
            // handleDelete(props.id);
            handleEat();
            handleEatIcon();
          }}
        >
           { props.singleMealDiary.eaten == true ? (
                    <><RestaurantIcon fontSize="inherit" color="secondary" /></>
                  ):(<><RestaurantIcon fontSize="inherit" /></>)}
                  {/* <RestaurantIcon fontSize="inherit" /> */}
        </IconButton>
      </Tooltip>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
    inventory: state.mealPlan.inventory,
    singleMealDiary: state.mealPlan.singleMealDiary,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // deleteMealData: (data) => dispatch(deleteMealData(data)),
    // deleteSavedMeal: (data) => dispatch(deleteSavedMeal(data)),
    getInventory: () => dispatch(getInventory()),
    removeFromInventory: (data) => dispatch(RemoveFromInventory(data)),
    editMealData: (data) => dispatch(editMealData(data)),
    editDiaryData: (data) => dispatch(editDiaryData(data)),
    getSingleMealDiary: (data) => dispatch(getSingleMealDiary(data)),
    updateQuantity: (data) => dispatch(updateQuantity(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AteMealIcon);
