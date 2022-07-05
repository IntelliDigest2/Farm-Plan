import React from "react";
import { Col, Row } from "react-bootstrap";
import { SubButton } from "../../../../../../SubComponents/Button";

export default function NextBack({ links, pageNumber, changePage }) {
  return (
    <Row>
      {links.back ? (
        <Col>
          <SubButton
            onClick={() => console.log(links.back.href)}
            text="Back"
            styling="green"
          />
        </Col>
      ) : null}
      {links.next ? (
        <Col>
          <p>Page: {pageNumber + 1}</p>
          <SubButton
            onClick={() => {
              changePage(1);
            }
          }
            text="Next"
            styling="green"
          />
          <SubButton
            onClick={() => {
              changePage(-1);
            }}
            text="Previous"
            styling="green"
          />
        </Col>
      ) : null}
    </Row>
  );
}
