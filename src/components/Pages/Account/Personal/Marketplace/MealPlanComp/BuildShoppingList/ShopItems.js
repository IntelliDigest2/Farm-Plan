import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getShoppingList } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import RemoveFromShop from "../Icons/RemoveFromShop";
import { getInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { ItemAlreadyInInventoryIcon } from "../Icons/ItemAlreadyInInventoryIcon";

function ShopItems(props) {
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(0);

  //this sends data request
  useEffect(() => {
    const data = {
      year: props.value.format("YYYY"),
      week: props.value.format("w"),
    };

    if (props.tab === 2) {
      props.getShoppingList(data);
      props.getInventory();
    }
    // console.log(props.data);
  }, [props.value, update, props.tab]);

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

      setList((list) => [
        ...list,
        {
          food: food,
          measure: measure,
          quantity: quantity,
          id: id,
        },
      ]);
    });
  };

  useEffect(() => {
    if (props.tab === 2) {
      updateShoppingList();
      // console.log("shopping list", list);
    }
  }, [props.shoppingList]);

  const isItemInInventory = (strItem) => {
    for(let i = 0; i < props.inventory.length; i++) {
      if(props.inventory[i].item.toLowerCase().includes(strItem.toLowerCase()))
      // if(strItem.includes(props.inventory[i].item))
        return true;
    }
    return false;
  }

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
                <p>
                  {ingr.food} {ingr.quantity}
                  {ingr.measure}
                </p>
                <div className="icons">
                  {isItemInInventory(ingr.food) ? <ItemAlreadyInInventoryIcon /> : null}
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
          <p>There are no items in the list :( </p>
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
