import React, { useState } from "react";
import { Dropdown } from "../../../../../../SubComponents/Dropdown";
import { Form, InputGroup, Button } from "react-bootstrap";
import "../../../../../../SubComponents/Button.css";
import { connect } from "react-redux";
import { editSavedMeal } from "../../../../../../../store/actions/marketplaceActions/savedMealData";
import { editMealData } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";
import { useTranslation, Trans } from 'react-i18next';

function EditMealForm(props) {

  const { t } = useTranslation();

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
        id: props.id,
        updatedAt: new Date()

      },
    };
    if (props.saved) {
      props.editSavedMeal(data);
      props.forceUpdate();
    } else {
      props.editMealData(data);
      props.forceUpdate();
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
    editMealData: (data) => dispatch(editMealData(data)),
    editSavedMeal: (data) => dispatch(editSavedMeal(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMealForm);
