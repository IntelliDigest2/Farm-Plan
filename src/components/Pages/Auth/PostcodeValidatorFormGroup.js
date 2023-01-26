import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { countryNames, countries } from "../../lib/Countries";
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";



export default function PostcodeValidatorFormGroup(props) {

    // const [validated, setValidated] = useState(false);
    const [countryCode, setCountryCode] = useState("");
    const [err, setErr] = useState(false);
  
    useEffect(() => {
      if (props.country) {
        let cc = countries.find((c) => c.name === props.country);
        if(cc)
            setCountryCode(cc.code);
      }
    }, [props.country]);
  
    useEffect(() => {
      if (postcodeValidatorExistsForCountry(countryCode)) {
        // console.log("validator exists", props.postcode, countryCode);
        if (postcodeValidator(props.postcode.trim(), countryCode)) {
        //   setValidated(true);
          // console.log("valid");
          setErr(false);
          props.setValidPostcode(true);
        } else {
          props.setValidPostcode(false);
          setErr(true);
        //   console.log("no");
        }
      } else {
        props.setValidPostcode(true);
      }
    }, [props.postcode]);

    return (
        <div>
        <Form.Label>Postcode</Form.Label>
          <Form.Control type="postcode"
          placeholder="Postcode"
          defaultValue={props.postcode}
          onChange={(e) => props.setPostcode(e.target.value)}
          />
          {err && (
            <div className="err">Please enter a valid postcode.</div>
            )}
        </div>
    )
}