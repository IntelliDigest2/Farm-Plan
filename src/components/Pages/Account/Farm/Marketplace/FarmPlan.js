import React, { useEffect, useState } from "react";
import { getFarmerData } from "../../../../../store/actions/marketplaceActions/farmPlanData";
import { connect } from "react-redux";
import LoadingScreen from "../../../../SubComponents/LoadingScreen";
import { PageWrap } from "../../../../SubComponents/PageWrap";
import "./FarmPlan.css";

import Horticulture from "./Horticulture/Horticulture";

function FarmPlan(props) {
  //handles loading page
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  });
  useEffect(() => {
    props.getFarmerData();
  }, []);

  const Control = () => {
    switch (props.data[0].sector) {
      default:
      case "Horticulture":
        return <Horticulture />;
      case "Livestock":
        return <Dev sector={props.data[0].sector} />;
      case "Aquaculture":
        return <Dev sector={props.data[0].sector} />;
      case "Insect Farm":
        return <Dev sector={props.data[0].sector} />;
    }
  };

  return (
    <>
      {!loading ? (
        <PageWrap header="My Farm Plan" goTo="/account">
          <Control />
        </PageWrap>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

function Dev({ sector }) {
  return (
    <>
      <div className="basic-title">
        We are sorry.
        <p>
          Planning for {sector} is currrently in development, we'll let you know
          when it's ready to go.
        </p>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFarmerData: () => dispatch(getFarmerData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FarmPlan);
