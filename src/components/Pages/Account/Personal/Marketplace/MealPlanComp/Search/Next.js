import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SubButton } from "../../../../../../SubComponents/Button";

export default function NextBack({ links, pageNumber, changePage }) {
  return (
    <Container>
      {
        links.back ? (
          <SubButton onClick={() => console.log(links.back.href)} text="Back" styling="green"/>) : null
      }
      
      {
        links.next ? (
          <div>
            <Row className="justify-content-md-center">
              <p>Page: {pageNumber + 1}</p>
            </Row>
            <Row>
              { pageNumber != 0 &&
              <Col>
                <SubButton onClick={() => changePage(-1)} text="Previous Page" styling="green" />
              </Col>}
              <Col>
                <SubButton onClick={() => changePage(1)} text="Next Page" styling="green" />
              </Col>
            </Row>
          </div>
        ) : null
      }
    </Container>

  );
}
