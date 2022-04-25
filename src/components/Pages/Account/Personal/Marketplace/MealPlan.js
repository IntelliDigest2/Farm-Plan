import React, { useState } from "react";

import "./MealPlanComp/Mealplan.css";
import { PageWrap } from "../../../SubComponents/PageWrap";
import ConsumerAuth from "./ConsumerAuth";
import { Tab, Tabs } from "react-bootstrap";

import { connect } from "react-redux";
import { Calendar } from "./MealPlanComp/Calendar";
import SavedMeals from "./MealPlanComp/SavedMeals";
import moment from "moment";

const MealPlan = (props) => {
  const [value, setValue] = useState(moment());
  const [tab, setTab] = useState(0);

  const handleSelect = (key) => {
    if (key === "calendar") setTab(0);
    else setTab(1);
  };

  if (!props.profile.isConsumer) {
    return <ConsumerAuth />;
  } else {
    return (
      <PageWrap
        goTo="/account"
        header="My Plan to Save"
        subtitle="My Meal Plan"
      >
        <Tabs
          defaultActiveKey="calendar"
          id="meal-plan-tabs"
          className="mb-3"
          onSelect={handleSelect}
        >
          <Tab eventKey="calendar" title="Calendar">
            {/* Calender returns daily meal plan and monthly calendar- since they both use the "value" prop */}
            <Calendar value={value} onChange={setValue} tab={tab} />
          </Tab>
          <Tab eventKey="saved-meals" title="My Saved Meals">
            {/* saved meals */}
            <SavedMeals value={value} tab={tab} />
          </Tab>
        </Tabs>

        {/* input available locations for picking up */}
        {/* shopping list */}
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
