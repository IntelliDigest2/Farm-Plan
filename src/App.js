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
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Login from "./components/Pages/Auth/Login";
import LandingPage from "./components/Pages/Auth/Mobile/Landing";
import Contact from "./components/Pages/Contact";
import SignUp from "./components/Pages/Auth/SignUp";
import Stage1 from "./components/Pages/Auth/Mobile/SignUp/Stage1";
import NotFound from "./components/Pages/NotFound";
import TermsAndPrivacy from "./components/Pages/TermsAndPrivacy";
import ForgotPassword from "./components/Pages/ForgotPassword";
import PlanToSave from "./components/Pages/Account/PlanToSave";
import Account from "./components/Pages/Account/UserAccount";
import ChangePassword from "./components/Pages/Account/ChangePassword";
import MapData from "./components/Pages/Account/MapData";

import FoodWaste from "./components/Pages/Account/FoodWaste";
import FoodLoss from "./components/Pages/Account/Farm/FoodLoss";
import FoodWasteBusiness from "./components/Pages/Account/Business/FoodWasteBusiness";
import FoodIntake from "./components/Pages/Account/FoodIntake";
// import FoodSurplus from "./components/Pages/Account/FoodSurplus";

import Chart1 from "./components/Pages/Account/Charts/HH/Waste/ChartYear";
import Chart2 from "./components/Pages/Account/Charts/HH/Waste/ChartMonth";
import Chart3 from "./components/Pages/Account/Charts/HH/Waste/ChartWeek";
// import Chart4 from "./components/Pages/Account/ChartDay";

import Chart5 from "./components/Pages/Account/Charts/HH/Waste/ChartYearGHG";
import Chart6 from "./components/Pages/Account/Charts/HH/Waste/ChartMonthGHG";
import Chart7 from "./components/Pages/Account/Charts/HH/Waste/ChartWeekGHG";
// import Chart8 from "./components/Pages/Account/ChartDayGHG";

import Chart9 from "./components/Pages/Account/Charts/HH/Waste/ChartYearCost";
import Chart10 from "./components/Pages/Account/Charts/HH/Waste/ChartMonthCost";
import Chart11 from "./components/Pages/Account/Charts/HH/Waste/ChartWeekCost";
// import Chart12 from "./components/Pages/Account/ChartDayCost";

import Chart13 from "./components/Pages/Account/Charts/HH/Surplus/ChartYearSurplus";
import Chart14 from "./components/Pages/Account/Charts/HH/Surplus/ChartMonthSurplus";
import Chart15 from "./components/Pages/Account/Charts/HH/Surplus/ChartWeekSurplus";
// import Chart16 from "./components/Pages/Account/ChartDaySurplus";

import Chart17 from "./components/Pages/Account/Charts/HH/Surplus/ChartYearSurplusGHG";
import Chart18 from "./components/Pages/Account/Charts/HH/Surplus/ChartMonthSurplusGHG";
import Chart19 from "./components/Pages/Account/Charts/HH/Surplus/ChartWeekSurplusGHG";
// import Chart20 from "./components/Pages/Account/ChartDaySurplusGHG";

import Chart21 from "./components/Pages/Account/Charts/HH/Surplus/ChartYearSurplusCost";
import Chart22 from "./components/Pages/Account/Charts/HH/Surplus/ChartMonthSurplusCost";
import Chart23 from "./components/Pages/Account/Charts/HH/Surplus/ChartWeekSurplusCost";
// import Chart24 from "./components/Pages/Account/ChartDaySurplusCost";

// import Chart25 from "./components/Pages/Account/ChartDayBusiness";
// import Chart26 from "./components/Pages/Account/ChartDayCostBusiness";
// import Chart27 from "./components/Pages/Account/ChartDayGHGBusiness";

import Chart28 from "./components/Pages/Account/Charts/Farm/Loss/ChartYearLoss";
import Chart29 from "./components/Pages/Account/Charts/Farm/Loss/ChartMonthLoss";
import Chart30 from "./components/Pages/Account/Charts/Farm/Loss/ChartWeekLoss";
import Chart31 from "./components/Pages/Account/Charts/Farm/Loss/ChartDayLoss";

import Chart32 from "./components/Pages/Account/Charts/Farm/Loss/ChartYearLossGHG";
import Chart33 from "./components/Pages/Account/Charts/Farm/Loss/ChartMonthLossGHG";
import Chart34 from "./components/Pages/Account/Charts/Farm/Loss/ChartWeekLossGHG";
import Chart35 from "./components/Pages/Account/Charts/Farm/Loss/ChartDayLossGHG";

