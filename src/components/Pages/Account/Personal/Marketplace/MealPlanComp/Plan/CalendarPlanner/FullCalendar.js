import React, { useState, useEffect } from "react";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import "./calendarStyle.css";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getMealPlannerData } from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { setDate } from "date-fns";


function FullCalendarApp(props) {

  const [meals, setMeals] = useState([]);
  const [dateRange, setDateRange] = useState([])

  // const events = [
  //   {
  //     id: 1,
  //     title: 'Rice',
  //     start: '2022-11-24T00:00:00',
  //     end: '2022-11-24T03:00:00',
  //   },
  //   {
  //     id: 2,
  //     title: 'Baked beans',
  //     start: '2022-11-24T03:00:00',
  //     end: '2022-11-24T06:00:00',
  //   },
  //   { id: 3, 
  //     title: 'Grilled Beef', 
  //     start: '2022-11-23T06:00:00',
  //     end: '2022-11-23T09:00:00',
  //   },
  // ];


    var getDaysArray = function(start, end) {
      for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
      }
      return arr;
    };

      var daylist = getDaysArray(new Date("2022-11-10"),new Date("2022-11-30"));
      const dates = daylist.map((v)=>v.toISOString().slice(0,10))

      var myStringArray = dateRange;
      var mealList = meals
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

      var combinations = [];
      var count = 0;
      for (let i = 0; i < newObjects.length; i++) {
        var e = {}
        e['title'] = mealList[count].meal
        e['start'] = newObjects[i].start;
        e['end'] = newObjects[i].end;
        e['qty'] = 3
        combinations.push(e);
        count++;
        if (count === mealList.length - 1) count = 0;
      }
     
     console.log("qqq:",combinations);

      //console.log("qqq:", newEvent)

    useEffect(() => {
      setDateRange(dates)
      console.log("printing date range:", dateRange)
  }, []);

    
    //this sends data request
  useEffect(() => {
    props.getMealPlannerData();
  }, []);

  const updateMealPlanner = async () => {
    //clears the items array before each update- IMPORTANT
    setMeals([]);

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
        },
      ]);
    });
  };

  useEffect(() => {
    updateMealPlanner();
  }, [props.getMealPlannerData]);


  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={combinations} 
        eventColor="blue"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.title)}
      />
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