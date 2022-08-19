import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../../../SubComponents/Button.css";
import { SubButton } from "../../../SubComponents/Button";

import { Select } from "../../../SubComponents/Dropdown";
import { countryNames, countries } from "../../../lib/Countries";
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";

import { connect } from "react-redux";
import { becomeConsumer } from "../../../../store/actions/authActions";
import { submitNotification } from "../../../lib/Notifications";

function PTSForm(props) {
  const [validated, setValidated] = useState(false);
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [postcode, setPostcode] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (country) {
      let cc = countries.find((c) => c.name === country);
      setCountryCode(cc.code);
    }
  }, [country]);

  useEffect(() => {
    if (postcodeValidatorExistsForCountry(countryCode)) {
      // console.log("validator exists", postcode, countryCode);
      if (postcodeValidator(postcode.trim(), countryCode)) {
        setValidated(true);
        // console.log("valid");
        setErr(false);
      } else {
        setValidated(false);
        setErr(true);
        // console.log("no");
      }
    } else {
      setValidated(true);
    }
  }, [postcode]);

  // useEffect(() => {
  //   console.log(validated);
  // }, [validated]);

  const handleSubmit = (e) => {
    // const form = e.currentTarget;

    if (!err) {
      e.preventDefault();
      handleFinish();
      // console.log("I'm valid!!!!");
    } else {
      e.preventDefault();
      console.log("prevented");
      e.stopPropagation();
    }
  };

  const handleFinish = () => {
    var data = {
      uid: props.auth.uid,
      upload: {
        postcode: postcode,
      },
      profile: { isConsumer: true },
    };
    props.becomeConsumer(data);
    submitNotification(
      "Success",
      "Thanks for joining the plan to save! You have taken a huge step in making food sustainable for everybody."
    );
    props.setContent("6month");
    props.handleClose();
  };

  useEffect(() => {}, [props.content]);

  switch (props.content) {
    default:
    case "start":
      return (
        <>
          <div className="title">JOIN THE PLAN TO SAVE!</div>
          <div className="body">
            <p>Thanks for choosing to plan your meals with us!</p>
            <p>
              A six month meal plan will help you to eat more nutritious food by
              ordering and collecting the food in advance.
            </p>
            <p>
              Through the Plan to Save, your six month meal plan will be shared
              with local farmers to influence their own planning. With the
              secure knowledge that your food will not go to waste, they can
              focus on adopting sustainable farm practices that produce more
              nutritious food with a better impact on the environment.
            </p>
            <p>
              Find out more about the Plan to Save{" "}
              <a href="https://intellidigest.com/services/plan-to-save/">
                here
              </a>
            </p>
            <SubButton
              text="Start Now!"
              styling="green"
              onClick={() => props.setContent("6month")}
            />
          </div>
        </>
      );
    case "6month":
      return (
        <>
          <div className="title" style={{ marginTop: "15%" }}>
            JOIN THE PLAN TO SAVE!
          </div>
          <div className="body">
            <p>Do you have a six month meal plan already?</p>
            <Row className="mt-5">
              <Col>
                <SubButton
                  text="Yes"
                  styling="green"
                  onClick={() => props.setContent("location")}
                />
              </Col>
              <Col>
                <SubButton
                  text="No"
                  styling="green"
                  onClick={() => props.setContent("choose")}
                />
              </Col>
            </Row>
          </div>
        </>
      );
    case "choose":
      return (
        <div className="body">
          {/* <p>
            In a short while, you will be able to create a 6 month meal plan
            with us that is right for you.
          </p> */}
          {/* <SubButton text="close" styling="green" onClick={props.handleClose} /> */}
          <p>Choose a base for your 6 month meal plan.</p>
          <SubButton
            text="Omnivore"
            styling="green"
            // onClick={}
          />
          <SubButton
            text="Vegetarian"
            styling="green"
            // onClick={}
          />
          <SubButton
            text="Vegan"
            styling="green"
            // onClick={}
          />
        </div>
      );
    case "refine":
      return (
        <div className="body">
          <p>this content is still in development</p>
        </div>
      );
    case "location":
      return (
        <>
          <div className="title" style={{ marginTop: "10%" }}>
            JOIN THE PLAN TO SAVE!
          </div>
          <div className="body">
            <Form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <Form.Group>
                <p>Your Country</p>
                <Select
                  id="country"
                  function={(e) => {
                    setCountry(e.target.value);
                  }}
                  value={country}
                  placeholder="Country"
                  items={countryNames}
                />
              </Form.Group>
              <Form.Group controlId="postcode">
                <p>Your Postcode</p>
                <Form.Control
                  type="text"
                  onChange={(e) => setPostcode(e.target.value)}
                  required
                />
                {err && (
                  <div className="err">Please enter a valid postcode.</div>
                )}
              </Form.Group>
              <Button type="submit" className="sub-btn green-btn shadow-none">
                <div className="basic-title">Finish</div>
              </Button>
            </Form>
          </div>
        </>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    becomeConsumer: (consumer) => dispatch(becomeConsumer(consumer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PTSForm);
