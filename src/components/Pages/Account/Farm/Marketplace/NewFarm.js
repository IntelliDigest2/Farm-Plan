import React from "react";
import TermsAndCons from "../../../SubComponents/TermsAndConditions";
import { Dropdown } from "../../../SubComponents/Dropdown";
import { TickList } from "../../../SubComponents/TickList";
import { Form, Button, InputGroup } from "react-bootstrap";

function SectorSwitch(props) {
  switch (props.sector) {
    default:
    case "Horticulture":
      return <Horticulture {...props} />;
    case "Hydroponics":
      return <Hydroponics {...props} />;
    case "Aquaculture":
    case "Insect Farm":
      return <AquaInsect {...props} />;
  }
}

//horticulture and hydroponics are the same up until recommended energy sources
//Aquaculture and insect farms do not differ other than listed items (controlled in SellerAuth) so I have grouped them together.
const Horticulture = (props) => {
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
        list={props.nutrients}
        checkedState={props.nutrient}
        setCheckedState={props.setNutrient}
      />
      <TickList
        label="What is your current soil composition?"
        list={props.soilNutrients}
        checkedState={props.soilComp}
        setCheckedState={props.setSoilComp}
      />
      <p>
        (Here we give you information based on your soil composition and the
        crops you grow on what biofertilizers and other sustainable products
        that will help you optimize growth.)
      </p>
      {/* Since this feature does not exsist I have only hardcoded it */}
      <p>Key Items needed for crop growth:</p>
      <div style={{ marginLeft: "4%" }}>
        <ul>
          <li>List of nature-based pesticides </li>
          <li>List of renewable energy sources</li>
        </ul>
      </div>
      <p>
        <b>Planning for daily Harvest</b>
      </p>
      <Form.Group>
        <Form.Label>Size of farm</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            id="farmSize"
            step={10}
            required
            onChange={(e) => {
              props.setFarmSize(e.target.value);
            }}
            value={props.farmSize}
          />
          <Dropdown
            disabled
            id="sizeUnit"
            styling="grey dropdown-input-right"
            data="acres"
            items={["acres"]}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        {/* this should be done once for each different crop type */}
        <Form.Label>Duration of crop, vegatable and fruit growth</Form.Label>
        <InputGroup>
          <Form.Control
            required
            type="number"
            id="growthTime"
            step={1}
            onChange={(e) => {
              props.setGrowthTime(e.target.value);
            }}
            value={props.growthTime}
          />
          <Dropdown
            disabled
            id="sizeUnit"
            styling="grey dropdown-input-right"
            data="days"
            items={["days"]}
          />
        </InputGroup>
      </Form.Group>
      <Harvest {...props} />
    </>
  );
};

const Hydroponics = (props) => {
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
        list={props.nutrients}
        checkedState={props.nutrient}
        setCheckedState={props.setNutrient}
      />
      <TickList
        label="What is your current soil composition?"
        list={props.soilNutrients}
        checkedState={props.soilComp}
        setCheckedState={props.setSoilComp}
      />
      <p>
        (Here we give you information based on your soil composition and the
        crops you grow on what biofertilizers and other sustainable products
        that will help you optimize growth.)
      </p>
      <p>Key Items needed for crop growth:</p>
      <div style={{ marginLeft: "4%" }}>
        <ul>
          <li>List of nature-based pesticides </li>
          <li>List of renewable energy sources</li>
          <li>List of energy saving LED lights</li>
          <li>List of upcyclable hydroponic farm equipment</li>
        </ul>
      </div>
      <p>
        <b>Planning for daily Harvest</b>
      </p>
      <Form.Group>
        <Form.Label>Size of farm</Form.Label>
        <InputGroup>
          <Form.Control
            required
            type="number"
            id="farmSize"
            step={10}
            onChange={(e) => {
              props.setFarmSize(e.target.value);
            }}
            value={props.farmSize}
          />
          <Dropdown
            disabled
            id="sizeUnit"
            styling="grey dropdown-input-right"
            data="acres"
            items={["acres"]}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        {/* this should be done once for each different crop type */}
        <Form.Label>Duration of crop, vegatable and fruit growth</Form.Label>
        <InputGroup>
          <Form.Control
            required
            type="number"
            id="growthTime"
            step={1}
            onChange={(e) => {
              props.setGrowthTime(e.target.value);
            }}
            value={props.growthTime}
          />
          <Dropdown
            disabled
            id="sizeUnit"
            styling="grey dropdown-input-right"
            data="days"
            items={["days"]}
          />
        </InputGroup>
      </Form.Group>
      <Harvest {...props} />
    </>
  );
};

