import React, { useState, useEffect } from "react";
import "./calendarStyle.css";
import Calendar from "./CalendarPlan";
import FullCalendarSchoolApp from "./FullCalendarSchool";
import Details from "./Details";
import PackedLunchForm from "./PackedLunchForm"; // Import the PackedLunchForm component
import { useTranslation } from "react-i18next";

export default function CalendarPlannerSchool(props) {
  const { t } = useTranslation();

  const [showDetails, setShowDetails] = useState(false);
  const [data, setData] = useState(null);
  const [schoolMeals, setSchoolMeals] = useState([]);
  const [update, setUpdate] = useState(0);
  const [lunchType, setLunchType] = useState("school");

  useEffect(() => {
    if (lunchType === "school") {
      const data = {
        school_uid: props.profile.belongToSchool,
      };
      props.getSchoolMealData(data);
    }
  }, [props.value, update, lunchType]);

  useEffect(() => {
    if (lunchType === "school") {
      updateSchoolMeals();
    }
  }, [props.schoolMeals, lunchType]);

  const updateSchoolMeals = () => {
    let mealsArray = [];
    props.schoolMeals.forEach((doc) => {
      mealsArray.push({
        meal_name: doc.meal,
        ingredients: doc.ingredients,
        id: doc.id,
        url: doc.url,
        total_nutrients: doc.totalNutrients,
        total_daily: doc.totalDaily,
        recipe_yield: doc.yield,
        meal_type: doc.mealType,
        nn: doc.non_native_data || false,
      });
    });
    setSchoolMeals(mealsArray);
  };

  const handleLunchTypeChange = (event) => {
    setLunchType(event.target.value);
  };

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };

  return (
    <div>
      <h2>{t('description.six_month_plan')}</h2>
      <div>
        <label>
          <input
            type="radio"
            value="school"
            checked={lunchType === "school"}
            onChange={handleLunchTypeChange}
          />
          School Lunch
        </label>
        <label>
          <input
            type="radio"
            value="packed"
            checked={lunchType === "packed"}
            onChange={handleLunchTypeChange}
          />
          Packed Lunch
        </label>
      </div>
      <FullCalendarSchoolApp
        value={props.value}
        getItems={props.getItems}
        setGetItems={props.setGetItems}
        showDetailsHandle={showDetailsHandle}
      />
      <br />
      {showDetails && <Details data={data} />}
      {lunchType === "school" ? (
        schoolMeals.length ? (
          <div>
            {schoolMeals.map((meal, index) => (
              <div key={index}>
                <h3>{meal.meal_name}</h3>
                <p>{meal.ingredients.join(", ")}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty basic-title-left">
            <p>
              You are not connected to a school or your school has not added a
              meal yet 🙂
            </p>
          </div>
        )
      ) : (
        <PackedLunchForm />
      )}
    </div>
  );
}