import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Profile } from "../SubComponents/Profile";
import "../Pages.css";
import { PageWrapMini } from "../SubComponents/PageWrap";
import blueberries from "../../../images/Blueberries.png";

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

import { createSubAccount } from "../../../store/actions/authActions";

const NewAccount = (props) => {
  //AccountType/BuildingFunction Management
  const [type, setType] = useState(props.profile.type);

  useEffect(() => {
    setType(props.profile.type);
  }, [props.profile.type]);

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
  if (!props.auth.uid) {
    return <Redirect to="/login" />;
  }

  return (
    <PageWrapMini>
      <Container className="web-center">
        <Profile profile={props.profile} type={type} />
        <div className="tabs">
          <TabContext value={value}>
            <TabList
              TabIndicatorProps={{
                style: {
                  backgroundColor: Colors.brandGreen,
                },
              }}
              variant="standard"
              onChange={handleChange}
              centered
            >
              <Tab disableRipple label="Food" />
              <Tab disableRipple label="Environment" />
              <Tab disableRipple label="Health" />
              <Tab disableRipple label="Sustainability" />
            </TabList>
            <AccountType
              type={type}
              value={value}
              theme={theme}
              handleChangeIndex={handleChangeIndex}
            />
          </TabContext>
        </div>
      </Container>
    </PageWrapMini>
  );
};

const AccountType = (props) => {
  switch (props.type) {
    case "farm_admin":
    case "farm_sub":
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
            <Farm.Environment />
          </TabPanel>
          <TabPanel value={props.value} index={2} dir={props.theme.direction}>
            <Farm.Health />
          </TabPanel>
        </SwipeableViews>
      );
    case "business_admin":
    case "business_sub":
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
            <Business.Environment />
          </TabPanel>
          <TabPanel value={props.value} index={2} dir={props.theme.direction}>
            <Business.Health />
          </TabPanel>
        </SwipeableViews>
      );
    case "academic_admin":
    case "academic_sub":
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
            <Schools.Environment />
          </TabPanel>
          <TabPanel value={props.value} index={2} dir={props.theme.direction}>
            <Schools.Health />
          </TabPanel>
        </SwipeableViews>
      );
    case "household_admin":
    case "household_sub":
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
            <Households.Environment />
          </TabPanel>
          <TabPanel value={props.value} index={2} dir={props.theme.direction}>
            <Households.Health />
          </TabPanel>
          <TabPanel value={props.value} index={3} dir={props.theme.direction}>
            <Households.Sustainability />
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

const mapDispatchToProps = (dispatch) => {
  return {
    createSubAccount: (product) => dispatch(createSubAccount(product)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
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
