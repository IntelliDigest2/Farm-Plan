import { List, ListItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AddToInventoryModal } from "./Icons/AddToInventoryModal";
import RemoveFromInventoryIcon from "./Icons/RemoveFromInventoryIcon";
import "./Inventory.css"
import InventoryItems from "./InventoryItems";

export const Inventory = ({forceUpdate, value, tab}) => {
    
    const [update, setUpdate] = useState(0);
    const [show, setShow] = useState(false);

    return (
        <div className="inventory">
            <InventoryItems value={value} tab={tab} update={update} setUpdate={setUpdate}/>
            <AddToInventoryModal 
            show={show}
            setShow={setShow}
            update={update}
            setUpdate={setUpdate}
            />
        </div>
    )
}