import React, { useEffect, useState } from "react";
import { foodItemApi } from "./FoodItemAPI";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function FoodItemSearch({ handleFoodSearch }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]);

  useEffect(() => {
    foodItemApi(query, setResponse);
  }, [query]);

  // useEffect(() => {
  //   console.log("query", query);
  // });

  // useEffect(() => {
  //   console.log("response", response);
  // }, [response]);

  let options;
  if (query === "") {
    options = ["..."];
  } else {
    options = response;
  }

  return (
    <>
      {query ? (
        <Autocomplete
          onInputChange={(e) => {
            setQuery(e.target.value);
            handleFoodSearch(e);
          }}
          onChange={(e) => {
            handleFoodSearch(e);
          }}
          id="food"
          options={options}
          freeSolo
          sx={{ width: "100%", lineHeight: "calc(1.5em + .75rem + 2px)" }}
          renderInput={(params) => <TextField {...params} label="Item" />}
        />
      ) : (
        <Autocomplete
          onInputChange={(e) => {
            setQuery(e.target.value);
            handleFoodSearch(e);
          }}
          onChange={(e) => {
            handleFoodSearch(e);
          }}
          id="food"
          freeSolo
          options={options}
          getOptionDisabled={(option) => option === options[0]}
          sx={{ width: "100%", lineHeight: "calc(1.5em + .75rem + 2px)" }}
          renderInput={(params) => <TextField {...params} label="Item" />}
        />
      )}
    </>
  );
}
