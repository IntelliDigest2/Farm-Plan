import { List, ListItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AddToRSLModal } from "./AddToRSLModal";
// import RemoveFromInventoryIcon from "./Icons/RemoveFromInventoryIcon";
import "../../Personal/Marketplace/MealPlanComp/Inventory.css";
import RestaurantShoppingListItems from "./RestaurantShoppingListItems";

export const RestaurantShoppingList = ({forceUpdate, value, tab}) => {
    
    const [update, setUpdate] = useState(0);
    const [show, setShow] = useState(false);

    return (
        <div className="RestaurantShoppingList">
            <RestaurantShoppingListItems value={value} tab={tab} update={update} setUpdate={setUpdate}/>
            <AddToRSLModal 
            show={show}
            setShow={setShow}
            update={update}
            setUpdate={setUpdate}
            />
        </div>
    )
}