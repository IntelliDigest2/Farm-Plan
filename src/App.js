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
import FoodIntake from "./components/Pages/Account/FoodIntake";
// import FoodSurplus from "./components/Pages/Account/FoodSurplus";

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

import Chart41 from "./components/Pages/Account/ChartYearUni";
import Chart42 from "./components/Pages/Account/ChartMonthUni";
import Chart43 from "./components/Pages/Account/ChartWeekUni";

import Chart44 from "./components/Pages/Account/ChartYearGHGUni";
import Chart45 from "./components/Pages/Account/ChartMonthGHGUni";
import Chart46 from "./components/Pages/Account/ChartWeekGHGUni";

import Chart47 from "./components/Pages/Account/ChartYearCostUni";
import Chart48 from "./components/Pages/Account/ChartMonthCostUni";
import Chart49 from "./components/Pages/Account/ChartWeekCostUni";

import Chart50 from "./components/Pages/Account/ChartYearSurplusUni";
import Chart51 from "./components/Pages/Account/ChartMonthSurplusUni";
import Chart52 from "./components/Pages/Account/ChartWeekSurplusUni";

import Chart53 from "./components/Pages/Account/ChartYearSurplusGHGUni";
import Chart54 from "./components/Pages/Account/ChartMonthSurplusGHGUni";
import Chart55 from "./components/Pages/Account/ChartWeekSurplusGHGUni";

import Chart56 from "./components/Pages/Account/ChartYearSurplusCostUni";
import Chart57 from "./components/Pages/Account/ChartMonthSurplusCostUni";
import Chart58 from "./components/Pages/Account/ChartWeekSurplusCostUni";

import Chart59 from "./components/Pages/Account/ChartYearBusiness";
import Chart60 from "./components/Pages/Account/ChartMonthBusiness";
import Chart61 from "./components/Pages/Account/ChartWeekBusiness";

import Chart62 from "./components/Pages/Account/ChartYearGHGBusiness";
import Chart63 from "./components/Pages/Account/ChartMonthGHGBusiness";
import Chart64 from "./components/Pages/Account/ChartWeekGHGBusiness";

import Chart65 from "./components/Pages/Account/ChartYearCostBusiness";
import Chart66 from "./components/Pages/Account/ChartMonthCostBusiness";
import Chart67 from "./components/Pages/Account/ChartWeekCostBusiness";

import Chart68 from "./components/Pages/Account/ChartYearSurplusBusiness";
import Chart69 from "./components/Pages/Account/ChartMonthSurplusBusiness";
import Chart70 from "./components/Pages/Account/ChartWeekSurplusBusiness";

import Chart71 from "./components/Pages/Account/ChartYearSurplusGHGBusiness";
import Chart72 from "./components/Pages/Account/ChartMonthSurplusGHGBusiness";
import Chart73 from "./components/Pages/Account/ChartWeekSurplusGHGBusiness";

import Chart74 from "./components/Pages/Account/ChartYearSurplusCostBusiness";
import Chart75 from "./components/Pages/Account/ChartMonthSurplusCostBusiness";
import Chart76 from "./components/Pages/Account/ChartWeekSurplusCostBusiness";

import Chart77 from "./components/Pages/Account/ChartYearSurplusFarm";
import Chart78 from "./components/Pages/Account/ChartMonthSurplusFarm";
import Chart79 from "./components/Pages/Account/ChartWeekSurplusFarm";

import Chart80 from "./components/Pages/Account/ChartYearSurplusGHGFarm";
import Chart81 from "./components/Pages/Account/ChartMonthSurplusGHGFarm";
import Chart82 from "./components/Pages/Account/ChartWeekSurplusGHGFarm";

import Chart83 from "./components/Pages/Account/ChartYearSurplusCostFarm";
import Chart84 from "./components/Pages/Account/ChartMonthSurplusCostFarm";
import Chart85 from "./components/Pages/Account/ChartWeekSurplusCostFarm";

import FoodReduction from "./components/Pages/FoodReduction";
import InfoTable from "./components/Pages/InfoTable";

import BrowseProducts from "./components/Pages/Account/BrowseProducts";
// import BrowseProductsLocalProduce from "./components/Pages/Account/BrowseProductsLocalProduce";

import ProductListing from "./components/Pages/Account/products/ProductListing";

import AddProducts from "./components/Pages/Account/AddProducts";
import AddProductsFarm from "./components/Pages/Account/AddProductsFarm";
import AddProductsBusiness from "./components/Pages/Account/AddProductsBusiness";
import AddProductsAcademic from "./components/Pages/Account/AddProductsAcademic";

