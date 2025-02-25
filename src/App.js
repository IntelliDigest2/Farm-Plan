import React, { useState, useEffect } from "react";
import MapTest from "./MapTest/MapTest";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import firebase, { auth, fs } from "./config/fbConfig";
import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FarmPlan from "./components/Pages/Account/Farm/Marketplace/FarmPlan";
import MapComponent from "./MapTest/MapComponent";

//* Pages
import Login from "./components/Pages/Auth/LogIn";
import LandingPage from "./components/Pages/Auth/Landing";
import AboutUs from "./components/Pages/AboutUs";
import Contact from "./components/Pages/Contact";
import Homepage from "./components/Pages/Account/Consultant/Homepage/Homepage";
import ConsultantRegister from "./components/Pages/Account/Consultant/ConsultantAuth/ConsultantRegister";
import ConsultantVideo from "./components/Pages/Account/Consultant/ConsultantSessions/consultantVideo";
import OnboardMessage from "./components/Pages/Account/Consultant/ConsultantAuth/OnboardMessage";
import ConsultantLogin from "./components/Pages/Account/Consultant/ConsultantAuth/ConsultantLogin";
import ConsultantAccount from "./components/Pages/Account/Consultant/ConsultantAccount";
import ConsultantSettings from "./components/Pages/Account/Consultant/ConsultantSettings/ConsultantSettings";
import ConsultantSessionPage from "./components/Pages/Account/Consultant/ConsultantSessions/consultantSessionsPage";
import ConsultantRecordsPage from "./components/Pages/Account/Consultant/ConsultantRecords/consultantRecordsPage";
import ConsultantRequestsPage from "./components/Pages/Account/Consultant/ConsultantRequests/consultantRequestsPage";

import ConsultingPage from "./components/SubComponents/consulting/consultingPage";

import SignUp from "./components/Pages/Auth/SignUp";
import Settings from "./components/Pages/Auth/Settings";
import Questionnaire from "./components/Pages/Auth/Questionnaire";
import NotFound from "./components/Pages/NotFound";
import InProgress from "./components/Pages/InProgress";
import ForgotPassword from "./components/Pages/ForgotPassword";
import PlanToSave from "./components/Pages/Account/PlanToSave/PlanToSave";
import ChangePassword from "./components/Pages/Account/ChangePassword";
import Map from "./components/Pages/Account/Map";
import AdminTab from "./components/Pages/Account/Admin/Admin/AdminComp/AdminTab";
import CommerceTab from "./components/Pages/Account/Commerce/CommerceComp/CommerceTab";
import CommerceTabShop from "./components/Pages/Account/Commerce/CommerceCompShop/CommerceTabShop";
import FoodWaste from "./components/Pages/Account/Personal/FoodWaste";
import FoodWasteEdible from "./components/Pages/Account/Personal/FoodWasteEdible";

import GiftFood from "./components/Pages/Account/Personal/GiftFood";
import FoodLoss from "./components/Pages/Account/Farm/FoodLoss";
import FoodWasteBusiness from "./components/Pages/Account/Business/FoodWaste";
import FoodIntake from "./components/Pages/Account/Personal/FoodIntake";

import FoodReduction from "./components/Pages/FoodReduction";
import InfoTable from "./components/Pages/InfoTable";

import ProductListing from "./components/Pages/Account/products/ProductListing";

import ReserveItems from "./components/Pages/Account/ReserveItems";

import FarmerAuth from "./components/Pages/Account/Farm/Marketplace/Auth/Farmer-Auth";
import ConsumerAuth from "./components/Pages/Account/Personal/Marketplace/ConsumerAuth";
import MealPlan from "./components/Pages/Account/Personal/Marketplace/MealPlanComp/MealPlan";
import ProduceTab from "./components/Pages/Account/Farm/Marketplace/ProduceComp/ProduceTab";
import ItemTab from "./components/Pages/Account/Shop/Marketplace/ItemComp/ItemTab";
import NutrientGap from "./components/Pages/Account/Personal/NutrientGap";
import ViewProducts from "./components/Pages/Account/Farm/ViewProducts";

