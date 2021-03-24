import React, { Component } from "react";
import "../Pages.css"
import { Row, Col} from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import syntheticData from "../../../data/data.json";
import {connect} from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class Map extends Component {

  render(){
      const {user, products, auth} = this.props;
      console.log(user);
      console.log(products);
    
      if (!auth.uid) return <Redirect to= '/login'/>

    return (
      <React.Fragment>
      <Row className="ml-0 mr-0 mt-1 pt-1 justify-content-center align-items-center d-flex">
        <Col className="mt-4" xs={12}></Col>
        <Col className="mt-5" xs={12}></Col>

        <Col className="" xs={12} lg={1}></Col>
        <Col className="justify-content-center align-items-center d-flex" xs={12} lg={10}>
          <MapContainer className="map-data" center={[55.953251, -3.188267]} zoom={11} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> IntelliDigest - iTracker'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            {syntheticData.map(data =>(
              <Marker
              key={data.Name}
              position={[data.Location.Latitude, data.Location.Longitude]}>
                
                <Popup
                position={[data.Location.Latitude, data.Location.Longitude]}>
                  <div>
                    <p className="popup-data popup-name">{data.Name} </p>
                    <p className="popup-data">{data.Address}</p>

                  </div>
                </Popup>
                </Marker>
            ))}
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
      auth: state.firebase.auth
  }
}


export default compose(connect(mapStateToProps, null))(Map);