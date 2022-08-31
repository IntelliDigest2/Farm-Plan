import React from "react";
import { PageWrap } from "../../../../SubComponents/PageWrap";
import { Inventory } from "../../Personal/Marketplace/MealPlanComp/Inventory";
import { RestaurantShoppingList } from "./RestaurantShoppingList";

const RestaurantDashboard = () => {

        return (  
            <PageWrap goTo="/account" header="Restaurant Tools">
            <div className = 'inventory'>
                <h2> Inventory</h2>
                <p> By using the World Food Tracker to track your inventory, we can provide useful analytics on your ordering practices, average usage of ingredients and more. In turn, this will allow us to help you better predict what you need, farther in advance. </p>
                <Inventory/>
            </div>

            <div className = 'shoppinglist'>
                {/* <RestaurantShoppingList/> */}
                {/* make a shopping list component that works just like the inventory does */}
                {/* Future: 
                -give them a space to insert par levels for all ingredients, highlight inventory items in red
                when  below par.
                - give them an option to tick a box so that shopping list automatically contains the things ur below par on
                - allow them to section inventory by type of item*/}
                <h2> Shopping List</h2>

                <RestaurantShoppingList/>
                

            </div>
            </PageWrap>
        );
    }
     
    export default RestaurantDashboard;