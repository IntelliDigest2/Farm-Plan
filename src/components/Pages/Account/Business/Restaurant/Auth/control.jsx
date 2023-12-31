import React, { useState, useEffect } from "react";

import Stage0 from "./Stage0";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import Stage5 from "./Stage5";
import Stage6 from "./Stage6";
import Stage7 from "./Stage7";
import Stage8 from "./Stage8";

import StepIndicator from "./StepIndicator";

import { submitNotification } from "../../../../../lib/Notifications";
import { becomeSeller } from "../../../../../../store/actions/authActions";
import { connect } from "react-redux";

//controls the form for farm plan auth
function Control(props) {
  const [form, setForm] = useState(0);

  const handleSubmit = (e) => {
      let data;
      data = {
        profile: { isSeller: true },
        info: {
          usesOMS: props.OMS,
          averageCost: props.cost,
          averageTurnover: props.turnover,
          purchaseLocation: props.purchase,
          nutritionalInfo: props.nutritionalInfo,
          MeasureFoodwaste: props.foodWaste,
          carbonFootPrint: props.carbonPrint,
          interest: props.interest,
        },
      };
      e.preventDefault();
      props.becomeSeller(data);
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
    <StepIndicator totalSteps={9} currentStep={form} onStepClick={handleStepClick} />
    {form === 0 && (
      <Stage0 setForm={setForm} OMS={props.OMS} setOMS={props.setOMS} />
    )}
    {form === 1 && (
      <Stage1 setForm={setForm} setCost={props.setCost} cost={props.cost} />
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
            purchase={props.purchase}
            setPurchase={props.setPurchase}
          />
    )}
    {form === 4 && (
         <Stage4
         setForm={setForm}
         nutritionalInfo={props.nutritionalInfo}
         setNutritionalInfo={props.setNutritionalInfo}
       />
    )}
    {form === 5 && (
        <Stage5
        setForm={setForm}
        foodWaste={props.foodWaste}
        setFoodWaste={props.setFoodWaste}
      />
    )}
    {form === 6 && (
       <Stage6
       setForm={setForm}
       carbonPrint={props.carbonPrint}
       setCarbonPrint={props.setCarbonPrint}
     />
    )}
    {form === 7 && (
        <Stage7 
        setForm={setForm} 
        setInterest={props.setInterest} 
        interest={props.interest}
      />
    )}
    {form === 8 && (
        <div className="auth">
        <Stage8 handleSubmit={handleSubmit} />
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
