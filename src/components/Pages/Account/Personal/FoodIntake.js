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
import { PageWrap } from "../../../SubComponents/PageWrap";
import { Select } from "../../../SubComponents/Dropdown";
import { DefaultButton } from "../../../SubComponents/Button";
import { Divider } from "@mui/material";
import { submitNotification } from "../../../lib/Notifications";

//Typeahead documentation/examples found at: https://ericgio.github.io/react-bootstrap-typeahead/
import { AsyncTypeahead } from "react-bootstrap-typeahead";

const FoodIntake = (props) => {
  const defaultUpload = {
    meal: "Select Meal",
    foodName: "",
    local: true,
    eatingIn: true,
  };

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  //API CALL
  const handleSearch = (query) => {
    setIsLoading(true);
    fetch("https://web-wrggqo5tiq-lz.a.run.app/completion", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        //'Content-Type': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `food=${query}`,
    })
      .then((resp) =>
        resp.json().then((data) => ({ data: data, status: resp.status }))
      )
      .then((res) => {
        const options = res.data.map((i) => ({
          food_id: i.food_id,
          name: i.name,
        }));

        setOptions(options);
        setIsLoading(false);
      });
    setUpload({ ...upload, foodName: query });
  };

  const filterBy = () => true;

  //Upload state
  const [upload, setUpload] = useState(defaultUpload);

  const updateStateValue = (e) => {
    setUpload({ ...upload, [e.target.id]: e.target.value });
  };

  const handleCheckboxTick = (e) => {
    setUpload({ ...upload, [e.target.name]: !upload[[e.target.name]] });
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
    submitNotification("Success", "Food Diary successfully updated!");
    setUpload(defaultUpload);
    foodNameRef.current.clear();
  };

  const foodNameRef = useRef();

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
            <Select
              id="meal"
              function={(e) => {
                updateStateValue(e);
              }}
              value={upload.meal}
              placeholder="Please select a meal"
              items={["Breakfast", "Lunch", "Dinner", "Other"]}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label style={{ backgroundColor: "white" }}>
              Food Name
            </Form.Label>
            <AsyncTypeahead
              filterBy={filterBy}
              id="foodName"
              isLoading={isLoading}
              labelKey="name"
              minLength={3}
              onSearch={handleSearch}
              onChange={(e) => {
                setUpload({ ...upload, foodName: e[0].name });
              }}
              options={options}
              placeholder="Enter a food name"
              value={upload.foodName}
              ref={foodNameRef}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Form.Label style={{ backgroundColor: "white" }}>
              Local or Non-Local
            </Form.Label>
            <Form.Check
              name="local"
              type="radio"
              label="Local"
              checked={upload.local}
              onChange={(e) => {
                handleCheckboxTick(e);
              }}
            />
            <Form.Check
              name="local"
              type="radio"
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
              label="Eating In"
              checked={upload.eatingIn}
              onChange={(e) => {
                handleCheckboxTick(e);
              }}
            />
            <Form.Check
              name="eatingIn"
              type="radio"
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
