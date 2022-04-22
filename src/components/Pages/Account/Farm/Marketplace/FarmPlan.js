import React, { useState, useEffect } from "react"

import "../../../SubComponents/Button.css"
import { Pests } from "./pests"
import Weather from "./Weather"
import CropCategories from "./CropCategories"

import { PageWrap } from "../../../SubComponents/PageWrap"
import { Dropdown } from "../../../SubComponents/Dropdown"
import { PopUp } from "../../../SubComponents/PopUp"
import SellerAuth from "./SellerAuth"

import { Form, Button, InputGroup } from "react-bootstrap"
import { connect } from "react-redux"
import { createMarketplaceData } from "../../../../../store/actions/dataActions"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
// import { getFirebase} from 'react-redux-firebase'
// import DisplayError from '../pages/DisplayError'
import moment from "moment"
import { Crop } from "@mui/icons-material"
// import { fs } from "../../../../config/fbConfig";
// import { Autocomplete } from "@material-ui/lab";
// import { TextField } from "@material-ui/core";

const cropDB = require("./crops.json")

const dailyTabTime = moment().format("ddd MMM Do YYYY")

const AddProductsFarm = (props) => {
  const [cropCategory, setCropCategory] = useState(
    Object.keys(cropDB.categories)[0]
  )

  const [crop, setCrop] = useState(
    cropDB.categories[Object.keys(cropDB.categories)[0]][0].crop
  )

  const [pests, setPests] = useState()

  const [weight, setWeight] = useState(0)
  const [unit, setUnit] = useState("kg")

  //followed by an option to give the food composition, carbs, protein, fibre, fat etc, not a priority.
  const [producedLocally, setProducedLocally] = useState(false)

  const [price, setPrice] = useState(0.0)
  const [currency, setCurrency] = useState("GBP (£)")

  const [expires, setExpires] = useState(dailyTabTime)
  const [comment, setComment] = useState(false)
  //image upload
  // set a "my products" list to update whenever someone uploads an item, so they can see all of their available listings (and sold products?)
  //put ghg things in a separate lil box so it's obvious that they are not form items
  //on hover make it have a little detail about why we include the info.
  // const [ghg, setGhg] = useState([0, "kgCO2", 1.54, "£"]);

  //pop up
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    // Sets the crop dropdown to be the first crop in the category
    setCrop(cropDB.categories[cropCategory][0].crop)
  }, [cropCategory])

  useEffect(() => {
    // Sets the pest list to be the first crop in the category
    const pestList = cropDB.categories[cropCategory].filter((item) => {
      return item.crop == crop
    })
    if (pestList[0]) setPests(pestList[0].pests)
  }, [crop])

  function HandleSubmit() {
    var data = {
      uid: props.auth.uid,
      upload: {
        food: crop,
        category: cropCategory,
        weight: [weight, unit],
        producedLocally: producedLocally,
        price: [price, currency],
        expires: expires,
        comment: comment,
      },
    }
    if (crop !== "" && weight !== 0) {
      props.createMarketplaceData(data)
      handleClickOpen()
    } else {
      console.log("error")
    }
  }

  //data for dropdown
  const dropdown = {
    measurements: ["kg", "g", "/", "oz", "lbs", "/", "l", "ml"],
    currencies: ["GBP (£)", "USD ($)", "EUR (€)"],
  }

  if (!props.profile.isSeller) {
    return <SellerAuth />
  } else {
    return (
      <>
        <PageWrap goTo="/account" header="Sell Products" subtitle="Add an Item">
          <Form
            className="form-layout"
            style={{ padding: "10px" }}
            onSubmit={(e) => {
              e.preventDefault()
              HandleSubmit()
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Crop Category</Form.Label>
              <CropCategories
                onClick={(e) => {
                  setCropCategory(e)
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Crop</Form.Label>
              <div className="flex crops">
                <Dropdown
                  id="crop"
                  styling="green"
                  data={crop}
                  function={(e) => {
                    setCrop(e)
                  }}
                  items={cropDB.categories[cropCategory].map((item) => {
                    return item.crop
                  })}
                />

                <Form.Control
                  type="text"
                  id="food"
                  className="ml-2"
                  onChange={(e) => setCrop(e.target.value)}
                  value={crop}
                  required
                />
              </div>
            </Form.Group>

            <Pests category={pests} />

            <Form.Group>
              <Form.Label>Weight</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  id="weight"
                  onChange={(e) => setWeight(e.target.value)}
                  value={weight}
                  required
                />
                <Dropdown
                  id="unit"
                  styling="green dropdown-input-right"
                  data={unit}
                  function={(e) => {
                    setUnit(e)
                  }}
                  items={dropdown.measurements}
                />
              </InputGroup>
            </Form.Group>

            <Weather />

            <Form.Group>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Comments"
                id="comment"
                name="comment"
                onChange={(e) => {
                  setComment(e.target.value)
                }}
              />
            </Form.Group>

            <Button type="submit" className="sub-btn blue-btn">
              Submit
            </Button>
          </Form>
        </PageWrap>
        <PopUp
          open={open}
          onClose={handleClose}
          text="View my products"
          to="/view-products"
        >
          Item Successfully Submitted!
        </PopUp>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    data: state.firestore.ordered.data,
    profile: state.firebase.profile,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createMarketplaceData: (product) =>
      dispatch(createMarketplaceData(product)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return []
    return [
      {
        collection: "data",
        doc: props.auth.uid,
      },
    ]
  })
)(AddProductsFarm)
