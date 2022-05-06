import React from "react";

import List from "@mui/material/List";

export const Nutrients = (props) => {
  return (
    <List>
      {props.data.phosphorus && (
        <>
          <h3>Phosphorus: {props.data.phosphorus} Kg/Ha</h3>
          <h3>Potassium: {props.data.potassium} Kg/Ha</h3>
          <h3>Potassium: {props.data.potassium} Kg/Ha</h3>
        </>
      )}
      {!props.data.phosphorus && <p>No data available</p>}
    </List>
  );
};

export default Nutrients;
