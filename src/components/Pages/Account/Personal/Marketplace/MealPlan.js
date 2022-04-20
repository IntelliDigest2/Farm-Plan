import React, { useState } from "react";

import { PageWrap } from "../../../SubComponents/PageWrap";
import ConsumerAuth from "./ConsumerAuth";

import { connect } from "react-redux";
import { Calendar } from "./MealPlanComp/Calendar";
import moment from "moment";

const MealPlan = (props) => {
  const [value, setValue] = useState(moment());
  if (!props.profile.isConsumer) {
    return <ConsumerAuth />;
  } else {
    return (
      <PageWrap
        goTo="/account"
        header="My Plan to Save"
        subtitle="My Meal Plan"
      >
        <Calendar value={value} onChange={setValue} />
      </PageWrap>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(MealPlan);
