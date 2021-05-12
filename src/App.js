import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
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
import AddData from "./components/Pages/Account/AddData";
import Chart1 from "./components/Pages/Account/ChartYear";
import Chart2 from "./components/Pages/Account/ChartMonth";
import Chart3 from "./components/Pages/Account/ChartWeek";
import Chart4 from "./components/Pages/Account/ChartDay";

function App() {
  return (
    
    <React.Fragment>
        <Router>
        <NavBar />
        <div>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" exact component={About}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={SignUp}/>
          <Route path="/contact" exact component={Contact}/>
          <Route path="/terms-and-privacy" exact component={TermsAndPrivacy}/>
          <Route path="/forgot-password" exact component={ForgotPassword}/>
          <Route path="/account" exact component={Account}/>
          <Route path="/change-password" exact component={ChangePassword}/>
          <Route path="/view-map" exact component={MapData}/>
          <Route path="/add-data" exact component={AddData}/>
          <Route path="/chart/year" exact component={Chart1} />
          <Route path="/chart/month" exact component={Chart2} />
          <Route path="/chart/week" exact component={Chart3} />
          <Route path="/chart/day" exact component={Chart4} />
          <Route component={NotFound} />
        </Switch>
        </div>
        <Footer />
    </Router>
    </React.Fragment>
  );
}

export default App;
