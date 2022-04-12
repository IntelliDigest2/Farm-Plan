import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";

export const Pests = ({ category }) => {
  // when fetching data, use the function setPests to create array of pests
  const [pests, setPests] = useState([]);

  useEffect(() => {
    //use fetch request here, useEffect means that the list will update whenever the food category is changed (I'm assuming category is the deciding factor in deciding the pests- if not we can just change that)
    setPests(["red", "blue", "yellow", "green"]);
  }, [category]);

  return (
    <div
      style={{
        overflowY: "scroll",
        height: "10rem",
        marginBottom: "2%",
      }}
    >
      <List>
        <ListSubheader>Susceptible Pests</ListSubheader>
        {pests.map((pest) => (
          <ListItem key={pest}>{pest}</ListItem>
        ))}
      </List>
    </div>
  );
};
