import React from "react";
import TermsAndCons from "../../../SubComponents/TermsAndConditions";
import { Dropdown } from "../../../SubComponents/Dropdown";
import { TickList } from "../../../SubComponents/TickList";
import { Form, Button, InputGroup } from "react-bootstrap";

export function ExistingFarmer(props) {
  const updateStateValue = (e) => {
    if (e.target.textContent !== null) {
    }
  };
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
          id="category"
          styling="green"
          data={props.sector}
          function={(e) => {
            props.setSector(e);
          }}
          items={[
            "Horticulture",
            "Livestock",
            "Hydroponics",
            "Aquaculture",
            "Insect farm",
            "Other",
          ]}
        />
      </Form.Group>

      <TickList
        label="Do you acccept any of the following sustainable farming practices? Select everything that applies;"
        list={props.practices}
        checkedState={props.practice}
        setCheckedState={props.setPractice}
      />

      <TickList
        label="Do you have plan to adopt any of the following sustainable farming practices in the future ? Select everything that applies;"
        list={props.practices}
        checkedState={props.futurePractice}
        setCheckedState={props.setFuturePractice}
      />

      <Form.Group>
        <Form.Label>
          When are you effecting the sustainable farming practice(s)?{" "}
        </Form.Label>
        <Form.Check
          type="radio"
          name="effective"
          label="Now"
          onClick={() => props.setPracticeEffective("Now")}
        />
        <Form.Check
          type="radio"
          name="effective"
          label="3 months time"
          onClick={() => props.setPracticeEffective("3months")}
        />
        <Form.Check
          type="radio"
          name="effective"
          label="6 months time"
          onClick={() => props.setPracticeEffective("6months")}
        />
        <Form.Check
          type="radio"
          name="effective"
          label="12 months time"
          onClick={() => props.setPracticeEffective("12months")}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>From where do you source farm input? </Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          id="input"
          onChange={(e) => props.setInput(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>What food items do you produce?</Form.Label>
        <Dropdown
          id="category"
          styling="green"
          data={props.foodItems}
          function={(e) => {
            props.setFoodItems(e);
          }}
          items={[
            "Dairy",
            "Drinks",
            "Fish and Seafood",
            "Fruits",
            "Grains, Bean and Nuts",
            "Meat and Poultry",
            "Pet Foods",
            "Vegetables",
          ]}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>How often is your harvest and what size?</Form.Label>
        <Form.Check
          type="radio"
          name="frequency"
          label="Weekly"
          onClick={() => props.setFrequency("Now")}
        />
        <Form.Check
          type="radio"
          name="frequency"
          label="Monthly"
          onClick={() => props.setFrequency("Monthly")}
        />
        <Form.Check
          type="radio"
          name="frequency"
          label="Yearly"
          onClick={() => props.setFrequency("Yearly")}
        />
        <Form.Check
          type="radio"
          name="frequency"
          label="Quarterly"
          onClick={() => props.setFrequency("Quarterly")}
        />
      </Form.Group>

      <Form.Group>
        {/* Linked to last question */}
        <InputGroup>
          <Form.Control
            type="number"
            placeholder="General harvest size"
            id="size"
            onChange={(e) => props.setSize(e.target.value)}
            required
          />
          <Dropdown
            id="category"
            styling="green dropdown-input-right"
            data={props.unit}
            function={(e) => {
              props.setUnit(e);
            }}
            items={["g", "kg", "tons", "/", "l", "ml"]}
          />
        </InputGroup>
      </Form.Group>

      <TickList
        label="Do you apply any processing of food produce onsite?"
        list={props.processes}
        checkedState={props.processing}
        setCheckedState={props.setProcessing}
      />

      <TickList
        label="Do you apply any preservation of food produce onsite?"
        list={props.preservations}
        checkedState={props.preservation}
        setCheckedState={props.setPreservation}
      />

      <Form.Group>
        <Form.Label>Do you have any food quality certifications?</Form.Label>
        <Form.Check
          type="radio"
          name="quality certification"
          label="Yes"
          onClick={() => props.setQuality(true)}
        />
        <Form.Check
          type="radio"
          name="quality certification"
          label="No"
          onClick={() => props.setQuality(false)}
        />
        {props.quality ? (
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="List here"
            id="quality"
            onChange={(e) => props.setQualityCert(e.target.value)}
          />
        ) : null
        // <>
        //   <p>Consider the following certifications;</p>
        //   <div style={{ marginLeft: "4%" }}>
        //     <ul>
        //       <li>example</li>
        //       <li>example</li>
        //     </ul>
        //   </div>
        // </>
        }
      </Form.Group>
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
