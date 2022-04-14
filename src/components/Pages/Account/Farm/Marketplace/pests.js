import React, { useState, useEffect } from "react"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListSubheader from "@mui/material/ListSubheader"

import { fs } from "../../../../../config/fbConfig"
import { connect } from "react-redux"
import { getFirestoreData } from "../../../../../store/actions/dataActions"

var nutrients = require("./nutrients.json").data

export const Pests = (props) => {
  // when fetching data, use the function setPests to create array of pests
  const [pests, setPests] = useState([])

  useEffect(() => {
    getCategories()

    // putFakeData()

    // putNewCollection()

    //use fetch request here, useEffect means that the list will update whenever the food category is changed (I'm assuming category is the deciding factor in deciding the pests- if not we can just change that)
    setPests(["red", "blue", "yellow", "green"])
  }, [props.category])

  const getCategories = async () => {
    let theNutrients = []
    nutrients.forEach((nutrient) => {
      fs.collection("crops")
        .doc(nutrient.grouping)
        .collection(nutrient.crop)
        .doc(nutrient.crop)
        .get()
        .then((snapshot) => {
          theNutrients.push(nutrient.crop)
          console.log(snapshot.data())
        })
        .catch((error) => console.log(error))
    })
    console.log(theNutrients)
    return theNutrients
  }

  const putNewCollection = async () => {
    nutrients.forEach((nutrient) => {
      fs.collection("crops")
        .doc(nutrient.grouping)
        .collection(nutrient.crop)
        .doc(nutrient.crop)
        .set(
          {
            nitrogen: nutrient.nitrogen,
            phosphorus: nutrient.phosphorus,
            potassium: nutrient.potassium,
          },
          { merge: true }
        )
        .then((snapshot) => {
          console.log(snapshot)
        })
        .catch((error) => console.log(error))
    })
  }

  const putFakeData = async () => {
    fs.collection("pests")
      .doc("Herbs")
      .collection("Parsley")
      .doc("Parsley")
      .set({ pests: ["789", "10"] }, { merge: true })
      .then((snapshot) => {
        console.log(snapshot)
      })
      .catch((error) => console.log(error))
  }

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
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

// Maps specific function calls to dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    getFirestoreData: (product) => dispatch(getFirestoreData(product)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pests)