import FoodWasteAcademic from "./components/Pages/Account/Business/Academic/FoodWaste";
import FoodIntakeAcademic from "./components/Pages/Account/Business/Academic/FoodIntakeAcademic";
import FoodSurplusAcademic from "./components/Pages/Account/Business/Academic/FoodSurplusAcademic";

import RestaurantShoppingListPlanner from "./components/Pages/Account/Business/Restaurant/RestaurantShoppingListPlanner";
import RestaurantInventory from "./components/Pages/Account/Business/Restaurant/RestaurantInventory";
import RestaurantDashboard from "./components/Pages/Account/Business/Restaurant/RestaurantDashboard";
import RestaurantMealPlan from "./components/Pages/Account/Business/Restaurant/RestaurantMealPlan";

import SchoolShoppingListPlanner from "./components/Pages/Account/Business/Academic/RestaurantShoppingListPlanner";
import SchoolInventory from "./components/Pages/Account/Business/Academic/RestaurantInventory";
import SchoolDashboard from "./components/Pages/Account/Business/Academic/RestaurantDashboard";
import SchoolMealPlan from "./components/Pages/Account/Business/Academic/RestaurantMealPlan";

import SupplyPlan from "./components/Pages/Account/Business/Suppliers/SupplyPlan";

import NewAccount from "./components/Pages/Account/Account";
import ConsultAdminTest from "./components/Pages/Account/Admin/Admin/AdminComp/AdminConsultant";

import RevolutPay from "./components/SubComponents/payment/RevolutPay";

import FailedDeposit from "./components/SubComponents/payment/Failed";
// import Example from "./components/Pages/Account/Example";

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
import GiftFoodChart from "./components/Pages/Account/Charts/GiftFoodChart";

import Nutrients from "./components/Pages/Account/Farm/Marketplace/Nutrients";
import Payment from "./components/Pages/Account/Personal/Marketplace/MealPlanComp/Payment";
import TurnOverPage from "./components/Pages/Account/Farm/Marketplace/Turnover/TurnOverPage";
import ExpensePage from "./components/Pages/Account/Farm/Marketplace/Expense.js/ExpensePage";
import Wallet from "./components/SubComponents/payment/Wallet";
import Coupon from "./components/SubComponents/payment/Coupon";

import Transactions from "./components/SubComponents/payment/Transactions";
import CouponTransactions from "./components/SubComponents/payment/CouponTransactions";
import RedeemCoupon from "./components/SubComponents/payment/RedeemCoupon";
import Reservations from "./components/SubComponents/payment/Reservations";
import ReservationsOther from "./components/SubComponents/payment/ReservationsOther";
import PaymentSuccess from "./components/Pages/PaymentSuccess";
import SupplyRevenue from "./components/Pages/Account/Business/Suppliers/supplyRevenue";
import RestaurantSale from "./components/Pages/Account/Business/Restaurant/RestaurantSale";
import RestaurantTurnover from "./components/Pages/Account/Business/Restaurant/RestaurantTurnover";
import RestaurantExpense from "./components/Pages/Account/Business/Restaurant/RestaurantExpense";
import WithdrawalSuccess from "./components/Pages/WithdrawalSuccess";

import Withdraw from "./components/SubComponents/payment/Withdraw";
import SignUpAdmin from "./components/Pages/Auth/SignUpAdmin";
import CombinedReservations from "./components/SubComponents/payment/CombinedReservations";
import { OrderList } from "./components/Pages/Account/Personal/Marketplace/MealPlanComp/BuildRestaurantOrderList/OrderList";
import ResAuth from "./components/Pages/Account/Business/Restaurant/Auth/Res-Auth";
import SupAuth from "./components/Pages/Account/Business/Suppliers/Auth/Sup-Auth";
import CalendarPlannerHealth from "./components/Pages/Account/Personal/Marketplace/MealPlanComp/Plan/CalendarPlanner/CalendarPlannerHealth";
import moment from "moment";
import CreateCode from "./components/Pages/Account/Business/Academic/CreateCode";
import ConnectSchool from "./components/Pages/Account/Personal/ConnectSchool";
import CompleteSignUp from "./components/Pages/Auth/CompleteSignUp";
import { updateSignup } from "./store/actions/authActions";
import UpdateSignup from "./components/Pages/Auth/UpdateSignup";

