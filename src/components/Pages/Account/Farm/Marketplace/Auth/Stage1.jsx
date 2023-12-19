import React, { useState } from "react";

import "../../../../../SubComponents/Button.css";
import { Form, Row, Col, Button } from "react-bootstrap";

export default function Stage1({ setForm, association, setAssociation }) {
  const [done, setDone] = useState(false);
  return (
    <Form onSubmit={() => setForm(2)}>
      <Form.Group>
        <Form.Label>
          Are you a member of a local food system association?
        </Form.Label>
        <Row>
          <Col>
            <Form.Check
              required
              type="radio"
              name="member"
              id="member"
              label="Yes"
              onClick={() => {
                setAssociation(true);
                setDone(true);
              }}
            />
          </Col>
          <Col>
            <Form.Check
              required
              type="radio"
              name="member"
              id="member"
              label="No"
              onClick={() => {
                setAssociation(false);
                setDone(true);
              }}
            />
          </Col>
        </Row>
      </Form.Group>
      {done ? (
        <>
          {association ? (
            <>
              <Form.Control
                required
                type="text"
                placeholder="Which local food system association?"
                id="food-system-association"
                onChange={(e) => setAssociation(e.target.value)}
              />
              <Button type="submit" className="blue-btn mt-3">
                Next
              </Button>
            </>
          ) : (
            <>
              <p>
                We recommend joining an organisation such as the NFU or Soil
                Association.
              </p>
              <Button type="submit" className="blue-btn mt-3">
                Next
              </Button>
            </>
          )}
        </>
      ) : null}
    </Form>
  );
}
