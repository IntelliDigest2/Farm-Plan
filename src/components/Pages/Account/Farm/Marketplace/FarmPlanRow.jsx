import React, { useState, useEffect } from "react"
import { Pests } from "./pests"
import Nutrients from "./Nutrients.jsx"
import { Form, Button, InputGroup, Modal } from "react-bootstrap"
import { Dropdown } from "../../../SubComponents/Dropdown"

import NumericInput from "react-numeric-input"
import RangeSlider from "react-bootstrap-range-slider"

const cropData = require("./crops.json")

const CropCategories = (props) => {
  const [crop, setCrop] = useState(cropData.categories[props.cat][0].crop)
  const [cropIndex, setCropIndex] = useState(0)
  const [amount, setAmount] = useState((100 / props.rows).toFixed(1))

  // Modals
  const [showPests, setShowPests] = useState(false)
  const [showNutrients, setShowNutrients] = useState(false)

  // Tell Farm plan how much we are using
  useEffect(() => {
    props.setRowTotal(amount, props.i)
  }, [amount])

  // Work out the index of the crop for pest/nutrient data
  useEffect(() => {
    var index = -1
    var filteredObj = cropData.categories[props.cat].find((item, i) => {
      if (item.crop === crop) {
        index = i
        return i
      }
    })
    setCropIndex(index)
  }, [crop])

  return (
    <section>
      <article className="" style={{ justifyContent: "space-evenly" }}>
        <div key={props.cat} className="flex">
          <Form.Group>
            <div className="flex crops">
              <Form.Group>
                <img
                  src={require(`./Crop Images/${props.cat}-01.png`).default}
                  alt={props.cat}
                  height={70}
                  width={70}
                />
                {props.i + 1}
              </Form.Group>

              <Form.Group>
                <Dropdown
                  id="crop"
                  styling="green"
                  data={`Select ${props.cat}`}
                  function={(e) => {
                    setCrop(e)
                  }}
                  items={cropData.categories[props.cat].map((item) => {
                    return item.crop
                  })}
                />

                <Form.Control
                  type="text"
                  id="food"
                  className="mt-2"
                  onChange={(e) => setCrop(e.target.value)}
                  value={crop}
                  required
                />
              </Form.Group>

              <Form.Group>
                <p>Select amount of total land</p>
                <RangeSlider
                  value={amount}
                  className="slider"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label htmlFor="amount">
                  <NumericInput
                    name="amount"
                    min={0}
                    max={100}
                    value={amount}
                    onChange={(e) => setAmount(e)}
                  />
                  <span>%</span>
                </label>
              </Form.Group>
              <Form.Group>
                <Button
                  onClick={() => {
                    setShowPests(true)
                  }}
                  className="sub-btn blue-btn"
                >
                  Pests
                </Button>
              </Form.Group>
              <Form.Group>
                <Button
                  onClick={() => {
                    setShowNutrients(true)
                  }}
                  className="sub-btn green-btn"
                >
                  Nutrient requirement
                </Button>
              </Form.Group>
            </div>
          </Form.Group>
        </div>
      </article>

      <Modal show={showPests} onHide={() => setShowPests(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Common pests in {crop}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Pests category={cropData.categories[props.cat][cropIndex].pests} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPests(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNutrients} onHide={() => setShowNutrients(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Soil nutrient requirements to grow {props.cat}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nutrients data={cropData.categories[props.cat][cropIndex]} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNutrients(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  )
}

export default CropCategories
