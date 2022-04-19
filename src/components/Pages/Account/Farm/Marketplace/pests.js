import React, { useState, useEffect } from "react"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListSubheader from "@mui/material/ListSubheader"

import { fs } from "../../../../../config/fbConfig"
import { connect } from "react-redux"
import { getFirestoreData } from "../../../../../store/actions/dataActions"

export const Pests = (props) => {
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

        {props.category &&
          props.category.map((pest) => (
            <ListItem key={pest}>
              <a href={`https://www.google.com/search?q=${pest}`}>{pest}</a>
            </ListItem>
          ))}
      </List>
    </div>
  )
}

export default Pests
