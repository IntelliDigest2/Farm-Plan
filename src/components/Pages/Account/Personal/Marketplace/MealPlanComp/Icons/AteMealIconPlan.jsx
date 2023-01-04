import React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RestaurantIcon from "@mui/icons-material/Restaurant";

import { connect } from "react-redux";
import { editMealData } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";
import {
  getInventory,
  RemoveFromInventory,
  updateQuantity
} from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { useEffect } from "react";
import { submitNotification } from "../../../../../../lib/Notifications";

//takes props value, id and forceUpdate from a meal item and whether or not it is saved
function AteMealIconPlan(props) {

  //needs id passed to it from onClick
  const handleEat = (id) => {
    // const data = {
    //   month: props.value.format("YYYYMM"),
    //   day: props.value.format("DD"),
    //   id: id,
    // };
    // //saved meals and calendar meals are in different places in firestore
    // if (props.saved) {
    //   props.deleteSavedMeal(data);
    //   props.forceUpdate();
    // } else {
    //   props.deleteMealData(data);
    //   props.forceUpdate();
    // }

    //props.getInventory();

    // props.meal.ingredients.forEach((ingredient) => {
    //   props.inventory.forEach((inventoryItem) => {
    //     if (
    //       ingredient.food.toLowerCase() === inventoryItem.item.toLowerCase()
    //     ) {
    //       console.log(ingredient.food, "- Item found in inventory, delete");
    //       const data = {
    //         id: inventoryItem.id,
    //       };
    //       props.removeFromInventory(data);
    //     }
    //   });
    // });
    submitNotification(
      "Success",
      "Food has been marked as eaten"
    );

    var getMeal = props.meal
    //console.log("grr =====>", getMeal.meal)
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
          }}
        >
          <RestaurantIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
    inventory: state.mealPlan.inventory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // deleteMealData: (data) => dispatch(deleteMealData(data)),
    // deleteSavedMeal: (data) => dispatch(deleteSavedMeal(data)),
    getInventory: () => dispatch(getInventory()),
    removeFromInventory: (data) => dispatch(RemoveFromInventory(data)),
    editMealData: (data) => dispatch(editMealData(data)),
    updateQuantity: (data) => dispatch(updateQuantity(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AteMealIconPlan);
