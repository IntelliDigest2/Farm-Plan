import React, { useState, useEffect } from "react";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import MealType from "../Search/mealType";
import { Form, InputGroup, Button } from "react-bootstrap";
import FoodItemSearch from "./InputRecipe/FoodItemSearch";
import "../../../../../../SubComponents/Button.css";
import "../../../../../../Pages/Pages.css"

import { useTranslation, Trans } from 'react-i18next';


import { connect } from "react-redux";
import { createRecipe } from "../../../../../../../store/actions/marketplaceActions/savedMealData";
import { createMealPlanData } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";
import { addToShoppingList } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import { foodIdAPI, nutritionAPI } from "./InputRecipe/NutritionApi";

function AddMealForm(props) {

  const { t } = useTranslation();

  const [mealName, setMealName] = useState("");
  const [mealType, setMealType] = useState("");
  const [err, setErr] = useState("");

  //saves recipe to saved meal list
  const [save, setSave] = useState(true);
  const handleSave = () => {
    setSave(!save);
  };

  //controls local state of ingredient as we fetch data for it,
  //once ingredient is "added" it will be moved to ingredient array
  const defaultLocal = {
    food: "",
    quantity: 0,
    measure: "g", 
    foodId: "",
  };
  const [local, setLocal] = useState(defaultLocal);
  const handleLocal = (e) => {
    if (e.target.textContent) {
      setLocal({ ...local, [e.target.id]: e.target.textContent });
    } else {
      setLocal({ ...local, [e.target.id]: e.target.value });
    }
  };
  const handleFoodSearch = (e) => {
    if (e.target.textContent) {
      setLocal({ ...local, food: e.target.textContent });
    } else {
      setLocal({ ...local, food: e.target.value });
    }
  };

  //when local.food changes, fetch the id for the food item
  //which is needed to fetch nutrition
  const setFoodId = (foodId) => {
    setLocal({ ...local, foodId: foodId });
  };

  const [ingredients, setIngredients] = useState([]);
  const handleIngredient = async () => {
    if (local.food !== "") {
      foodIdAPI(local.food, setFoodId).then(() => {
        setIngredients((ingredients) => [...ingredients, local]);
        setLocal(defaultLocal);
      });
    } else {
      setErr("Please input an ingredient to add.");
    }
  };
  useEffect(() => {
    console.log("ingredients", ingredients);
  }, [ingredients]);

  const ingredientsList = ingredients.map((ingredient, index) => {
    return (
      <li key={index}>
        {ingredient.food}: {ingredient.quantity}
        {ingredient.measure}
      </li>
    );
  });

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //fired when click "done"
  const handleSubmit = () => {
    const data = {
      // month and day are used for the MealPlan db, year and week for the shopping list.
      year: props.value.format("YYYY"),
      month: props.value.format("YYYYMM"),
      week: props.value.format("w"),
      day: props.value.format("DD"),
      upload: {
        meal: mealName,
        mealType: mealType,
        ingredients: ingredients,
        createdAt: new Date()
      },
    };


    if (save) {
      props.createRecipe(data);
      forceUpdate();

    }
    props.createMealPlanData(data);
    forceUpdate();
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        props.handleFormClose();
      }}
    >
      {/* <button
        onClick={() => {
          nutritionAPI(local);
        }}
      >
        send test
      </button> */}
      <Form.Group>
        <Form.Label>{t('description.meal_name')}</Form.Label>
        <Form.Control
          className="signup-input-meal-name"
          type="text"
          id="mealName"
          onChange={(e) => {
            setMealName(e.target.value);
          }}
          required
        />
      </Form.Group>

      <MealType setMealType={setMealType} ownRecipe={true} />

      <div className="ingredient-list">
        <ul>{ingredientsList}</ul>
      </div>

      <Form.Group>
        {/* <Form.Label>Ingredient</Form.Label> */}
        {/* <Form.Control
          type="text"
          id="food"
          onChange={(e) => handleLocal(e)}
          value={local.food}
        /> */}
        <FoodItemSearch handleFoodSearch={handleFoodSearch} />
      </Form.Group>
      <Form.Group>
        <Form.Label>{t('description.weight_volume')}</Form.Label>
        <InputGroup>
          <Form.Control
            className="signup-input-qty"
            id="quantity"
            type="number"
            min="0"
            step=".1"
            onChange={(e) => handleLocal(e)}
            value={local.quantity}
          />
          <Dropdown
            id="measure"
            styling="grey dropdown-input"
            data={local.measure}
            items={["g", "kg", "/", "mL", "L", "/", "tsp", "tbsp", "cups", "units", "pcs", "oz", "lbs"]}
            function={(e) => {
              setLocal({ ...local, measure: e });
            }}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Button
          className="green-btn shadow-none"
          id="add ingredient"
          onClick={() => {
            handleIngredient();
          }}
        >
          {t('description.add_ingredient')}
        </Button>
      </Form.Group>

      <Form.Group className="save-meal-check-box">
        <Form.Check
          type="checkbox"
          id="save-meal-checkbox"
          defaultChecked
          onClick={() => handleSave()}
        />
        <Form.Check.Label htmlFor="save-meal-checkbox">Save meal</Form.Check.Label>
    </Form.Group>


      <div style={{ alignItems: "center" }}>
      <Button className="signup-confirm blue-btn shadow-none" type="submit">
          {t('description.button_done')}
        </Button>
      </div>
    </Form>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMealPlanData: (mealPlan) => dispatch(createMealPlanData(mealPlan)),
    createRecipe: (data) => dispatch(createRecipe(data)),
    addToShoppingList: (data) => dispatch(addToShoppingList(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddMealForm);
