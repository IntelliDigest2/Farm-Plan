import React from "react";
import { PageWrap } from "../../../../SubComponents/PageWrap";
import { Inventory } from "../../Personal/Marketplace/MealPlanComp/Inventory";

const RestaurantInventory = () => {

        return (  
            <PageWrap goTo="/account" header="Restaurant Tools">
            <div className = 'create'>
                <h2> Inventory</h2>
                <p> By using the World Food Tracker to track your inventory, we can provide useful analytics on your ordering practices, average usage of ingredients and more. In turn, this will allow us to help you better predict what you need, farther in advance. </p>
                <Inventory/>
            </div>
            </PageWrap>
        );
    }
     
    export default RestaurantInventory;