import React, { useState, useEffect } from "react";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import MealType from "../Search/mealType";
import { Form, InputGroup, Button } from "react-bootstrap";
import FoodItemSearch from "./InputRecipe/FoodItemSearch";
import "../../../../../../SubComponents/Button.css";

import { connect } from "react-redux";
import { createRecipe } from "../../../../../../../store/actions/marketplaceActions/savedMealData";
import { createMealPlanData } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";
import { addToShoppingList } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import { foodIdAPI, nutritionAPI } from "./InputRecipe/NutritionApi";

function AddMealForm(props) {
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
      },
    };

    console.log("checking props:", props)
    props.createMealPlanData(data);
    forceUpdate();

    if (save) {
      props.createRecipe(data);
    }
    props.addToShoppingList(data);
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
        <Form.Label>Meal Name</Form.Label>
        <Form.Control
          type="text"
          id="mealName"
          onChange={(e) => {
            setMealName(e.target.value);
          }}
          required
        />
      </Form.Group>

      <MealType setMealType={setMealType} ownRecipe={true} />

      <div style={{ padding: "0 0 0 4%" }}>
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
        <Form.Label>Amount</Form.Label>
        <InputGroup>
          <Form.Control
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
            items={["g", "kg", "/", "mL", "L", "/", "tsp", "tbsp", "cups", "unit"]}
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
          Add Ingredient
        </Button>
      </Form.Group>

      <Form.Group>
        <Form.Check
          type="checkbox"
          defaultChecked
          label="Save meal"
          onClick={() => handleSave()}
        />
      </Form.Group>

      <div style={{ alignItems: "center" }}>
        <Button className="blue-btn shadow-none" type="submit">
          Done
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
