import React, { useState, useEffect } from "react";
import { Pests } from "./pests";
import Nutrients from "./Nutrients.jsx";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import { Dropdown } from "../../../../SubComponents/Dropdown";

import NumericInput from "react-numeric-input";
import RangeSlider from "react-bootstrap-range-slider";

const cropData = require("./crops.json");

const CropCategories = (props) => {
  const [crop, setCrop] = useState("");
  const [cropIndex, setCropIndex] = useState(0);
  const [amount, setAmount] = useState((100 / props.rows).toFixed(0));

  // Modals
  const [showPests, setShowPests] = useState(false);
  const [showNutrients, setShowNutrients] = useState(false);

  // Tell Farm plan how much we are using
  useEffect(() => {
    props.setRowTotal(amount, props.index);
    updateFarmPlan();
  }, [amount, props.unit, props.land]);

  // Work out the index of the crop for pest/nutrient data
  useEffect(() => {
    var index = -1;
    var filteredObj = cropData.categories[props.cat].find((item, i) => {
      if (item.crop === crop) {
        index = i;
        return i;
      }
    });
    setCropIndex(index);

    updateFarmPlan();
  }, [crop]);

  // Updates the farm plan state array with updated info
  const updateFarmPlan = () => {
    const landMass = props.land * (amount / 100);

    // 1. Make a shallow copy of the array
    let temp_state = [...props.farmPlan];

    // 2. Make a shallow copy of the element you want to mutate
    let temp_element = { ...temp_state[props.index] };

    // 3. Update the property you're interested in
    temp_element = {
      crop: crop,
      percentOfTotal: amount,
      landMass: landMass.toFixed(3),
    };

    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    temp_state[props.index] = temp_element;

    // 5. Set the state to our new copy
    props.setFarmPlan(temp_state);
  };

  return (
    <Row key={props.cat} className="farm-row">
      <Col>
        <img
          src={require(`./Crop Images/${props.cat}-01.png`).default}
          alt={props.cat}
          height={70}
          width={70}
        />
        {props.index + 1}
      </Col>

      <Col>
        <Dropdown
          id="crop"
          styling="green"
          data={`Select ${props.cat}`}
          function={(e) => {
            setCrop(e);
          }}
          items={cropData.categories[props.cat].map((item) => {
            return item.crop;
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
      </Col>

      <Col>
        <label htmlFor="amount">
          <NumericInput
            name="amount"
            min={0}
            max={100}
            value={amount}
            onChange={(e) => setAmount(Number(e).toFixed(1))}
          />
          <span>%</span>
        </label>
        <RangeSlider
          value={amount}
          className="slider"
          onChange={(e) => setAmount(Number(e.target.value).toFixed(1))}
        />
      </Col>
      <Col>
        <div className="d-grid gap-2">
          <Button
            onClick={() => {
              setShowPests(true);
            }}
            className="sub-btn blue-btn"
          >
            Pests
          </Button>
          <Button
            onClick={() => {
              setShowNutrients(true);
            }}
            className="sub-btn green-light-btn"
          >
            Nutrient requirement
          </Button>
        </div>
      </Col>

      <Modal show={showPests} onHide={() => setShowPests(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {crop ? <p>Common pests in {crop}</p> : <p>No data</p>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {crop && cropData.categories[props.cat][cropIndex] && (
            <Pests category={cropData.categories[props.cat][cropIndex].pests} />
          )}
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
            {crop ? (
              <p>Soil nutrient requirements to grow {crop}</p>
            ) : (
              <p>No data</p>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {crop && cropData.categories[props.cat][cropIndex] && (
            <Nutrients data={cropData.categories[props.cat][cropIndex]} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNutrients(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default CropCategories;
