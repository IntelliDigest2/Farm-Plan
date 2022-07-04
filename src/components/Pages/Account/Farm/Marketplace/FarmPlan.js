import React from "react";
import { connect } from "react-redux";
import { PageWrap } from "../../../../SubComponents/PageWrap";
import "./FarmPlan.css";

import Horticulture from "./Horticulture/Horticulture";

function FarmPlan(props) {
  switch (props.data.farmType) {
    default:
    case "Horticulture":
      return <Horticulture />;
    case "Livestock":
      return <p>This is a livestock farm</p>;
    case "Aquaculture":
      return <p>This is an aquaculture farm</p>;
    case "Insect Farm":
      return <p>This is an insect farm</p>;
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(FarmPlan);
