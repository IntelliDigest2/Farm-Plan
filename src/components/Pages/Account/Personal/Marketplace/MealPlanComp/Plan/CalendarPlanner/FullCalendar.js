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
import { getMealPlannerData, removeAllMealPlan, getPlanData } from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { generateNewPlan } from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { submitNotificationPlan } from "../../../../../../../lib/Notifications"
import { addToShoppingList } from "../../../../../../../../store/actions/marketplaceActions/shoppingListData";
import { getAllItems } from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData"
import RecipeSearchPlan from "../../Search/RecipeSearchPlan";
import { addOtherMeals, getOtherMeals } from "../../../../../../../../store/actions/dataActions";


function FullCalendarApp(props) {

  const [allItems, setAllItems ] = useState([])
  const [newPlan, setNewPlan] = useState([]);

  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [mealTitle, setMealTitle] = useState(false);
  const [otherMeals, setOtherMeals] = useState([]);

  const [dateRange, setDateRange] = useState([])
  const [showModal, setShow] = useState(false);
  const [showModalAdd, setShowAdd] = useState(false);

  const [disabled, setDisabled] = useState(false);

  const [dayOfWeek, setDayOfWeek] = useState("");
  const [restaurantName, setRestaurantName] = useState("");



  //console.log("check the props:", props)

    var getDaysArray = function(start, end) {
      for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
    };

    var d = new Date(props.value.format("YYYY-MM-DD"));
    d.setMonth(d.getMonth() + 6);
    console.log("In six months", d.toISOString().slice(0,19));



      var daylist = getDaysArray(new Date(props.value.format("YYYY-MM-DD")),new Date(d.toISOString().slice(0,10)));
      const dates = daylist.map((v)=>v.toISOString().slice(0,10))

      var myStringArray = dateRange;
      //var mealList = meals
      let newEvent = []
      var arrayLength = myStringArray.length;

      for (var i = 0; i < arrayLength; i++) {
        var obj = {}
        obj['start'] = myStringArray[i];
        obj['end'] = myStringArray[i];
        obj['qty'] = 3
        newEvent.push(obj);

       
      }

      let newObjects = newEvent.flatMap(e=>
        Array(e.qty).fill({
          start: e.start, 
          end: e.end})
      );

      //console.log("qqq:", newEvent)

    
    // this sends data request
    useEffect(() => {
      props.getAllItems();
    }, []);

  const updateMealPlanner = async () => {
    //clears the items array before each update- IMPORTANT
    setBreakfast([]);
    setLunch([]);

    //sets a new item object in the array for every document
    props.data.forEach((doc) => {
      // id is the docref for deletion
      var mealName = doc.meal;
      var ingredients = doc.ingredients;
      var id = doc.id;
      var mealType = doc.mealType;
      var url = doc.url;
      var totalNutrients = doc.totalNutrients;
      var totalDaily = doc.totalDaily;
      var recipeYield = doc.yield;
      let nn;
      if (doc.nonNativeData) {
        nn = doc.nonNativeData;
      } else {
        nn = false;
      }

      if (mealType == 'breakfast') {
        setBreakfast((meals) => [
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
          },
        ]);
      } else {
        setLunch((meals) => [
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
          },
        ]);
      }
      
    });
  };

  useEffect(() => {
    updateMealPlanner();
    //combineArray();
  }, [props.data]);

  useEffect(() => {
    setDateRange(dates)
   // console.log("printing date range:", props.value.format("YYYY-MM-DD"))
    }, []);


    useEffect(() => {
      combineArray();

     // console.log("printing date range:", props.value.format("YYYY-MM-DD"))
      }, [breakfast, lunch]);
  

  //console.log("breakfast:", breakfast)
  //console.log("lunch:", lunch)
  

  var combineArray = () => {
    var comb = [];
    let x = 0
    let y = 0
    let z = 0

    while (x < breakfast.length -1 && y < lunch.length -1) {
      
      comb[z++] = breakfast[x++];
      comb[z++] = lunch[y++];
      comb[z++] = lunch[y++];
    }

    // Store remaining elements of first array
    while (x < breakfast.length)
      comb[z++] = breakfast[x++];

    // Store remaining elements of second array
    while (y < lunch.length)
      comb[z++] = lunch[y++];

      //console.log("getcomb:",comb);
    
    return comb;
  }

  useEffect(() => {
    combinations();
  }, [breakfast, lunch])
  
  var combinations = async () => {
    var combinations = [];
    var count = 0;

    await combineArray()

    if (breakfast == '' || lunch == '' ) return (<div><p>Loading...</p></div>)

    var allMeals = combineArray()

    var H = 8
    var MS = ':00:00'
    var T = 'T0' + H + MS
    for (let i = 0; i < newObjects.length; i++) {
      var e = {}
      //e['id'] = allMeals[count].id
      e['title'] = allMeals[count].meal;
      e['start'] = newObjects[i].start + T;
      e['end'] = newObjects[i].end + T;
      e['ingredients'] = allMeals[count].ingredients;
      e['totalDaily'] = allMeals[count].totalDaily;
      e['totalNutrients'] = allMeals[count].totalNutrients;
      e['recipeYield'] = allMeals[count].recipeYield;
      e['mealType'] = allMeals[count].mealType[0];
      e['nn'] = allMeals[count].nn;
      e['url'] = allMeals[count].url;


      //e['qty'] = 3
      combinations.push(e); 

      H = H + 6

        
      if(H > 20) H = 8


      if (H > 9) {T = 'T' + H + MS} else {T = 'T0' + H + MS}
      
      count++;
      if (count === allMeals.length - 1) count = 0;
    }


    setAllItems(combinations);

    console.log("All items is:",allItems);

  }

  const generatePlan = async () => {
    allItems.forEach((item) => {

      if (!item) {
        // Skip the iteration if the item is undefined
        return;
      }
      const mealType = item.mealType
      const dayOfWeek = moment(item.start).format("dddd");
      const matchingRecipe = otherMeals.find((recipe) => recipe.dayOfWeek === dayOfWeek && recipe.mealType == mealType);
      
      //console.log("matching recipe", otherMeals)

      const data = {
        year: moment(item.start).format("yyyy"),
        week: moment(item.start).format("w"),
        dayOfWeek: dayOfWeek,
        upload: {
          meal: matchingRecipe ? matchingRecipe.mealName : item.title,
          ingredients: matchingRecipe ? matchingRecipe.ingredients : item.ingredients,
          totalDaily: matchingRecipe ? matchingRecipe.totalDaily : item.totalDaily,
          totalNutrients: matchingRecipe ? matchingRecipe.totalNutrients : item.totalNutrients,
          recipeYield: matchingRecipe ? matchingRecipe.recipeYield : item.recipeYield,
          mealType: matchingRecipe ? matchingRecipe.mealType : item.mealType,
          isEatOut: matchingRecipe ? matchingRecipe.isEatOut : false,
          // nn: matchingRecipe ? matchingRecipe.recipe.nn : item.nn,
          // url: matchingRecipe ? matchingRecipe.recipe.url : item.url,
          start: item.start,
          end: item.end,
          day: moment(item.start).format("DD-MM-yyyy"),
          dayOfWeek: dayOfWeek
        }
      };
  
      props.generateNewPlan(data);

      //console.log("upload", data.upload)
    });
  
    submitNotificationPlan("Saving,..", "Please wait, Refresh when notification disappears!");
  };
  


    const getPlan = async () => {
      //clears the items array before each update- IMPORTANT
      setNewPlan([]);
      
      //sets a new item object in the array for every document
      props.allPlan.forEach((doc) => {
        // id is the docref for deletion
        var meal = doc.meal;
        var ingredients = doc.ingredients;
        var totalDaily = doc.totalDaily;
        var totalNutrients = doc.totalNutrients;
        var recipeYield = doc.recipeYield;
        var mealType = doc.mealType[0]
        var nn = doc.nn;
        //var url = doc.url;
        var start = doc.start;
        var end = doc.end;
      
  
        setNewPlan((meals) => [
          ...meals,
          {
          title: meal,
          ingredients: ingredients,
          totalDaily: totalDaily,
          totalNutrients: totalNutrients,
          recipeYield: recipeYield,
          mealType: mealType,
          nn: nn,
          //url: url,
          start: start,
          end: end,
          },
        ]);
        
      });
    };

    //this sends data request
    useEffect(() => {
      props.getPlanData();
    }, []);


    useEffect(() => {
      getPlan();
    }, [props.allPlan]);


    const handleAdd = async ()  => {
        const data = {
          upload: {
            dayOfWeek: dayOfWeek,
            restaurantName: restaurantName,
            recipe: props.SelectedRecipe,
          }        
        };
  
        //console.log("tired:", data)
  
      props.addOtherMeals(data);
      submitNotificationPlan("Success", "Your meal has been saved!");
  
    };

  //trigger this when updating items
 const [update, setUpdate] = useState(0);
 
 const forceUpdate = () => {
   setUpdate(update + 1);
 };
  
    //this sends data request
  useEffect(() => {
    props.getOtherMeals();
  }, [props.value, props.allItems]);

  useEffect(() => {
    forceUpdate()
  }, [props.otherMeals]);

  const getOtherMeals = async () => {
    // Array of days in the desired order starting from Monday
    const daysOfWeekOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
    // Clear the items array before each update - IMPORTANT
    setOtherMeals([]);
  
    // Sort the otherMeals array based on the desired order
    const sortedMeals = props.otherMeals.sort((a, b) => {
      return daysOfWeekOrder.indexOf(a.dayOfWeek) - daysOfWeekOrder.indexOf(b.dayOfWeek);
    });
  
    // Set the sorted meals in the state
    sortedMeals.forEach((doc) => {
      const dayOfWeek = doc.dayOfWeek;
      const mealName = doc.recipe.label;
      const ingredients = doc.recipe.ingredients;
      const totalDaily = doc.recipe.totalDaily;
      const totalNutrients = doc.recipe.totalNutrients;
      const recipeYield = doc.recipe.yield;
      const mealType = doc.recipe.mealType[0];
      const isEatOut = true
      // let mealType; 

      // if (doc.recipe.mealType && doc.recipe.mealType[0]) {
      //   mealType = doc.recipe.mealType[0]; // Assign mealType only if it exists
      // }
      // const nn = nn;
  
      setOtherMeals((meals) => [
        ...meals,
        {
          dayOfWeek: dayOfWeek,
          mealName: mealName,
          ingredients: ingredients,
          totalDaily: totalDaily,
          totalNutrients: totalNutrients,
          recipeYield: recipeYield,
          mealType: mealType,
          isEatOut: isEatOut
          // nn: nn
        },
      ]);
    });
  };
  
  useEffect(() => {
    getOtherMeals();
    forceUpdate()
  }, [props.otherMeals]);
   
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleButton = () => setDisabled(true);

  return (
    <>
    {newPlan.length ? (
      <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        themeSystem="bootstrap"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={newPlan} 
        contentHeight="auto"
        eventDisplay="block"
        display="background"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        // eventClick={(e) => {
        //   setMealTitle(e.event.title);
        //   console.log("chhhh",e.event.ingredients);
        //   handleShow()
        // }}
      />
      <div>
      <p>
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
      </Modal>
  </div>
      </div>
) : (
  <div>
    <div className="empty basic-title-center">
      <p>You have not generated a new meal plan yet.. 🙂</p>
    </div>

    <div className="info-text">
    <Alert variant="info" className="info-text">
    Do you eat out at work? You can choose the day(s) and meal, and it will be added to your plan.
  </Alert>    
  </div>

    <div>
    <Box sx={{ flexGrow: 1 }}>
  <Grid container spacing={2}>
    <Grid item xs={12} md={3}>
      <div>
        <DayOfWeek setDayOfWeek={setDayOfWeek} />
      </div>
    </Grid>

    <Grid item xs={12} md={7}>
      <div>
        <input
          type="text"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          className="inputField"
          placeholder="Enter name of restaurant"
        />
      </div>
    </Grid>

    <Grid item xs={12} md={2}>
      <div className="button">
        <AddButton onClick={handleShowAdd} />
      </div>
      <Modal show={showModalAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Choose meal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <p>Do you want to generate a new plan?</p> */}
          <RecipeSearchPlan />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="blue-btn shadow-none"
            onClick={() => {
              handleAdd();
              handleClose();
            }}
          >
            Save
          </Button>
          {/* <Button variant="secondary" onClick={handleClose}>
            No
          </Button> */}
        </Modal.Footer>
      </Modal>
    </Grid>
  </Grid>
</Box>

    </div>
    <div>
      {otherMeals.map((meal) => (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p style={{ marginRight: '10px', fontWeight: 'bold' }}>{meal.dayOfWeek}</p>
          <p>{meal.mealName}</p>
        </div>
      ))}
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
      data: state.mealPlanner.plans,
      allPlan: state.mealPlanner.newPlans,
      allItems: state.mealPlanner.allItems,
      SelectedRecipe: state.data.SelectedRecipe,
      otherMeals: state.data.otherMeals
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getMealPlannerData: (meal) => dispatch(getMealPlannerData(meal)),
        getPlanData: (plan) => dispatch(getPlanData(plan)),
        generateNewPlan: (plan) => dispatch(generateNewPlan(plan)),
        getAllItems: (plan) => dispatch(getAllItems(plan)),
        addOtherMeals: (meal) => dispatch(addOtherMeals(meal)),
        getOtherMeals: (meals) => dispatch(getOtherMeals(meals)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(FullCalendarApp);