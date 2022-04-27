import React, { useState } from "react";
import { Dropdown } from "../../../../SubComponents/Dropdown";
import { Form, InputGroup, Button } from "react-bootstrap";
import "./../../../../SubComponents/Button.css";

import { connect } from "react-redux";
import {
  createMealPlanData,
  createSavedMeal,
} from "../../../../../../store/actions/dataActions";

function AddMealForm(props) {
  const [mealName, setMealName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [save, setSave] = useState(true);

  const defaultLocal = {
    item: "",
    number: 0,
    unit: "g",
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
        {ingredient.item}: {ingredient.number}
        {ingredient.unit}
      </li>
    );
  });

  const handleSubmit = () => {
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
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
      upload: {
        meal: mealName,
        ingredients: ingredients,
      },
    };

    props.createMealPlanData(data);
    props.forceUpdate();

    if (save) {
      props.createSavedMeal(data);
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

      <div style={{ padding: "0 0 0 4%" }}>
        <ul>{ingredientsList}</ul>
      </div>

      <Form.Group>
        <Form.Label>Ingredient</Form.Label>
        <Form.Control
          type="text"
          id="item"
          onChange={(e) => handleLocal(e)}
          value={local.item}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Amount</Form.Label>
        <InputGroup>
          <Form.Control
            id="number"
            type="number"
            min="0"
            step=".1"
            onChange={(e) => handleLocal(e)}
            value={local.number}
          />
          <Dropdown
            id="unit"
            styling="grey dropdown-input"
            data={local.unit}
            items={["g", "kg", "/", "mL", "L", "cups", "pcs"]}
            function={(e) => {
              setLocal({ ...local, unit: e });
            }}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Button
          className="green-btn"
          id="add-new-ing"
          onClick={(e) => {
            setIngredients((ingredients) => [...ingredients, local]);
            setLocal(defaultLocal);
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
        <Button className="blue-btn" type="submit">
          Done
        </Button>
      </div>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createMealPlanData: (data) => dispatch(createMealPlanData(data)),
    createSavedMeal: (data) => dispatch(createSavedMeal(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMealForm);
