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
  {
    id: 4,
    title: 'Steaks',
    start: '2022-11-24T06:00:00',
    end: '2022-11-24T09:00:00',
  },
];

function FullCalendarApp(props) {

    const [meals, setMeals] = useState([]);
    
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
      var id = doc.id;
      var mealType = doc.mealType;
      var meal = doc.mealList;

      setMeals((meals) => [
        ...meals,
        {
          meal: meal,
          mealType: mealType,
          id: id,
        },
      ]);
    });
  };

  useEffect(() => {
    updateMealPlanner();
  }, [props.data]);

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        eventColor="blue"
        nowIndicator
        dateClick={(e) => console.log(e.dateStr)}
        eventClick={(e) => console.log(e.event.title)}
      />
      <div>
        <List>
            {meals.map((meal, food) => (
              <ListItem
                key={food}
                className="list"
                style={{ alignItems: "flex-end" }}
              >
                <p>check: {meal.food}</p>
              </ListItem>
            ))}
        </List>
      </div>
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