import Chart36 from "./components/Pages/Account/Charts/Farm/Loss/ChartYearLossCost";
import Chart37 from "./components/Pages/Account/Charts/Farm/Loss/ChartMonthLossCost";
import Chart38 from "./components/Pages/Account/Charts/Farm/Loss/ChartWeekLossCost";
import Chart39 from "./components/Pages/Account/Charts/Farm/Loss/ChartDayLossCost";

import Chart40 from "./components/Pages/Account/NutrientGapChart";

import Chart41 from "./components/Pages/Account/Charts/Uni/Waste/ChartYearUni";
import Chart42 from "./components/Pages/Account/Charts/Uni/Waste/ChartMonthUni";
import Chart43 from "./components/Pages/Account/Charts/Uni/Waste/ChartWeekUni";

import Chart44 from "./components/Pages/Account/Charts/Uni/Waste/ChartYearGHGUni";
import Chart45 from "./components/Pages/Account/Charts/Uni/Waste/ChartMonthGHGUni";
import Chart46 from "./components/Pages/Account/Charts/Uni/Waste/ChartWeekGHGUni";

import Chart47 from "./components/Pages/Account/Charts/Uni/Waste/ChartYearCostUni";
import Chart48 from "./components/Pages/Account/Charts/Uni/Waste/ChartMonthCostUni";
import Chart49 from "./components/Pages/Account/Charts/Uni/Waste/ChartWeekCostUni";

import Chart50 from "./components/Pages/Account/Charts/Uni/Surplus/ChartYearSurplusUni";
import Chart51 from "./components/Pages/Account/Charts/Uni/Surplus/ChartMonthSurplusUni";
import Chart52 from "./components/Pages/Account/Charts/Uni/Surplus/ChartWeekSurplusUni";

import Chart53 from "./components/Pages/Account/Charts/Uni/Surplus/ChartYearSurplusGHGUni";
import Chart54 from "./components/Pages/Account/Charts/Uni/Surplus/ChartMonthSurplusGHGUni";
import Chart55 from "./components/Pages/Account/Charts/Uni/Surplus/ChartWeekSurplusGHGUni";

import Chart56 from "./components/Pages/Account/Charts/Uni/Surplus/ChartYearSurplusCostUni";
import Chart57 from "./components/Pages/Account/Charts/Uni/Surplus/ChartMonthSurplusCostUni";
import Chart58 from "./components/Pages/Account/Charts/Uni/Surplus/ChartWeekSurplusCostUni";

import Chart59 from "./components/Pages/Account/Charts/Business/Waste/ChartYearBusiness";
import Chart60 from "./components/Pages/Account/Charts/Business/Waste/ChartMonthBusiness";
import Chart61 from "./components/Pages/Account/Charts/Business/Waste/ChartWeekBusiness";

import Chart62 from "./components/Pages/Account/Charts/Business/Waste/ChartYearGHGBusiness";
import Chart63 from "./components/Pages/Account/Charts/Business/Waste/ChartMonthGHGBusiness";
import Chart64 from "./components/Pages/Account/Charts/Business/Waste/ChartWeekGHGBusiness";

import Chart65 from "./components/Pages/Account/Charts/Business/Waste/ChartYearCostBusiness";
import Chart66 from "./components/Pages/Account/Charts/Business/Waste/ChartMonthCostBusiness";
import Chart67 from "./components/Pages/Account/Charts/Business/Waste/ChartWeekCostBusiness";

import Chart68 from "./components/Pages/Account/Charts/Business/Surplus/ChartYearSurplusBusiness";
import Chart69 from "./components/Pages/Account/Charts/Business/Surplus/ChartMonthSurplusBusiness";
import Chart70 from "./components/Pages/Account/Charts/Business/Surplus/ChartWeekSurplusBusiness";

import Chart71 from "./components/Pages/Account/Charts/Business/Surplus/ChartYearSurplusGHGBusiness";
import Chart72 from "./components/Pages/Account/Charts/Business/Surplus/ChartMonthSurplusGHGBusiness";
import Chart73 from "./components/Pages/Account/Charts/Business/Surplus/ChartWeekSurplusGHGBusiness";

import Chart74 from "./components/Pages/Account/Charts/Business/Surplus/ChartYearSurplusCostBusiness";
import Chart75 from "./components/Pages/Account/Charts/Business/Surplus/ChartMonthSurplusCostBusiness";
import Chart76 from "./components/Pages/Account/Charts/Business/Surplus/ChartWeekSurplusCostBusiness";

import Chart77 from "./components/Pages/Account/Charts/Farm/Surplus/ChartYearSurplusFarm";
import Chart78 from "./components/Pages/Account/Charts/Farm/Surplus/ChartMonthSurplusFarm";
import Chart79 from "./components/Pages/Account/Charts/Farm/Surplus/ChartWeekSurplusFarm";

