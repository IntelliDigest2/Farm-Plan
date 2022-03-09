import React from "react";
import TermsAndCons from "../../../SubComponents/TermsAndConditions";
import { Dropdown } from "../../../SubComponents/Dropdown";
import { TickList } from "../../../SubComponents/TickList";
import { Form, Button } from "react-bootstrap";

function SectorSwitch(props) {
  if (props.sector === "Horticulture") {
    return (
      <>
        <TickList
          label="What type of crop, vegetable and fruit?"
          list={props.productTypes}
          checkedState={props.productType}
          setCheckedState={props.setProductType}
        />
        <TickList
          label="Determine nutrient requirement for the crop, vegetable and fruit growth."
          list={props.productTypes}
          checkedState={props.productType}
          setCheckedState={props.setProductType}
        />
      </>
    );
  } else if (props.sector === "Aquaculture" || "Insect farm") {
    return (
      <>
        <TickList
          label="What type of fish/insect?"
          list={props.productTypes}
          checkedState={props.productType}
          setCheckedState={props.setProductType}
        />
        <TickList
          label="Determine nutrient requirement for the fish/insect."
          list={props.productTypes}
          checkedState={props.productType}
          setCheckedState={props.setProductType}
        />
      </>
    );
  } else {
    return null;
  }
}

export function NewFarmer(props) {
  return (
    <Form onSubmit={props.HandleSubmit}>
      <Form.Group>
        <Form.Label>What location will you be selling from?</Form.Label>
        <Form.Control
          type="text"
          placeholder="Address 1"
          id="address 1"
          onChange={(e) => props.setAddress1(e.target.value)}
          required
        />
        <Form.Control
          type="text"
          placeholder="Address 2"
          id="address 2"
          onChange={(e) => props.setAddress2(e.target.value)}
        />
        <Form.Control
          type="text"
          placeholder="Town"
          id="town"
          onChange={(e) => props.setTown(e.target.value)}
          required
        />
        <Form.Control
          type="text"
          placeholder="Postcode"
          id="postcode"
          onChange={(e) => props.setPostcode(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>What farming sector?</Form.Label>
        <Dropdown
          id="sector"
          styling="green"
          data={props.sector}
          function={(e) => {
            props.setSector(e);
          }}
          items={[
            "Horticulture",
            "Livestock",
            "Aquaculture",
            "Insect farm",
            "Other",
          ]}
        />
      </Form.Group>

      {props.sector === "Other" ? null : (
        <Form.Group>
          <Form.Label>Specifically;</Form.Label>
          <Dropdown
            id="subsector"
            styling="green"
            data={props.subsector}
            function={(e) => {
              props.setSubsector(e);
            }}
            items={props.subSectors}
          />
        </Form.Group>
      )}

      <Form.Group>
        <Form.Label>Do you have the farm/infrastructure?</Form.Label>
        <Form.Check
          required
          type="radio"
          name="infrastructure"
          label="Yes"
          onClick={() => props.setInfr(true)}
          onBlur={props.validate}
        />
        <Form.Check
          required
          type="radio"
          name="infrastructure"
          label="No"
          onClick={() => props.setInfr(false)}
          onBlur={props.validate}
        />
        <Form.Control.Feedback type="invalid">
          Please answer yes or no.
        </Form.Control.Feedback>

        {props.infr ? (
          <Form.Group>
            <Form.Label>
              Do you want to use IntelliDigest farm/infrastructure?
            </Form.Label>
            <Button className="sub-btn green">Yes</Button>
          </Form.Group>
        ) : null}
      </Form.Group>

      <SectorSwitch
        sector={props.sector}
        productTypes={props.productTypes}
        productType={props.productType}
        setProductType={props.setProductType}
      />

      <TermsAndCons />

      <Form.Group>
        <Form.Check
          type="checkbox"
          label="I accept the terms and conditions."
          required
        />
      </Form.Group>

      <Button type="submit" className="sub-btn blue">
        Start
      </Button>
    </Form>
  );
}

//instead of Sector switch, have a function for each of the sectors and just switch it inside the function itself
