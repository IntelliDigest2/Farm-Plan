import React from "react";

import "../../../SubComponents/Button.css";

import { Select } from "../../../SubComponents/Dropdown";
import { PageWrap } from "../../../SubComponents/PageWrap";
import { Form, Button, InputGroup } from "react-bootstrap";

function List(props) {
  let list;
  list = props.items.map((item, index) => {
    return <li key={index}>{item}</li>;
  });

  return (
    <div style={{ padding: "0 0 0 4%" }}>
      <ul>{list}</ul>
    </div>
  );
}

export const ConsumerLocation = (props) => {
  return (
    <PageWrap goTo="/account" header="My Meal Plan" subtitle="Plan To Save">
      <p>{props.message}</p>
      <Form>
        <Form.Group>
          <Form.Label>Add preferred location(s) for pick up.</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              placeholder="City"
              id="pick-up-location"
            />
            <Button
              className="green-btn"
              id="cities"
              onClick={(e) => {
                props.addCity([
                  ...props.cities,
                  e.target.previousSibling.value,
                ]);
              }}
            >
              Add
            </Button>
          </InputGroup>
          <List items={props.cities} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Add preferred pick up day(s)</Form.Label>
          <InputGroup>
            <Select
              id="choose-day"
              function={(e) => {
                props.setDay(e.target.value);
              }}
              value={props.day}
              placeholder="Choose available days"
              items={[
                "Mondays",
                "Tuesdays",
                "Wednesdays",
                "Thursdays",
                "Fridays",
              ]}
            />
            <Button
              className="green-btn"
              id="days"
              onClick={(e) => {
                props.addDay([...props.days, e.target.previousSibling.value]);
              }}
            >
              Add
            </Button>
          </InputGroup>
          <List items={props.days} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Add preferred pick up times(s) (24 hr)</Form.Label>
          {/* add a better time picker here, like mui */}
          <InputGroup className="mb-3">
            <Form.Control
              type="time"
              placeholder="City"
              id="pick-up-location"
            />
            <Button
              className="green-btn"
              id="times"
              onClick={(e) => {
                props.addTime([...props.times, e.target.previousSibling.value]);
              }}
            >
              Add
            </Button>
          </InputGroup>
          <List items={props.times} />
        </Form.Group>
      </Form>
      {/* Here will make areas to populate pick up locations and dates/times */}
      <Button
        className="green-btn"
        onClick={(e) => props.setForm("autoCreate")}
      >
        Next
      </Button>
    </PageWrap>
  );
};
