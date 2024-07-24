import React, { useState } from 'react';
import styles from './MapTest.module.css'; // Adjust the import for CSS modules

const MapTest = () => {
  const [coordinates, setCoordinates] = useState([
    { lat: '9.0764785', long: '9.0764785' },
    { lat: '9.0764785', long: '9.0764785' },
    { lat: '9.0764785', long: '9.0764785' },
  ]);

  const addNewCoordinates = () => {
    setCoordinates([...coordinates, { lat: '9.0764785', long: '9.0764785' }]);
  };

  const deleteCoordinates = (index) => {
    setCoordinates(coordinates.filter((_, i) => i !== index));
  };

  const searchLocation = () => {
    alert('Searching location on the map...');
    // This is a placeholder for the actual map searching logic.
    // Integrate a map API like Google Maps or Mapbox here.
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button>BACK</button>
      </div>
      <div className={styles.tabs}>
        <button className={styles.active}>Farm Plan</button>
        <button>Map</button>
      </div>
      <div className={styles.main}>
        <div className={styles.map}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242118.1412942516!2d-74.0059728!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDBswqA0MyczNi40IlMgNzTCsDAwJzIwLjIiVw!5e0!3m2!1sen!2sus!4v1588450950342!5m2!1sen!2sus"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
            title="Map"
          ></iframe>
          <button id={styles.locationButton} onClick={searchLocation}>
            <img src="https://img.icons8.com/ios-glyphs/30/search.png" alt="Search Icon" />
            Use your live location to set up your farm
          </button>
        </div>
        <div className={styles.coords}>
          <h3>Enter Location manually to set up your farm</h3>
          {coordinates.map((coord, index) => (
            <div className={styles.coordPair} key={index}>
              <input type="text" defaultValue={`Lat: ${coord.lat}`} />
              <input type="text" defaultValue={`Long: ${coord.long}`} />
              <button className={styles.deleteButton} onClick={() => deleteCoordinates(index)}>
                <img src="https://img.icons8.com/ios-glyphs/30/delete-sign.png" alt="Delete Icon" />
              </button>
            </div>
          ))}
          <button id={styles.newCoordinatesButton} onClick={addNewCoordinates}>New Coordinates</button>
        </div>
      </div>
    </div>
  );
};

export default MapTest;
