import React, { useState, useEffect, Fragment } from "react";
import { Redirect, Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useTranslation, Trans } from "react-i18next";

import {
  Container,
  Modal,
  Row,
  Col,
  Dropdown,
  Button,
  DropdownButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Profile } from "../../SubComponents/Profile";
import "../Pages.css";
import { PageWrapMini } from "../../SubComponents/PageWrap";

import logo from "../../../images/WFTLogo.png";
import "../../SubComponents/Button.css";

import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { Tab } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import * as Households from "./Personal/PersonalTabs";
import * as Farm from "./Farm/FarmTabs";
import * as Business from "./Business/BusinessTabs";
import * as Schools from "./Business/Academic/AcademicTabs";
import * as Restaurant from "./Business/Restaurant/RestaurantTabs";
import * as Supply from "./Business/Suppliers/SupplyTabs";
import * as Material from "./Business/Material/SupplyTabs";
import * as Shops from "./Shop/ShopTabs";
import * as Office from "./Offices/OfficesTabs";

import * as Admin from "./Admin/Admin/AdminTabs";

import { Colors } from "../../lib/Colors";

import { createSubAccount } from "../../../store/actions/authActions";
import { PTSModal } from "./PlanToSave/PTSModal";
import LoadingScreen from "../../SubComponents/Loading/LoadingScreen";

