import React, { useState, useEffect, useRef } from "react";
import { Alert, Modal, Button } from "react-bootstrap";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import DayOfWeek from "../../Search/DayOfWeek";
import { AddButton } from "../../../../../../../SubComponents/Button";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import "./calendarStyle.css"
import "../../../../../../../SubComponents/Button.css"

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect, useSelector } from "react-redux";
import { 
  removeAllMealPlan, 
  getParentSchoolPlan, 
  getSchoolMealData, 
  getSchoolPlanData,
  generateNewSchoolPlan,
} from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { generateNewPlan } from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { submitNotificationPlan } from "../../../../../../../lib/Notifications"
import { addToShoppingList } from "../../../../../../../../store/actions/marketplaceActions/shoppingListData";
import { getAllItems } from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData"
import RecipeSearchPlan from "../../Search/RecipeSearchPlan";
import { addOtherMeals, getOtherMeals } from "../../../../../../../../store/actions/dataActions";


function FullCalendarSchoolApp(props) {

  const [allItems, setAllItems ] = useState([])
  const [newPlan, setNewPlan] = useState([]);
  const [newSchoolPlan, setNewSchoolPlan] = useState([]);

  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [mealTitle, setMealTitle] = useState(false);
  const [otherMeals, setOtherMeals] = useState([]);

  const [dateRange, setDateRange] = useState([])
  const [showModal, setShow] = useState(false);
  const [showModalAdd, setShowAdd] = useState(false);
  const [showModalDel, setShowDel] = useState(false);


  const [disabled, setDisabled] = useState(false);

  const [dayOfWeek, setDayOfWeek] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restaurantMobile, setRestaurantMobile] = useState("");
  const [restaurantWebsite, setRestaurantWebsite] = useState("");
  const [schoolMeals, setSchoolMeals] = useState([]);

  //this sends data request
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      school_uid: props.profile.belongToSchool,
    };
    props.getSchoolMealData(data);
  }, [props.value]);

//this sends data request
useEffect(() => {
  const data = {
    //decided to group year and month together, should this be changed?
    admin_uid: props.profile.admin,
  };
  props.getParentSchoolPlan(data);
}, [props.value]);


  const updateSchoolMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setSchoolMeals([]);

    //sets a new meal object in the array for every document with this date attached
    props.schoolMeals.forEach((doc) => {
      var meal_name = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;
     // var mealType = doc.mealType;
      var url = doc.url;
      var total_nutrients = doc.totalNutrients;
      var total_daily = doc.totalDaily;
      var recipe_yield = doc.yield;
      var meal_type = doc.mealType;
      let nn = doc.nn;
      
      if (doc.non_native_data) {
        nn = doc.non_native_data;
      } else {
        nn = false;
      }

      setSchoolMeals((meals) => [
        ...meals,
        {
          meal_name: meal_name,
          //mealType: mealType,
          ingredients: ingredients,
          id: id,
          nn: nn,
          url: url,
          meal_type: meal_type,
          total_nutrients: total_nutrients,
          total_daily: total_daily,
          recipe_yield: recipe_yield,
        },
      ]);
    });
  };

  useEffect(() => {
    updateSchoolMeals();
  }, [props.schoolMeals]);
  
  useEffect(() => {
    console.log("wahala", schoolMeals)
  }, [props.schoolMeals]);

    const getPlan = async () => {
      //clears the items array before each update- IMPORTANT
      setNewPlan([]);
      
      //sets a new item object in the array for every document
      props.parentNewPlan.forEach((doc) => {
        // id is the docref for deletion
        var meal_name = doc.meal_name;
        var ingredients = doc.ingredients;
        var total_daily = doc.total_daily;
        var total_nutrients = doc.total_nutrients;
        var recipe_yield = doc.recipe_yield;
        var meal_type = doc.meal_type
        var nn = doc.nn;
        var url = doc.url;
        var start = doc.start;
        var end = doc.end;
        var eaten = doc.eaten;
      
        setNewPlan((meals) => [
          ...meals,
          {
          title: meal_name,
          ingredients: ingredients,
          total_daily: total_daily,
          total_nutrients: total_nutrients,
          recipe_yield: recipe_yield,
          meal_type: meal_type,
          nn: nn,
          url: url,
          start: start,
          end: end,
          eaten: eaten
          },
        ]);
        
      });
    };

    useEffect(() => {
      getPlan();
    }, [props.parentNewPlan]);

    useEffect(() => {
      console.log("parent new plan", newPlan)
    }, [props.parentNewPlan]);


  const handleDelete = async ()  => {

  props.removeAllMealPlan();
  submitNotificationPlan("please wait..", "Deleting your plan");

};

