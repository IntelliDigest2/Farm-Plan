import React, { useState } from "react";
import { TickList } from "../../../../../SubComponents/TickList";
import { Form, Button } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";

export default function Stage51({
  setForm,
  practices,
  futurePractice,
  setFuturePractice,
}) {
  const [none, setNone] = useState(false);
  const [err, setErr] = useState(false);

  const handleNext = (e) => {
    if (futurePractice.every((element) => element === false)) {
      if (none) {
        setForm(5.3);
      } else {
        setErr(true);
      }
    } else {
      e.preventDefault();
      setForm(5.2);
    }
  };
  return (
    <>
      <h5>
        You selected "None of the above". Do you have a plan to adopt any of the
        following sustainable farming practices in the future?
      </h5>
      <Form>
        <TickList
          list={practices}
          checkedState={futurePractice}
          setCheckedState={setFuturePractice}
        />
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
            label="None of the above"
            id="none"
            onChange={() => setNone(true)}
          />
        </div>
        <Button className="blue-btn shadow-none mt-3" onClick={handleNext}>
          Next
        </Button>
        {err && (
          <div className="err">
            <p>Please select something.</p>
          </div>
        )}
      </Form>
    </>
  );
}
