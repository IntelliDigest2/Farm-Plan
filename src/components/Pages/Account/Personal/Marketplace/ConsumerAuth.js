import React, { useState, useEffect } from "react";

import "../../../SubComponents/Button.css";
import { PageWrap } from "../../../SubComponents/PageWrap";
import { ConsumerLocation } from "./ConsumerLocation";
import { Form, Button } from "react-bootstrap";
import { becomeConsumer } from "../../../../../store/actions/authActions";
import { connect } from "react-redux";

const ConsumerAuth = (props) => {
  const [form, setForm] = useState("start");
  const [cities, addCity] = useState([]);
  const [days, addDay] = useState([]);
  // this is to control the dropdown only
  const [day, setDay] = useState("");
  const [times, addTime] = useState([]);

  //rerender on form change
  useEffect(() => {}, [form]);

  const HandleSubmit = (e) => {
    var data = {
      uid: props.auth.uid,
      upload: {
        email: props.auth.email,
        cities: cities,
        days: days,
        times: times,
      },
      profile: { isConsumer: true },
    };
    props.becomeConsumer(data);
  };

  switch (form) {
    default:
    case "start":
      return (
        <PageWrap goTo="account" header="My Meal Plan" subtitle="Plan To Save">
          <Form>
            <Form.Label>Do you have a meal preparation plan?</Form.Label>
            <Form.Check
              type="radio"
              name="meal-plan"
              label="Yes"
              onClick={HandleSubmit}
            />
            <Form.Check
              type="radio"
              name="meal-plan"
              label="No"
              onClick={() => setForm("location")}
            />
          </Form>
        </PageWrap>
      );
    case "location":
      return (
        <ConsumerLocation
          setForm={setForm}
          addCity={addCity}
          cities={cities}
          setDay={setDay}
          day={day}
          addDay={addDay}
          days={days}
          addTime={addTime}
          times={times}
          message="Thanks for choosing Plan To Save. To serve you better, we need to
           know a preferred location, day and time for picking up your food
           item. It may be close to work or home; whatever works best for you."
        />
      );
    case "autoCreate":
      return (
        <PageWrap goTo="/account" header="My Meal Plan" subtitle="Plan To Save">
          <Form>
            <Form.Group>
              <Form.Label>
                Do you want the tracker to work with you in the next 4 weeks to
                develop a plan?
              </Form.Label>
              <Form.Check
                type="radio"
                name="develop-plan"
                label="Yes"
                // onClick={redirect to food intake}
              />
              <Form.Check type="radio" name="develop-plan" label="No" />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Do you want us to create a plan for you based on your
                availability for pickup and your local suppliers?
              </Form.Label>
              <Form.Check
                type="radio"
                name="create-plan"
                label="Yes"
                onClick={(e) => setForm("develop-plan")}
              />
              <Form.Check
                type="radio"
                name="develop-plan"
                label="No"
                onClick={HandleSubmit}
              />
            </Form.Group>
          </Form>
        </PageWrap>
      );
    case "develop-plan":
      return (
        <PageWrap goto="/account" header="My Meal Plan" subtitle="Plan To Save">
          <p>
            We are onboarding farmers in your location to create a plan for you.
            Check back soon.
          </p>
          <Button className="green-btn" onClick={HandleSubmit}>
            Okay
          </Button>
        </PageWrap>
      );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    becomeConsumer: (consumer) => dispatch(becomeConsumer(consumer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerAuth);
