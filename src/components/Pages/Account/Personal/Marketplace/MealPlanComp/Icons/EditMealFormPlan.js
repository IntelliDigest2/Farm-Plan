import React, { useState } from "react";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { editSavedMeal } from "../../../../../../../store/actions/marketplaceActions/savedMealData";
import { editMealDataPlan } from "../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { submitNotification } from "../../../../../../lib/Notifications";
import { useTranslation, Trans } from 'react-i18next';

function EditMealFormPlan(props) {
  const { t } = useTranslation();

  const [mealName, setMealName] = useState(props.meal_name);
  const [ingredients, setIngredients] = useState(props.ingredient);

  const handleSubmit = () => {
    const data = {
      id: props.id,
      upload: {
        meal_name: mealName,
        ingredients: ingredients,
        id: props.id,
      },
    };
      props.editMealDataPlan(data);
      submitNotification("Success", " Item has been updated!");
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
        <Form.Label>{t('description.meal_name')}</Form.Label>
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
            <Form.Label>{t('description.ingredient')}</Form.Label>
            <Form.Control
              type="text"
              id="food"
              onChange={(e) => {
                setIngredients([
                  ...ingredients.slice(0, i),
                  {
                    food: e.target.value,
                    quantity: ingredient.quantity,
                    measure: ingredient.measure,
                  },
                  ...ingredients.slice(i + 1, ingredients.length),
                ]);
              }}
              defaultValue={ingredient.food}
            />
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <Form.Control
                id="quantity"
                type="number"
                min="0"
                step=".1"
                onChange={(e) => {
                  setIngredients([
                    ...ingredients.slice(0, i),
                    {
                      food: ingredient.food,
                      quantity: e.target.value,
                      measure: ingredient.measure,
                    },
                    ...ingredients.slice(i + 1, ingredients.length),
                  ]);
                }}
                defaultValue={ingredient.quantity}
              />
              <Dropdown
                id="measure"
                styling="grey dropdown-input"
                data={ingredient.measure}
                items={["g", "kg", "/", "mL", "L", "cups", "pcs"]}
                function={(e) =>
                  setIngredients([
                    ...ingredients.slice(0, i),
                    {
                      food: ingredient.food,
                      quantity: ingredient.quantity,
                      measure: e,
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
          {t('description.button_done')}
        </Button>
      </div>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editMealDataPlan: (data) => dispatch(editMealDataPlan(data)),
    editSavedMeal: (data) => dispatch(editSavedMeal(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMealFormPlan);
