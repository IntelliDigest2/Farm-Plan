import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import "./App.css";
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Pages/Home";  
import About from "./components/Pages/About";
import Login from "./components/Pages/Auth/Login";
import Contact from "./components/Pages/Contact";
import SignUp from "./components/Pages/Auth/SignUp";
import NotFound from "./components/Pages/NotFound";
import TermsAndPrivacy from "./components/Pages/TermsAndPrivacy";
import ForgotPassword from "./components/Pages/ForgotPassword";
import Account from "./components/Pages/Account/UserAccount";
import ChangePassword from "./components/Pages/Account/ChangePassword";
import MapData from "./components/Pages/Account/MapData";

import FoodWaste from "./components/Pages/Account/FoodWaste";
import FoodLoss from "./components/Pages/Account/FoodLoss";
import FoodWasteBusiness from "./components/Pages/Account/FoodWasteBusiness";
import FoodIntake from "./components/Pages/Account/FoodIntake"

import Chart1 from "./components/Pages/Account/ChartYear";
import Chart2 from "./components/Pages/Account/ChartMonth";
import Chart3 from "./components/Pages/Account/ChartWeek";
// import Chart4 from "./components/Pages/Account/ChartDay";

import Chart5 from "./components/Pages/Account/ChartYearGHG"
import Chart6 from "./components/Pages/Account/ChartMonthGHG"
import Chart7 from "./components/Pages/Account/ChartWeekGHG";
// import Chart8 from "./components/Pages/Account/ChartDayGHG";

import Chart9 from "./components/Pages/Account/ChartYearCost";
import Chart10 from "./components/Pages/Account/ChartMonthCost"
import Chart11 from "./components/Pages/Account/ChartWeekCost";
// import Chart12 from "./components/Pages/Account/ChartDayCost";

import Chart13 from "./components/Pages/Account/ChartYearSurplus";
import Chart14 from "./components/Pages/Account/ChartMonthSurplus";
import Chart15 from "./components/Pages/Account/ChartWeekSurplus";
// import Chart16 from "./components/Pages/Account/ChartDaySurplus";

import Chart17 from "./components/Pages/Account/ChartYearSurplusGHG";
import Chart18 from "./components/Pages/Account/ChartMonthSurplusGHG";
import Chart19 from "./components/Pages/Account/ChartWeekSurplusGHG";
// import Chart20 from "./components/Pages/Account/ChartDaySurplusGHG";

import Chart21 from "./components/Pages/Account/ChartYearSurplusCost";
import Chart22 from "./components/Pages/Account/ChartMonthSurplusCost";
import Chart23 from "./components/Pages/Account/ChartWeekSurplusCost";
// import Chart24 from "./components/Pages/Account/ChartDaySurplusCost";

// import Chart25 from "./components/Pages/Account/ChartDayBusiness";
// import Chart26 from "./components/Pages/Account/ChartDayCostBusiness";
// import Chart27 from "./components/Pages/Account/ChartDayGHGBusiness";

import Chart28 from "./components/Pages/Account/ChartYearLoss";
import Chart29 from "./components/Pages/Account/ChartMonthLoss";
import Chart30 from "./components/Pages/Account/ChartWeekLoss";
import Chart31 from "./components/Pages/Account/ChartDayLoss";

import Chart32 from "./components/Pages/Account/ChartYearLossGHG";
import Chart33 from "./components/Pages/Account/ChartMonthLossGHG";
import Chart34 from "./components/Pages/Account/ChartWeekLossGHG";
import Chart35 from "./components/Pages/Account/ChartDayLossGHG";

import Chart36 from "./components/Pages/Account/ChartYearLossCost";
import Chart37 from "./components/Pages/Account/ChartMonthLossCost";
import Chart38 from "./components/Pages/Account/ChartWeekLossCost";
import Chart39 from "./components/Pages/Account/ChartDayLossCost";

import Chart40 from "./components/Pages/Account/NutrientGapChart";

import FoodReduction from "./components/Pages/FoodReduction";
import InfoTable from "./components/Pages/InfoTable";

import BrowseProducts from "./components/Pages/Account/BrowseProducts";
import BrowseProductsLocalProduce from "./components/Pages/Account/BrowseProductsLocalProduce";

// import { Notifications } from "react-push-notification";

import { connect } from 'react-redux';
import { auth } from "./config/fbConfig";
import { BrowserView, MobileView, isMobile, isBrowser } from 'react-device-detect';

class App extends Component {

  state = {
    uid: this.props.auth.uid,
    isLoggedIn: false
  }

  componentDidMount() {
    if (auth.uid){
      this.setState({isLoggedIn: true})
    } else {
      this.setState({isLoggedIn: false})
    }
  }