import Chart80 from "./components/Pages/Account/Charts/Farm/Surplus/ChartYearSurplusGHGFarm";
import Chart81 from "./components/Pages/Account/Charts/Farm/Surplus/ChartMonthSurplusGHGFarm";
import Chart82 from "./components/Pages/Account/Charts/Farm/Surplus/ChartWeekSurplusGHGFarm";

import Chart83 from "./components/Pages/Account/Charts/Farm/Surplus/ChartYearSurplusCostFarm";
import Chart84 from "./components/Pages/Account/Charts/Farm/Surplus/ChartMonthSurplusCostFarm";
import Chart85 from "./components/Pages/Account/Charts/Farm/Surplus/ChartWeekSurplusCostFarm";

import FoodReduction from "./components/Pages/FoodReduction";
import InfoTable from "./components/Pages/InfoTable";

import BrowseProducts from "./components/Pages/Account/BrowseProducts";
// import BrowseProductsLocalProduce from "./components/Pages/Account/BrowseProductsLocalProduce";

import ProductListing from "./components/Pages/Account/products/ProductListing";

import ReserveItems from "./components/Pages/Account/ReserveItems";

import AddProducts from "./components/Pages/Account/AddProducts";
import AddProductsFarm from "./components/Pages/Account/Farm/AddProductsFarm";
import AddProductsBusiness from "./components/Pages/Account/Business/AddProductsBusiness";
import AddProductsAcademic from "./components/Pages/Account/Academic/AddProductsAcademic";

import FoodWasteAcademic from "./components/Pages/Account/Academic/FoodWasteAcademic";
import FoodIntakeAcademic from "./components/Pages/Account/Academic/FoodIntakeAcademic";
import FoodSurplusAcademic from "./components/Pages/Account/Academic/FoodSurplusAcademic";

import NewAccount from "./components/Pages/Account/Account";

import NewSignUp from "./components/Pages/Auth/Mobile/SignUp/NewSignUp";

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
  }, []);

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
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <React.Fragment>
      <Notifications />
      <Router>
        <NavBar />
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          animation
          style={{
            position: "absolute",
            top: 70,
            right: 20,
            width: 300,
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
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
        <div>
          <MobileView>
            <Route
              exact
              path="/"
              render={() =>
                isLoggedIn ? <Redirect to="/pts" /> : <Redirect to="/landing" />
              }
            />
          </MobileView>

          <BrowserView>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </BrowserView>

          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/login" exact component={Login} />
            <Route path="/landing" exact component={LandingPage} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signup-1" exact component={Stage1} />
            <Route path="/contact" exact component={Contact} />
            <Route
              path="/terms-and-privacy"
              exact
              component={TermsAndPrivacy}
            />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/account" exact component={Account} />
            {/* New Account Page */}
            <Route path="/newaccount" exact component={NewAccount} />
            {/* New SignUp */}
            <Route path="/newSignUp" exact component={NewSignUp} />
            <Route path="/pts" exact component={PlanToSave} />
            <Route path="/change-password" exact component={ChangePassword} />
            <Route path="/view-map" exact component={MapData} />

            <Route path="/food-waste" exact component={FoodWaste} />
            <Route path="/food-loss" exact component={FoodLoss} />
            <Route
              path="/food-wasteBusiness"
              exact
              component={FoodWasteBusiness}
            />
            <Route path="/food-intake" exact component={FoodIntake} />
            {/* <Route path="/food-surplus" exact component={FoodSurplus}/> */}
            <Route path="/table" component={InfoTable} />

            <Route path="/chart" exact component={ChartView} />

            <Route path="/food-reduction" component={FoodReduction} />

            <Route path="/browse-products" component={BrowseProducts} />
            {/* <Route path="/browse-products-local" component={BrowseProductsLocalProduce} /> */}

            <Route path="/product-listing" component={ProductListing} />

            <Route path="/reserve-items" component={ReserveItems} />

            <Route path="/add-products" component={AddProducts} />
            <Route path="/add-products-farm" component={AddProductsFarm} />
            <Route
              path="/add-products-business"
              component={AddProductsBusiness}
            />
            <Route
              path="/add-products-academic"
              component={AddProductsAcademic}
            />

            <Route path="/food-wasteAcademic" component={FoodWasteAcademic} />
            <Route path="/food-intakeAcademic" component={FoodIntakeAcademic} />
            <Route
              path="/food-surplusAcademic"
              component={FoodSurplusAcademic}
            />

            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
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
