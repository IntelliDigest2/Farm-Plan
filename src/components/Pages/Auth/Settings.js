import React, { useState, useEffect } from "react";

import "./Settings.css";
import { SubButton } from "../SubComponents/Button";
import { Dropdown } from "../SubComponents/Dropdown";

import { Container, Form, Col } from "react-bootstrap";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/Email";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

import { MobileView, BrowserView, isMobile } from "react-device-detect";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { getUserData } from "../../../store/actions/authActions";

function Settings(props) {
  //auth
  const [firstName, setFirstName] = useState(props.profile.firstName);
  const [lastName, setLastName] = useState(props.profile.lastName);
  const [email, setEmail] = useState(props.profile.email);
  const [password, setPassword] = useState(props.profile.password);

  //address
  const [town, setTown] = useState(props.profile.city);
  const [country, setCountry] = useState(props.profile.country);
  const [region, setRegion] = useState(props.profile.region);
  const [buildingFunction, setBuildingFunction] = useState(
    props.profile.buildingFunction
  );

  const [form, setForm] = useState(null);

  //rerender on form change
  useEffect(() => {}, [form]);

  //mobile view first of all, this will eventually be split into two with the same components
  //if (isMobile) {
  switch (form) {
    case "changeName":
      return (
        <MobileStyle>
          <SettingsList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.profile.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            setForm={setForm}
          />
          <Divider variant="middle" />
          <Name
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            setForm={setForm}
          />
          <div className="center">
            <SubButton
              styling="blue"
              text="Confirm"
              onMouseDown={console.log("clicky")}
            />
          </div>
        </MobileStyle>
      );
    case "changeEmail":
      return (
        <MobileStyle>
          <SettingsList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.profile.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            setForm={setForm}
          />
          <Divider variant="middle" />
          <Email
            email={email}
            setEmail={setEmail}
            password={password}
            setForm={setForm}
          />
          <div className="center">
            <SubButton
              styling="blue"
              text="Confirm"
              onClick={() => {
                props.setForm(null);
              }}
            />
          </div>
        </MobileStyle>
      );
    case "changeLocation":
      return (
        <MobileStyle>
          <SettingsList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.profile.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            setForm={setForm}
          />
          <Divider variant="middle" />
          <Location
            town={town}
            setTown={setTown}
            country={country}
            setCountry={setCountry}
            region={region}
            setRegion={setRegion}
            password={password}
            setForm={setForm}
          />
          <div className="center">
            <SubButton
              styling="blue"
              text="Confirm"
              onClick={() => {
                props.setForm(null);
              }}
            />
          </div>
        </MobileStyle>
      );
    case "changeAccountType":
      return (
        <MobileStyle>
          <SettingsList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.profile.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            setForm={setForm}
          />
          <Divider variant="middle" />
          <AccountType
            buildingFunction={buildingFunction}
            setBuildingFunction={setBuildingFunction}
            setForm={setForm}
          />
          <div className="center">
            <SubButton
              styling="blue"
              text="Confirm"
              onClick={() => {
                props.setForm(null);
              }}
            />
          </div>
        </MobileStyle>
      );
    default:
      return (
        <MobileStyle>
          <SettingsList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.profile.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            setForm={setForm}
          />
        </MobileStyle>
      );
  }
  //}
}

const MobileStyle = (props) => {
  return (
    <>
      <div className="collumn">
        <div className="top">
          <div style={{ width: "50%" }}>
            <SubButton styling="green" goTo="/account" text="Back" />
          </div>
          <h5>Settings</h5>
        </div>
        <Divider />
      </div>
      <Container className="mobile-style">
        <div className="center">
          <h2 style={{ color: "#0c0847" }}>What would you like to change?</h2>
        </div>
        <Divider variant="middle" />
        {props.children}
        <Divider variant="middle" />
      </Container>
    </>
  );
};

const SettingsList = (props) => {
  return (
    <div className="list">
      <List>
        <ListItem>
          <ListItemButton
            onClick={() => {
              props.setForm("changeName");
            }}
          >
            <ListItemIcon>
              <DriveFileRenameOutlineIcon />
            </ListItemIcon>
            <ListItemText>
              {props.firstName} {props.lastName}
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              props.setForm("changeEmail");
            }}
          >
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText>{props.email}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem className="space-between">
          <ListItemButton
            onClick={() => {
              props.setForm("changeLocation");
            }}
          >
            <ListItemIcon>
              <EditLocationAltIcon />
            </ListItemIcon>
            <ListItemText>
              {props.town} {props.country} {props.region}
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              props.setForm("changeAccountType");
            }}
          >
            <ListItemIcon>
              <HomeWorkIcon />
            </ListItemIcon>
            <ListItemText>{props.buildingFunction}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

const Name = (props) => {
  return (
    <div>
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
              id="firstname"
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
              onChange={(e) => props.setLastName(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
};

const Email = (props) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            defaultValue={props.email}
          />
        </Form.Group>

        {/*confirm with password*/}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
        </Form.Group>
      </Form>
    </div>
  );
};

const Location = (props) => {
  return (
    <div>
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
      </Form>
    </div>
  );
};

const AccountType = (props) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>What kind of account do you want?</Form.Label>
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
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserData: (product) => dispatch(getUserData(product)),
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "users",
        doc: props.auth.uid,
      },
    ];
  })
)(Settings);
