import React, { useState } from "react";
import { TickList } from "../../../../../SubComponents/TickList";
import { Form, Button } from "react-bootstrap";
import "../../../../../SubComponents/Button.css";

export default function Stage5({ setForm, practices, practice, setPractice }) {
  const [none, setNone] = useState(false);
  const [err, setErr] = useState(false);

  const handleNext = (e) => {
    if (practice.every((element) => element === false)) {
      if (none) {
        setForm(5.1);
      } else {
        setErr(true);
      }
    } else {
      e.preventDefault();
      setForm(6);
    }
  };

  return (
    <>
      <h5>
        Do you follow any of these sustainable farming practices? Select
        everything that applies;
      </h5>
      <Form>
        <TickList
          list={practices}
          checkedState={practice}
          setCheckedState={setPractice}
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
            key="none"
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
