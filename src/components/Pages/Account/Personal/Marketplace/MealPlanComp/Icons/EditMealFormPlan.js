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

  const handleSubmit = async () => {
    // Transform the ingredients array into the desired format
    const formattedIngredients = ingredients.map(
      (ingredient) => `${ingredient.quantity} ${ingredient.measure} ${ingredient.food}`
    );
  
    // Initialize variables to accumulate totalDaily and totalNutrient
    let accumulatedTotalDaily = {};
    let accumulatedTotalNutrient = {};
  
    // Loop through each formatted ingredient
    for (const formattedIngredient of formattedIngredients) {

      console.log("formatted ingr", formattedIngredient)
      try {
        // Make POST request to the nutrition API for each ingredient
        const response = await fetch(
          "https://api.edamam.com/api/nutrition-details?app_id=e829a97b&app_key=3f00720bbf8143e0021ec2853a0f1dcd",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingr: [formattedIngredient] }),
          }
        );
  
        if (!response.ok) {
          if (response.status === 555) {
            console.warn("HTTP 555 error. Skipping to the next iteration.");
            continue; // Skip to the next iteration of the loop
          } else {
            throw new Error("Failed to fetch nutrition details");
          }
        }
  
        const nutritionData = await response.json();
  
        // Assuming nutritionData contains the required details (totalDaily and totalNutrient),
        // accumulate the values
        accumulatedTotalDaily = addTotalDailyValues(accumulatedTotalDaily, nutritionData.totalDaily);
        accumulatedTotalNutrient = addTotalNutrientValues(accumulatedTotalNutrient, nutritionData.totalNutrients);
      } catch (error) {
        console.error("Error fetching nutrition details:", error.message);

    
        // Handle error appropriately
        submitNotification("Error", "Failed to fetch nutrition details");
        return;
      }
    }
  
    // Update the data object with accumulated totalDaily and totalNutrient
    const data = {
      id: props.id,
      upload: {
        meal_name: mealName,
        ingredients: ingredients,
        id: props.id,
        // Include other fields as needed
        total_daily: accumulatedTotalDaily,
        total_nutrients: accumulatedTotalNutrient,
      },
    };
  
    try {
      // Continue with your existing logic
      props.editMealDataPlan(data);
      // console.log("log edited data ===>:", data);
      submitNotification("Success", " Item has been updated!");
      props.forceUpdate();
    } catch (error) {
      console.error("Error updating database:", error.message);
      // Handle error appropriately
      submitNotification("Error", "Failed to update database");
    }
  };
  
  // Helper function to accumulate totalDaily values
  const addTotalDailyValues = (accumulated, current) => {
    // Implement logic to add up the values, e.g., summing up the values for each nutrient
    // Example: (You may need to customize this based on the structure of your data)
    for (const key in current) {
      if (accumulated[key]) {
        accumulated[key] += current[key];
      } else {
        accumulated[key] = current[key];
      }
    }
    return accumulated;
  };
  
  // Helper function to accumulate totalNutrient values
  const addTotalNutrientValues = (accumulated, current) => {
    // Implement logic to add up the values, similar to addTotalDailyValues
    for (const key in current) {
      if (accumulated[key]) {
        accumulated[key] += current[key];
      } else {
        accumulated[key] = current[key];
      }
    }
    return accumulated;
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
