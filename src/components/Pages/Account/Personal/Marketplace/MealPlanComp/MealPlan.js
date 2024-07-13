import React, { useState, useEffect } from "react";
import { PageWrap } from "../../../../../SubComponents/PageWrap";
import LoadingScreen from "../../../../../SubComponents/Loading/LoadingScreen";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import moment from "moment";

import { Calendar } from "./Calendar";
import { CalendarPlan } from "./CalendarPlan";
import CalendarPlanner from "./Plan/CalendarPlanner/CalendarPlanner";
import CalendarPlannerSchool from "./Plan/CalendarPlanner/CalendarPlannerSchool";
import SavedMeals from "./SavedMeals";
import RecipeSearch from "./Search/RecipeSearch";
import { Inventory } from "./Inventory";
import SchoolMeals from "./SchoolMeals";

import "./Mealplan.css";

function MealPlan({ profile }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true); // Initial loading state is true
  const [value, setValue] = useState(moment());
  const [getItems, setGetItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <PageWrap goTo="/account">
      <Tabs
        defaultActiveKey="calendar"
        id="meal-plan-tabs"
        className="mb-3 mealtabs basic-title"
        fill
      >
        <Tab
          eventKey="calendar"
          title={t("description.meal_diary")}
          className="mealtab"
        >
          <Calendar value={value} onChange={setValue} />
        </Tab>
        <Tab
          eventKey="recipes"
          title={t("description.recipe")}
          className="mealtab"
        >
          <SavedMeals value={value} onChange={setValue} />
          <RecipeSearch value={value} onChange={setValue} />
        </Tab>
        <Tab
          eventKey="inventory"
          title={t("description.inventory")}
          className="mealtab"
        >
          <Inventory value={value} />
        </Tab>
        {profile.isSubAccount ? (
          <Tab eventKey="schoolmeals" title="SCHOOL MEALS" className="mealtab">
            <SchoolMeals value={value} onChange={setValue} />
          </Tab>
        ) : (
          <CalendarPlan value={value} onChange={setValue} />
        )}
        <Tab
          eventKey="plan"
          title={t("description.view_plan")}
          className="mealtab"
        >
          {profile.isSubAccount ? (
            <CalendarPlannerSchool
              value={value}
              getItems={getItems}
              setGetItems={setGetItems}
            />
          ) : (
            <CalendarPlanner
              value={value}
              getItems={getItems}
              setGetItems={setGetItems}
            />
          )}
        </Tab>
      </Tabs>
    </PageWrap>
  );
}

const mapStateToProps = (state) => ({
  profile: state.firebase.profile,
});

export default connect(mapStateToProps)(MealPlan);