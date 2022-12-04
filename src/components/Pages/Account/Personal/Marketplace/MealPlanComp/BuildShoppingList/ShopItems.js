import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getShoppingList } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import RemoveFromShop from "../Icons/RemoveFromShop";
import { getInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { ItemAlreadyInInventoryIcon } from "../Icons/ItemAlreadyInInventoryIcon";
import BoughtItemIcon from "../Icons/BoughtItemIcon";


function ShopItems(props) {
  const [list, setList] = useState([]);

  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);

  //this sends data request
  useEffect(() => {
    const data = {
      year: props.value.format("YYYY"),
      week: props.value.format("w"),
    };

    props.getShoppingList(data);
    props.getInventory();
  }, [props.value, update]);

  const updateShoppingList = async () => {
    //clears the meals array before each update- IMPORTANT
    setList([]);

    //sets a new meal object in the array for every document with this date attached
    props.shoppingList.forEach((doc) => {
      //id is the docref for deletion
      var id = doc.id;
      var food = doc.ingredient.food;
      var quantity = doc.ingredient.quantity;
      var measure = doc.ingredient.measure;
      var expiry = doc.ingredient.expiry;

      setList((list) => [
        ...list,
        {
          food: food + " " + quantity + " " + measure,
          measure: measure,
          quantity: quantity,
          expiry: expiry,
          id: id,
        },
      ]);
    });
  };

  useEffect(() => {
    updateShoppingList();
  }, [props.shoppingList]);

  // const isItemInInventory = (strItem) => {
  //   for (let i = 0; i < props.inventory.length; i++) {
  //     if (props.inventory[i].item.toLowerCase().includes(strItem.toLowerCase()))
  //       // if(strItem.includes(props.inventory[i].item))
  //       return true;
  //   }
  //   return false;
  // };

  return (
    <>
      {list.length ? (
        <>
          <List>
            {list.map((ingr, index) => (
              <ListItem
                key={`ingr${index}`}
                className="list"
                style={{ alignItems: "flex-end" }}
              >
                <div>
                  <p>
                    {ingr.food}
                    </p><br /><p><b >Expiry Date: </b>{ingr.expiry}</p>
                </div>
                <div style={{ marginLeft: "20px" }}>
                  
                </div>
                <div className="icons">
                  {/* {isItemInInventory(ingr.food) ? (
                    <ItemAlreadyInInventoryIcon />
                  ) : null} */}
                  <BoughtItemIcon 
                    value={props.value}
                    ingredients={ingr.food}
                  /> 
                  <RemoveFromShop
                    id={ingr.id}
                    value={props.value}
                    update={update}
                    setUpdate={setUpdate}
                  />
                   
                </div>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <div className="empty basic-title-left">
          <p>There are no items in the list yet :( please refresh page</p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    shoppingList: state.mealPlan.shoppingList,
    inventory: state.mealPlan.inventory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShoppingList: (product) => dispatch(getShoppingList(product)),
    getInventory: () => dispatch(getInventory()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItems);
