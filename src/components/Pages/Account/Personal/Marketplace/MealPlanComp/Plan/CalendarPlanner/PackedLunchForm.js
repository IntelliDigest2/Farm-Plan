import React, { useState } from "react";

export default function PackedLunchForm() {
  const [mealName, setMealName] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission
    console.log("Packed lunch added:", { mealName, ingredients });
    // Reset form fields
    setMealName("");
    setIngredients("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Meal Name:
          <input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Ingredients:
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Add Packed Lunch</button>
    </form>
  );
}