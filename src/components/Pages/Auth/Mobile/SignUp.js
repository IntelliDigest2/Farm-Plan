import React, { useState, useEffect } from "react";

import "../../Account/UserAccount.css";
import "./Mob.css";
import { Dropdown } from "../../SubComponents/Dropdown";
import { Title } from "./MobComponents";

import { Form, Col, Button } from "react-bootstrap";
import styled from "styled-components";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/Email";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../../../store/actions/authActions";

import { createMapData } from "../../../../store/actions/dataActions";
import Geocode from "react-geocode";

const SignUp = (props) => {
  //Stage1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Stage2
  const [town, setTown] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [buildingFunction, setBuildingFunction] = useState("");

  //Stage3
  const [sixteenPlus, setSixteenPlus] = useState(Boolean);
  const [arrangement, setArrangement] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [shopAt, setShopAt] = useState("");
  const [shopPerWeek, setShopPerWeek] = useState("");

  const [stage, setStage] = useState(1);

  function handleSubmit() {
    var data = {
      firstName: firstName,
      lastName: lastName,
      initials: firstName[0] + lastName[0],
      email: email,
      password: password,
      postcode: "",
      address: "",
      function: buildingFunction,
      organisation: "",
      schoolType: "",
      department: "",
      uniRole: "",
      city: town,
      country: country,
      region: region,
      sixteenPlus: sixteenPlus,
      arrangement: arrangement,
      buildingType: buildingType,
      shopAt: shopAt,
      shopPerWeek: shopPerWeek,
      type: "user",
    };
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      Geocode.fromAddress(town + " " + country).then((response) => {
        var upload = {
          masterCollection: "mapData",
          uid: props.auth.uid,
          upload: {
            location: response.results[0].address_components[0].long_name,
            coords: [
              response.results[0].geometry.location.lat,
              response.results[0].geometry.location.lng,
            ],
          },
        };
        props.createMapData(upload);
      });
      props.signUp(data);
    } else {
      console.log("error");
    }
  }

  const { auth, authError } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //make sure the user isn't already logged in
  useEffect(() => {
    if (props.auth.uid) setIsLoggedIn(true);
  }, [props.auth.uid]);

  //rerender every time the stage changes
  useEffect(() => {}, [stage]);

  if (isLoggedIn) {
    return <Redirect to="/account" />;
  }

  switch (stage) {
    default:
    case 1:
      return (
        <Title subtitle="Sign Up">
          <div className="signup-center subtitles">
            <p>First, create your account.</p>
          </div>
          <Stage1
            setFirstName={setFirstName}
            firstName={firstName}
            setLastName={setLastName}
            lastName={lastName}
            setEmail={setEmail}
            email={email}
            setPassword={setPassword}
            password={password}
            setStage={setStage}
          />
          <div className="signup-center subtitles row">
            <p>Already have an account? </p>
            <Link style={{ color: "#AFBA15" }} to="/login">
              {"  "}
              Log In
            </Link>
          </div>
        </Title>
      );
    case 2:
      return (
        <Title subtitle="Sign Up">
          <div className="signup-center subtitles">
            <p>First, create your account.</p>
          </div>
          <Stage2
            setTown={setTown}
            town={town}
            setCountry={setCountry}
            country={country}
            setRegion={setRegion}
            region={region}
            setBuildingFunction={setBuildingFunction}
            buildingFunction={buildingFunction}
            setStage={setStage}
          />
        </Title>
      );
    case 3:
      return (
        <Title subtitle="Sign Up">
          <div className="signup-center subtitles col">
            <p>
              <b>We would like to get to know more about you.</b>
            </p>
            <p>(You can change these settings later)</p>
          </div>
          <Stage3
            setStage={setStage}
            setSixteenPlus={setSixteenPlus}
            setArrangement={setArrangement}
            setBuildingType={setBuildingType}
            setShopAt={setShopAt}
            setShopPerWeek={setShopPerWeek}
          />
        </Title>
      );
    case 4:
      return (
        <Title subtitle="Sign Up">
          <div className="signup-center subtitles">
            <h5>Confirmation</h5>
          </div>
          <Stage4
            setStage={setStage}
            firstName={firstName}
            lastName={lastName}
            email={email}
            town={town}
            region={region}
            country={country}
            buildingFunction={buildingFunction}
          />
          <div className="signup-center">
            <div className="auth-error">
              {authError ? <p> {authError}</p> : null}
            </div>
            <div>
              <Button
                style={{ width: "30%" }}
                variant="default"
                className="signup-btn"
                onClick={(e) => setStage(1)}
              >
                Change
              </Button>
            </div>
            <div className="row">
              <Button
                style={{ fontWeight: "700" }}
                variant="default"
                className="signup-confirm"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </Title>
      );
  }
};

