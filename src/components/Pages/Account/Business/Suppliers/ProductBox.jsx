import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

// import Delete from "./Icons/DeleteIcon";
// import Edit from "./Icons/EditIcon";

export default function ProductBox(props) {

  //console.log("let fetch what weekly props is ==> ", props)
  return (
    <>
      {props.products.map((newProduct, index) => (
        <div className="meal-box" key={`meal-box${index}`}>
          <div className="ingredients">
             <List
              key={`product${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newProduct.productName}</div>
                <div className="icons">
                  {/* <Delete
                    value={props.value}
                    id={newMeal.id}
                    forceUpdate={props.forceUpdate}
                    saved={props.saved}
                  /> */}
                  {/* {newMeal.nonNativeData ? null : (
                    <Edit
                      value={props.value}
                      meal={newMeal.meal}
                      ingredients={newMeal.ingredients}
                      id={newMeal.id}
                      forceUpdate={props.forceUpdate}
                      saved={props.saved}
                    />
                  )} */}
                </div>
              </ListSubheader>

                <ListItem
                key={`item${index}`}
                className="list"
                style={{ alignItems: "baseline" }}
              >
                  <div>
                    <p>
                      {newProduct.productName}
                    </p>
                    <p>
                      {newProduct.productDescription}
                    </p>
                    <p>
                      {newProduct.productQty} {newProduct.productMeasure}
                    </p>
                    <p>
                    {newProduct.productCurrency} {newProduct.productPrice} 
                    </p>
                  </div>
              </ListItem>
            </List>
          </div>
        </div>
      ))}
    </>
  );
}
