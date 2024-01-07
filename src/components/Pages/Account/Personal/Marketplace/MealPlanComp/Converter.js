import React, { useState } from 'react';
import { Dropdown, Form, FormGroup, InputGroup, Button } from 'react-bootstrap'
import "../../../../../SubComponents/Button.css";


const MeasurementConverter = () => {
  const [quantity, setQuantity] = useState('');
  const [fromMeasure, setFromMeasure] = useState('kg');
  const [toMeasure, setToMeasure] = useState('g');
  const [convertedQuantity, setConvertedQuantity] = useState(null);

  const convertMeasurement = () => {
    const conversionFactors = {
      kg: { g: 1000 },
      g: { kg: 0.001 },
      mL: { L: 0.001 },
      L: { mL: 1000 },
      tsp: { tbsp: 3 },
      tbsp: { tsp: 1 / 3 },
      cups: { mL: 240 },
      mL: { cups: 1 / 240 },
      units: { pcs: 1 },
      pcs: { units: 1 },
      oz: { lbs: 1 / 16 },
      lbs: { oz: 16 },
    };

    if (!(fromMeasure in conversionFactors) || !(toMeasure in conversionFactors[fromMeasure])) {
      setConvertedQuantity('Conversion not supported');
      return;
    }

    const conversionFactor = conversionFactors[fromMeasure][toMeasure];
    const converted = parseFloat(quantity) * conversionFactor;
    setConvertedQuantity(converted);
  };

  return (
    <div>
  <FormGroup>
    <InputGroup>
      <Form.Control
        placeholder="Enter quantity"
        className="signup-input-meal-name"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
    </InputGroup>
  </FormGroup>

  <FormGroup>
  <Form.Label>From</Form.Label>
    <Dropdown onSelect={(e) => setFromMeasure(e)}>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        {fromMeasure}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {["g", "kg", "mL", "L", "tsp", "tbsp", "cups", "units", "pcs", "oz", "lbs"].map((item) => (
          <Dropdown.Item key={item} eventKey={item}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </FormGroup>

  <FormGroup>
  <Form.Label>To</Form.Label>

    <Dropdown onSelect={(e) => setToMeasure(e)}>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
        {toMeasure}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {["g", "kg", "mL", "L", "tsp", "tbsp", "cups", "units", "pcs", "oz", "lbs"].map((item) => (
          <Dropdown.Item key={item} eventKey={item}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  </FormGroup>

  <div>
    <Button onClick={convertMeasurement}>Convert</Button>
  </div>

  <div>
    <p>Converted Quantity: {convertedQuantity !== null ? convertedQuantity : 'N/A'}</p>
  </div>
</div>

  );
};

export default MeasurementConverter;
