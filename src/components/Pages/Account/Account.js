import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Profile } from "../SubComponents/Profile";
import "../Pages.css";
import { SubButton } from "../SubComponents/Button";

import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Tab } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core";

import { Heading } from "../SubComponents/Heading";
import * as Households from "./Personal/PersonalTabs";
import * as Farm from "./Farm/FarmTabs";
import * as Business from "./Business/BusinessTabs";
import * as Schools from "./Academic/AcademicTabs";

import { Colors } from "../../lib/Colors";

const NewAccount = (props) => {
  //AccountType/BuildingFunction Management
  const [type, setType] = useState("");

  useEffect(() => {
    switch (props.profile.buildingFunction) {
      case "Hospitals":
      case "Hotels":
      case "Offices":
      case "Restaurants":
      case "Shop/Supermarket":
      case "Recreational Centers":
        setType("Business");
        break;
      default:
        let a = props.profile.buildingFunction;
        setType(a);
        break;
    }
  }, [props.profile.buildingFunction]);

  useEffect(() => {}, [type]);

  //Tab Management
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  //Render
  if (!props.auth) {
    return <Redirect to="/login" />;
  }

  return (
    <Container className="web-center">
      <Profile
        profile={props.profile}
        type={type}
        function={(eventKey, e) => {
          setType(e.target.textContent);
        }}
      />
      <TabContext value={value}>
        <TabList
          TabIndicatorProps={{
            style: {
              backgroundColor: Colors.brandGreen,
            },
          }}
          variant="fullWidth"
          onChange={handleChange}
        >
          <Tab disableRipple label={<Heading priority="6" text="Food" />} />
          <Tab
            disableRipple
            label={<Heading priority="6" text="Food Waste" />}
          />
          <Tab
            disabled
            disableRipple
            label={<Heading priority="6" text="Health" />}
          />
          <Tab
            disabled
            disableRipple
            label={<Heading priority="6" text="Environment" />}
          />
        </TabList>
        <AccountType
          type={type}
          value={value}
          theme={theme}
          handleChangeIndex={handleChangeIndex}
        />
        <SubButton
          styling="blue center"
          goTo="/change-password"
          text="Change Password"
        />
      </TabContext>
    </Container>
  );
};

const AccountType = (props) => {
  switch (props.type) {
    case "Farm":
      return (
        <SwipeableViews
          axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
          index={props.value}
          onChangeIndex={props.handleChangeIndex}
        >
          <TabPanel value={props.value} index={0} dir={props.theme.direction}>
            <Farm.Food />
          </TabPanel>
          <TabPanel value={props.value} index={1} dir={props.theme.direction}>
            <Farm.FoodWaste />
          </TabPanel>
          <TabPanel value={props.value} index={2} dir={props.theme.direction}>
            <Farm.Health />
          </TabPanel>
          <TabPanel value={props.value} index={3} dir={props.theme.direction}>
            <Farm.Environment />
          </TabPanel>
        </SwipeableViews>
      );
    case "Business":
      return (
        <SwipeableViews
          axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
          index={props.value}
          onChangeIndex={props.handleChangeIndex}
        >
          <TabPanel value={props.value} index={0} dir={props.theme.direction}>
            <Business.Food />
          </TabPanel>
          <TabPanel value={props.value} index={1} dir={props.theme.direction}>
            <Business.FoodWaste />
          </TabPanel>
          <TabPanel value={props.value} index={2} dir={props.theme.direction}>
            <Business.Health />
          </TabPanel>
          <TabPanel value={props.value} index={3} dir={props.theme.direction}>
            <Business.Environment />
          </TabPanel>
        </SwipeableViews>
      );
    case "Schools":
      return (
        <SwipeableViews
          axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
          index={props.value}
          onChangeIndex={props.handleChangeIndex}
        >
          <TabPanel value={props.value} index={0} dir={props.theme.direction}>
            <Schools.Food />
          </TabPanel>
          <TabPanel value={props.value} index={1} dir={props.theme.direction}>
            <Schools.FoodWaste />
          </TabPanel>
          <TabPanel value={props.value} index={2} dir={props.theme.direction}>
            <Schools.Health />
          </TabPanel>
          <TabPanel value={props.value} index={3} dir={props.theme.direction}>
            <Schools.Environment />
          </TabPanel>
        </SwipeableViews>
      );
    case "Households":
    default:
      return (
        <SwipeableViews
          axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
          index={props.value}
          onChangeIndex={props.handleChangeIndex}
        >
          <TabPanel value={props.value} index={0} dir={props.theme.direction}>
            <Households.Food />
          </TabPanel>
          <TabPanel value={props.value} index={1} dir={props.theme.direction}>
            <Households.FoodWaste />
          </TabPanel>
          <TabPanel value={props.value} index={2} dir={props.theme.direction}>
            <Households.Health />
          </TabPanel>
          <TabPanel value={props.value} index={3} dir={props.theme.direction}>
            <Households.Environment />
          </TabPanel>
        </SwipeableViews>
      );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps)
  // firestoreConnect((props) => {
  //   if (!props.auth.uid) return [];
  //   return [
  //     {
  //       collection: "users",
  //       doc: props.auth.uid,
  //     },
  //   ];
  // })
)(NewAccount);
