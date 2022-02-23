import React, { useState } from "react";

import "../../SubComponents/Button.css";
import { PageWrap } from "../../SubComponents/PageWrap";
import TermsAndCons from "../../SubComponents/TermsAndConditions";

import { Form, Button } from "react-bootstrap";

import { becomeSeller } from "../../../../store/actions/authActions";
import { connect } from "react-redux";

function SellerAuth(props) {
  const [accepted, setAccepted] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [town, setTown] = useState("");
  const [postcode, setPostcode] = useState("");

  function HandleSubmit() {
    var data = {
      uid: props.auth.uid,
      email: props.auth.email,
      location: [address1, address2, town, postcode],
      profile: {
        isSeller: true,
      },
    };
    if (postcode !== "" && accepted !== false && town !== "") {
      props.becomeSeller(data);
    } else {
      console.log("error");
    }
  }

  return (
    <PageWrap
      goTo="account"
      header="Sell Products"
      subtitle="Welcome to the IntelliDigest Marketplace."
    >
      <h5 style={{ marginTop: "2%" }}>
        Before we get started, we just need some information from you.
      </h5>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          HandleSubmit();
        }}
      >
        <Form.Group>
          <Form.Label>What location will you be selling from?</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address 1"
            id="address 1"
            onChange={(e) => setAddress1(e.target.value)}
            required
          />
          <Form.Control
            type="text"
            placeholder="Address 2"
            id="address 2"
            onChange={(e) => setAddress2(e.target.value)}
          />
          <Form.Control
            type="text"
            placeholder="Town"
            id="town"
            onChange={(e) => setTown(e.target.value)}
            required
          />
          <Form.Control
            type="text"
            placeholder="Postcode"
            id="postcode"
            onChange={(e) => setPostcode(e.target.value)}
            required
          />
        </Form.Group>

        <TermsAndCons />

        <Form.Group>
          <Form.Check
            type="checkbox"
            label="I accept the terms and conditions."
            onClick={() => setAccepted(true)}
            required
          />
        </Form.Group>
        <Button type="submit" className="sub-btn blue">
          Start Selling
        </Button>
      </Form>
    </PageWrap>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    becomeSeller: (seller) => dispatch(becomeSeller(seller)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SellerAuth);
