import React, { useState, useEffect } from "react"

import "../../../SubComponents/Button.css"

import Weather from "./Weather"
import FarmPlanRow from "./FarmPlanRow"

import { PageWrap } from "../../../SubComponents/PageWrap"
import { Dropdown } from "../../../SubComponents/Dropdown"
import NumericInput from "react-numeric-input"
import { PopUp } from "../../../SubComponents/PopUp"
import SellerAuth from "./SellerAuth"

import { Form, Button, InputGroup } from "react-bootstrap"
import { connect } from "react-redux"
import { createMarketplaceData } from "../../../../../store/actions/dataActions"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"

import moment from "moment"
import { Crop } from "@mui/icons-material"

const cropDB = require("./crops.json")
const landUnits = ["Km²", "M²", "Hct"]

const AddProductsFarm = (props) => {
  const [land, setLand] = useState(0)
  const [unit, setUnit] = useState(landUnits[0])

  const [farmPlan, setFarmPlan] = useState([])

  const [rows, setRows] = useState(6)
  const [totalUsed, setTotalUsed] = useState(100)
  const [totals, setTotals] = useState([])
  const [comment, setComment] = useState(false)

  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState("")

  const setRowTotal = (data, i) => {
    totals[i] = Number(data)
    const initialValue = 0
    const sumWithInitial = totals.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    )
    setTotalUsed(sumWithInitial)
  }

  useEffect(() => {
    if (props.auth.error)
      setMsg(
        "There was an error connnecting to the database - please try again"
      )
  }, [props.auth.error])

  function handleSubmit(e) {
    e.preventDefault()

    if (totalUsed > 100) {
      setMsg("Total crop volume exceed 100%")
      return
    }

    var data = {
      uid: props.auth.uid,
      upload: {
        ...farmPlan,
        totalLand: land,
        landUnits: unit,
        comment: comment,
      },
    }

    props.createMarketplaceData(data)
    setOpen(true)
  }

  if (!props.profile.isSeller) {
    return <SellerAuth />
  } else {
    return (
      <>
        <PageWrap
          goTo="/account"
          header="Sell Products"
          subtitle="Build your plan"
        >
          <Form
            className="form-layout"
            style={{ padding: "10px" }}
            onSubmit={handleSubmit}
          >
            <p>
              We recommend that you plant a range of different crops within your
              field. Crop rotation has been proven to increase yield and
              minimise the damage of pests and disease
            </p>

            <Form.Group className="mb-3 land">
              <Form.Label>Amount of land</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  id="weight"
                  onChange={(e) => setLand(e.target.value)}
                  value={land}
                  min={1}
                  max={10000}
                  required
                />
                <Dropdown
                  id="unit"
                  styling="green dropdown-input-right"
                  data={unit}
                  function={(e) => {
                    setUnit(e)
                  }}
                  items={landUnits}
                />
              </InputGroup>
            </Form.Group>

            {Object.keys(cropDB.categories).map((category, index) => (
              <Form.Group className="farm-row" key={category}>
                <FarmPlanRow
                  rows={rows}
                  cat={category}
                  index={index}
                  setRowTotal={setRowTotal}
                  setFarmPlan={setFarmPlan}
                  farmPlan={farmPlan}
                  land={land}
                  unit={unit}
                />
              </Form.Group>
            ))}

            <h3 className={totalUsed > 100 ? "auth-error" : "success"}>
              Total of land used: {totalUsed.toFixed(0)}%
            </h3>

            {/* <Button className="sub-btn blue-btn">Add row</Button> */}

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

            {msg && <p className="auth-error">{msg}</p>}
            <Button type="submit" className="sub-btn blue-btn">
              Submit
            </Button>
          </Form>
        </PageWrap>
        <PopUp
          open={open}
          onClose={() => {
            setOpen(false)
          }}
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
