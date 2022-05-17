import React from "react";
import { Col, Row } from "react-bootstrap";
import { SubButton } from "../../../../../../SubComponents/Button";

export default function NextBack({ links, setPage }) {
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
          <SubButton
            onClick={() => setPage(links.next.href)}
            text="Next"
            styling="green"
          />
        </Col>
      ) : null}
    </Row>
  );
}
