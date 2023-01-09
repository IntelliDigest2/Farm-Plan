import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import "../../../../../../SubComponents/Button.css";

import { recommend } from "../../../../../../../store/actions/marketplaceActions/mealPlanData";

function EatingOut(props) {
  const [restaurant, setRestaurant] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    const data = {
      restaurant: restaurant,
      email: email,
      location: location,
    };
    props.recommend(data);
  };

  return (
    <>
      <div className="basic-title-left">
        <div className="mb-3">
          We have not identified a sustainable restaurant in your location,
          please, recommend a restaurant or check back later.
        </div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            props.handleFormClose();
          }}
        >
          <Form.Group>
            <Form.Label>Restaurant Name.</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setRestaurant(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location.</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Their email address.</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button className="green-btn" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recommend: (data) => dispatch(recommend(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EatingOut);
