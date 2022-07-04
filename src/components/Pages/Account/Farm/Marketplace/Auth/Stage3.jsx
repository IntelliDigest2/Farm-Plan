import React, { useState, useEffect } from "react";
import "../../../../../SubComponents/Button.css";
import { Form, Button } from "react-bootstrap";
import { Select } from "../../../../../SubComponents/Dropdown";
import { countryNames, countries } from "../../../../../lib/Countries";
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";

export default function Stage3(props) {
  const [countryCode, setCountryCode] = useState("");
  const [validator, setValidator] = useState(false);

  useEffect(() => {
    if (props.country) {
      let cc = countries.find((c) => c.name === props.country);
      setCountryCode(cc.code);
    }
  }, [props.country]);

  useEffect(() => {
    if (postcodeValidatorExistsForCountry(countryCode)) {
      // console.log("validator exists", props.postcode, countryCode);
      if (postcodeValidator(props.postcode, countryCode)) {
        setValidator(false);
      } else {
        setValidator(true);
      }
    } else {
      setValidator(false);
    }
  }, [props.postcode]);

  const handleSubmit = () => {
    if (!validator) {
      props.setForm(4);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {props.existing ? (
        <h5 className="mb-3">Farm Location</h5>
      ) : (
        <h5 className="mb-3">
          We would like to take your details now in order to connect you to your
          local community and have everything in place for when your farm is
          ready.
        </h5>
      )}
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Farm Name"
          id="farm-name"
          onChange={(e) => props.setFarm(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Address line 1"
          id="address-1"
          onChange={(e) => props.setAddress1(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Address line 2"
          id="address-2"
          onChange={(e) => props.setAddress2(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Town"
          id="town"
          onChange={(e) => props.setTown(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Select
          id="country"
          function={(e) => {
            props.setCountry(e.target.value);
          }}
          value={props.country}
          placeholder="Country"
          items={countryNames}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Postcode"
          id="postcode"
          onChange={(e) => props.setPostcode(e.target.value)}
          required
        />
      </Form.Group>
      {validator && <div className="err"> Please enter a valid postcode</div>}
      <Button type="submit" className="blue-btn shadow-none">
        Next
      </Button>
    </Form>
  );
}
