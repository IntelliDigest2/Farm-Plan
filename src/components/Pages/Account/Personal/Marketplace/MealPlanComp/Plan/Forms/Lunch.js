import React, { useState, useEffect } from "react";
import { Dropdown } from "../../../../../../../SubComponents/Dropdown";
import MealType from "../../Search/mealType";
import { Form, InputGroup, Button } from "react-bootstrap";
import FoodItemSearch from "../../Icons/InputRecipe/FoodItemSearch";
import "../../../../../../../SubComponents/Button.css";

import { connect } from "react-redux";
//import { createRecipe } from "../../../../../../../../store/actions/marketplaceActions/savedMealData";
import { createMealPlannerData } from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData";
//import { addToShoppingList } from "../../../../../../../../store/actions/marketplaceActions/shoppingListData";
import { foodIdAPI, nutritionAPI } from "../../Icons/InputRecipe/NutritionApi";

function Lunch(props) {
  const [mealType, setMealType] = useState("lunch");
  const [err, setErr] = useState("");

  //saves recipe to saved meal list
  const [save, setSave] = useState(true);
  const handleSave = () => {
    setSave(!save);
  };

  //controls local state of ingredient as we fetch data for it,
  //once ingredient is "added" it will be moved to ingredient array
  const defaultLocal = {
    food: "",
    foodId: "",
  };
  const [local, setLocal] = useState(defaultLocal);
  const handleLocal = (e) => {
    if (e.target.textContent) {
      setLocal({ ...local, [e.target.id]: e.target.textContent });
    } else {
      setLocal({ ...local, [e.target.id]: e.target.value });
    }
  };
  const handleFoodSearch = (e) => {
    if (e.target.textContent) {
      setLocal({ ...local, food: e.target.textContent });
    } else {
      setLocal({ ...local, food: e.target.value });
    }
  };

  //when local.food changes, fetch the id for the food item
  //which is needed to fetch nutrition
  const setFoodId = (foodId) => {
    setLocal({ ...local, foodId: foodId });
  };

  const [mealList, setMealList] = useState([]);
  const handleMealList = async () => {
    if (local.food !== "") {
      foodIdAPI(local.food, setFoodId).then(() => {
        setMealList((mealList) => [...mealList, local]);
        setLocal(defaultLocal);
      });
    } else {
      setErr("Please input a meal to add.");
    }
  };
  useEffect(() => {
    console.log("meal list", mealList);
  }, [mealList]);

  const foodList = mealList.map((meal, index) => {
    return (
      <li key={index}>
        {meal.food}
      </li>
    );
  });

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => {
    setUpdate(update + 1);
  };

  //fired when click "done"
  const handleSubmit = () => {

    const data = {
      // month and day are used for the MealPlan db, year and week for the shopping list.
      year: props.value.format("YYYY"),
      month: props.value.format("YYYYMM"),
      week: props.value.format("w"),
      day: props.value.format("DD"),
      upload: {
        mealType: mealType,
        mealList: mealList,
      },
    };

    console.log ("checking the data:", data)
    console.log("checking props:", props)

    props.createMealPlannerData(data);
    forceUpdate();

   // props.addToShoppingList(data);
  };

  return (
    <div>
        <h5>Choose atleast 7 meals for Lunch</h5>
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        //props.handleFormClose();
      }}
    >
      {/* <button
        onClick={() => {
          nutritionAPI(local);
        }}
      >
        send test
      </button> */}
      

      <div style={{ padding: "0 0 0 4%" }}>
        <ul>{foodList}</ul>
      </div>

      <Form.Group>
        <FoodItemSearch handleFoodSearch={handleFoodSearch} />
      </Form.Group>

      <Form.Group>
        <Button
          className="green-btn shadow-none"
          id="add meal"
          onClick={() => {
            handleMealList();
          }}
        >
          Add Meal
        </Button>
      </Form.Group>

      <div style={{ alignItems: "center" }}>
        <Button onClick={() => {
                alert("Your meals have been saved");
                //props.handleFormClose();
                }}
                
          className="blue-btn shadow-none" type="submit">
          Save
        </Button>
      </div>
      
     
    </Form>
    <div>
        
        <span>
            <button className="btn blue-btn shadow-none" style={{marginTop: "25px"}}
                onClick={() => {
                props.setPage(props.page - 1);
                }}>
                Previous
            </button>
        </span>

        <span>
            <button className="btn blue-btn shadow-none" style={{marginLeft: "500px", marginTop: "25px"}}
                onClick={() => {
                props.setPage(props.page + 1);
                }}>
                Next
            </button>
        </span>
            
    </div>
    
   </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createMealPlannerData: (mealPlanner) => dispatch(createMealPlannerData(mealPlanner)),
    //createRecipe: (data) => dispatch(createRecipe(data)),
    //addToShoppingList: (data) => dispatch(addToShoppingList(data)),
  };
};

export default connect(null, mapDispatchToProps)(Lunch);

