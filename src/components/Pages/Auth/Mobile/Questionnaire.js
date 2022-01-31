import React, { useState } from "react";

import "./Mob.css";
import { MobileWrap } from "./MobComponents";
import { SubButton } from "../../SubComponents/Button";

import { Form } from "react-bootstrap";

import { connect } from "react-redux";
import { createResearchData } from "../../../../store/actions/dataActions";

function Questionnaire(props) {
  const [sixteenPlus, setSixteenPlus] = useState(Boolean);
  const [arrangement, setArrangement] = useState("");
  const [buildingType, setBuildingType] = useState("");
  const [shopAt, setShopAt] = useState("");
  const [shopPerWeek, setShopPerWeek] = useState("");

  function HandleSubmit() {
    var data = {
      uid: props.auth.uid,
      upload: {
        sixteenPlus: sixteenPlus,
        arrangement: arrangement,
        buildingType: buildingType,
        shopAt: shopAt,
        shopPerWeek: shopPerWeek,
      },
    };
    props.createResearchData(data);
  }

  return (
    <MobileWrap header="Questionnaire" subtitle="" goTo="/settings">
      <Form>
        <div key="inline-radio" className="mb-3">
          <Form.Group>
            <Form.Label>Are you 16 years old or above?</Form.Label>
            <Form.Check
              type="radio"
              inline
              label="Yes"
              name="16 or above"
              id="yes"
              onClick={(e) => setSixteenPlus(true)}
            />
            <Form.Check
              type="radio"
              inline
              label="No"
              name="16 or above"
              id="no"
              onClick={(e) => setSixteenPlus(false)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>What is your current living arrangement?</Form.Label>
            <Form.Check
              label="I live alone"
              name="living arrangement"
              type="radio"
              id="alone"
              onClick={(e) => setArrangement(e.target.id)}
            />
            <Form.Check
              label="I live with family"
              name="living arrangement"
              type="radio"
              id="family"
              onClick={(e) => setArrangement(e.target.id)}
            />
            <Form.Check
              label="Mixed residence"
              name="living arrangement"
              type="radio"
              id="mixed"
              onClick={(e) => setArrangement(e.target.id)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>What is your building type?</Form.Label>
            <Form.Check
              inline
              label="Flat"
              name="building type"
              type="radio"
              id="flat"
              onClick={(e) => setBuildingType(e.target.id)}
            />
            <Form.Check
              inline
              label="House"
              name="building type"
              type="radio"
              id="house"
              onClick={(e) => setBuildingType(e.target.id)}
            />
            <Form.Check
              inline
              label="Other"
              name="building type"
              type="radio"
              id="other"
              onClick={(e) => setBuildingType(e.target.id)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              Where do you go shopping for your groceries?
            </Form.Label>
            <Form.Control
              placeholder=""
              onChange={(e) => setShopAt(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              How often do you go shopping for groceries per week?
            </Form.Label>
            <Form.Check
              label="1 or 2 visits"
              name="how often"
              type="radio"
              id="1 or 2 visits"
              onClick={(e) => setShopPerWeek(e.target.id)}
            />
            <Form.Check
              label="3 or more visits"
              name="how often"
              type="radio"
              id="3 or more visits"
              onClick={(e) => setShopPerWeek(e.target.id)}
            />
            <Form.Check
              label="Weekends only"
              name="how often"
              type="radio"
              id="Weekends only"
              onClick={(e) => setShopPerWeek(e.target.id)}
            />
          </Form.Group>
        </div>
      </Form>
      <div className="center">
        <SubButton
          styling="green"
          text="Submit"
          onClick={(e) => {
            e.preventDefault();
            HandleSubmit();
          }}
        />
      </div>
    </MobileWrap>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createResearchData: (data) => dispatch(createResearchData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
