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
import Chart1 from "./components/Pages/Account/ChartYear";
import Chart2 from "./components/Pages/Account/ChartMonth";
import Chart3 from "./components/Pages/Account/ChartWeek";
import Chart4 from "./components/Pages/Account/ChartDay";

import Chart5 from "./components/Pages/Account/ChartYearGHG"
import Chart6 from "./components/Pages/Account/ChartMonthGHG"
import Chart7 from "./components/Pages/Account/ChartWeekGHG";
import Chart8 from "./components/Pages/Account/ChartDayGHG";

import Chart9 from "./components/Pages/Account/ChartYearCost";
import Chart10 from "./components/Pages/Account/ChartMonthCost"
import Chart11 from "./components/Pages/Account/ChartWeekCost";
import Chart12 from "./components/Pages/Account/ChartDayCost";

import FoodReduction from "./components/Pages/FoodReduction";

// import BrowseProducts from "./components/Pages/Account/BrowseProducts";

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
            <Route path="/chart/year" exact component={Chart1} />
            <Route path="/chart/month" exact component={Chart2} />
            <Route path="/chart/week" exact component={Chart3} />
            <Route path="/chart/day" exact component={Chart4} />

            <Route path="/chart/yearGHG" exact component={Chart5} />
            <Route path="/chart/monthGHG" exact component={Chart6} />
            <Route path="/chart/weekGHG" exact component={Chart7} />
            <Route path="/chart/dayGHG" exact component={Chart8} />

            <Route path="/chart/yearCost" exact component={Chart9} />
            <Route path="/chart/monthCost" exact component={Chart10} />
            <Route path="/chart/weekCost" exact component={Chart11} />
            <Route path="/chart/dayCost" exact component={Chart12} />

            <Route path="/food-reduction" component={FoodReduction} />

            {/* <Route path="/browse-products" component={BrowseProducts} /> */}

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
