import moment from "moment";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { getAllMarketplaceUsers, getMealDataForUID } from "../../../../../../store/actions/marketplaceActions/mealPlanData";

function IngredientInfo(props) {

    // list of ingredients from all meals from all users for current month
    // contains objects in format: {food, count}
    const [allIngredients, setAllIngredients] = useState([]);

    useEffect(() => {
        // gets all UIDs in firebase marketplace collection
        props.getAllMarketplaceUsers();
    }, [])

    useEffect(() => {
        // loop through user list and get all meals for the whole current month for each user
        if(props.userList.length) {
            props.userList.forEach(uid => {
                // props.getMealDataForUID(uid, data);
                getUIDMealsForWholeMonth(uid);
            })
            console.log("mealData for user", props.mealPlan);
        }
      }, [props.userList]);

    useEffect(() => {
        if(!props.mealPlan.length)
            return;
        // once a meal has been fetched from database, update ingredients list
        updateIngredientsList();
        // console.log("All meals list", props.mealPlan);
      }, [props.mealPlan]);

      const updateIngredientsList = () => {
        // console.log("UPDATE INGREDIENTS LIST");
        setAllIngredients(oldList => {
            let newList = [...oldList];
            // loop through fetched meals
            props.mealPlan.forEach(element => {
                // loop through ingredients of meal
                element.ingredients.forEach(ingredient => {
                    // if ingredient is already stored in our list, then increase its count property
                    let foundInList = newList.find(listIngredient => listIngredient.food.trim().toLowerCase()
                    === ingredient.food.trim().toLowerCase());
                    if(foundInList) {
                        foundInList.count++; 
                        // console.log("FOUND IN LIST", ingredient.food.trim().toLowerCase());
                    }
                    // else make a new object with name of ingredient, count of 1 and store in list
                    else {
                        // console.log("NOT FOUND IN LIST", ingredient.food.trim().toLowerCase());  
                        newList.push({
                            food: ingredient.food.trim().toLowerCase().valueOf(),
                            count: 1,
                        });
                    }
                })
            })
            return newList;
        })
        console.log("Ingredients list", allIngredients);
      }

      const getUIDMealsForWholeMonth = uid => {
        // get start and end dates for current month
        const currentMonthStart = moment().startOf('month');
        const currentMonthEnd = moment().endOf('month');

        // loop through whole month and get meal data of user for all days
        for(let date = currentMonthStart; date.isBefore(currentMonthEnd); date.add(1, 'days')) {
            const currentDateInfo = {
                month: date.format("YYYYMM"),
                day: date.format("DD"),
            };
            props.getMealDataForUID(uid, currentDateInfo);
        }
      }

    return (
        <div>
            <h2>Get all user ingredient data for whole month</h2>
            <Button onClick={() => console.log("allIngredients list", allIngredients)}>Ingredients List</Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      userList: state.data.getData,
      mealPlan: state.mealPlan.meals,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getAllMarketplaceUsers: () => dispatch(getAllMarketplaceUsers()),
      getMealDataForUID: (uid, meals) => dispatch(getMealDataForUID(uid, meals)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(IngredientInfo);