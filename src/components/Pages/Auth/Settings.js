import React, { useState, useEffect } from "react";

import "./Mobile/Mob.css";
import "./Settings.css";
import { MobileWrap } from "./Mobile/MobComponents";
import { SubButton } from "../SubComponents/Button";

import { Form, Col } from "react-bootstrap";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";

//import { MobileView, BrowserView, isMobile } from "react-device-detect";

import { connect } from "react-redux";
import {
  resetPassword,
  updateEmail,
  updateProfile,
} from "../../../store/actions/authActions";

function Settings(props) {
  //auth
  const [firstName, setFirstName] = useState(props.profile.firstName);
  const [lastName, setLastName] = useState(props.profile.lastName);
  const [email, setEmail] = useState(props.auth.email);

  //address
  const [town, setTown] = useState(props.profile.city);
  const [country, setCountry] = useState(props.profile.country);
  const [region, setRegion] = useState(props.profile.region);

  const [form, setForm] = useState(null);
  const [error, setError] = useState("");

  //rerender on form change, reset error message
  useEffect(() => {
    setError("");
  }, [form]);

  useEffect(() => {
    console.log(props.auth);
    console.log(props.profile);
  }, [props]);

  function HandleEmail() {
    var data0 = {
      email: email,
    };
    var data1 = {
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      initials: props.profile.firstName[0] + props.profile.lastName[0],
      email: email,
      city: props.profile.city,
      country: props.profile.country,
      region: props.profile.region,
    };
    props.updateEmail(data0);
    props.updateProfile(data1);
  }

  function HandlePassword() {
    var data = {
      email: email,
    };
    if (email === props.auth.email) {
      props.resetPassword(data);
    } else {
      setError("This email does not match this account.");
    }
  }

  function HandleName() {
    var data = {
      firstName: firstName,
      lastName: lastName,
      initials: firstName[0] + lastName[0],
      email: props.auth.email,
      city: props.profile.town,
      country: props.profile.country,
      region: props.profile.region,
      /*sixteenPlus: sixteenPlus,
        arrangement: arrangement,
        buildingType: buildingType,
        shopAt: shopAt,
        shopPerWeek: shopPerWeek,*/
    };
    props.updateProfile(data);
  }

  function HandleLocation() {
    var data = {
      firstName: props.profile.firstName,
      lastName: props.profile.lastName,
      initials: props.profile.firstName[0] + props.profile.lastName[0],
      email: props.auth.email,
      city: town,
      country: country,
      region: region,
      /*sixteenPlus: sixteenPlus,
      arrangement: arrangement,
      buildingType: buildingType,
      shopAt: shopAt,
      shopPerWeek: shopPerWeek,*/
    };
    props.updateProfile(data);
  }

  switch (form) {
    case "changeName":
      return (
        <MobileWrap header="Settings" subtitle="What would you like to change?">
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
              onClick={(e) => {
                e.preventDefault();
                HandleName();
              }}
            />
          </div>
        </MobileWrap>
      );
    case "changeEmail":
      return (
        <MobileWrap header="Settings" subtitle="What would you like to change?">
          <SettingsList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.profile.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            HandleEmail={HandleEmail}
            setForm={setForm}
          />
          <Divider variant="middle" />
          <Email email={email} setEmail={setEmail} setForm={setForm} />
          <div className="auth-error">
            {props.authError ? <p> {props.authError}</p> : null}
          </div>
        </MobileWrap>
      );
    case "changePassword":
      return (
        <MobileWrap header="Settings" subtitle="What would you like to change?">
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
          <Password setEmail={setEmail} />
          <div className="center">
            <SubButton
              styling="blue"
              text="Confirm"
              onClick={(e) => {
                e.preventDefault();
                HandlePassword();
              }}
            />
          </div>
          <div className="auth-error">
            {error ? <p> {error}</p> : null}
            {props.authError ? <p> {props.authError}</p> : null}
          </div>
        </MobileWrap>
      );
    case "changeLocation":
      return (
        <MobileWrap header="Settings" subtitle="What would you like to change?">
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
            setForm={setForm}
          />
          <div className="center">
            <SubButton
              styling="blue"
              text="Confirm"
              onClick={() => {
                setForm(null);
              }}
            />
          </div>
        </MobileWrap>
      );
    default:
      return (
        <MobileWrap header="Settings" subtitle="What would you like to change?">
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
        </MobileWrap>
      );
  }
}

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
        <ListItem>
          <ListItemButton
            onClick={() => {
              props.setForm("changePassword");
            }}
          >
            <ListItemIcon>
              <PasswordIcon />
            </ListItemIcon>
            <ListItemText>Password</ListItemText>
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
            // onChange={(e) => props.setEmail(e.target.textContent)}
          />
          <SubButton
            styling="blue"
            text="Confirm"
            onClick={(e) => {
              e.preventDefault();
              props.HandleEmail();
            }}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

const Password = (props) => {
  return (
    <div>
      <Form>
        <h4>Follow the email instructions to reset your password.</h4>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => props.setEmail(e.target.value)}
          />
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (creds) => dispatch(resetPassword(creds)),
    updateEmail: (creds) => dispatch(updateEmail(creds)),
    updateProfile: (users) => dispatch(updateProfile(users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