const generatePlan = async () => {

  let schoolMealsIndex = 0; // Index to keep track of the current meal in schoolMeals

  newPlan.forEach((item) => {
    if (!item) {
      // Skip the iteration if the item is undefined
      return;
    }
    const meal_type = item.meal_type;
    const dayOfWeek = moment(item.start).format("dddd");
    let meal_name, ingredients, total_daily, total_nutrients, recipe_yield, nn, url;

    // Extract the time from the start value and check if it's 14:00:00
    const startTime = moment(item.start).format("HH:mm:ss");
    const isLunchTime = startTime === "14:00:00";

    // Check if the meal type is lunch
    if (isLunchTime) {
      // Randomly select a meal from schoolMeals for lunch
      const selectedMeal = schoolMeals[schoolMealsIndex % schoolMeals.length];

      meal_name = selectedMeal.meal_name;
      ingredients = selectedMeal.ingredients;
      total_daily = selectedMeal.total_daily;
      total_nutrients = selectedMeal.total_nutrients;
      recipe_yield = selectedMeal.recipe_yield;
      nn = selectedMeal.nn;
      url = selectedMeal.url;

      // Increment the index for the next iteration
      schoolMealsIndex++;
    } else {
      // For other meal types, use the meal from parentNewPlan
      meal_name = item.title;
      ingredients = item.ingredients;
      total_daily = item.total_daily;
      total_nutrients = item.total_nutrients;
      recipe_yield = item.recipe_yield;
      nn = item.nn;
      url = item.url;
    }

    const data = {
      year: moment(item.start).format("YYYY"),
      week: moment(item.start).format("w"),
      dayOfWeek: dayOfWeek,
      upload: {
        meal_name: meal_name,
        ingredients: ingredients,
        total_daily: total_daily,
        total_nutrients: total_nutrients,
        recipe_yield: recipe_yield,
        meal_type: meal_type,
        isEatOut: meal_type === "lunch/dinner", // Set isEatOut to true only for lunch
        nn: nn,
        url: url,
        start: item.start,
        end: item.end,
        day: moment(item.start).format("DD-MM-YYYY"),
        dayOfWeek: dayOfWeek,
        eaten: false,
      },
    };

    props.generateNewSchoolPlan(data);
  });

  submitNotificationPlan("Saving...", "Please wait. Refresh when notification disappears!");
};



const getSchoolPlan = async () => {
  //clears the items array before each update- IMPORTANT
  setNewSchoolPlan([]);
  
  //sets a new item object in the array for every document
  props.allSchoolPlan.forEach((doc) => {
    // id is the docref for deletion
    var meal_name = doc.meal_name;
    var ingredients = doc.ingredients;
    var total_daily = doc.total_daily;
    var total_nutrients = doc.total_nutrients;
    var recipe_yield = doc.recipe_yield;
    var meal_type = doc.meal_type
    var nn = doc.nn;
    var url = doc.url;
    var start = doc.start;
    var end = doc.end;
    var eaten = doc.eaten;
  
    setNewSchoolPlan((meals) => [
      ...meals,
      {
      title: meal_name,
      ingredients: ingredients,
      total_daily: total_daily,
      total_nutrients: total_nutrients,
      recipe_yield: recipe_yield,
      meal_type: meal_type,
      nn: nn,
      url: url,
      start: start,
      end: end,
      eaten: eaten
      },
    ]);
    
  });
};

//this sends data request
useEffect(() => {
  props.getSchoolPlanData();
}, [props.allSchoolPlan]);


useEffect(() => {
  getSchoolPlan();
}, [props.allSchoolPlan]);

   
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseDel = () => setShowDel(false);
  const handleShowDel = () => setShowDel(true);
  const handleButton = () => setDisabled(true);

  const eventContent = (eventInfo) => {
    const backgroundColor = eventInfo.event.extendedProps.eaten ? '#B71C1C' : '#5C6BC0';

    return {
      html: `<div style="background-color: ${backgroundColor};">${eventInfo.timeText} ${eventInfo.event.title}</div>`,
    };
  };

  return (
    <>
    {newSchoolPlan.length ? (
      <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        themeSystem="bootstrap"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={newSchoolPlan} 
        contentHeight="auto"
        eventDisplay="block"
        display="background"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventContent={eventContent}
        // eventClick={(e) => {
        //   setMealTitle(e.event.title);
        //   console.log("chhhh",e.event.ingredients);
        //   handleShow()
        // }}
      />
      <div>
        {/* this is temporary and should be rstored after 3 months to allow 
        users regenerate a plan instead of delete with addittional cost*/}
      {/* <p>
          <Button variant="secondary" onClick={handleShow}>
            Generate Plan
          </Button>
      </p>
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Do you want to generate a new plan? </p>
            <p>This will incure additional cost</p>
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary">
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal> */}
       <p>
          <Button className="red-btn shadow-none" onClick={handleShowDel}>
            Remove
          </Button>
      </p>
      <Modal show={showModalDel} onHide={handleCloseDel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to delete your meal plan?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleDelete();
              handleCloseDel();
            }}
          >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleCloseDel}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
      </div>
) : (
  <div>
    <div className="empty basic-title-center">
      <p>You have not generated a new meal plan yet.. 🙂</p>
    </div>

      <p>
          <Button className="blue-btn shadow-none" onClick={handleShow}>
            Generate Plan
          </Button>
      </p>
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Do you want to generate new plan? </p>
            {/* <RecipeSearchPlan /> */}
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" disabled={disabled}  onClick={() => {
          generatePlan()
          handleClose()
          handleButton()
        }}>
            {disabled ? 'Generated' : 'Generate'}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
)}
    </>
    
    
  );
}

const mapStateToProps = (state) => {
    return {
      schoolMeals: state.mealPlanner.schoolMeals,
      parentNewPlan: state.mealPlanner.parentNewPlan,
      allSchoolPlan: state.mealPlanner.newSchoolPlan,
      profile: state.firebase.profile,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        generateNewSchoolPlan: (plan) => dispatch(generateNewSchoolPlan(plan)),
        removeAllMealPlan: (meals) => dispatch(removeAllMealPlan(meals)),
        getParentSchoolPlan: (meals) => dispatch(getParentSchoolPlan(meals)),
        getSchoolMealData: (data) => dispatch(getSchoolMealData(data)),
        getSchoolPlanData: (data) => dispatch(getSchoolPlanData(data))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(FullCalendarSchoolApp);