import React, { useState } from 'react';
import './App.css';

const Map = () => {
  const [coordinates, setCoordinates] = useState([
    { lat: '9.0764785', long: '9.0764785' },
    { lat: '9.0764785', long: '9.0764785' },
    { lat: '9.0764785', long: '9.0764785' },
  ]);

  const addNewCoordinates = () => {
    setCoordinates([...coordinates, { lat: '9.0764785', long: '9.0764785' }]);
  };

  const searchLocation = () => {
    alert('Searching location on the map...');
    // This is a placeholder for the actual map searching logic.
    // Integrate a map API like Google Maps or Mapbox here.
  };

  return (
    <div className="container">
      <div className="header">
        <button>BACK</button>
      </div>
      <div className="tabs">
        <button className="active">Farm Plan</button>
        <button>Map</button>
      </div>
      <div className="main">
        <div className="map">
          <iframe
            width="100%"
            height="100%"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242118.1412942516!2d-74.0059728!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDBswqA0MyczNi40IlMgNzTCsDAwJzIwLjIiVw!5e0!3m2!1sen!2sus!4v1588450950342!5m2!1sen!2sus"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            title="Map"
          ></iframe>
          <button id="location-button" onClick={searchLocation}>
            <img src="https://img.icons8.com/ios-glyphs/30/search.png" alt="Search Icon" />
            Use your live location to set up your farm
          </button>
        </div>
        <div className="coords">
          <h3>Enter Location manually to set up your farm</h3>
          {coordinates.map((coord, index) => (
            <div className="coord-pair" key={index}>
              <input type="text" defaultValue={`Lat : ${coord.lat}`} />
              <input type="text" defaultValue={`Long : ${coord.long}`} />
            </div>
          ))}
          <button id="new-coordinates-button" onClick={addNewCoordinates}>New Coordinates</button>
        </div>
      </div>
    </div>
  );
};

export default Map;
