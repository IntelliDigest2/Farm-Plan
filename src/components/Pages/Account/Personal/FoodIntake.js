import React, { useEffect, useRef, useState } from "react";
import { Form, InputGroup, FormGroup, Container } from "react-bootstrap";
import { connect } from "react-redux";
import {
  startData,
  createFoodWasteData,
  createMapData,
} from "./../../../../store/actions/dataActions";
import { Redirect } from "react-router-dom";
import { getFirebase } from "react-redux-firebase";
import { PageWrap } from "../../SubComponents/PageWrap";
import { Dropdown } from "../../SubComponents/Dropdown";
import { DefaultButton } from "../../SubComponents/Button";
import { Divider } from "@mui/material";

const FoodIntake = (props) => {
  const defaultUpload = {
    meal: "Select Meal",
    foodName: "",
    local: true,
    eatingIn: true,
  };

  //Upload state
  const [upload, setUpload] = useState(defaultUpload);

  const updateStateValue = (e) => {
    if (e.target.textContent) {
      setUpload({ ...upload, [e.target.id]: e.target.textContent });
    } else {
      setUpload({ ...upload, [e.target.id]: e.target.value });
    }
  };

  const handleCheckboxTick = (e) => {
    if (e.target.id === "0") {
      setUpload({ ...upload, [e.target.name]: true });
    } else {
      setUpload({ ...upload, [e.target.name]: false });
    }
  };

  const handleFoodIntakeSubmit = () => {
    var uid, masterCollection;
    switch (props.profile.type) {
      case "business_admin":
        masterCollection = "business_users";
        uid = props.auth.uid;
        break;
      case "business_sub":
        masterCollection = "business_users";
        uid = props.profile.admin;
        break;
      case "academic_admin":
        masterCollection = "academic_users";
        uid = props.auth.uid;
        break;
      case "academic_sub":
        masterCollection = "academic_users";
        uid = props.profile.admin;
        break;
      case "farm_admin":
        masterCollection = "farm_users";
        uid = props.auth.uid;
        break;
      case "farm_sub":
        masterCollection = "farm_users";
        uid = props.profile.admin;
        break;
      case "household_admin":
        masterCollection = "household_users";
        uid = props.auth.uid;
        break;
      case "household_sub":
        masterCollection = "household_users";
        uid = props.profile.admin;
        break;
      default:
        masterCollection = "data";
        uid = props.auth.uid;
        break;
    }

    const data = {
      uid: uid,
      masterCollection: masterCollection,
      collection: "writtenFoodIntakeData",
      upload: {
        date: getFirebase().firestore.Timestamp.fromDate(new Date()),
        name: props.profile.firstName + " " + props.profile.lastName,
        ...upload,
      },
    };
    props.createFoodWasteData(data);
    setUpload(defaultUpload);
  };

  if (!props.auth.uid) return <Redirect to="/login" />;

  return (
    <PageWrap
      header="Update Food Intake"
      subtitle="Upload Food Intake"
      goTo="/account"
    >
      <Container fluid className="web-center">
        <Form>
          <FormGroup className="mb-3">
            <Form.Label style={{ backgroundColor: "white" }}>Meal</Form.Label>
            <Dropdown
              id="meal"
              styling="grey dropdown-input"
              data={upload.meal}
              function={(ekey, e) => {
                updateStateValue(e);
              }}
              items={["Breakfast", "Lunch", "Dinner", "Other"]}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label style={{ backgroundColor: "white" }}>
              Food Name
            </Form.Label>
            <Form.Control
              type="text"
              id="foodName"
              onChange={(e) => {
                updateStateValue(e);
              }}
              value={upload.foodName}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label style={{ backgroundColor: "white" }}>
              Local or Non-Local
            </Form.Label>
            <Form.Check
              name="local"
              type="radio"
              id="0"
              label="Local"
              checked={upload.local}
              onChange={(e) => {
                handleCheckboxTick(e);
              }}
            />
            <Form.Check
              name="local"
              type="radio"
              id="1"
              label="Non-Local"
              onChange={(e) => {
                handleCheckboxTick(e);
              }}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label style={{ backgroundColor: "white" }}>
              Eating In or Eating Out
            </Form.Label>
            <Form.Check
              name="eatingIn"
              type="radio"
              id="0"
              label="Eating In"
              checked={upload.eatingIn}
              onChange={(e) => {
                handleCheckboxTick(e);
              }}
            />
            <Form.Check
              name="eatingIn"
              type="radio"
              id="1"
              label="Eating Out"
              onChange={(e) => {
                handleCheckboxTick(e);
              }}
            />
          </FormGroup>
          <EnableSubmit
            upload={upload}
            handleFoodIntakeSubmit={handleFoodIntakeSubmit}
          />
        </Form>
      </Container>
    </PageWrap>
  );
};

const EnableSubmit = (props) => {
  if (props.upload.meal !== "Select Meal" && props.upload.foodName !== "") {
    return (
      <FormGroup className="mb-3">
        <Divider />
        <DefaultButton
          text="Update"
          styling="green"
          onClick={() => {
            props.handleFoodIntakeSubmit();
          }}
        />
      </FormGroup>
    );
  } else {
    return <DefaultButton text="Update" styling="green" disabled="true" />;
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    data: state.firestore.ordered.data,
    user: state.firebase.profile,
    profile: state.firebase.profile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createFoodWasteData: (product) => dispatch(createFoodWasteData(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodIntake);
