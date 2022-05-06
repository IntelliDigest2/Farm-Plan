import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

//* Pages
import About from "./components/Pages/About";
import Login from "./components/Pages/Auth/Mobile/LogInMob";
import LandingPage from "./components/Pages/Auth/Mobile/Landing";
import Contact from "./components/Pages/Contact";
import SignUp from "./components/Pages/Auth/Mobile/SignUp";
import Settings from "./components/Pages/Auth/Settings";
import Questionnaire from "./components/Pages/Auth/Mobile/Questionnaire";
import NotFound from "./components/Pages/NotFound";
import ForgotPassword from "./components/Pages/ForgotPassword";
import PlanToSave from "./components/Pages/Account/PlanToSave";
import ChangePassword from "./components/Pages/Account/ChangePassword";
import Map from "./components/Pages/Account/Map";

import FoodWaste from "./components/Pages/Account/Personal/FoodWaste";
import FoodLoss from "./components/Pages/Account/Farm/FoodLoss";
import FoodWasteBusiness from "./components/Pages/Account/Business/FoodWaste";
import FoodIntake from "./components/Pages/Account/Personal/FoodIntake";

import FoodReduction from "./components/Pages/FoodReduction";
import InfoTable from "./components/Pages/InfoTable";

import ProductListing from "./components/Pages/Account/products/ProductListing";

import ReserveItems from "./components/Pages/Account/ReserveItems";

import FarmPlan from "./components/Pages/Account/Farm/Marketplace/FarmPlan";
import ConsumerAuth from "./components/Pages/Account/Personal/Marketplace/ConsumerAuth";
import MealPlan from "./components/Pages/Account/Personal/Marketplace/MealPlan";
import ViewProducts from "./components/Pages/Account/Farm/ViewProducts";

import FoodWasteAcademic from "./components/Pages/Account/Academic/FoodWaste";
import FoodIntakeAcademic from "./components/Pages/Account/Academic/FoodIntakeAcademic";
import FoodSurplusAcademic from "./components/Pages/Account/Academic/FoodSurplusAcademic";

import NewAccount from "./components/Pages/Account/Account";

import { Notifications } from "react-push-notification";

import { connect } from "react-redux";
import {
  BrowserView,
  MobileView,
  //isMobile,
  //isBrowser,
} from "react-device-detect";

//* Cloud Messaging
import { Toast } from "react-bootstrap";
import { getToken, onMessageListener } from "./config/fbConfig";

//* Chart.js
import ChartView from "./components/Pages/Account/Charts/Chart";

const App = (props) => {
  const [uid, setUid] = useState(props.auth.uid);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (props.auth.uid) setIsLoggedIn(true);
    if (!props.auth.uid) return <Redirect to="/login" />;
  }, [props.auth.uid]);

  //Google Cloud Messaging code
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    image: "",
  });
  const [isTokenFound, setTokenFound] = useState(false);
  getToken(setTokenFound);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        image: payload.notification.image,
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <React.Fragment>
      <Notifications position="top-right" />
      <Router>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={10000}
          autohide
          animation
          style={{
            position: "absolute",
            top: 70,
            right: 20,
            width: 300,
            zIndex: 1,
          }}
        >
          <Toast.Header>
            <img
              src={notification.image}
              className="rounded me-2"
              alt=""
              style={{ width: 20, height: 20, margin: 10 }}
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body style={{ backgroundColor: "white" }}>
            {notification.body}
          </Toast.Body>
        </Toast>
        <div>
          <MobileView>
            <Route
              exact
              path="/"
              render={() =>
                isLoggedIn ? (
                  <Redirect to="/account" />
                ) : (
                  <Redirect to="/landing" />
                )
              }
            />
          </MobileView>

          <BrowserView>
            <Route exact path="/" render={() => <Redirect to="/landing" />} />
          </BrowserView>

          <Switch>
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={Login} />
            <Route path="/landing" exact component={LandingPage} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/questionnaire" exact component={Questionnaire} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/account" exact component={NewAccount} />
            <Route path="/pts" exact component={PlanToSave} />
            <Route path="/change-password" exact component={ChangePassword} />
            <Route path="/view-map" exact component={Map} />

            <Route path="/food-waste" exact component={FoodWaste} />
            <Route path="/food-loss" exact component={FoodLoss} />
            <Route
              path="/food-wasteBusiness"
              exact
              component={FoodWasteBusiness}
            />
            <Route path="/food-intake" exact component={FoodIntake} />
            <Route path="/table" component={InfoTable} />

            <Route path="/chart" exact component={ChartView} />

            <Route path="/food-reduction" component={FoodReduction} />

            <Route path="/product-listing" component={ProductListing} />

            <Route path="/reserve-items" component={ReserveItems} />

            <Route path="/farm-plan" component={FarmPlan} />
            <Route path="/cons-auth" component={ConsumerAuth} />
            <Route path="/meal-plan" component={MealPlan} />
            <Route path="/view-products" component={ViewProducts} />

            <Route path="/food-wasteAcademic" component={FoodWasteAcademic} />
            <Route path="/food-intakeAcademic" component={FoodIntakeAcademic} />
            <Route
              path="/food-surplusAcademic"
              component={FoodSurplusAcademic}
            />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, null)(App);
