import React from "react";
import "../Pages.css"
import { Row, Col} from "react-bootstrap";



function Map() {


  return (
    <React.Fragment>
      <Row className="ml-0 mr-0 mt-1 pt-1 justify-content-center align-items-center d-flex">
        <Col className="mt-4" xs={12}></Col>
        <Col className="mt-5" xs={12}></Col>

        <Col className="" xs={12} lg={1}></Col>
        <Col className="" xs={12} lg={10}>
          <div className="map-data justify-content-center align-items-center d-flex">

            Map Here

          </div>
        </Col>
        <Col className="" xs={12} lg={1}></Col>
        
        <Col className="mt-5" xs={12}></Col>
        <Col className="mt-5" xs={12}></Col>
      </Row>
    </React.Fragment>
  );
}


export default Map;