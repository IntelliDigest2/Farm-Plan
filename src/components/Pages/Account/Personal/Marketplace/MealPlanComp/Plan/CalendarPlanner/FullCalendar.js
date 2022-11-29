import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import "./calendarStyle.css"

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getMealPlannerData } from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData";


function FullCalendarApp(props) {

  const [value, setValue] = useState([]);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [mealTitle, setMealTitle] = useState(false);

  const [dateRange, setDateRange] = useState([])
  const [showModal, setShow] = useState(false);


  const events = [
    {
      id: 1,
      title: 'Rice',
      start: '2022-11-24T00:00:00',
      end: '2022-11-24T03:00:00',
    },
    {
      id: 2,
      title: 'Baked beans',
      start: '2022-11-24T03:00:00',
      end: '2022-11-24T06:00:00',
    },
    { id: 3, 
      title: 'Grilled Beef', 
      start: '2022-11-23T06:00:00',
      end: '2022-11-23T09:00:00',
    },
  ];

  

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
        Array(e.qty).fill({start: e.start, end: e.end})
      );

      //console.log("qqq:", newEvent)

    
    //this sends data request
    useEffect(() => {
      props.getMealPlannerData();
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
  

  console.log("breakfast:", breakfast)
  console.log("lunch:", lunch)
  

  var combineArray = () => {
    var comb = [];
    let x = 0
    let y = 0
    let z = 0

    while (x < breakfast.length && y < lunch.length) {
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

      console.log("getcomb:",comb);
    
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

    //var time = [{breakfast: 'T00:00:00'},{lunch: 'T03:00:00'},{dinner: 'T06:00:00'}]
    for (let i = 0; i < newObjects.length; i++) {
      var e = {}
      e['id'] = i
      e['title'] = allMeals[count].meal;
      e['start'] = newObjects[i].start;
      e['end'] = newObjects[i].end;

      //e['qty'] = 3
      combinations.push(e);
      count++;
      if (count === allMeals.length - 1) count = 0;
    }

    setValue(combinations);

    console.log("value:",value);

  }
   
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        themeSystem="bootstrap"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={value} 
        contentHeight="auto"
        eventDisplay="block"
        display="background"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => {
          setMealTitle(e.event.title);
          handleShow()
        }}
      />
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Meal Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>{mealTitle}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      data: state.mealPlanner.plans,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getMealPlannerData: (meal) => dispatch(getMealPlannerData(meal)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(FullCalendarApp);