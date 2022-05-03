import React, { useEffect, useState } from "react";
import { Dropdown } from "../../../../SubComponents/Dropdown";
import { Form, InputGroup, Button } from "react-bootstrap";
import "./../../../../SubComponents/Button.css";

import { connect } from "react-redux";
import { editMealData } from "../../../../../../store/actions/marketplaceActions";

function EditMealForm(props) {
  const [mealName, setMealName] = useState(props.meal);
  const [ingredients, setIngredients] = useState(props.ingredient);

  const handleSubmit = () => {
    const data = {
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD"),
      id: props.id,
      upload: {
        meal: mealName,
        ingredients: ingredients,
      },
    };

    props.editMealData(data);
    props.forceUpdate();
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
          defaultValue={mealName}
          onChange={(e) => {
            setMealName(e.target.value);
          }}
        />
      </Form.Group>

      {ingredients.map((ingredient, i) => (
        <div className="form" key={i}>
          <Form.Group>
            <Form.Label>Ingredients</Form.Label>
            <Form.Control
              type="text"
              id="item"
              onChange={(e) => {
                setIngredients([
                  ...ingredients.slice(0, i),
                  {
                    item: e.target.value,
                    number: ingredient.number,
                    unit: ingredient.unit,
                  },
                  ...ingredients.slice(i + 1, ingredients.length),
                ]);
              }}
              defaultValue={ingredient.item}
            />
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <Form.Control
                id="number"
                type="number"
                min="0"
                step=".1"
                onChange={(e) => {
                  setIngredients([
                    ...ingredients.slice(0, i),
                    {
                      item: ingredient.item,
                      number: e.target.value,
                      unit: ingredient.unit,
                    },
                    ...ingredients.slice(i + 1, ingredients.length),
                  ]);
                }}
                defaultValue={ingredient.number}
              />
              <Dropdown
                id="unit"
                styling="grey dropdown-input"
                data={ingredient.unit}
                items={["g", "kg", "/", "mL", "L", "cups", "pcs"]}
                function={(e) =>
                  setIngredients([
                    ...ingredients.slice(0, i),
                    {
                      item: ingredient.item,
                      number: ingredient.number,
                      unit: e,
                    },
                    ...ingredients.slice(i + 1, ingredients.length),
                  ])
                }
              />
            </InputGroup>
          </Form.Group>
        </div>
      ))}

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
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editMealData: (data) => dispatch(editMealData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMealForm);
