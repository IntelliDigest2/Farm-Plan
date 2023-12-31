import React, { useState, useEffect } from "react";

import Stage0 from "./Stage0";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import Stage5 from "./Stage5";

import StepIndicator from "./StepIndicator";

import { submitNotification } from "../../../../../lib/Notifications";
import { becomeSeller } from "../../../../../../store/actions/authActions";
import { connect } from "react-redux";

import { Redirect, Link, useHistory } from "react-router-dom";

//controls the form for farm plan auth
function Control(props) {
  const [form, setForm] = useState(0);

  const history = useHistory();

  const handleSubmit = (e) => {
      let data;
      data = {
        profile: { isSeller: true },
        info: {
          delivery: props.delivery,
          market: props.market,
          averageTurnover: props.turnover,
          sales: props.sales,
          interest: props.interest,
        },
      };
      e.preventDefault();
      props.becomeSeller(data);
      history.push('/account');

  };

  //make component rerender every time form stage switches
  useEffect(() => {
    console.log("Form:", form);
  }, [form]);

  const handleStepClick = (step) => {
    setForm(step);
  };

  
  return (
    <div className="auth">
    <StepIndicator totalSteps={6} currentStep={form} onStepClick={handleStepClick} />
    {form === 0 && (
      <Stage0 setForm={setForm} delivery={props.delivery} setDelivery={props.setDelivery} />
    )}
    {form === 1 && (
      <Stage1 setForm={setForm} setMarket={props.setMarket} market={props.market} />
    )}
    {form === 2 && (
          <Stage2
           setForm={setForm}
           turnover={props.turnover}
           setTurnover={props.setTurnover}
         />    
    )}
    {form === 3 && (
        <Stage3
            setForm={setForm}
            sales={props.sales}
            setSales={props.setSales}
          />
    )}
    {form === 4 && (
        <Stage4 
        setForm={setForm} 
        setInterest={props.setInterest} 
        interest={props.interest}
      />
    )}
    {form === 5 && (
        <div className="auth">
        <Stage5 handleSubmit={handleSubmit} />
      </div>
    )}
    
</div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    becomeSeller: (seller) => dispatch(becomeSeller(seller)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Control);
