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

  return (
    <Autocomplete
      onInputChange={(e) => {
        setQuery(e.target.value);
        handleFoodSearch(e);
      }}
      onChange={(e) => {
        handleFoodSearch(e);
      }}
      id="food"
      options={response}
      sx={{ width: "100%", lineHeight: "calc(1.5em + .75rem + 2px)" }}
      renderInput={(params) => <TextField {...params} label="Item" />}
    />
  );
}
