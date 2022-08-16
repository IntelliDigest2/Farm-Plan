//based on addmealform.js



import React, { useState } from "react";
import { Dropdown } from "../../../../SubComponents/Dropdown";
import MealType from "../../Personal/Marketplace/MealPlanComp/Search/mealType";
import { Form, InputGroup, Button } from "react-bootstrap";
// import "../../../../../../SubComponents/Button.css";
// import "./Button.css";


import { connect } from "react-redux";
import { createRecipe } from "../../../../../store/actions/marketplaceActions/savedMealData";
import { createMealPlanData } from "../../../../../store/actions/marketplaceActions/mealPlanData";
import { addToShoppingList } from "../../../../../store/actions/marketplaceActions/shoppingListData";

function AddListItem(props) {
  // const [mealName, setMealName] = useState("");
  // const [mealType, setMealType] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [save, setSave] = useState(true);

  const defaultLocal = {
    food: "",
    quantity: 0,
    measure: "g",
  };
  const [local, setLocal] = useState(defaultLocal);
  const handleLocal = (e) => {
    if (e.target.textContent) {
      setLocal({ ...local, [e.target.id]: e.target.textContent });
    } else {
      setLocal({ ...local, [e.target.id]: e.target.value });
    }
  };

  const ingredientsList = ingredients.map((ingredient, index) => {
    return (
      <li key={index}>
        {ingredient.food}: {ingredient.quantity}
        {ingredient.measure}
      </li>
    );
  });

  //fired when click "done"
  const handleSubmit = () => {
    const data = {
      // month and day are used for the MealPlan db, year and week for the shopping list.
      year: props.value.format("YYYY"),
      month: props.value.format("YYYYMM"),
      //need to send shopping list data to be bough the previous week from the day it is made
      week: props.value.format("w") - 1,
      day: props.value.format("DD"),
      upload: {
        // meal: mealName,
        // mealType: mealType,
        ingredients: ingredients,
      },
    };

    props.createMealPlanData(data);
    props.addToShoppingList(data);
    props.forceUpdate();

    if (save) {
      props.createRecipe(data);
    }
  };

  const handleSave = () => {
    if (!save) {
      setSave(true);
    } else {
      setSave(false);
    }
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        props.handleFormClose();
      }}
    >
      {/* <Form.Group>
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

      <MealType setMealType={setMealType} ownRecipe={true} /> */}

      <div style={{ padding: "0 0 0 4%" }}>
        <ul>{ingredientsList}</ul>
      </div>

      <Form.Group>
        <Form.Label>Product</Form.Label>
        <Form.Control
          type="text"
          id="food"
          onChange={(e) => handleLocal(e)}
          value={local.food}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Quantity</Form.Label>
        <InputGroup>
          <Form.Control
            id="quantity"
            type="number"
            min="0"
            step="1"
            onChange={(e) => handleLocal(e)}
            value={local.quantity}
          />
          <Dropdown
            id="measure"
            styling="grey dropdown-input"
            data={local.measure}
            items={[
              "g",
              "kg",
              "/",
              "mL",
              "L",
              "/",
              "pcs",
            ]}
            function={(e) => {
              setLocal({ ...local, measure: e });
            }}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Button
          className="green-btn shadow-none"
          id="add-new-ing"
          onClick={(e) => {
            setIngredients((ingredients) => [...ingredients, local]);
            setLocal(defaultLocal);
          }}
        >
          Add Product
        </Button>
      </Form.Group>

      {/* <Form.Group>
        <Form.Check
          type="checkbox"
          defaultChecked
          label="Save meal"
          onClick={() => handleSave()}
        />
      </Form.Group> */}

      <div style={{ alignItems: "center" }}>
        <Button className="blue-btn shadow-none" type="submit">
          Submit order
        </Button>
      </div>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createMealPlanData: (data) => dispatch(createMealPlanData(data)),
    createRecipe: (data) => dispatch(createRecipe(data)),
    addToShoppingList: (data) => dispatch(addToShoppingList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddListItem);
