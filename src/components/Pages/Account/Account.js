import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Profile } from "../../SubComponents/Profile";
import "../Pages.css";
import { PageWrapMini } from "../../SubComponents/PageWrap";

import logo from "../../../images/WFTLogo.png";

import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Tab } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core";

import * as Households from "./Personal/PersonalTabs";
import * as Farm from "./Farm/FarmTabs";
import * as Business from "./Business/BusinessTabs";
import * as Schools from "./Academic/AcademicTabs";

import { Colors } from "../../lib/Colors";

import { createSubAccount } from "../../../store/actions/authActions";
import { PTSModal } from "./PlanToSave/PTSModal";

const NewAccount = (props) => {
  //AccountType/BuildingFunction Management
  const [type, setType] = useState(props.profile.type);
  //controls modal appearing
  const [show, setShow] = useState(true);
  const [modal, setModal] = useState(false);
  const [chooseModal, setChooseModal] = useState(false);

  useEffect(() => {
    setType(props.profile.type);
  }, [props.profile.type]);

  //stop pts modal from appearing before firebase has a chance to fetch data
  useEffect(() => {
    const showModal = setTimeout(() => {
      if (props.profile.buildingFunction !== "Farm") setModal(true);
    }, 1000);
    return () => clearTimeout(showModal);
  });

  useEffect(() => {}, [type]);
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  useEffect(() => {
    delay(2000).then(() => {
      // if (props.profile.isSeller) return <Redirect to="/farm-plan" />;
      console.log(props.profile);
    });
  }, [props.profile]);

  //Tab Management
  const theme = useTheme();
  const [value, setValue] = useState("0");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(String(index));
  };

  //Render
  if (!props.auth.uid) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      {modal && !props.profile.isConsumer ? (
        <PTSModal show={show} setShow={setShow} />
      ) : null}
      {chooseModal ? <PTSModal show={show} setShow={setShow} /> : null}
      <PageWrapMini>
        <Container className="web-center">
          <div className="flex">
            <img
              src={logo}
              alt="World Food Tracker, empowering global food sustainability"
              className="img-fluid rounded fix-image mb-3"
              style={{ maxWidth: "40%" }}
            />
            <Profile profile={props.profile} type={type} />
          </div>

          <div className="tabs">
            <TabContext value={value}>
              <AccountType
                profile={props.profile}
                type={type}
                value={value}
                theme={theme}
                handleChange={handleChange}
                handleChangeIndex={handleChangeIndex}
                setShow={setShow}
                setChooseModal={setChooseModal}
              />
            </TabContext>
          </div>
        </Container>
      </PageWrapMini>
    </>
  );
};

const AccountType = (props) => {
  switch (props.type) {
    case "farm_admin":
    case "farm_sub":
      return (
        <>
          <TabList
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant="standard"
            onChange={props.handleChange}
            centered
          >
            <Tab disableRipple label="Food" value="0" />
            <Tab disableRipple label="Environment" value="1" />
            <Tab disableRipple label="FSSP" value="2" />
          </TabList>
          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Farm.Food isSeller={props.profile.isSeller} />
            </TabPanel>
            <TabPanel value={props.value} index={1} dir={props.theme.direction}>
              <Farm.Environment />
            </TabPanel>
            <TabPanel value={props.value} index={2} dir={props.theme.direction}>
              <Farm.FSSP />
            </TabPanel>
          </SwipeableViews>
        </>
      );
    case "business_admin":
    case "business_sub":
      return (
        <>
          <TabList
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant="standard"
            onChange={props.handleChange}
            centered
          >
            <Tab disableRipple label="Food" value="0" />
            <Tab disableRipple label="Environment" value="1" />
            <Tab disableRipple label="FSSP" value="2" />
          </TabList>
          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Business.Food
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
            <TabPanel value={props.value} index={1} dir={props.theme.direction}>
              <Business.Environment
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
            <TabPanel value={props.value} index={2} dir={props.theme.direction}>
              <Business.FSSP />
            </TabPanel>
          </SwipeableViews>
        </>
      );
    case "academic_admin":
    case "academic_sub":
      return (
        <>
          <TabList
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant="standard"
            onChange={props.handleChange}
            centered
          >
            <Tab disableRipple label="Food Business" value="0" />
            <Tab disableRipple label="Research" value="1" />
            <Tab disableRipple label="Environment" value="2" />
            <Tab disableRipple label="FSSP" value="3" />
          </TabList>
          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Schools.Food
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
            <TabPanel value={props.value} index={1} dir={props.theme.direction}>
              <Schools.Research
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
            <TabPanel value={props.value} index={2} dir={props.theme.direction}>
              <Schools.Environment
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
            <TabPanel value={props.value} index={3} dir={props.theme.direction}>
              <Schools.FSSP />
            </TabPanel>
          </SwipeableViews>
        </>
      );
    case "household_admin":
    case "household_sub":
    default:
      return (
        <>
          <TabList
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant="fullWidth"
            onChange={props.handleChange}
            centered
          >
            <Tab disableRipple label="Food" value="0" />
            <Tab disableRipple label="Health" value="1" />
            <Tab disableRipple label="Environment" value="2" />
          </TabList>
          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Households.Food
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
            <TabPanel value={props.value} index={1} dir={props.theme.direction}>
              <Households.Health
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
            <TabPanel value={props.value} index={2} dir={props.theme.direction}>
              <Households.Environment />
            </TabPanel>
          </SwipeableViews>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewAccount);
