import React, { useState, useEffect } from "react";
import moment from "moment";
import { PageWrap } from "../../../../../SubComponents/PageWrap";
import { Tab, Tabs } from "react-bootstrap";

import { Calendar } from "./Calendar";
import { CalendarPlan } from "./CalendarPlan";
import CalendarPlanner from "./Plan/CalendarPlanner/CalendarPlanner";
import CalendarPlannerSchool from "./Plan/CalendarPlanner/CalendarPlannerSchool";

import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import SavedMeals from "./SavedMeals";
import RecipeSearch from "./Search/RecipeSearch";
import SchoolMeals from "./SchoolMeals";

function MealPlan(props) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(moment());
  const [lunchType, setLunchType] = useState("school");
  const [getItems, setGetItems] = useState([]);
  const [schoolLunchOptions, setSchoolLunchOptions] = useState([]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);


  const handleLunchTypeChange = (event) => {
    setLunchType(event.target.value);
  };

  return (
    <PageWrap goTo="/account" header={t("description.my_plan_to_save")}>
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
        {props.profile.isSubAccount ? (
          <Tab eventKey="schoolmeals" title="SCHOOL MEALS" className="mealtab">
            <SchoolMeals
              value={value}
              onChange={setValue}
              lunchType={lunchType}
              onLunchTypeChange={handleLunchTypeChange}
              schoolLunchOptions={schoolLunchOptions} 
            />
          </Tab>
        ) : (
          <Tab eventKey="calendarplan" title="CALENDAR PLAN" className="mealtab">
            <CalendarPlan value={value} onChange={setValue} />
          </Tab>
        )}
        <Tab eventKey="plan" title={t("description.view_plan")} className="mealtab">
          {props.profile.isSubAccount ? (
            <CalendarPlannerSchool
              value={value}
              getItems={getItems}
              setGetItems={setGetItems}
              lunchType={lunchType}
              onLunchTypeChange={handleLunchTypeChange}
              schoolLunchOptions={schoolLunchOptions} // Pass schoolLunchOptions to CalendarPlannerSchool
            />
          ) : (
            <CalendarPlanner value={value} getItems={getItems} setGetItems={setGetItems} />
          )}
        </Tab>
      </Tabs>
    </PageWrap>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps, null)(MealPlan);