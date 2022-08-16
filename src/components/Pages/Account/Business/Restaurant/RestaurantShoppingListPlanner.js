// this can be used when the restaurants are ready to plan their consumption months
//in advance. until then, use RestaurantShoppingList
import React from "react";
import { useState } from "react";
import { PageWrap } from "../../../../SubComponents/PageWrap";

import AddMealForm from "../../Personal/Marketplace/MealPlanComp/Icons/AddMealForm";
import "../../UserAccount.css";
import AddListItem from "./AddListItem";
import { Row, Col, Form, Button, Card } from "react-bootstrap";


const RestaurantShoppingListPlanner = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [deliveryDay, setDeliveryDay] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const order = {product, quantity, unit}
        console.log(order)
        fetch('http://localhost:8000/blogs', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(order) //THIS ALL NEEDS ADJUSTED
        }).then(()=> {
            console.log('new order added')
        })
    }
    
    
        return (  
            <PageWrap goTo="/account" header="Restaurant tools">
            <div className = 'create'>
                <h2> Shopping List</h2>
                <p>Tell us what you expect to need each week. </p>
                <form onSubmit={handleSubmit}> 
                    
                    <Form.Group> 
                    <Form.Label>
                    Start date:      
                    </Form.Label>
                    {/* <input
                    type = "date"
                    required
                    value = {startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    />  */}

                    <Form.Control
                            type="date"
                            id="startDate"
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                            />
                    
                    </Form.Group>
                     <div style={{ padding: "0 0 0 4%" }}></div>


                    <Form.Group>
                    <label> End date:</label>
                    <Form.Control
                            type="date"
                            id="endDate"
                            onChange={(e) => setEndDate(e.target.value)}
                            value={endDate}
                            />
                    </Form.Group>


                    <div style={{ padding: "0 0 0 4%" }}></div>


                    <label>Delivery or pick-up day</label>
                    <select 
                    value = {deliveryDay}
                    onChange={(e)=> setDeliveryDay(e.target.value)}>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>

                    </select>

               

                    <AddListItem/>    {/* This part contains entry fields for product, quantity, unit. Not sure if having that separate from the other fields is a good idea */}
                
                  
                </form>
            </div>
            </PageWrap>
        );
    }
     
    export default RestaurantShoppingListPlanner;