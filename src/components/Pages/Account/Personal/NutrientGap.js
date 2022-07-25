import React, { useState, useEffect } from "react";

import { PageWrap } from "../../../SubComponents/PageWrap";
import LoadingScreen from "../../../SubComponents/Loading/LoadingScreen";
import NutrientsBox from "./Marketplace/MealPlanComp/NutrientsBox";
import moment from "moment";
import "./Marketplace/MealPlanComp/Mealplan.css";

export default function NutrientGap() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  });

  const [value, setValue] = useState(moment());
  console.log("val:", value);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <PageWrap goTo="/account" header="Nutrient Gap">
      <NutrientsBox value={value} setValue={setValue} />
    </PageWrap>
  );
}
