import React, { useState, useEffect } from "react";
import "../Pages.css";
import { Container } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  Popup,
  useMap,
  CircleMarker,
} from "react-leaflet";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { DefaultButton } from "../SubComponents/Button";

import { getMapData } from "../../../store/actions/dataActions";

import Geocode from "react-geocode";
import { Colors } from "../../lib/Colors";

//Map component
const Map = (props) => {
  const [location, setLocation] = useState([]);

  //Get MapData from firebase
  function fetchData() {
    var data = {
      masterCollection: "mapData",
    };
    props.getMapData(data);
  }

  //Setup get and Geocode
  useEffect(() => {
    if (props.data.length <= 0) fetchData();

    Geocode.setApiKey("AIzaSyA7vyoyDlw8wHqveKrfkkeku_46bdR_aPk");
    Geocode.setLocationType("ROOFTOP");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //handle data from firebase
  useEffect(() => {
    updateMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  //Handle data from firebase
  const updateMap = async () => {
    var locationArray = [];
    props.data.forEach((doc) => {
      var index = locationArray.findIndex((x) => x.location === doc.location);

      var wm = 0;

      switch (doc.weightType) {
        default:
        case "kg":
        case "l":
          wm = 1;
          break;
        case "g":
        case "ml":
          wm = 0.001;
          break;
        case "oz":
          wm = 0.028;
          break;
        case "lbs":
          wm = 0.454;
          break;
      }

      var foodWasteWeight = Number((doc.foodWasteWeight * wm).toFixed(3));

      var obj = {
        foodWasteWeight: foodWasteWeight,
        location: doc.location,
      };

      //If location does not exist, add to array, if exists, add to location total weight
      index === -1
        ? locationArray.push(obj)
        : (locationArray[index].foodWasteWeight += foodWasteWeight);
    });

    //Foreach location, get lat and lng, add all data to location state variable
    locationArray.forEach((doc) => {
      Geocode.fromAddress(doc.location).then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const foodWasteWeight = doc.foodWasteWeight;
        const location = response.results[0].address_components[0].long_name;
        setLocation((oldArray) => [
          ...oldArray,
          { lat, lng, foodWasteWeight, location },
        ]);
      });
    });
  };

  //Marker colours
  const redColor = { color: "red", fillColor: "red" };
  const yellowColor = {
    color: Colors.brandYellow,
    fillColor: Colors.brandYellow,
  };
  const greenColor = { color: Colors.brandGreen, fillColor: Colors.brandGreen };

  //Map marker
  function MyComponent(props) {
    const map = useMap();
    map.setMaxBounds(map.getBounds());
    var color;
    if (props.foodWasteWeight <= 1000) {
      color = greenColor;
    } else if (props.foodWasteWeight <= 10000) {
      color = yellowColor;
    } else {
      color = redColor;
    }

    return (
      <CircleMarker
        center={[props.lat, props.lng]}
        pathOptions={color}
        radius={15}
      >
        <Popup>
          {props.location}: {props.foodWasteWeight} KG
        </Popup>
      </CircleMarker>
    );
  }

  //Redirect if not logged in
  if (!props.auth.uid) return <Redirect to="/login" />;
  return (
    <Container className="web-center" style={{zIndex: "-3", marginBottom: "100px"}}>
      <DefaultButton text="Back" styling="green" goTo="/account" />
      <MapContainer
        className="map-data"
        center={[0, 0]}
        zoom={1.4}
        maxZoom={12}
        minZoom={1.4}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> IntelliDigest - iTracker'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location.map(({ lat, lng, foodWasteWeight, location }, index) => (
          <MyComponent
            lat={lat}
            lng={lng}
            foodWasteWeight={foodWasteWeight}
            location={location}
          />
        ))}
      </MapContainer>
    </Container>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMapData: (product) => dispatch(getMapData(product)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Map);
