import React from "react";
import { Form, Button } from "react-bootstrap";
import { Dropdown } from "../../../../../SubComponents/Dropdown";

export default function Stage4({ setForm, sector, setSector }) {
  return (
    <>
      <h5>What Farming Sector?</h5>
      <Form onSubmit={() => setForm(5)}>
        <Dropdown
          required
          id="category"
          styling="green"
          data={sector}
          function={(e) => {
            setSector(e);
          }}
          items={[
            "Horticulture",
            "Livestock",
            "Aquaculture",
            "Insect farm",
            "Other",
          ]}
        />
        <Button className="blue-btn shadow-none mt-3" type="submit">
          Next
        </Button>
      </Form>
    </>
  );
}
