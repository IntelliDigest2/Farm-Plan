import React, { useState, useEffect } from "react";
import "../../../../../SubComponents/Button.css";
import { Form, InputGroup, Button } from "react-bootstrap";

import { recipeSearch } from "./search";
import RecipeList from "./RecipeList";
import MealType from "./mealType";

export default function RecipeSearch(props) {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [mealType, setMealType] = useState("");
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    recipeSearch(query, mealType, setRecipes);
    // console.log("recipes", recipes);
  }, [query, mealType]);

  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <Form.Group>
          <InputGroup>
            <Form.Control
              className="shadow-none"
              type="text"
              id="query"
              defaultValue={query}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Button type="submit" className="green-btn shadow-none">
              Search
            </Button>
          </InputGroup>
        </Form.Group>
        <MealType setMealType={setMealType} />
      </Form>
      <RecipeList
        recipes={recipes}
        query={query}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}
