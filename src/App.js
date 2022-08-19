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
import Login from "./components/Pages/Auth/LogIn";
import LandingPage from "./components/Pages/Auth/Landing";
import AboutUs from "./components/Pages/AboutUs";
import Contact from "./components/Pages/Contact";
import SignUp from "./components/Pages/Auth/SignUp";
import Settings from "./components/Pages/Auth/Settings";
import Questionnaire from "./components/Pages/Auth/Questionnaire";
import NotFound from "./components/Pages/NotFound";
import ForgotPassword from "./components/Pages/ForgotPassword";
import PlanToSave from "./components/Pages/Account/PlanToSave/PlanToSave";
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
import FarmerAuth from "./components/Pages/Account/Farm/Marketplace/Auth/Farmer-Auth";
import ConsumerAuth from "./components/Pages/Account/Personal/Marketplace/ConsumerAuth";
import MealPlan from "./components/Pages/Account/Personal/Marketplace/MealPlanComp/MealPlan";
import ViewProducts from "./components/Pages/Account/Farm/ViewProducts";

import FoodWasteAcademic from "./components/Pages/Account/Academic/FoodWaste";
import FoodIntakeAcademic from "./components/Pages/Account/Academic/FoodIntakeAcademic";
import FoodSurplusAcademic from "./components/Pages/Account/Academic/FoodSurplusAcademic";

import NewAccount from "./components/Pages/Account/Account";

import SupplierHomePage from "./components/Pages/Account/Business/Supplier/HomePage";
import SupplierAuth from "./components/Pages/Account/Business/Supplier/Auth";
import ContinueAuth from "./components/Pages/Account/Business/Supplier/ContinueAuth";
import SuccessModal from "./components/Pages/Account/Business/Supplier/SuccessModal";

import SupplierLogin from "./components/Pages/Account/Business/Supplier/Auth/Login";
import SupplierSignup from "./components/Pages/Account/Business/Supplier/Auth/Signup";
import SupplierForgotPassword from "./components/Pages/Account/Business/Supplier/Auth/ForgotPassword";

import DashboardHome from "./components/Pages/Account/Business/Supplier/Dashboard/Home";
import DashboardProducts from "./components/Pages/Account/Business/Supplier/Dashboard/Products";
import DashboardOrders from "./components/Pages/Account/Business/Supplier/Dashboard/Orders";
import DashboardRevenue from "./components/Pages/Account/Business/Supplier/Dashboard/Revenue";
import DashboardSettings from "./components/Pages/Account/Business/Supplier/Dashboard/Settings";
// import Example from "./components/Pages/Account/Example";

//FISI
import HomePage from "./components/Pages/Account/FISI/HomePage";
import SignUpPage from "./components/Pages/Account/FISI/auth/SignUpPage";
import SignInPage from "./components/Pages/Account/FISI/auth/SignInPage";
import Preloader from "./components/Pages/Account/FISI/Preloader";
import Sections from "./components/Pages/Account/FISI/Categories/Sections";
import Popup from "./components/Pages/Account/FISI/Categories/Popup";

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
import NutrientGap from "./components/Pages/Account/Personal/NutrientGap";

const App = (props) => {
  const [uid, setUid] = useState(props.auth.uid);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (props.auth.uid) setIsLoggedIn(true);
    if (!props.auth.uid) return <Redirect to="/landing" />;
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
            <Route path="/login" exact component={Login} />
            <Route path="/landing" exact component={LandingPage} />
            <Route path="/about-us" exact component={AboutUs} />
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

            <Route path="/farm-plan" component={FarmPlan}>
              {!props.profile.isSeller && <Redirect to="/farm-auth" />}
            </Route>
            <Route path="/farm-auth" component={FarmerAuth}>
              {props.profile.isSeller && <Redirect to="/farm-plan" />}
            </Route>
            <Route path="/cons-auth" component={ConsumerAuth} />
            <Route path="/meal-plan" component={MealPlan} />
            <Route path="/nutrient-gap" component={NutrientGap} />
            <Route path="/view-products" component={ViewProducts} />

            <Route path="/food-wasteAcademic" component={FoodWasteAcademic} />
            <Route path="/food-intakeAcademic" component={FoodIntakeAcademic} />
            <Route
              path="/food-surplusAcademic"
              component={FoodSurplusAcademic}
            />

            {/* Supplier Onboarding */}
            <Route path="/supplier" exact component={SupplierHomePage} />
            <Route path="/supplier/auth" exact component={SupplierAuth} />
            <Route
              path="/supplier/auth/continue"
              exact
              component={ContinueAuth}
            />
            <Route
              path="/supplier/auth/continue/success"
              component={SuccessModal}
            />
            <Route path="/supplier/login" component={SupplierLogin} />
            <Route path="/supplier/signup" component={SupplierSignup} />
            <Route
              path="/supplier/forgot-password"
              component={SupplierForgotPassword}
            />

            <Route path="/supplier/home" component={DashboardHome} />
            <Route path="/supplier/products" component={DashboardProducts} />
            <Route path="/supplier/orders" component={DashboardOrders} />
            <Route path="/supplier/revenue" component={DashboardRevenue} />
            <Route path="/supplier/settings" component={DashboardSettings} />

            {/* FISI */}
            <Route exact path="/FISI" element={<HomePage />} />
            <Route path="/FISI/signinpage" element={<SignInPage />} />
            <Route path="/FISI/signuppage" element={<SignUpPage />} />
            <Route path="/FISI/preloader" element={<Preloader />} />
            <Route path="/FISI/sections" element={<Sections />} />
            <Route path="/FISI/popup" element={<Popup />} />

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
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps, null)(App);
