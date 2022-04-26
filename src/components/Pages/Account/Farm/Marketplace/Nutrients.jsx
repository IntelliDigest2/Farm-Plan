import React, { useState, useEffect } from "react"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListSubheader from "@mui/material/ListSubheader"

import { fs } from "../../../../../config/fbConfig"
import { connect } from "react-redux"
import { getFirestoreData } from "../../../../../store/actions/dataActions"

export const Nutrients = (props) => {
  return (
    <List>
      {props.data.phosphorus && (
        <>
          <h3>Phosphorus: {props.data.phosphorus}</h3>
          <h3>Potassium: {props.data.potassium}</h3>
          <h3>Potassium: {props.data.potassium}</h3>
        </>
      )}
      {!props.data.phosphorus && <p>No data available</p>}
    </List>
  )
}

export default Nutrients