const App = (props) => {
  const [uid, setUid] = useState(props.auth.uid);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [value, setValue] = useState(moment());

  useEffect(() => {
    if (props.auth.uid) setIsLoggedIn(true);
    if (!props.auth.uid) return <Redirect to="/landing" />;
  }, [props.auth.uid]);

  //
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

  const updateFirestore = async () => {
    const collectionRef = fs.collection("users");

    try {
      const snapshot = await collectionRef.get();

      const batch = fs.batch();

      snapshot.forEach((doc) => {
        const documentRef = collectionRef.doc(doc.id);
        const updatedData = {
          ...doc.data(),
          //   uid: doc.id.toString(),
          voucherBalance: 0,
        };
        batch.update(documentRef, updatedData);
      });

      await batch.commit();
      console.log("xxxxxxxxxxxx> Update successful");
    } catch (error) {
      console.error("Error updating documents:", error);
    }
  };

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
            {/* <Route path="/example" exact component={Example} /> */}
            <Route path="/login" exact component={Login} />
            <Route path="/admin" exact component={AdminTab} />
            <Route path="/supply" exact component={CommerceTab} />;
            <Route path="/landing" exact component={LandingPage} />
            <Route path="/about-us" exact component={AboutUs} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/complete-signup" exact component={UpdateSignup} />
            <Route path="/reveal" exact component={SignUpAdmin} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/questionnaire" exact component={Questionnaire} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/payment-process" exact component={Payment} />
            <Route path="/search-shop" exact component={CommerceTabShop} />
            <Route path="/restaurant-order-list" exact component={OrderList} />
            <Route
              path="/adminconsulttest"
              exact
              component={ConsultAdminTest}
            />
            {/* <Route exact path="/consultanft" component={Homepage} /> */}
            {/* <Route path="/consultant/register" component={ConsultantRegister} /> */}
            {/* <Route
							path="/consultant/onboard"
							exact
							component={OnboardMessage}
						/> */}
            <Route path="/consultant/login" exact component={ConsultantLogin} />
            <Route path="/consultant" exact component={ConsultantAccount} />
            <Route path="/consultant/settings" component={ConsultantSettings} />
            <Route
              path="/consultant/sessions"
              component={ConsultantSessionPage}
            />
            <Route
              path="/consultant/requests"
              component={ConsultantRequestsPage}
            />
            <Route
              path="/consultant/records"
              component={ConsultantRecordsPage}
            />
            <Route path="/call/:id" component={ConsultantVideo} />
            <Route path="/consult" component={ConsultingPage} />
            <Route path="/consult-video" exact component={ConsultantVideo} />
            <Route path="/account" exact component={NewAccount} />
            <Route path="/pts" exact component={PlanToSave} />
            <Route path="/change-password" exact component={ChangePassword} />
            <Route path="/view-map" exact component={Map} />
            <Route path="/food-waste" exact component={FoodWaste} />
            <Route path="/gift-food" exact component={GiftFood} />
            <Route path="/food-loss" exact component={FoodLoss} />
            <Route
              path="/food-wasteBusiness"
              exact
              component={FoodWasteBusiness}
            />
            <Route path="/food-intake" exact component={FoodIntake} />
            <Route path="/table" component={InfoTable} />
            <Route path="/chart" exact component={ChartView} />
            <Route path="/gift-chart" exact component={GiftFoodChart} />
            <Route path="/food-reduction" component={FoodReduction} />
            <Route path="/product-listing" component={ProductListing} />
            <Route path="/reserve-items" component={ReserveItems} />
            <Route path="/farm-plan" component={MapComponent}>
              {!props.profile.isSeller && <Redirect to="/farm-plan" />}
            </Route>
            <Route path="/farm-auth" component={FarmerAuth}>
              {props.profile.isSeller && <Redirect to="/farm-plan" />}
            </Route>
            <Route path="/res-auth" component={ResAuth}>
              {props.profile.isSeller && <Redirect to="/res-plan" />}
            </Route>
            <Route path="/sup-auth" component={SupAuth}>
              {props.profile.isSeller && <Redirect to="/sup-plan" />}
            </Route>
            <Route path="/machinery-auth" component={FarmerAuth}>
              {props.profile.isSeller && <Redirect to="/farm-plan" />}
            </Route>
            <Route path="/cons-auth" component={ConsumerAuth} />
            <Route path="/meal-plan" component={MealPlan} />
            <Route path="/items" component={ItemTab} />
            <Route path="/nutrient-gap" component={NutrientGap} />
            <Route
              path="/meal-plan-health"
              render={(props) => (
                <CalendarPlannerHealth {...props} value={value} />
              )}
            />
            <Route path="/view-products" component={ViewProducts} />
            <Route path="/food-wasteAcademic" component={FoodWasteAcademic} />
            <Route path="/food-intakeAcademic" component={FoodIntakeAcademic} />
            <Route
              path="/food-surplusAcademic"
              component={FoodSurplusAcademic}
            />
            <Route
              path="/restaurant-shopping-list"
              component={RestaurantShoppingListPlanner}
            />
            <Route
              path="/restaurant-inventory"
              component={RestaurantInventory}
            />
            <Route
              path="/restaurant-dashboard"
              component={RestaurantDashboard}
            />
            <Route
              path="/restaurant-meal-plan"
              component={RestaurantMealPlan}
            />
            <Route
              path="/school-shopping-list"
              component={SchoolShoppingListPlanner}
            />
            <Route path="/school-inventory" component={SchoolInventory} />
            <Route path="/school-dashboard" component={SchoolDashboard} />
            <Route path="/school-meal-plan" component={SchoolMealPlan} />
            <Route path="/create-school-code" component={CreateCode} />
            <Route path="/add-student-to-school" component={ConnectSchool} />
            <Route path="/restaurant-sale" component={RestaurantSale} />
            <Route path="/restaurant-turnover" component={RestaurantTurnover} />
            <Route path="/restaurant-expense" component={RestaurantExpense} />
            <Route path="/supply-plan" component={SupplyPlan} />
            <Route path="/supply-revenue" component={SupplyRevenue} />
            <Route path="/produce" component={ProduceTab} />
            <Route path="/turnover" component={TurnOverPage} />
            <Route path="/expense" component={ExpensePage} />
            <Route path="/in-progress" component={InProgress} />
            <Route path="/payment-success" component={PaymentSuccess} />
            <Route path="/withdrawal-success" component={WithdrawalSuccess} />
            <Route path="/payment" component={RevolutPay} />
            <Route path="/wallet" component={Wallet} />
            <Route path="/withdraw-funds" component={Withdraw} />
            <Route path="/create-coupon" component={Coupon} />
            <Route path="/redeem-coupon" component={RedeemCoupon} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/coupon-transactions" component={CouponTransactions} />
            <Route
              path="/track-reservations"
              component={CombinedReservations}
            />
            <Route
              path="/track-reservations-other"
              component={CombinedReservations}
            />
            <Route
              path="/db"
              render={() => {
                updateFirestore();
                return <Redirect to="/" />;
              }}
            />
            <Route
              path="/failed"
              render={(props) => {
                // Extract the query parameters from the location.search
                const searchParams = new URLSearchParams(props.location.search);
                const order = searchParams.get("order");
                const reason = searchParams.get("reason");

                // Pass the extracted parameters to the FailedDeposit component
                return <FailedDeposit orderId={order} reason={reason} />;
              }}
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
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps, null)(App);
