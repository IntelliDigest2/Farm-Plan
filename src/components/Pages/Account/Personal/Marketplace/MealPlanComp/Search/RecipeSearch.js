import React, { useState, useEffect } from "react";
import "../../../../../../SubComponents/Button.css";
import { Form, InputGroup, Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { recipeSearch, nextPage } from "./search";
import RecipeList from "./RecipeList";
import MealType from "./mealType";
import CuisineType from "./cuisineType";
import Requirements from "./Requirements";
import InfoModal from "./InfoModal";
import NextBack from "./Next";
import { useTranslation, Trans } from 'react-i18next';


export default function RecipeSearch(props) {

  const { t } = useTranslation();

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  //sends to api
  const [query, setQuery] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [requirements, setRequirements] = useState("");
  //sent back from api
  const [recipes, setRecipes] = useState({});
  const [links, setLinks] = useState("");
  //handles next and back
  const [page, setPage] = useState("");
  // contains list of pages already visited - needed for 'previous' button to function
  const [arrPages, setArrPages] = useState([]);
  // keeps track of page number
  const [pageNumber, setPageNumber] = useState(0);

  // checks if link is already added to array and
  // if not then it adds the link to the array
  function addPageToArray(page) {
    if (arrPages.includes(page)) {
      console.log("Page already in array!");
      return;
    }
    setArrPages((prevArrPages) => [...prevArrPages, page]);
    // console.log("This is the pages array ", arrPages);
  }

  useEffect(() => {
    recipeSearch(
      query,
      mealType,
      cuisineType,
      requirements,
      setRecipes,
      setLinks,
      addPageToArray
    );
    // console.log("recipes", recipes);
    // console.log("Next Page", links);
  }, [query, mealType, cuisineType]);

  useEffect(() => {
    page && nextPage(page, setLinks, setRecipes);
    // console.log("next page", page);
  }, [page]);

  // changes the page number by offset and sets the page variable to the correct link
  function changePage(offset) {
    if (offset > 0) {
      // visiting new page i.e. new link needed
      setPageNumber((oldValue) => oldValue + offset);
      setPage(links.next.href);
      addPageToArray(links.next.href);
    } else if (offset < 0) {
      // visiting previous page i.e. link saved in arrPages
      setPageNumber((oldValue) => (oldValue === 0 ? 0 : oldValue - 1));
      if (pageNumber != 0) setPage(arrPages[pageNumber]);
    }
  }

  return (
    <>
      <div className="basic-title-left">{t('description.search_recipes')}</div>
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
              placeholder={t('description.enter_meal_name')}
              id="query"
              defaultValue={query}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <Button type="submit" className="green-btn shadow-none">
            {t('description.button_search')}
            </Button>
          </InputGroup>
        </Form.Group>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <p>{t('description.meal_type')}</p>
              <div>
                <MealType setMealType={setMealType} />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <p>{t('description.origin')}</p>
              <div>
                <CuisineType setCuisineType={setCuisineType} />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <p>{t('description.requirements')}</p>
              <div>
                <Requirements setRequirements={setRequirements} />
              </div>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
          </Grid>
        </Box>
      </Form>
      <div className="meals">
      <RecipeList
        recipes={recipes}
        query={query}
        value={props.value}
        onChange={props.onChange}
      />
      </div>
      {links ? (
        <NextBack
          links={links}
          pageNumber={pageNumber}
          changePage={changePage}
        />
      ) : null}
    </>
  );
}
