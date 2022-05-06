import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import { recipeSearch } from "./search";
import RecipeList from "./RecipeList";

export default function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    recipeSearch(query, setRecipes);
    console.log("recipes", recipes);
    console.log("length", recipes.length);
  }, [query]);

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            id="query"
            defaultValue={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <RecipeList recipes={recipes} query={query} />
    </>
  );
}
