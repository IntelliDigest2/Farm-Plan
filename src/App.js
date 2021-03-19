import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import NarBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";  
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider} from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Account from "./pages/account/UserAccount";
import ChangePassword from "./pages/account/ChangePassword";
import Map from "./pages/account/MapData";

function App() {
  return (
    
    <React.Fragment>

        <Router>
        <AuthProvider>
        <NarBar />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/about" exact component={About}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" exact component={SignUp}/>
          <Route path="/contact" exact component={Contact}/>
          <Route path="/terms-and-privacy" exact component={TermsAndPrivacy}/>
          <Route path="/forgot-password" exact component={ForgotPassword}/>
          <PrivateRoute path="/account" exact component={Account}/>
          <PrivateRoute path="/change-password" exact component={ChangePassword}/>
          <PrivateRoute path="/view-map" exact component={Map}/>
          <Route component={NotFound} />
        </Switch>
        </AuthProvider>
        <Footer />
    </Router>
    </React.Fragment>
  );
}

export default App;
