import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { CheckboxGroup } from "./Form/Checkbox";
import RadioGroup, { Radio } from "./Form/Radio";
import Select from "./Form/Select";
import { getSurveyData } from "./utils/data";
import getPlan from "./utils/mealPlan";

//code for meal plan generator here is iunspired by https://github.com/arimai/meal-planner
//and adapted for use within WFT, if you have any issues please look here.

export default function Survey() {
  const [stage, setStage] = useState(0);

  const [data, setData] = useState(getSurveyData());

  const [mealCount, setMealCount] = useState(3);
  const [planType, setPlanType] = useState("");
  const [health, setHealth] = useState({});
  const [calories, setCalories] = useState({});
  const [diet, setDiet] = useState({});
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const count = data.selectOpt.mealCount[0].val;
    const plan = data.selectOpt.planType[0].val;
    const defaultDiet = {
      activeIndex: 0,
      name: data.dietSpec[0].name,
    };
    const cal = {
      activeIndex: 0,
      selected: "rec",
      min: data.calories.min,
      max: data.dietSpec[0].name,
    };
    setMealCount(count);
    setPlanType(plan);
    setCalories(cal);
    setDiet(defaultDiet);
  }, []);

  useEffect(() => {
    console.log("health", health);
  }, [health]);

  useEffect(() => {
    console.log("Generated Meal Plan", data);
  }, [data]);

  const handleHealth = (name) => {
    setHealth(() => {
      let value = health[name] ? !health[name] : true;
      return { ...health, [name]: value };
    });
  };

  //   const handleSelect = (e, name) => {
  //       const target = e.target;
  //       switch (name) {
  //         default:
  //         case "mealCount"
  //       }

  //   }

  const handleCaloriesSelect = (index) => {
    let selected = parseInt(index, 10) === 1 ? "custom" : "rec";
    setCalories({ ...calories, activeIndex: index, seclected: selected });
  };

  const handleCalories = (e) => {
    const target = e.target;
    if (target.value) {
      let value = parseInt(target.value, 10);
      if (isNaN(value)) {
        value = 0;
      }
      setCalories({ ...calories, [target.name]: value });
    }
  };

  const handleDiet = (index) => {
    const name = data.dietSpec[index].name;
    setDiet({
      activeIndex: index,
      name: name,
    });
  };

  const getMealPlan = (e) => {
    e.preventDefault();
    const meals = data.mealTypes[mealCount];
    const res = {
      plan: planType,
      health: health,
      calories: { min: calories.min, max: calories.max },
      diet: diet.name,
      meals: meals,
    };
    //loading style isn't sorted yet!!!! Ignore for now
    setLoading(true);
    // getPlan(res).then((data) => {
    //   let par = { num: planType, data: data };
    //   //stop loading and redirect to meal page
    //   setLoading(false);
    //   setRedirect(true);
    //   setData(par);
    // });
    getPlan(res).then((data) => {
      let par = { num: planType, data: data };
      setData(par);
    });
  };

  const handleNext = () => {
    setStage(stage + 1);
  };
  const handleBack = () => {
    setStage(stage - 1);
  };

  const { selectOpt, dietSpec, healthSpec } = data;

  switch (stage) {
    default:
    case 0:
      return (
        <>
          <p>How many meals do you ( or want to ) have in a day?</p>
          <Select
            name="mealCount"
            value={mealCount}
            handler={(e) => setMealCount(parseInt(e.target.value, 10))}
            options={selectOpt.mealCount}
          />
          <button onClick={handleNext}>Next</button>
        </>
      );
    case 1:
      return (
        <>
          <p>Choose a plan type</p>
          <Select
            name="planType"
            value={planType}
            handler={(e) => setPlanType(parseInt(e.target.value, 10))}
            options={selectOpt.planType}
          />
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </>
      );
    case 2:
      return (
        <>
          <p>Any dietary preferences?</p>
          <RadioGroup handleChange={handleDiet} activeIndex={diet.activeIndex}>
            {dietSpec.map((diet) => (
              <Radio key={diet.name}>{diet.text}</Radio>
            ))}
          </RadioGroup>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </>
      );
    case 3:
      return (
        <>
          <p>Any health preferences?</p>
          <CheckboxGroup
            data={healthSpec}
            toggleHandler={handleHealth}
            isCheckedState={health}
          />
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </>
      );
    case 4:
      return (
        <>
          <p>Calorie intake</p>
          <RadioGroup
            handleChange={handleCalories}
            activeIndex={calories.activeIndex}
          >
            <Radio>Go with recommended</Radio>
            <Radio>Choose custom values</Radio>
          </RadioGroup>
          {calories.selected === "custom" ? (
            <div className="Survey__input--custom">
              <input
                placeholder="min"
                type="number"
                name="min"
                onChange={this.setCalories}
                value={this.state.calories.min}
              />
              <input
                placeholder="max"
                type="number"
                name="max"
                onChange={this.setCalories}
                value={this.state.calories.max}
              />
            </div>
          ) : null}
          <button onClick={handleBack}>Back</button>
          <button onClick={getMealPlan}>Get Plan!</button>
          {/* {redirect ? 
          <Redirect to="/meal-plan"/>
          : null
        } */}
        </>
      );
  }
}