const Stage1 = (props) => {
  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Row>
            <Form.Group
              className="mb-3"
              style={{ backgroundColor: "white" }}
              as={Col}
            >
              <Form.Label style={{ backgroundColor: "white" }}>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                defaultValue={props.firstName}
                required
                onChange={(e) => props.setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              style={{ backgroundColor: "white" }}
              as={Col}
            >
              <Form.Label style={{ backgroundColor: "white" }}>
                Surname
              </Form.Label>
              <Form.Control
                type="surname"
                placeholder="Enter surname"
                defaultValue={props.lastName}
                required
                onChange={(e) => props.setLastName(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={props.email}
              required
              onChange={(e) => props.setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              defaultValue={props.password}
              required
              onChange={(e) => props.setPassword(e.target.value)}
            />
          </Form.Group>
          {/*Confirm Password*/}
          <div className="center">
            <Button
              type="submit"
              variant="default"
              className="signup-btn"
              onClick={(e) => {
                e.preventDefault();
                //Next Stage
                props.setStage(2);
              }}
            >
              Next
            </Button>
          </div>
        </Form>
      </FormStyle>
    </div>
  );
};

const Stage2 = (props) => {
  return (
    <div>
      <FormStyle>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Town</Form.Label>
            <Form.Control
              type="address"
              placeholder="Town"
              defaultValue={props.town}
              onChange={(e) => {
                props.setTown(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="address"
              placeholder="Country"
              defaultValue={props.country}
              onChange={(e) => {
                props.setCountry(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Region</Form.Label>
            <Form.Control
              type="address"
              placeholder="Region"
              defaultValue={props.region}
              onChange={(e) => props.setRegion(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>What kind of account are you creating?</Form.Label>
            <Dropdown
              id="buildingFunction"
              styling="grey dropdown-input-right"
              data={props.buildingFunction}
              function={(e) => {
                props.setBuildingFunction(e);
              }}
              items={[
                "Households",
                "Hospitals",
                "Schools",
                "Hotels",
                "Offices",
                "Restaurants",
                "Shop/Supermarket",
                "Farm",
                "Recreational Centers",
                "Other",
              ]}
            />
          </Form.Group>
        </Form>
      </FormStyle>
      <div className="signup-center">
        <div className="row">
          <Button
            variant="default"
            className="signup-btn"
            onClick={(e) => {
              e.preventDefault();
              //Previous Stage
              props.setStage(1);
            }}
          >
            Back
          </Button>
          <Button
            variant="default"
            className="signup-btn"
            onClick={(e) => {
              e.preventDefault();
              //Next Stage
              props.setStage(3);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const Stage3 = (props) => {
  return (
    <div className="signup-buffer">
      {/*<div className="center">
        <Button
        variant="default"
        className="signup-skip"
        onClick={(e) => {
          e.preventDefault();
          //skip to confirm
          props.setStage(4);
        }}
        >
        Skip
        </Button>
      </div> */}
      <FormStyle>
        <Form>
          <div key="inline-radio" className="mb-3">
            <Form.Group>
              <Form.Label>Are you 16 years old or above?</Form.Label>
              <div className="row">
                <Form.Check
                  type="radio"
                  inline
                  label="Yes"
                  name="16 or above"
                  id="yes"
                  onClick={(e) => props.setSixteenPlus(true)}
                />
                <Form.Check
                  type="radio"
                  inline
                  label="No"
                  name="16 or above"
                  id="no"
                  onClick={(e) => props.setSixteenPlus(false)}
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>What is your current living arrangement?</Form.Label>
              <Form.Check
                label="I live alone"
                name="living arrangement"
                type="radio"
                id="alone"
                onClick={(e) => props.setArrangement(e.target.id)}
              />
              <Form.Check
                label="I live with family"
                name="living arrangement"
                type="radio"
                id="family"
                onClick={(e) => props.setArrangement(e.target.id)}
              />
              <Form.Check
                label="Mixed residence"
                name="living arrangement"
                type="radio"
                id="mixed"
                onClick={(e) => props.setArrangement(e.target.id)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>What is your building type?</Form.Label>
              <div className="row">
                <Form.Check
                  inline
                  label="Flat"
                  name="building type"
                  type="radio"
                  id="flat"
                  onClick={(e) => props.setBuildingType(e.target.id)}
                />
                <Form.Check
                  inline
                  label="House"
                  name="building type"
                  type="radio"
                  id="house"
                  onClick={(e) => props.setBuildingType(e.target.id)}
                />
                <Form.Check
                  inline
                  label="Other"
                  name="building type"
                  type="radio"
                  id="other"
                  onClick={(e) => props.setBuildingType(e.target.id)}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Where do you go shopping for your groceries?
              </Form.Label>
              <Form.Control
                placeholder=""
                onChange={(e) => props.setShopAt(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                How often do you go shopping for groceries per week?
              </Form.Label>
              <Form.Check
                label="1 or 2 visits"
                name="how often"
                type="radio"
                id="1 or 2 visits"
                onClick={(e) => props.setShopPerWeek(e.target.id)}
              />
              <Form.Check
                label="3 or more visits"
                name="how often"
                type="radio"
                id="3 or more visits"
                onClick={(e) => props.setShopPerWeek(e.target.id)}
              />
              <Form.Check
                label="Weekends only"
                name="how often"
                type="radio"
                id="Weekends only"
                onClick={(e) => props.setShopPerWeek(e.target.id)}
              />
            </Form.Group>
          </div>
        </Form>
      </FormStyle>
      <div className="signup-center">
        <div className="row">
          <Button
            variant="default"
            className="signup-btn"
            onClick={(e) => {
              e.preventDefault();
              //Previous Stage
              props.setStage(2);
            }}
          >
            Back
          </Button>
          <Button
            variant="default"
            className="signup-btn"
            onClick={(e) => {
              e.preventDefault();
              //Next Stage
              props.setStage(4);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const Stage4 = (props) => {
  return (
    <div>
      <List>
        <ListItem>
          <ListItemIcon>
            <DriveFileRenameOutlineIcon />
          </ListItemIcon>
          <ListItemText>
            {props.firstName} {props.lastName}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText>{props.email}</ListItemText>
        </ListItem>
        <ListItem className="space-between">
          <ListItemIcon>
            <EditLocationAltIcon />
          </ListItemIcon>
          <ListItemText>
            {props.town} {props.country} {props.region}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <HomeWorkIcon />
          </ListItemIcon>
          <ListItemText>{props.buildingFunction}</ListItemText>
        </ListItem>
      </List>
    </div>
  );
};

const FormStyle = styled.div`
  form {
    width: 80%;
    margin: auto;
    padding: 10px;
  }

  input {
    border: 1px solid #62680a;
  }

  .btn-dark {
    background-color: #071850;
    color: whitesmoke;
    border: 1px solid #03091d;
    float: right;

    &:hover {
      background-color: #030d2b;
      border: 1px solid #03091d;
    }

    &:active {
      background-color: #030d2b;
      border: 1px solid #03091d;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
    createMapData: (mapdata) => dispatch(createMapData(mapdata)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
