import React from "react";

import "./StepIndicator.css"
const StepIndicator = ({ totalSteps, currentStep, onStepClick }) => {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={index === currentStep ? "step active" : "step"}
          onClick={() => onStepClick(index)}
        ></div>
      ))}
    </div>
  );
};

export default StepIndicator;
