import React, { useState, useEffect } from "react";

import "./Mob.css";
import "./Settings.css";
import { SubButton } from "../../SubComponents/Button";
import { LogOutPopUp } from "../../SubComponents/PopUp";
import { PageWrap } from "../../SubComponents/PageWrap";
import { Heading } from "../../SubComponents/Heading";
import LoadingScreen from "../../SubComponents/Loading/LoadingScreen";

import { Form, Col, ListGroup, Badge, FormGroup } from "react-bootstrap";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

//list icons
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import QuizIcon from "@mui/icons-material/Quiz";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import GroupIcon from "@mui/icons-material/Group";

//import { MobileView, BrowserView, isMobile } from "react-device-detect";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import {
  resetPassword,
  updateEmail,
  updateProfile,
  signOut,
  createSubAccount,
  deleteSubAccount,
} from "../../../store/actions/authActions";
import {
  createMapData,
  getFirestoreData,
} from "../../../store/actions/dataActions";
import Geocode from "react-geocode";

import { submitNotification } from "../../lib/Notifications";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//The top level function "Settings" creates the layout of the page and the state of any information passed through it and the other components.
//It returns a switch that controls the form as people choose on the page, the form functions are defined below. They are "SettingsList",
// "Name", "Email", "Password" and "Location".

