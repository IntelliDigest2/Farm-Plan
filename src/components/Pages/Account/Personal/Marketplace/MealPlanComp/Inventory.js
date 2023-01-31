import { List, ListItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { AddToInventoryModal } from "./Icons/AddToInventoryModal";
import RemoveFromInventoryIcon from "./Icons/RemoveFromInventoryIcon";
import "./Inventory.css"
import InventoryItems from "./InventoryItems";
import { Alert } from "react-bootstrap";


export const Inventory = ({forceUpdate, value, tab}) => {
    
    const [update, setUpdate] = useState(0);
    const [show, setShow] = useState(false);

    return (
        <div>
             <div className="row">
                <div className="col-8" style={{textAlign: "left"}}>
                    <p>Add new items to your inventory 🙂</p>
                    <p>
                    <Alert variant="primary">
                        Update your items with the actual weight/Volume. Ex., convert Cups, Teaspoon to Ltrs/mL
                    </Alert>
                    </p>
                </div>
                <div className="col-4" style={{textAlign: "right"}}><AddToInventoryModal show={show} setShow={setShow} update={update} setUpdate={setUpdate} /></div>           
             </div>
            <div>
                <InventoryItems value={value} tab={tab} update={update} setUpdate={setUpdate}/>
            </div>
        </div>
    )
}