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

import Homepage from "./components/Pages/Account/Consultant/Homepage/Homepage";
import ConsultantSignup from "./components/Pages/Account/Consultant/Auth/ConsultantSignup";
import OnboardMessage from "./components/Pages/Account/Consultant/Auth/OnboardMessage";
import ConsultantLogin from "./components/Pages/Account/Consultant/Login/ConsultantLogin";
import ConsultantAccount from "./components/Pages/Account/Consultant/Login/ConsultantAccount";
import ConsultantSettings from "./components/Pages/Account/Consultant/Login/ConsultantSettings";
import ConsultantSessionPage from "./components/Pages/Account/Consultant/ConsultantSessions/consultantSessionsPage";
import ConsultantRecordsPage from "./components/Pages/Account/Consultant/ConsutltantRecords/consultantRecordsPage";
import ConsultantRequestsPage from "./components/Pages/Account/Consultant/ConsultantRequests/consultantRequestsPage";

import SignUp from "./components/Pages/Auth/SignUp";
import Settings from "./components/Pages/Auth/Settings";
import Questionnaire from "./components/Pages/Auth/Questionnaire";
import NotFound from "./components/Pages/NotFound";
import ForgotPassword from "./components/Pages/ForgotPassword";
import PlanToSave from "./components/Pages/Account/PlanToSave/PlanToSave";
import ChangePassword from "./components/Pages/Account/ChangePassword";
import Map from "./components/Pages/Account/Map";
import Admin from "./components/Pages/Admin";

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

import FarmPlan from "./components/Pages/Account/Farm/Marketplace/FarmPlan";
import FarmerAuth from "./components/Pages/Account/Farm/Marketplace/Auth/Farmer-Auth";
import ConsumerAuth from "./components/Pages/Account/Personal/Marketplace/ConsumerAuth";
import MealPlan from "./components/Pages/Account/Personal/Marketplace/MealPlanComp/MealPlan";
import ProduceTab from "./components/Pages/Account/Farm/Marketplace/ProduceComp/ProduceTab";
import NutrientGap from "./components/Pages/Account/Personal/NutrientGap";
import ViewProducts from "./components/Pages/Account/Farm/ViewProducts";

import FoodWasteAcademic from "./components/Pages/Account/Academic/FoodWaste";
import FoodIntakeAcademic from "./components/Pages/Account/Academic/FoodIntakeAcademic";
import FoodSurplusAcademic from "./components/Pages/Account/Academic/FoodSurplusAcademic";

import RestaurantShoppingListPlanner from "./components/Pages/Account/Business/Restaurant/RestaurantShoppingListPlanner";
import RestaurantInventory from "./components/Pages/Account/Business/Restaurant/RestaurantInventory";
import RestaurantDashboard from "./components/Pages/Account/Business/Restaurant/RestaurantDashboard";
import RestaurantMealPlan from "./components/Pages/Account/Business/Restaurant/RestaurantMealPlan";

import NewAccount from "./components/Pages/Account/Account";

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

const App = (props) => {
	const [uid, setUid] = useState(props.auth.uid);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

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
						<Route path="/admin" exact component={Admin} />
						<Route path="/landing" exact component={LandingPage} />
						<Route path="/about-us" exact component={AboutUs} />
						<Route path="/signup" exact component={SignUp} />
						<Route path="/settings" exact component={Settings} />
						<Route path="/questionnaire" exact component={Questionnaire} />
						<Route path="/contact" exact component={Contact} />
						<Route path="/forgot-password" exact component={ForgotPassword} />
						<Route path="/payment-process" exact component={Payment} />

						{/* <Route exact path="/consultant" component={Homepage} /> */}
						<Route
							path="/consultant/signup"
							exact
							component={ConsultantSignup}
						/>
						{/* <Route
							path="/consultant/onboard"
							exact
							component={OnboardMessage}
						/> */}
						<Route path="/consultant/login" exact component={ConsultantLogin} />
						<Route path="/consultant" exact component={ConsultantAccount} />
						<Route
							path="/consultant/settings"
							exact
							component={ConsultantSettings}
						/>
						<Route
							path="/consultant/sessions"
							exact
							component={ConsultantSessionPage}
						/>
						<Route
							path="/consultant/requests"
							exact
							component={ConsultantRequestsPage}
						/>

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

						<Route path="/farm-plan" component={FarmPlan}>
							{!props.profile.isSeller && <Redirect to="/farm-plan" />}
						</Route>
						<Route path="/farm-auth" component={FarmerAuth}>
							{props.profile.isSeller && <Redirect to="/farm-plan" />}
						</Route>
						<Route path="/cons-auth" component={ConsumerAuth} />
						<Route path="/meal-plan" component={MealPlan} />
						<Route path="/produce" component={ProduceTab} />
						<Route path="/nutrient-gap" component={NutrientGap} />
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
