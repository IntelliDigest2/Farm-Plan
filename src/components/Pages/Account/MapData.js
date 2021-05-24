import React, { Component, useCallback, useState, useEffect } from "react";
import "../Pages.css"
import { Row, Col} from "react-bootstrap";
import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';
import syntheticData from "../../../data/data.json";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
// import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import Geocode from "react-geocode";

class MapData extends Component {
  state = {
    longitude: 0,
    latitude: 0,
  }

  // componentDidMount() {
  //   const {products, auth, profile} = this.props;
  //   // console.log(this.props.google);
  //   // console.log(products);
  //   console.log(profile);
  //   // console.log(profile.postcode)
  //   if (!auth.uid) return <Redirect to= '/login'/>

  //   let homeLat = null;
  //   let homeLng = null;
  //   Geocode.setApiKey("AIzaSyA7vyoyDlw8wHqveKrfkkeku_46bdR_aPk");
  //   Geocode.setLocationType("ROOFTOP");

  //   var address = profile.address;

  //   Geocode.fromAddress(address).then( (response) => {
  //     const {lat, lng} = response.results[0].geometry.location;
  //     this.setState({
  //       latitude: lat,
  //       longitude: lng
  //     })
  //     console.log(this.state.longitude, this.state.latitude)
  //   },
  //   error => {
  //     console.error(error);
  //   });
  // }

  render(){
      const {products, auth, profile} = this.props;
      // console.log(this.props.google);
      // console.log(products);
      // console.log(profile);
      // console.log(profile.postcode)
      if (!auth.uid) return <Redirect to= '/login'/>
      
      Geocode.setApiKey("AIzaSyA7vyoyDlw8wHqveKrfkkeku_46bdR_aPk");
      Geocode.setLocationType("ROOFTOP");

      var address = profile.address;

      Geocode.fromAddress(address).then( (response) => {
        const {lat, lng} = response.results[0].geometry.location;
        this.setState({
          latitude: lat,
          longitude: lng
        })
        // console.log(this.state.longitude, this.state.latitude)
      },
      error => {
        console.error(error);
      });

    //   if (profile) {
    //   Geocode.fromAddress("10 Harlaw March").then(
    //     (response) => {
    //       console.log(response)
    //       const { lat, lng } = response.results[0].geometry.location;
    //       // console.log(lat, lng);
    //       const homeLat = lat;
    //       const homeLng = lng
    //       this.setState({
    //         longitude: homeLng,
    //         latitude: homeLat
    //       })
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // }
      
      function ChangeView({center}){
        const map = useMap();
        map.setView(center);
        return null;
      }

      const mapStyles = {
        width: '100%',
        height: '80vh',
      };
    return (
      <React.Fragment>
        {/* <Row className="ml-0 mr-0 mt-1 pt-1 justify-content-center align-items-center d-flex">
        <Col className="mt-4" xs={12}></Col>
        <Col className="mt-5" xs={12}></Col>

        <Col className="" xs={12} lg={1}></Col>
        <Col className="justify-content-center align-items-center d-flex" xs={12} lg={10}>
          <Map
          google={this.props.google}
          zoom={11}
          // zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 55.953251, lng: -3.188267}}
          // scrollWheelZoom={true}
          // initialCenter={{ lat: 47.444, lng: -122.176}}
        ><Marker position={{ lat: this.state.latitude, lng: this.state.longitude}} /></Map>
        </Col>
        <Col className="" xs={12} lg={1}></Col>
        
        <Col className="mt-5" xs={12}></Col>
        <Col className="mt-4" xs={12}></Col>
      </Row> */}
      <Row className="ml-0 mr-0 mt-1 pt-1 justify-content-center align-items-center d-flex">
        <Col className="mt-4" xs={12}></Col>
        <Col className="mt-5" xs={12}></Col>

        <Col className="" xs={12} lg={1}></Col>
        <Col className="justify-content-center align-items-center d-flex" xs={12} lg={10}>
          <MapContainer className="map-data" center={[0,0]} zoom={10} scrollWheelZoom={true}>
            <ChangeView center={[this.state.latitude, this.state.longitude]} />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> IntelliDigest - iTracker'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

            {/*comment out below to toggle map markers*/}

            {syntheticData.map(data =>(
              <Marker
              key={data.Name}
              position={[data.Location.Latitude, data.Location.Longitude]}>
                
                <Popup
                position={[data.Location.Latitude, data.Location.Longitude]}>
                  <div>
                    <p className="popup-data popup-name">{data.Name} </p>
                    <p className="popup-data">Estimated Volume of Food Waste: {data.EstimatedVolumeOfFoodWaste}</p>
                    <p className="popup-data">Actual Volume of Food Waste: {data.VolumeOfFoodWaste}kg</p>
                    <p className="popup-data">Building Function: {data.SourceOfFoodWaste}</p>

                  </div>
                </Popup>
                </Marker>
            ))}

            {/* ^^^^ */}  

          </MapContainer>
        </Col>
        <Col className="" xs={12} lg={1}></Col>
        
        <Col className="mt-5" xs={12}></Col>
        <Col className="mt-4" xs={12}></Col>
      </Row>
    </React.Fragment>
  );
}
}

const mapStateToProps = (state) => { 
  console.log(state);
  return{
      auth: state.firebase.auth,
      profile: state.firebase.profile,
  }
}


export default compose(
  // GoogleApiWrapper({
  // apiKey: 'AIzaSyA7vyoyDlw8wHqveKrfkkeku_46bdR_aPk'
  // }), 
  connect(mapStateToProps, null))(MapData);