const NewAccount = (props) => {
  // console.log(props);
  const { i18n } = useTranslation();

  const lngs = {
    en: { nativeName: "English" },
    fr: { nativeName: "French" },
    es: { nativeName: "Spanish" },
    ar: { nativeName: "Arabic" },
    zh: { nativeName: "Chinese" },
    ru: { nativeName: "Russian" },
  };

  //handles loading page
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1500);
  // });

  //AccountType/BuildingFunction Management
  const [type, setType] = useState(props.profile.type);
  // console.log({ props });

  //controls modal appearing
  const [show, setShow] = useState(true);
  const [modal, setModal] = useState(false);
  const [chooseModal, setChooseModal] = useState(false);

  const [stage, setStage] = useState(2);

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
  // if (loading) {
  //   return <LoadingScreen />;
  // }

  // Check if props.type is null or empty
  const isTypeEmpty = !props.profile.type;
  const isVerificationPending = props.profile.verification === "pending";
  const isFreelancer = props.profile.isFreelancer;

  // console.log("Before Link:", window.location.pathname);

  return (
    <>
      {modal &&
      !props.profile.isConsumer &&
      !props.profile.buildingFunction === "Admin" ? (
        <PTSModal show={show} setShow={setShow} />
      ) : null}

      {chooseModal ? <PTSModal show={show} setShow={setShow} /> : null}

      <PageWrapMini>
        <Container className="web-center">
          <div className="avatar-name-container">
            <div className="avatar-image">
              <img
                src={logo}
                alt="World Food Tracker, empowering global food sustainability"
                className="logo_img"
              />
            </div>
            <div className="profile-container">
              <Profile profile={props.profile} type={type} />
            </div>
          </div>

          <div>
            <>
              {/* <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal', padding: '10px' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
                {lngs[lng].nativeName}
              </button> */}

              <DropdownButton
                id="dropdown-basic-button"
                title="Language"
                variant="success"
              >
                {Object.keys(lngs).map((lng, index) => (
                  <Dropdown.Item
                    key={`drop-${index}`}
                    onSelect={() => i18n.changeLanguage(lng)}
                  >
                    {lngs[lng].nativeName}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              {/* Conditional rendering of the Link button */}

              {/* Display message under the settings icon if props.type is null or empty */}
              <span
                style={{
                  color: "purple",
                }}
              >
                {isVerificationPending &&
                  isFreelancer === "" &&
                  "⚠️ You account is under review while waiting for approval please watch the videos to learn more  about the World Food Tracker features. "}
              </span>

              <div>
                {/* TODO: Display this if its a business account */}
                {!props.profile.imgsLinks &
                (props.profile.buildingFunction !== "Personal" &&
                  props.profile.buildingFunction !== "Households") ? (
                  <Link
                    to={`/complete-signup?stage=${stage}&uid=${props.auth.uid}`}
                  >
                    <Button>Complete Signup</Button>
                  </Link>
                ) : null}
              </div>
            </>
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
  const isVerificationPending = props.profile.verification === "pending";
  const isFreelancer = props.profile.isFreelancer;

  const buildingFunctionVideos = {
    Restaurants: {
      title: "Restaurant Video",
      link: "https://www.youtube.com/embed/_Y2mWfK0RT8?si=rsC0rkIFr8IxyvHF",
    },
    Schools: {
      title: "Schools Video",
      link: "https://www.youtube.com/embed/CHm_Cg2IVZA?si=kwFeIOV2x95Z01-0",
    },
    Hospitals: {
      title: "Hospitals Video",
      link: "https://www.youtube.com/embed/ItG9MsFP1EU?si=tR4AMjSuU0hHUrNI",
    },
    Hotels: {
      title: "Hotels Video",
      link: "https://www.youtube.com/embed/_Y2mWfK0RT8?si=rsC0rkIFr8IxyvHF",
    },
    Offices: {
      title: "Offices Video",
      link: "https://www.youtube.com/embed/_Y2mWfK0RT8?si=5GS3I0d9LnLekimx",
    },
    MachinerySupply: {
      title: "Machinery Supply Video",
      link: "https://www.youtube.com/embed/nZwsTHSoZqE?si=Oq79mjhaMs1ELSN0",
    },
    // Add more build functions and their corresponding video links as needed
  };

  const buildingFunction = props.profile.buildingFunction;
  const isSeller = props.profile.isSeller;

  const useStyles = makeStyles({
    tabListContainer: {
      width: "100%", // Set the desired width for the container
      overflowX: "auto", // Add horizontal scrolling for overflow
    },
    tabList: {
      //   width: "100%",
      display: "flex",
      justifyContent: "center",
      //   overflowX: "auto", // Make tabs scrollable
    },
    tab: {
      flex: "0 0 auto", // Maintain the tab size without flexibility
      maxWidth: "100px", // You can adjust the maximum width for the tabs if needed
      textAlign: "center", // Center-align the tab label
    },
    mobileTab: {
      // Increase the width of the tabs for mobile devices
      flexBasis: "120px", // Set the desired width for mobile
      maxWidth: "none", // Remove the maximum width restriction
    },
  });

  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)"); // Adjust the screen width breakpoint as needed

  const { t } = useTranslation();

  // Render only the "Funds" tab if verification is pending
  if (isVerificationPending) {
    return (
      <>
        <Container>
          <Row>
            {Object.entries(buildingFunctionVideos).map(
              ([functionName, { title, link }]) => (
                <Col key={functionName} xs={12} sm={6} md={4} className="mb-4">
                  <iframe
                    width="100%"
                    height="200"
                    src={link}
                    title={`${functionName} Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  {/* <h6>{title}</h6> */}
                </Col>
              )
            )}
          </Row>
        </Container>
      </>
    );
  }

  switch (props.type) {
    case "farm_admin":
    case "farm_sub":
      return (
        <>
          <TabList
            className={isMobile ? classes.scrollableTabList : classes.tabList}
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant={isMobile ? "scrollable" : "standard"} // Use scrollable tabs on mobile
            onChange={props.handleChange}
            centered={!isMobile} // Centered tabs on larger screens
          >
            <Tab
              disableRipple
              label="Food"
              value="0"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Environment"
              value="1"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Funds"
              value="2"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="FSSP"
              value="3"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
          </TabList>
          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Farm.Food isSeller={isSeller} profile={props.profile} />
            </TabPanel>
            <TabPanel value={props.value} index={1} dir={props.theme.direction}>
              <Farm.Environment />
            </TabPanel>
            <TabPanel value={props.value} index={2} dir={props.theme.direction}>
              <Farm.Funds />
            </TabPanel>
            <TabPanel value={props.value} index={3} dir={props.theme.direction}>
              <Farm.FSSP />
            </TabPanel>
          </SwipeableViews>
        </>
      );
    case "office_admin":
    case "office_sub":
    case "hotel_admin":
    case "hotel_sub":
    case "hospital_admin":
    case "hosptal_sub":
      return (
        <>
          <TabList
            className={isMobile ? classes.scrollableTabList : classes.tabList}
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant={isMobile ? "scrollable" : "standard"} // Use scrollable tabs on mobile
            onChange={props.handleChange}
            centered={!isMobile} // Centered tabs on larger screens
          >
            <Tab
              disableRipple
              label="Food Business"
              value="0"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Research"
              value="1"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Environment"
              value="2"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Funds"
              value="3"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="FSSP"
              value="4"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
          </TabList>
          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Office.Food
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
                profile={props.profile}
              />
            </TabPanel>
            <TabPanel value={props.value} index={1} dir={props.theme.direction}>
              <Office.Research
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
            <TabPanel value={props.value} index={2} dir={props.theme.direction}>
              <Office.Environment
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
            <TabPanel value={props.value} index={3} dir={props.theme.direction}>
              <Farm.Funds />
            </TabPanel>
            <TabPanel value={props.value} index={4} dir={props.theme.direction}>
              <Office.FSSP />
            </TabPanel>
          </SwipeableViews>
        </>
      );
    case "business_admin":
    case "business_sub":
      return (
        <>
          <TabList
            className={isMobile ? classes.scrollableTabList : classes.tabList}
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant={isMobile ? "scrollable" : "standard"} // Use scrollable tabs on mobile
            onChange={props.handleChange}
            centered={!isMobile} // Centered tabs on larger screens
          >
            <Tab
              disableRipple
              label="Food"
              value="0"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Environment"
              value="1"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Funds"
              value="2"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="FSSP"
              value="3"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
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
                profile={props.profile}
              />
            </TabPanel>
            <TabPanel value={props.value} index={1} dir={props.theme.direction}>
              <Business.Environment
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
            <TabPanel value={props.value} index={2} dir={props.theme.direction}>
              <Farm.Funds />
            </TabPanel>
            <TabPanel value={props.value} index={3} dir={props.theme.direction}>
              <Business.FSSP />
            </TabPanel>
          </SwipeableViews>
        </>
      );

    case "restaurant_admin":
    case "restaurant_sub":
      return (
        <>
          <TabList
            className={isMobile ? classes.scrollableTabList : classes.tabList}
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant={isMobile ? "scrollable" : "standard"} // Use scrollable tabs on mobile
            onChange={props.handleChange}
            centered={!isMobile} // Centered tabs on larger screens
          >
            <Tab
              disableRipple
              label="Food"
              value="0"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Environment"
              value="1"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Funds"
              value="2"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="FSSP"
              value="3"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
          </TabList>
          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Restaurant.Food
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
                profile={props.profile}
              />
            </TabPanel>
            <TabPanel value={props.value} index={1} dir={props.theme.direction}>
              <Restaurant.Environment
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
            <TabPanel value={props.value} index={2} dir={props.theme.direction}>
              <Farm.Funds />
            </TabPanel>
            <TabPanel value={props.value} index={3} dir={props.theme.direction}>
              <Restaurant.FSSP />
            </TabPanel>
          </SwipeableViews>
        </>
      );

    case "supply_admin":
    case "supply_sub":
      return (
        <>
          <TabList
            className={isMobile ? classes.scrollableTabList : classes.tabList}
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant={isMobile ? "scrollable" : "standard"} // Use scrollable tabs on mobile
            onChange={props.handleChange}
            centered={!isMobile} // Centered tabs on larger screens
          >
            <Tab
              disableRipple
              label="Items"
              value="0"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Funds"
              value="1"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
          </TabList>
          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Supply.Items
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
                isSeller={isSeller}
              />
            </TabPanel>
            <TabPanel value={props.value} index={1} dir={props.theme.direction}>
              <Farm.Funds />
            </TabPanel>
          </SwipeableViews>
        </>
      );
    case "material_admin":
    case "material_sub":
      return (
        <>
          <TabList
            className={isMobile ? classes.scrollableTabList : classes.tabList}
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant={isMobile ? "scrollable" : "standard"} // Use scrollable tabs on mobile
            onChange={props.handleChange}
            centered={!isMobile} // Centered tabs on larger screens
          >
            <Tab
              disableRipple
              label="Items"
              value="0"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Funds"
              value="1"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
          </TabList>
          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Material.Items
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
                isSeller={isSeller}
              />
            </TabPanel>
            <TabPanel value={props.value} index={1} dir={props.theme.direction}>
              <Farm.Funds />
            </TabPanel>
          </SwipeableViews>
        </>
      );

    case "admin_admin":
    case "admin_sub":
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
            <Tab disableRipple label="Admin" value="0" />
          </TabList>
          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Admin.Dashboard
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
              />
            </TabPanel>
          </SwipeableViews>
        </>
      );

    case "academic_admin":
    case "academic_sub":
      return (
        <>
          <TabList
            className={isMobile ? classes.scrollableTabList : classes.tabList}
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant={isMobile ? "scrollable" : "standard"} // Use scrollable tabs on mobile
            onChange={props.handleChange}
            centered={!isMobile} // Centered tabs on larger screens
          >
            <Tab
              disableRipple
              label="Food Business"
              value="0"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Research"
              value="1"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Environment"
              value="2"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Funds"
              value="3"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="FSSP"
              value="4"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
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
                profile={props.profile}
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
              <Farm.Funds />
            </TabPanel>
            <TabPanel value={props.value} index={4} dir={props.theme.direction}>
              <Schools.FSSP />
            </TabPanel>
          </SwipeableViews>
        </>
      );

    case "shop_admin":
    case "shop_sub":
      return (
        <>
          <TabList
            className={isMobile ? classes.scrollableTabList : classes.tabList}
            TabIndicatorProps={{
              style: {
                backgroundColor: Colors.brandGreen,
              },
            }}
            variant={isMobile ? "scrollable" : "standard"} // Use scrollable tabs on mobile
            onChange={props.handleChange}
            centered={!isMobile} // Centered tabs on larger screens
          >
            <Tab
              disableRipple
              label="Items"
              value="0"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="Funds"
              value="1"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
            <Tab
              disableRipple
              label="FSSP"
              value="2"
              className={
                isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
              }
            />
          </TabList>
          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Shops.Item
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
                profile={props.profile}
              />
            </TabPanel>
            <TabPanel value={props.value} index={1} dir={props.theme.direction}>
              <Farm.Funds />
            </TabPanel>
            <TabPanel value={props.value} index={2} dir={props.theme.direction}>
              <Shops.FSSP />
            </TabPanel>
          </SwipeableViews>
        </>
      );
    case "household_admin":
    case "household_sub":
    default:
      return (
        <>
          <div className={classes.tabListContainer}>
            <TabList
              className={isMobile ? classes.scrollableTabList : classes.tabList}
              TabIndicatorProps={{
                style: {
                  backgroundColor: Colors.brandGreen,
                },
              }}
              variant={isMobile ? "scrollable" : "standard"} // Use scrollable tabs on mobile
              onChange={props.handleChange}
              centered={!isMobile} // Centered tabs on larger screens
            >
              <Tab
                disableRipple
                label={t("description.tab_food")}
                value="0"
                className={
                  isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
                }
              />
              <Tab
                disableRipple
                label={t("description.tab_health")}
                value="1"
                className={
                  isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
                }
              />
              <Tab
                disableRipple
                label={t("description.tab_environment")}
                value="2"
                className={
                  isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
                }
              />
              <Tab
                disableRipple
                label="Funds"
                value="3"
                className={
                  isMobile ? `${classes.tab} ${classes.mobileTab}` : classes.tab
                }
              />
            </TabList>
          </div>

          <SwipeableViews
            axis={props.theme.direction === "rtl" ? "x-reverse" : "x"}
            index={parseInt(props.value)}
            onChangeIndex={props.handleChangeIndex}
          >
            <TabPanel value={props.value} index={0} dir={props.theme.direction}>
              <Households.Food
                setShow={props.setShow}
                setChooseModal={props.setChooseModal}
                profile={props.profile}
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
            <TabPanel value={props.value} index={3} dir={props.theme.direction}>
              <Households.Funds />
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
