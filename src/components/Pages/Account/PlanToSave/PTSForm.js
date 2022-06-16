import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../../../SubComponents/Button.css";
import { SubButton } from "../../../SubComponents/Button";

import { connect } from "react-redux";
import { becomeConsumer } from "../../../../store/actions/authActions";
import { submitNotification } from "../../../lib/Notifications";

function PTSForm(props) {
  const [validated, setValidated] = useState(false);
  const [postcode, setPostcode] = useState("");

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (postcode) {
      e.preventDefault();
      setValidated(true);
    } else {
      e.preventDefault();
      setValidated(false);
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

  useEffect(() => {
    if (validated) {
      handleFinish();
      // console.log("I'm valid!!!!");
    }
  }, [validated]);

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
          <p>
            In a short while, you will be able to create a 6 month meal plan
            with us that is right for you.
          </p>
          <SubButton text="close" styling="green" onClick={props.handleClose} />
          {/* <p>Choose a base for your 6 month meal plan.</p>
          <SubButton
            text="Omnivore"
            styling="green"
            onClick={() => props.setContent("location")}
          />
          <SubButton
            text="Vegetarian"
            styling="green"
            onClick={() => props.setContent("location")}
          />
          <SubButton
            text="Vegan"
            styling="green"
            onClick={() => props.setContent("location")}
          /> */}
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
          <div className="title" style={{ marginTop: "15%" }}>
            JOIN THE PLAN TO SAVE!
          </div>
          <div className="body">
            <Form
              noValidate
              validated={validated}
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <Form.Group controlId="postcode">
                <p>Your Postcode</p>
                <Form.Control
                  type="text"
                  onChange={(e) => setPostcode(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Postcode.
                </Form.Control.Feedback>
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
