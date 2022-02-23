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

  const [stage, setStage] = useState(1);

  function handleSubmit() {
    var data = {
      firstName: firstName,
      lastName: lastName,
      initials: firstName[0] + lastName[0],
      email: email,
      password: password,
      function: buildingFunction,
      city: town,
      country: country,
      region: region,
      type: "user",
    };
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      props.signUp(data);
    } else {
      console.log("error");
    }
  }

  const { authError } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Setup geocode for getting coords when changing location
  useEffect(() => {
    Geocode.setApiKey("AIzaSyA7vyoyDlw8wHqveKrfkkeku_46bdR_aPk");
    Geocode.setLocationType("ROOFTOP");
  }, []);

  //make sure the user isn't already logged in and if they are a new account, createMapData document for them.
  useEffect(() => {
    if (props.auth.uid) {
      setIsLoggedIn(true);
      if (town !== "" && country !== "") {
        Geocode.fromAddress(town + " " + country).then((response) => {
          var upload = {
            masterCollection: "mapData",
            uid: props.auth.uid,
            upload: {
              foodWasteWeight: 0,
              location: response.results[0].address_components[0].long_name,
              coords: [
                response.results[0].geometry.location.lat,
                response.results[0].geometry.location.lng,
              ],
            },
          };
          props.createMapData(upload);
        });
      }
    }
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
          <div className="signup-center subtitles">
            <h5>Confirmation</h5>
          </div>
          <Stage3
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
                "Personal",
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