import FoodWasteAcademic from "./components/Pages/Account/FoodWasteAcademic";
import FoodIntakeAcademic from "./components/Pages/Account/FoodIntakeAcademic";
import FoodSurplusAcademic from "./components/Pages/Account/FoodSurplusAcademic";

import { Notifications } from "react-push-notification";

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
        <Notifications />
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
            {/* <Route path="/food-surplus" exact component={FoodSurplus}/> */}
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

            <Route path="/chart/yearUni" exact component={Chart41} />
            <Route path="/chart/monthUni" exact component={Chart42} />
            <Route path="/chart/weekUni" exact component={Chart43} />

            <Route path="/chart/yearGHGUni" exact component={Chart44} />
            <Route path="/chart/monthGHGUni" exact component={Chart45} />
            <Route path="/chart/weekGHGUni" exact component={Chart46} />

            <Route path="/chart/yearCostUni" exact component={Chart47} />
            <Route path="/chart/monthCostUni" exact component={Chart48} />
            <Route path="/chart/weekCostUni" exact component={Chart49} />

            <Route path="/chart/yearSurplusUni" exact component={Chart50} />
            <Route path="/chart/monthSurplusUni" exact component={Chart51} />
            <Route path="/chart/weekSurplusUni" exact component={Chart52} />

            <Route path="/chart/yearSurplusGHGUni" exact component={Chart53} />
            <Route path="/chart/monthSurplusGHGUni" exact component={Chart54} />
            <Route path="/chart/weekSurplusGHGUni" exact component={Chart55} />

            <Route path="/chart/yearSurplusCostUni" exact component={Chart56} />
            <Route path="/chart/monthSurplusCostUni" exact component={Chart57} />
            <Route path="/chart/weekSurplusCostUni" exact component={Chart58} />

            <Route path="/chart/yearBusiness" exact component={Chart59} />
            <Route path="/chart/monthBusiness" exact component={Chart60} />
            <Route path="/chart/weekBusiness" exact component={Chart61} />

            <Route path="/chart/yearGHGBusiness" exact component={Chart62} />
            <Route path="/chart/monthGHGBusiness" exact component={Chart63} />
            <Route path="/chart/weekGHGBusiness" exact component={Chart64} />

            <Route path="/chart/yearCostBusiness" exact component={Chart65} />
            <Route path="/chart/monthCostBusiness" exact component={Chart66} />
            <Route path="/chart/weekCostBusiness" exact component={Chart67} />

            <Route path="/chart/yearSurplusBusiness" exact component={Chart68} />
            <Route path="/chart/monthSurplusBusiness" exact component={Chart69} />
            <Route path="/chart/weekSurplusBusiness" exact component={Chart70} />

            <Route path="/chart/yearSurplusGHGBusiness" exact component={Chart71} />
            <Route path="/chart/monthSurplusGHGBusiness" exact component={Chart72} />
            <Route path="/chart/weekSurplusGHGBusiness" exact component={Chart73} />

            <Route path="/chart/yearSurplusCostBusiness" exact component={Chart74} />
            <Route path="/chart/monthSurplusCostBusiness" exact component={Chart75} />
            <Route path="/chart/weekSurplusCostBusiness" exact component={Chart76} />

            <Route path="/chart/yearSurplusFarm" exact component={Chart77} />
            <Route path="/chart/monthSurplusFarm" exact component={Chart78} />
            <Route path="/chart/weekSurplusFarm" exact component={Chart79} />

            <Route path="/chart/yearSurplusGHGFarm" exact component={Chart80} />
            <Route path="/chart/monthSurplusGHGFarm" exact component={Chart81} />
            <Route path="/chart/weekSurplusGHGFarm" exact component={Chart82} />

            <Route path="/chart/yearSurplusCostFarm" exact component={Chart83} />
            <Route path="/chart/monthSurplusCostFarm" exact component={Chart84} />
            <Route path="/chart/weekSurplusCostFarm" exact component={Chart85} />

            <Route path="/food-reduction" component={FoodReduction} />

            <Route path="/browse-products" component={BrowseProducts} />
            {/* <Route path="/browse-products-local" component={BrowseProductsLocalProduce} /> */}

            <Route path="/product-listing" component={ProductListing} />

            <Route path="/add-products" component={AddProducts} />
            <Route path="/add-products-farm" component={AddProductsFarm} />
            <Route path="/add-products-business" component={AddProductsBusiness} />
            <Route path="/add-products-academic" component={AddProductsAcademic} />

            <Route path="/food-wasteAcademic" component={FoodWasteAcademic} />
            <Route path="/food-intakeAcademic" component={FoodIntakeAcademic} />
            <Route path="/food-surplusAcademic" component={FoodSurplusAcademic} />

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