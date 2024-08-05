import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';

const icon = L.icon({
  iconUrl: 'https://img.icons8.com/ios-glyphs/30/search.png',
  iconSize: [25, 25],
});

const LocationMarker = () => {
  const [position, setPosition] = React.useState(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={icon} draggable={true}>
    </Marker>
  );
};

const MapComponent = () => (
  <MapContainer center={[9.0764785, 9.0764785]} zoom={13} style={{ height: "100%", width: "100%" }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <LocationMarker />
  </MapContainer>
);

const Button = ({ label, route }) => {
  const history = useHistory();
  return (
    <button onClick={() => history.push(route)}>{label}</button>
  );
};

const Home = () => (
  <div className="container">
    <div className="left-panel">
      <MapComponent />
    </div>
    <div className="right-panel">
      <div className="button-group">
        <Button label="Change Coordinates" route="/change-coordinates" />
        <Button label="Save Coordinates" route="/save-coordinates" />
        <Button label="Update Plan" route="/update-plan" />
        <Button label="Crop Demand" route="/crop-demand" />
        <Button label="Crop Nutrient Requirement" route="/crop-nutrient-requirement" />
        <Button label="Soil Nutrient Composition" route="/soil-nutrient-composition" />
        <Button label="Soil Nutrient Requirement" route="/soil-nutrient-requirement" />
        <Button label="Pest" route="/pest" />
        <Button label="Integrated Pest Management" route="/integrated-pest-management" />
        <Button label="Weather Forecast During Crop Season" route="/weather-forecast" />
        <Button label="Mitigation's" route="/mitigations" />
      </div>
    </div>
  </div>
);

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      {/* Add routes for each button */}
      <Route path="/change-coordinates" component={() => <div>Change Coordinates Page</div>} />
      <Route path="/save-coordinates" component={() => <div>Save Coordinates Page</div>} />
      <Route path="/update-plan" component={() => <div>Update Plan Page</div>} />
      <Route path="/crop-demand" component={() => <div>Crop Demand Page</div>} />
      <Route path="/crop-nutrient-requirement" component={() => <div>Crop Nutrient Requirement Page</div>} />
      <Route path="/soil-nutrient-composition" component={() => <div>Soil Nutrient Composition Page</div>} />
      <Route path="/soil-nutrient-requirement" component={() => <div>Soil Nutrient Requirement Page</div>} />
      <Route path="/pest" component={() => <div>Pest Page</div>} />
      <Route path="/integrated-pest-management" component={() => <div>Integrated Pest Management Page</div>} />
      <Route path="/weather-forecast" component={() => <div>Weather Forecast Page</div>} />
      <Route path="/mitigations" component={() => <div>Mitigation's Page</div>} />
    </Switch>
  </Router>
);

export default App;
