import React, { useState, useEffect } from "react";
import { Button, Card, Collapse, Accordion, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { updateNutrientData } from "../../../../../../store/actions/dataActions";
import { getMealData } from "../../../../../../store/actions/marketplaceActions/mealPlanData";
import NutrientsBoxHeader from "./NutrientsBoxHeader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NutrientsBox = (props) => {
  const [meals, setMeals] = useState([]);
  const [eatenMeal, setEatenMeal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  //this sends data request
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      month: selectedDate.getFullYear() + "" + (selectedDate.getMonth() + 1).toString().padStart(2, '0'),
      day: selectedDate.getDate().toString().padStart(2, '0'),

      // month: props.value.format("YYYYMM"),
      //  day: props.value.format("DD"),
    };

    console.log("date data ===>", data)

    // if (props.tab === 0) 
    props.getMealData(data);
    // console.log(props.data);
  }, [props.value, selectedDate]);

  const updateMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.mealPlan.forEach((doc) => {
      var mealName = doc.meal_name;
      var ingredients = doc.ingredients;
      var id = doc.id;
      var mealType = doc.mealType;
      var url = doc.url;
      var totalNutrients = doc.total_nutrients;
      var totalDaily = doc.total_daily;
      var recipeYield = doc.recipe_yield;
      var eaten = doc.eaten;
      let nn;
      if (doc.nonNativeData) {
        nn = doc.nonNativeData;
      } else {
        nn = false;
      }

      setMeals((meals) => [
        ...meals,
        {
          meal: mealName,
          mealType: mealType,
          ingredients: ingredients,
          id: id,
          nn: nn,
          url: url,
          totalNutrients: totalNutrients,
          totalDaily: totalDaily,
          recipeYield: recipeYield,
          eaten: eaten,
        },
      ]);
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    // if (props.tab === 0) {
      updateMeals();
      // console.log("Meal Plan:", meals);
    // }
  }, [props.mealPlan]);

  // array of nutrients consumed from all meals
  const [allTotalNutrients, setAllTotalNutrients] = useState([]);
  // array of RDI from nutrients consumed from all meals
  const [allTotalDaily, setAllTotalDaily] = useState([]);
  // used for text change in Accordion
  // const [isExpanded, setIsExpanded] = useState(true);

  // console.log("props.meals: ", props.meals)

  useEffect(() => {
    setAllTotalNutrients([]);
    setAllTotalNutrients((oldArr) => {
      let arrNutrients = [...oldArr];
      let arrDaily = [];
      // forEach checks if nutrient object is already in array, if it is then
      // add its quantity to prev quantity, if not then push the object to the array
      meals.forEach((element) => {
        console.log("element.eaten", element.eaten);
        if (!element.totalNutrients || !element.eaten) return;
        Object.keys(element.totalNutrients).forEach((nutrient) => {
          let found = arrNutrients.find(
            (tableNutrient) =>
              tableNutrient.label === element.totalNutrients[nutrient].label
          );
          if (found) {
            console.log("Table nutrient found");
            found.quantity +=
              element.totalNutrients[nutrient].quantity / element.recipeYield;
          } else {
            let newNutrient = element.totalNutrients[nutrient];
            newNutrient.quantity /= element.recipeYield;
            arrNutrients.push(newNutrient);
          }
        });
      });
      arrNutrients.sort((a, b) => {
        return a.label < b.label ? -1 : a.label > b.label ? 1 : 0;
      });
      return arrNutrients;
    });

    setAllTotalDaily([]);
    setAllTotalDaily((oldArr) => {
      let arr = [...oldArr];
      // forEach does the same as above forEach but for RDI
      meals.forEach((element) => {
        if(element.eaten) setEatenMeal(true);
        if (!element.totalNutrients) return;
        Object.keys(element.totalDaily).forEach((nutrient) => {
          let found = arr.find(
            (tableNutrient) =>
              tableNutrient.label === element.totalDaily[nutrient].label
          );
          if (found) {
            // console.log("Table RDI found");
            found.quantity +=
              element.totalDaily[nutrient].quantity / element.recipeYield;
          } else {
            let newDaily = element.totalDaily[nutrient];
            newDaily.quantity /= element.recipeYield;
            arr.push(newDaily);
            // console.log("Table RDI not found");
          }
        });
      });
      return arr;
    });
  }, [meals]);

  // console.log("All Total Nutrients: ", allTotalNutrients);
  // console.log("All Total Daily: ", allTotalDaily);

  const changeCellStyle = (rdiValue) => {
    return rdiValue <= 10 ? "tomato" : rdiValue >= 50 ? "#b3b785" : null;
  };

  console.log("fuck around => ", meals)

  const updateNutrientList = () => {

    const data = {
        upload: {
        nutrient: allTotalNutrients,
        daily: allTotalDaily,
        updatedAt: new Date()
      },
    };
      props.updateNutrientData(data)
    }

    useEffect(() => {
      updateNutrientList()
    }, [props.mealPlan]);

  return (
    <div>
      <Accordion defaultActiveKey="0">
        {/* <Accordion.Toggle
          as="div"
          className="header"
          eventKey="0"
          // onClick={() => setIsExpanded(!isExpanded)}
        > */}
        {/* <NutrientsBoxHeader value={props.value} setValue={props.setValue}/> */}
          {/* Nutritional Information
          <div
            className="header"
            style={{ marginLeft: "auto", paddingRight: "10px" }}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </div> */}
        {/* </Accordion.Toggle> */}
        <Card>
        <Card.Header className="text-center">
        <p><b>Choose a date to view nutritional info</b></p>
            <DatePicker className="header" selected={selectedDate} onChange={handleDateChange} />
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {(meals.length && eatenMeal) ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nutrient</th>
                      <th>Quantity Consumed</th>
                      <th>Reference Daily Intake (RDI)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTotalNutrients?.map((nutrient) => {
                      return (
                        <tr
                          style={{
                            backgroundColor: changeCellStyle(
                              allTotalDaily
                                .find(
                                  (element) => element.label === nutrient.label
                                )
                                ?.quantity.toFixed(1)
                            ),
                          }}
                        >
                          <td>{nutrient.label}</td>
                          <td>
                            {nutrient.quantity.toFixed(1)} {nutrient.unit}
                          </td>
                          <td>
                            {allTotalDaily.find(
                              (element) => element.label === nutrient.label
                            )
                              ? `${allTotalDaily
                                  .find(
                                    (element) =>
                                      element.label === nutrient.label
                                  )
                                  .quantity.toFixed(1)} %`
                              : "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table> 
              ) : (
                <div className="empty basic-title-left" style={{ height: '200px'}}>
                  <p>
                    Nutritional information will be shown once a meal is added
                    to your plan and is marked as eaten.
                  </p>
                </div>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mealPlan: state.mealPlan.meals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMealData: (product) => dispatch(getMealData(product)),
    updateNutrientData: (data) => dispatch(updateNutrientData(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NutrientsBox);
