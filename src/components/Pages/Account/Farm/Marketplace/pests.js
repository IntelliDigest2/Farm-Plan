import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export const Pests = (props) => {
  return (
    <div
      style={{
        overflowY: "scroll",
        height: "20rem",
        marginBottom: "2%",
      }}
    >
      <List>
        {props.category &&
          props.category.map((pest) => (
            <ListItem key={pest}>
              <a href={`https://www.google.com/search?q=${pest}`}>{pest}</a>
            </ListItem>
          ))}
        {!props.category && <p>No data available</p>}
      </List>
    </div>
  );
};

export default Pests;