  render() {

    const {auth} = this.props;
    
    return (
      
      <React.Fragment>
        {/* <Notifications /> */}
          <Router>
          <NavBar />
          <div>
            <MobileView>
              <Route exact path="/" render={() => (
                  this.state.isLoggedIn ? (
                    <Redirect to="/account"/>
                  ) : (
                    <Redirect to="/login"/>
                  )
                )}/>
            </MobileView>

            <BrowserView>
              <Route exact path="/" render={() => (
                    <Redirect to="/home"/>
                )}/>
            </BrowserView>

          <Switch>
            <Route path="/home" exact component={Home}/>
            <Route path="/about" exact component={About}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/signup" exact component={SignUp}/>
            <Route path="/contact" exact component={Contact}/>
            <Route path="/terms-and-privacy" exact component={TermsAndPrivacy}/>
            <Route path="/forgot-password" exact component={ForgotPassword}/>
            <Route path="/account" exact component={Account}/>
            <Route path="/change-password" exact component={ChangePassword}/>
            <Route path="/view-map" exact component={MapData}/>

            <Route path="/food-waste" exact component={FoodWaste}/>
            <Route path="/food-loss" exact component={FoodLoss}/>
            <Route path="/food-wasteBusiness" exact component={FoodWasteBusiness}/>
            <Route path="/food-intake" exact component={FoodIntake}/>
            <Route path="/table" component={InfoTable} />
            
            <Route path="/chart/year" exact component={Chart1} />
            <Route path="/chart/month" exact component={Chart2} />
            <Route path="/chart/week" exact component={Chart3} />
            {/* <Route path="/chart/day" exact component={Chart4} /> */}

            <Route path="/chart/yearGHG" exact component={Chart5} />
            <Route path="/chart/monthGHG" exact component={Chart6} />
            <Route path="/chart/weekGHG" exact component={Chart7} />
            {/* <Route path="/chart/dayGHG" exact component={Chart8} /> */}

            <Route path="/chart/yearCost" exact component={Chart9} />
            <Route path="/chart/monthCost" exact component={Chart10} />
            <Route path="/chart/weekCost" exact component={Chart11} />
            {/* <Route path="/chart/dayCost" exact component={Chart12} /> */}

            <Route path="/chart/yearSurplus" exact component={Chart13} />
            <Route path="/chart/monthSurplus" exact component={Chart14} />
            <Route path="/chart/weekSurplus" exact component={Chart15} />
            {/* <Route path="/chart/daySurplus" exact component={Chart16} /> */}

            <Route path="/chart/yearSurplusGHG" exact component={Chart17} />
            <Route path="/chart/monthSurplusGHG" exact component={Chart18} />
            <Route path="/chart/weekSurplusGHG" exact component={Chart19} />
            {/* <Route path="/chart/daySurplusGHG" exact component={Chart20} /> */}

            <Route path="/chart/yearSurplusCost" exact component={Chart21} />
            <Route path="/chart/monthSurplusCost" exact component={Chart22} />
            <Route path="/chart/weekSurplusCost" exact component={Chart23} />
            {/* <Route path="/chart/daySurplusCost" exact component={Chart24} /> */}

            {/* <Route path="/chart/dayBusiness" exact component={Chart25} />
            <Route path="/chart/dayBusinessCost" exact component={Chart26} />
            <Route path="/chart/dayBusinessGHG" exact component={Chart27} /> */}

            <Route path="/chart/yearLoss" exact component={Chart28} />
            <Route path="/chart/monthLoss" exact component={Chart29} />
            <Route path="/chart/weekLoss" exact component={Chart30} />
            <Route path="/chart/dayLoss" exact component={Chart31} />

            <Route path="/chart/yearLossGHG" exact component={Chart32} />
            <Route path="/chart/monthLossGHG" exact component={Chart33} />
            <Route path="/chart/weekLossGHG" exact component={Chart34} />
            <Route path="/chart/dayLossGHG" exact component={Chart35} />

            <Route path="/chart/yearLossCost" exact component={Chart36} />
            <Route path="/chart/monthLossCost" exact component={Chart37} />
            <Route path="/chart/weekLossCost" exact component={Chart38} />
            <Route path="/chart/dayLossCost" exact component={Chart39} />

            <Route path="/chart/nutrientGap" exact component={Chart40} />

            <Route path="/food-reduction" component={FoodReduction} />

            <Route path="/browse-products" component={BrowseProducts} />
            <Route path="/browse-products-local" component={BrowseProductsLocalProduce} />

            <Route component={NotFound} />
          </Switch>
          </div>
          <Footer />
      </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => { 
  return{
      auth: state.firebase.auth,
  }
}

export default connect(mapStateToProps, null)(App);