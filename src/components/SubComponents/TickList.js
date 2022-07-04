import React from "react";

import { Form } from "react-bootstrap";

export const TickList = (props) => {
  const handleChange = (position) => {
    const updatedCheckedState = props.checkedState.map((item, index) =>
      index === position ? !item : item
    );

    props.setCheckedState(updatedCheckedState);
  };

  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      {props.list.map((item, index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Form.Check
              type="checkbox"
              label={item}
              id={item}
              key={item}
              checked={props.checkedState[index]}
              onChange={() => handleChange(index)}
            />
          </div>
        );
      })}
    </Form.Group>
  );
};
