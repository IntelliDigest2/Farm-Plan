import React from "react";
import "../Pages.css"
import { Row, Col} from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map() {


  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mt-1 pt-1 justify-content-center align-items-center d-flex">
        <Col className="mt-4" xs={12}></Col>
        <Col className="mt-5" xs={12}></Col>

        <Col className="" xs={12} lg={1}></Col>
        <Col className="" xs={12} lg={10}>
          <MapContainer className="map-data" center={[55.953251, -3.188267]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> IntelliDigest - iTracker'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[55.953251, -3.188267]}>
              <Popup>
                Pop up with some information about the marker. <br /> To be filled out.
              </Popup>
            </Marker>
          </MapContainer>
        </Col>
        <Col className="" xs={12} lg={1}></Col>
        
        <Col className="mt-5" xs={12}></Col>
        <Col className="mt-5" xs={12}></Col>
      </Row>
    </React.Fragment>
  );
}


export default Map;