function Settings(props) {
  //handles loading page
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  });

  //auth
  const [firstName, setFirstName] = useState(props.profile.firstName);
  const [lastName, setLastName] = useState(props.profile.lastName);
  const [email, setEmail] = useState(props.auth.email);
  const [password, setPassword] = useState("");

  //sub
  const [subFirstName, setSubFirstName] = useState("");
  const [subLastName, setSubLastName] = useState("");
  const [subEmail, setSubEmail] = useState("");
  const [subPassword, setSubPassword] = useState("");
  const [subRole, setSubRole] = useState("");
  const [subAccountsList, setSubAccountsList] = useState();

  //address
  const [town, setTown] = useState(props.profile.city);
  const [country, setCountry] = useState(props.profile.country);
  const [region, setRegion] = useState(props.profile.region);

  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  //handle data from firebase
  useEffect(() => {
    if (props.data !== undefined && props.data !== null) {
      setSubAccountsList(props.data);
    } else {
      setSubAccountsList({});
    }
  }, [props.data]);

  //rerender on form change, reset error message
  useEffect(() => {
    setError("");
    setSuccess(false);
  }, [form]);

  //handles the way each setting opens and closes, if not open => open, if open => close and if a different item => open different item.
  function HandleButtonState(changeTo) {
    if (!form) {
      setForm(changeTo);
    } else if (form === changeTo) {
      setForm(null);
    } else if (form !== changeTo && form) {
      setForm(changeTo);
    }
  }

  useEffect(() => {
    if (!props.auth.uid) {
      return <Redirect to="/login" />;
    }
  }, [props.auth.uid]);

  //Setup geocode for getting coords when changing location
  useEffect(() => {
    Geocode.setApiKey("AIzaSyA7vyoyDlw8wHqveKrfkkeku_46bdR_aPk");
    Geocode.setLocationType("ROOFTOP");
  }, []);

  function HandleEmail() {
    var data = {
      auth: props.auth,
      email: props.auth.email,
      newEmail: email,
      uid: props.auth.uid,
      password: password,
    };
    props.updateEmail(data);
    if (!props.authError) {
      setSuccess(true);
    } else {
      setError(props.authError);
    }
  }

  function HandlePassword() {
    var data = {
      email: email,
    };
    if (email === props.auth.email) {
      props.resetPassword(data);
      submitNotification("Success", "A Password reset Email has been sent!");
    } else {
      setError("This email does not match this account.");
    }
  }

  function HandleName() {
    var data = {
      uid: props.auth.uid,
      profile: {
        firstName: firstName,
        lastName: lastName,
        initials: firstName[0] + lastName[0],
      },
    };
    props.updateProfile(data);
    if (!props.authError) {
      setSuccess(true);
      submitNotification("Success", "Name Successfully Updated!");
    } else {
      setError(props.authError);
    }
  }

  function HandleLocation() {
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

    var data = {
      uid: props.auth.uid,
      profile: {
        city: town,
        country: country,
        region: region,
      },
    };
    props.updateProfile(data);
    if (!props.authError) {
      setSuccess(true);
      submitNotification("Success", "Location Sucessfully Updated!");
    } else {
      setError(props.authError);
    }
  }

  function HandleSubAccount() {
    var adminCollection, subType;
    if (props.profile.type === "business_admin") {
      adminCollection = "business_users";
      subType = "business_sub";
    } else if (props.profile.type === "academic_admin") {
      adminCollection = "academic_users";
      subType = "academic_sub";
    } else if (props.profile.type === "farm_admin") {
      adminCollection = "farm_users";
      subType = "farm_sub";
    } else if (props.profile.type === "household_admin") {
      adminCollection = "household_users";
      subType = "household_sub";
    }

    var data = {
      masterCollection: adminCollection,
      uid: props.auth.uid,
      email: subEmail,
      password: subPassword,
      firstName: subFirstName,
      lastName: subLastName,
      role: subRole,

      function: props.profile.buildingFunction,
      city: props.profile.city,
      country: props.profile.country,
      region: props.profile.region,
      type: subType,
    };
    if (
      subFirstName !== "" &&
      subLastName !== "" &&
      subEmail != "" &&
      subPassword !== "" &&
      subRole !== ""
    ) {
      props.createSubAccount(data);
      if (!props.authError) {
        setSuccess(true);
        submitNotification("Success", "Sub Account Sucessfully Created!");
        setSubFirstName("");
        setSubLastName("");
        setSubEmail("");
        setSubPassword("");
        setSubRole("");
      } else {
        setError(props.authError);
      }
    } else {
      submitNotification("Error", "Please ensure the form is completed.");
    }
  }

  if (!props.auth.uid) return <Redirect to="/login" />;
  if (loading) {
    return <LoadingScreen />;
  }

  switch (form) {
    case "changeName":
      return (
        <PageWrap
          header="Settings"
          subtitle="What would you like to change?"
          goTo="/account"
        >
          <ProfileList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.auth.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            setForm={setForm}
            HandleButtonState={HandleButtonState}
            type={props.profile.type}
          >
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
            <div className="auth-error">
              {props.authError ? <p> {props.authError}</p> : null}
            </div>
            <div className="success">
              {success ? <p>Change Success</p> : null}
            </div>
          </ProfileList>
        </PageWrap>
      );
    case "changeEmail":
      return (
        <PageWrap
          header="Settings"
          subtitle="What would you like to change?"
          goTo="/account"
        >
          <ProfileList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.auth.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            setForm={setForm}
            HandleButtonState={HandleButtonState}
            type={props.profile.type}
          >
            <Divider variant="middle" />
            <Email
              email={email}
              setEmail={setEmail}
              setPassword={setPassword}
              setForm={setForm}
              HandleEmail={HandleEmail}
            />
            <div className="center">
              <SubButton
                styling="blue"
                text="Confirm"
                onClick={(e) => {
                  e.preventDefault();
                  HandleEmail();
                }}
              />
            </div>
            <div className="auth-error">
              {props.authError ? <p> {props.authError}</p> : null}
            </div>
            <div className="success">
              {success ? <p>Your email has been updated!</p> : null}
            </div>
          </ProfileList>
        </PageWrap>
      );
    case "changePassword":
      return (
        <PageWrap
          header="Settings"
          subtitle="What would you like to change?"
          goTo="/account"
        >
          <ProfileList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.auth.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            setForm={setForm}
            HandleButtonState={HandleButtonState}
            type={props.profile.type}
          >
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
          </ProfileList>
        </PageWrap>
      );
    case "changeLocation":
      return (
        <PageWrap
          header="Settings"
          subtitle="What would you like to change?"
          goTo="/account"
        >
          <ProfileList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.auth.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            setForm={setForm}
            HandleButtonState={HandleButtonState}
            type={props.profile.type}
          >
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
                onClick={(e) => {
                  e.preventDefault();
                  HandleLocation();
                }}
              />
            </div>
            <div className="auth-error">
              {props.authError ? <p> {props.authError}</p> : null}
            </div>
            <div className="success">
              {success ? <p>Change Success</p> : null}
            </div>
          </ProfileList>
        </PageWrap>
      );
    case "changeSubAccounts":
      return (
        <PageWrap
          header="Settings"
          subtitle="What would you like to change?"
          goTo="/account"
        >
          <ProfileList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.auth.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            setForm={setForm}
            HandleButtonState={HandleButtonState}
            type={props.profile.type}
          >
            <Divider variant="middle" />
            <SubAccounts
              setSubFirstName={setSubFirstName}
              setSubLastName={setSubLastName}
              setSubEmail={setSubEmail}
              setSubPassword={setSubPassword}
              setSubRole={setSubRole}
              subAccounts={subAccountsList}
              subFirstName={subFirstName}
              subLastName={subLastName}
              subEmail={subEmail}
              subPassword={subPassword}
              subRole={subRole}
              profile={props.profile}
              uid={props.auth.uid}
              deleteSubAccount={props.deleteSubAccount}
            />
            <div className="center">
              <SubButton
                styling="blue"
                text="Create Sub Account"
                onClick={(e) => {
                  e.preventDefault();
                  HandleSubAccount();
                }}
              />
            </div>
            <div className="auth-error">
              {props.authError ? <p> {props.authError}</p> : null}
            </div>
            <div className="success">
              {success ? <p>Account Created</p> : null}
            </div>
          </ProfileList>
        </PageWrap>
      );
    default:
      return (
        <PageWrap
          header="Settings"
          subtitle="What would you like to change?"
          goTo="/account"
        >
          <ProfileList
            firstName={props.profile.firstName}
            lastName={props.profile.lastName}
            email={props.auth.email}
            town={props.profile.city}
            region={props.profile.region}
            country={props.profile.country}
            buildingFunction={props.profile.buildingFunction}
            setForm={setForm}
            HandleButtonState={HandleButtonState}
            HandleSignOut={props.signOut}
            type={props.profile.type}
          />
        </PageWrap>
      );
  }
}

