import React, { useEffect, useState } from "react";
import { Select } from "../../../../../../../SubComponents/Dropdown";
import { foodItemApi } from "./FoodItemAPI";

export default function FoodItemSearch({ handleLocal, local }) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]);

  useEffect(() => {
    foodItemApi(query, setResponse);
  }, [query]);

  useEffect(() => {
    console.log("response", response);
  }, [response]);

  return (
    <Select
      id="food"
      function={(e) => {
        setQuery(e.target.value);
      }}
      value={local.food}
      placeholder="food item"
      items={response}
    />
  );
}