const AquaInsect = (props) => {
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
        list={props.nutrients}
        checkedState={props.nutrient}
        setCheckedState={props.setNutrient}
      />
      <p>
        (Here we give you information based on your fish/insect type about
        sustainable products that will help you optimize growth.)
      </p>
      <p>Key Items needed for fish/insect growth:</p>
      <div style={{ marginLeft: "4%" }}>
        <ul>
          <li>List of renewable energy sources</li>
          <li>List of upcyclable insect/fish farm equipment</li>
        </ul>
      </div>
      <p>
        <b>Planning for daily Harvest</b>
      </p>
      <Form.Group>
        <Form.Label>Size of farm</Form.Label>
        <InputGroup>
          <Form.Control
            required
            type="number"
            id="farmSize"
            step={10}
            onChange={(e) => {
              props.setFarmSize(e.target.value);
            }}
            value={props.farmSize}
          />
          <Dropdown
            disabled
            id="sizeUnit"
            styling="grey dropdown-input-right"
            data="acres"
            items={["acres"]}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Label>Duration of fish/Insect growth</Form.Label>
        <InputGroup>
          <Form.Control
            required
            type="number"
            id="growthTime"
            step={1}
            onChange={(e) => {
              props.setGrowthTime(e.target.value);
            }}
            value={props.growthTime}
          />
          <Dropdown
            disabled
            id="sizeUnit"
            styling="grey dropdown-input-right"
            data="days"
            items={["days"]}
          />
        </InputGroup>
      </Form.Group>
      <Harvest {...props} />
    </>
  );
};

const Harvest = (props) => {
  return (
    // {/* Use the size of farm and duration of growth to determine the Daily, Weekly, Monthly, Quarterly and Yearly produce */}
    <div style={{ border: "5px", borderColor: "#0c0847" }}>
      <Form.Group>
        <Form.Label>Harvest frequency and size</Form.Label>
        <Dropdown
          id="harvestFrequency"
          styling="green dropdown-input-right"
          function={(e) => {
            props.setHarvestFreq(e);
          }}
          data={props.harvestFreq}
          items={["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]}
        />
        <InputGroup>
          <Form.Control
            type="number"
            id="harvestSize"
            placeholder="Enter harvest size."
            onChange={(e) => props.setHarvestSize(e.target.value)}
          />
          {/* need a unit converter function */}
          <Dropdown
            id="harvestUnit"
            styling="grey dropdown-input-right"
            function={(e) => {
              props.setHarvestUnit(e);
            }}
            data={props.harvestUnit}
            items={["g", "kg", "tons"]}
          />
        </InputGroup>
        <p>
          Farmers can be harvesting weekly, monthly, quarterly and yearly for
          different food items and be tied to customers that select their
          harvest days for pick up of that particular food item.
        </p>
      </Form.Group>
      <p>Key items needed for crop, vegetable and fruit for harvest:</p>
      <p>(List of farm inputs and suppliers)</p>
      <p>Key items needed for crop, vegetable and fruit for processing:</p>
      <p>(List of farm inputs and suppliers)</p>
      <p>
        {" "}
        Key items needed for crop, vegetable and fruit for preservation before
        sales:
      </p>
      <p>(List of farm inputs and suppliers)</p>
      <p>Required food quality certifications:</p>
      <p>(List of relevant certifications)</p>
    </div>
  );
};

export function NewFarmer(props) {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        props.HandleSubmit();
      }}
    >
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
          required
          id="sector"
          styling="green"
          data={props.sector}
          function={(e) => {
            props.setSector(e);
          }}
          items={[
            "Horticulture",
            "Hydroponics",
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

      <SectorSwitch {...props} />

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
