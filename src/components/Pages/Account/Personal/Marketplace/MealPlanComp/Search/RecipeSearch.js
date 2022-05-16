import React, { useState, useEffect } from "react";
import "../../../../../SubComponents/Button.css";
import { Form, InputGroup, Button } from "react-bootstrap";

import { recipeSearch } from "./search";
import RecipeList from "./RecipeList";
import MealType from "./mealType";
import CuisineType from "./cuisineType";
import InfoModal from "./InfoModal";

export default function RecipeSearch(props) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  //sends to api
  const [query, setQuery] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  //sent back from api
  const [recipes, setRecipes] = useState({});

  useEffect(() => {
    recipeSearch(query, mealType, cuisineType, setRecipes);
    // console.log("recipes", recipes);
  }, [query, mealType, cuisineType]);

  return (
    <>
      <div className="basic-title-left">Search Recipes</div>
      <InfoModal show={show} setShow={setShow} />
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
        <div className="refine-search">
          <p>Meal Type:</p>
          <div>
            <MealType setMealType={setMealType} />
          </div>
        </div>
        <div className="refine-search">
          <p>Origin:</p>
          <div>
            <CuisineType setCuisineType={setCuisineType} />
          </div>
        </div>
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
