import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import "./calendarStyle.css";
import { connect } from "react-redux";
import { getMealPlannerData, getPlanData, generateNewPlan } from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { submitNotificationPlan } from "../../../../../../../lib/Notifications";
import { addToShoppingList } from "../../../../../../../../store/actions/marketplaceActions/shoppingListData";
import { getAllItems } from "../../../../../../../../store/actions/marketplaceActions/mealPlannerData";

function FullCalendarApp(props) {
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [newPlan, setNewPlan] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    props.getAllItems(); // Fetch all items on component mount
    props.getPlanData(); // Fetch existing plans on component mount
  }, []);

  useEffect(() => {
    // Update newPlan whenever props.allPlan changes
    setNewPlan(props.allPlan);
  }, [props.allPlan]);

  const generatePlan = async () => {
    // Generate new plan based on allItems
    allItems.forEach((item) => {
      const data = {
        year: moment(item.start).format("YYYY"),
        week: moment(item.start).format("w"),
        upload: {
          meal: item.title,
          ingredients: item.ingredients,
          totalDaily: item.totalDaily,
          totalNutrients: item.totalNutrients,
          recipeYield: item.recipeYield,
          nn: item.nn,
          url: item.url,
          start: item.start,
          end: item.end,
          day: moment(item.start).format("DD-MM-YYYY"),
        }
      };
      props.generateNewPlan(data);
    });
    submitNotificationPlan("Saving..", "Refresh when notification disappears!");
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleGeneratePlan = () => {
    generatePlan();
    handleCloseModal();
    setDisabled(true);
  };

  return (
    <>
      {newPlan.length ? (
        <div className="calendar">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              center: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={newPlan}
            contentHeight="auto"
            eventDisplay="block"
            display="background"
            nowIndicator
            dateClick={(e) => console.log(e.dateStr)}
          />
          <div>
            <p>
              <Button variant="secondary" onClick={handleShowModal}>
                Generate Plan
              </Button>
            </p>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Generate Plan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Do you want to generate a new plan?</p>
                <p>This will incur additional cost.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" disabled={disabled} onClick={handleGeneratePlan}>
                  {disabled ? 'Generated' : 'Generate'}
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>
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
            <Button variant="secondary" onClick={handleShowModal}>
              Generate Plan
            </Button>
          </p>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Generate Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Do you want to generate a new plan?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" disabled={disabled} onClick={handleGeneratePlan}>
                {disabled ? 'Generated' : 'Generate'}
              </Button>
              <Button variant="secondary" onClick={handleCloseModal}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  allPlan: state.mealPlanner.newPlans,
  allItems: state.mealPlanner.allItems,
});

const mapDispatchToProps = {
  getMealPlannerData,
  getPlanData,
  generateNewPlan,
  addToShoppingList,
  getAllItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(FullCalendarApp);