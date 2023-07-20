import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import Delete from "./Icons/DeleteIcon";
import Edit from "./Icons/EditIcon";
import ScaleIcon from '@mui/icons-material/Scale';
import PaidIcon from '@mui/icons-material/Paid';
import Image from "../../../../../SubComponents/Image"

export default function ItemsBox(props) {

  return (
    <>
      {props.shopItems.map((newItem, index) => (
        <div className="meal-box" key={`items-box${index}`}>
          <div className="ingredients">

            <List
              key={`prod${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newItem.meal}</div>
                <div className="icons">
                  <Delete
                    value={props.value}
                    id={newItem.id}
                    forceUpdate={props.forceUpdate}
                  />
                    <Edit
                      shopItems={newItem}
                      id={newItem.id}
                      forceUpdate={props.forceUpdate}
                    />
                </div>
              </ListSubheader>

                <ListItem
                  key={`item${index}`}
                  className="list"
                  style={{ alignItems: "flex-end" }}
                >
                    <div>
                    <Image imageUrl={newItem.imageURL} />
                    <p style={{ padding: "14px 0 9px 25px", fontWeight: "bolder", fontSize: "20px" }}>{newItem.item}</p>
                    <p><ScaleIcon /><b style={{ paddingLeft: "6px", fontWeight: "bolder" }}></b>{newItem.quantity} {newItem.measure}</p>
                    <p><PaidIcon /><b style={{ paddingLeft: "6px", fontWeight: "bolder" }}></b>{newItem.currency} {newItem.price} </p>
                    </div>
                </ListItem>
            </List>
          </div>
        </div>
      ))}
    </>
  );
}
