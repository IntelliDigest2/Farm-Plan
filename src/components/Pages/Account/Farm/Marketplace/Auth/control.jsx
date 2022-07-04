import React, { useState, useEffect } from "react";

import Stage0 from "./Stage0";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import Stage5 from "./Stage5";
import Stage51 from "./Stage51";
import Stage52 from "./Stage52";
import Stage6 from "./Stage6";

import { submitNotification } from "../../../../../lib/Notifications";
import { becomeSeller } from "../../../../../../store/actions/authActions";
import { connect } from "react-redux";

//controls the form for farm plan auth
function Control(props) {
  const [form, setForm] = useState(0);

  const handleSubmit = (e) => {
    let data;
    if (props.certificate) {
      data = {
        profile: { isSeller: true },
        info: {
          email: props.auth.email,
          association: props.association,
          certificate: `/farmer-auth/${props.certificate.name}`,
          location: [
            props.farm,
            props.address1,
            props.address2,
            props.town,
            props.country,
            props.postcode,
          ],
          sector: props.sector,
          practice: props.practice,
          futurePractice: props.futurePractice,
          effective: props.effective,
        },
      };
      e.preventDefault();
      props.becomeSeller(data);
      submitNotification("Success!", "Thanks for joining the plan to Save");
    } else {
      data = {
        profile: { isSeller: true },
        info: {
          email: props.auth.email,
          location: [
            props.farm,
            props.address1,
            props.address2,
            props.town,
            props.country,
            props.postcode,
          ],
          sector: props.sector,
          practice: props.practice,
          futurePractice: props.futurePractice,
          effective: props.effective,
        },
      };
      e.preventDefault();
      props.becomeSeller(data);
    }
  };

  //make component rerender every time form stage switches
  useEffect(() => {}, [form]);

  switch (form) {
    case 0:
      return (
        <div className="auth">
          <Stage0
            setForm={setForm}
            existing={props.existing}
            setExisting={props.setExisting}
          />
        </div>
      );
    case 1:
      return (
        <div className="auth">
          <Stage1
            setForm={setForm}
            setAssociation={props.setAssociation}
            association={props.association}
          />
        </div>
      );
    case 2:
      return (
        <div className="auth">
          <Stage2
            setForm={setForm}
            certificate={props.certificate}
            setCertificate={props.setCertificate}
          />
        </div>
      );
    case 3:
      return (
        <div className="auth">
          <Stage3
            setForm={setForm}
            farm={props.farm}
            setFarm={props.setFarm}
            address1={props.address1}
            setAddress1={props.setAddress1}
            address2={props.address2}
            setAddress2={props.setAddress2}
            town={props.town}
            setTown={props.setTown}
            country={props.country}
            setCountry={props.setCountry}
            postcode={props.postcode}
            setPostcode={props.setPostcode}
            existing={props.existing}
          />
        </div>
      );
    case 4:
      return (
        <div className="auth">
          <Stage4
            setForm={setForm}
            sector={props.sector}
            setSector={props.setSector}
          />
        </div>
      );
    case 5:
      return (
        <div className="auth">
          <Stage5
            setForm={setForm}
            practices={props.practices}
            practice={props.practice}
            setPractice={props.setPractice}
          />
        </div>
      );
    case 5.1:
      return (
        <div className="auth">
          <Stage51
            setForm={setForm}
            practices={props.practices}
            futurePractice={props.futurePractice}
            setFuturePractice={props.setFuturePractice}
          />
        </div>
      );
    case 5.2:
      return (
        <div className="auth">
          <Stage52 setForm={setForm} setEffective={props.setEffective} />
        </div>
      );
    case 5.3:
      return (
        <>
          <div className="basic-title">
            Thanks for your interest in the World Food tracker. We only engage
            with sustainable farmers. Please, get back to us once you decide to
            farm sustainably.
          </div>
          <div className="basic-title mb-2">We are here to support you.</div>
        </>
      );
    case 6:
      return (
        <div className="auth">
          <Stage6 handleSubmit={handleSubmit} />
        </div>
      );
    default:
    case "void":
      return (
        <div className="basic-title">
          We're sorry, you cannot make a plan with us at this time.
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    becomeSeller: (seller) => dispatch(becomeSeller(seller)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Control);
