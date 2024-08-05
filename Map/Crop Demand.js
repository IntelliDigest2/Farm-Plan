import React from 'react';
import './CropDemand.css';
import { useHistory } from 'react-router-dom';

const CropDemand = () => {
  const history = useHistory();

  return (
    <div className="crop-demand-container">
      <div className="header">
        <button onClick={() => history.goBack()}>Back</button>
      </div>
      <div className="tabs">
        <button className="active">Crop Demand</button>
      </div>
      <div className="content">
        <div className="input-group">
          <button className="action-button">Get Weather for Postcode</button>
          <input type="text" placeholder="Type Your Postcode Here" />
          <button className="action-button">Check soil quality</button>
        </div>
        <div className="recommended-crops">
          <h3>Select Recommended Crop</h3>
          <div className="crop-buttons">
            <button className="crop-button">Grains</button>
            <button className="crop-button">Oils</button>
            <button className="crop-button">Vegetables</button>
            <button className="crop-button">Soft Fruits</button>
            <button className="crop-button">Root Vegetables</button>
            <button className="crop-button">Others</button>
          </div>
        </div>
        <div className="nutrient-requirement">
          <button className="action-button">Nutrients Requirement For suggested Crop</button>
          <input type="text" placeholder="Search or Type The Recommended Crop" />
        </div>
      </div>
    </div>
  );
};

export default CropDemand;
