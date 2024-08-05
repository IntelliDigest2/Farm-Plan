import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "./MapComponent.css";

const LocationMarker = ({ position }) => {
  return position === null ? null : (
    <Marker position={position} icon={L.icon({ iconUrl: 'https://img.icons8.com/ios-glyphs/30/search.png', iconSize: [25, 25] })} />
  );
};

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState([
    { lat: '9.0764785', long: '9.0764785' },
    { lat: '9.0764785', long: '9.0764785' },
    { lat: '9.0764785', long: '9.0764785' },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [mapInstance, setMapInstance] = useState(null);
  const [position, setPosition] = useState(null);

  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      setMapInstance(mapRef.current);
    }
  }, [mapRef]);

  const addNewCoordinates = () => {
    const newCoordinates = { lat: '9.0764785', long: '9.0764785' };
    setCoordinates([...coordinates, newCoordinates]);
  };

  const deleteCoordinates = (index) => {
    setCoordinates(coordinates.filter((_, i) => i !== index));
  };

  const saveCoordinates = async () => {
    try {
      // Save all coordinates to Firestore
      for (const coord of coordinates) {
        // await addDoc(collection(db, "coordinates"), coord);
      }
      alert("Coordinates saved successfully!");
    } catch (e) {
      console.error("Error saving coordinates: ", e);
    }
  };

  const searchLocation = () => {
    if (!searchQuery) return;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          if (mapInstance) {
            mapInstance.flyTo([lat, lon], 13);
            setPosition([lat, lon]);
            setCoordinates([...coordinates, { lat, long: lon }]);
          }
        } else {
          alert('Location not found');
        }
      })
      .catch(error => {
        console.error('Error searching location:', error);
      });
  };

  return (
    <div className="container">
      <div className="header">
        <button className="back-button">BACK</button>
      </div>
      <div className="tabs">
        <button className="tab active">Farm Plan</button>
        <button className="tab">Map</button>
      </div>
      <div className="main">
        <div className="map">
          <MapContainer
            center={[9.0764785, 9.0764785]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            whenCreated={mapInstance => mapRef.current = mapInstance}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker position={position} />
          </MapContainer>
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location"
            />
            <button className="top-center-button" onClick={searchLocation}>
              <img src="https://img.icons8.com/ios-glyphs/30/search.png" alt="Search Icon" />
              <span>Search</span>
            </button>
          </div>
        </div>
        <div className="coords">
          <h3>Enter Location manually to set up your farm</h3>
          {coordinates.map((coord, index) => (
            <div className="coord-pair" key={index}>
              <input type="text" value={`Lat : ${coord.lat}`} readOnly />
              <input type="text" value={`Long : ${coord.long}`} readOnly />
              <button className="delete-icon" onClick={() => deleteCoordinates(index)}>
                <img src="https://img.icons8.com/ios-glyphs/30/delete-sign.png" alt="Delete Icon" />
              </button>
            </div>
          ))}
          <button id="new-coordinates-button" onClick={addNewCoordinates}>New Coordinates</button>
          <button id="save-coordinates-button" onClick={saveCoordinates}>Save Coordinates</button>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