function ButtonList(props) {
  let list;
  list = props.listItems.map((items) => {
    return (
      <ListItem key={items.key}>
        <ListItemButton
          onClick={() => {
            props.HandleButtonState(items.change);
          }}
        >
          <ListItemIcon>{items.icon}</ListItemIcon>
          <ListItemText>{items.item}</ListItemText>
        </ListItemButton>
      </ListItem>
    );
  });

  return <List>{list}</List>;
}

const ProfileList = (props) => {
  const items = [
    {
      key: "name",
      item: props.firstName + " " + props.lastName,
      change: "changeName",
      icon: <DriveFileRenameOutlineIcon />,
    },
    {
      key: "email",
      item: props.email,
      change: "changeEmail",
      icon: <EmailIcon />,
    },
    {
      key: "password",
      item: "Password",
      change: "changePassword",
      icon: <PasswordIcon />,
    },
    {
      key: "location",
      item: props.town + ", " + props.country + ", " + props.region,
      change: "changeLocation",
      icon: <EditLocationAltIcon />,
    },
  ];

  return (
    <>
      {String(props.type).includes("sub") ? (
        <></>
      ) : (
        <>
          <ButtonList
            listItems={items}
            HandleButtonState={props.HandleButtonState}
          />
          {String(props.type).includes("admin") ? (
            <ListItem key="subaccounts">
              <ListItemButton
                onClick={() => {
                  props.HandleButtonState("changeSubAccounts");
                }}
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText>Sub Accounts</ListItemText>
              </ListItemButton>
            </ListItem>
          ) : (
            <></>
          )}
          {props.children}
        </>
      )}
      <Divider variant="middle" />
      <ListItem>
        <ListItemButton href="/questionnaire" component="a">
          <ListItemIcon>
            <QuizIcon />
          </ListItemIcon>
          <ListItemText>
            Help us to offer your greater value by answering this short
            questionnaire.
          </ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemButton href="/contact" component="a">
          <ListItemIcon>
            <ContactSupportIcon />
          </ListItemIcon>
          <ListItemText>Contact Us</ListItemText>
        </ListItemButton>
      </ListItem>
      <Divider variant="middle" />
      <LogOutPopUp handleSignOut={props.HandleSignOut} to="/landing" />
    </>
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
            placeholder="Enter new email"
            onChange={(e) => props.setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => props.setPassword(e.target.value)}
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
        <div className="center">
          <h5>
            <b>Follow the email instructions to reset your password.</b>
          </h5>
        </div>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Enter Email"
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

const SubAccounts = (props) => {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState([]);
  const [subPassword, setSubPassword] = useState("");

  const handleClickOpen = (sub) => {
    setOpen(true);
    setSub(sub);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAccount = () => {
    var masterCollection;
    switch (props.profile.type) {
      case "business_admin":
        masterCollection = "business_users";
        break;
      case "academic_admin":
        masterCollection = "academic_users";
        break;
      case "farm_admin":
        masterCollection = "farm_users";
        break;
      case "household_admin":
        masterCollection = "household_users";
        break;
    }

    var data = {
      masterCollection: masterCollection,
      uid: props.uid,
      email: sub.email,
      password: subPassword,
    };
    props.deleteSubAccount(data);
    handleClose();
  };

  if (props.subAccounts !== null && props.subAccounts !== undefined)
    var subs = Object.values(props.subAccounts);

  return (
    <div>
      <Form>
        <FormGroup className="mb-3">
          <Form.Label>
            <Heading priority="3" text="Sub Accounts" />
          </Form.Label>
          <ListGroup>
            {subs?.map((sub, index) => (
              <ListGroup.Item
                action
                key={index}
                as="li"
                className="d-flex justify-content-between align-items-start"
                onClick={() => handleClickOpen(sub)}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{sub.name}</div>
                  {sub.email}
                </div>
                <Badge variant="primary" pill>
                  {sub.role}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </FormGroup>
        <Divider />
        <FormGroup className="mb-3">
          <Form.Label>
            <Heading priority="3" text="Create Sub Account" />
          </Form.Label>
          <Form.Row className="mb-3">
            <Form.Group
              className="mb-3"
              style={{ backgroundColor: "white" }}
              as={Col}
            >
              <Form.Label style={{ backgroundColor: "white" }}>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={props.subFirstName}
                onChange={(e) => props.setSubFirstName(e.target.value)}
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
                placeholder="Enter Surname"
                value={props.subLastName}
                onChange={(e) => props.setSubLastName(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={props.subEmail}
              onChange={(e) => props.setSubEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={props.subPassword}
              onChange={(e) => props.setSubPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="role"
              placeholder="Enter Role"
              value={props.subRole}
              onChange={(e) => props.setSubRole(e.target.value)}
            />
          </Form.Group>
        </FormGroup>
      </Form>
      <Dialog onClose={handleClose} open={open} maxWidth="xs" fullWidth>
        <DialogTitle>
          Delete '{sub.email}' account?
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Form.Group>
            <Form.Label>Sub Account Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setSubPassword(e.target.value)}
            />
          </Form.Group>
        </DialogContent>
        <DialogActions>
          <SubButton
            styling="blue"
            text="Delete Account"
            onClick={handleDeleteAccount}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile,
    // data: state.data.getData,
    data: state.firestore.data.SubAccounts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (creds) => dispatch(resetPassword(creds)),
    updateEmail: (creds) => dispatch(updateEmail(creds)),
    updateProfile: (users) => dispatch(updateProfile(users)),
    signOut: () => dispatch(signOut()),
    createMapData: (product) => dispatch(createMapData(product)),
    createSubAccount: (creds) => dispatch(createSubAccount(creds)),
    deleteSubAccount: (creds) => dispatch(deleteSubAccount(creds)),
    getFirestoreData: (data) => dispatch(getFirestoreData(data)),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(Settings);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    var masterCollection;
    switch (props.profile.type) {
      case "business_admin":
        masterCollection = "business_users";
        break;
      case "academic_admin":
        masterCollection = "academic_users";
        break;
      case "farm_admin":
        masterCollection = "farm_users";
        break;
      case "household_admin":
      default:
        masterCollection = "household_users";
        break;
    }
    if (!props.auth.uid) return [];
    return [
      {
        collection: masterCollection,
        doc: props.auth.uid,
        subcollections: [{ collection: "sub_accounts" }],
        storeAs: "SubAccounts",
      },
    ];
  })
)(Settings);
