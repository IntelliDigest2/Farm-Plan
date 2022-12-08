import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getShoppingList } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import RemoveFromShop from "../Icons/RemoveFromShop";
import { getInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { getAllItems } from "../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { ItemAlreadyInInventoryIcon } from "../Icons/ItemAlreadyInInventoryIcon";
import BoughtItemIcon from "../Icons/BoughtItemIcon";
import FullCalendar from "../Plan/CalendarPlanner/FullCalendar";
import moment from "moment";



function ShopItems(props) {
  const [list, setList] = useState([]);

  console.log("whats props:", props)


  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);

  //this sends data request
  useEffect(() => {
    props.getAllItems();
  }, []);

  //const year = props.value.format("YYYY")

  const updateShoppingList = async () => {
    //clears the meals array before each update- IMPORTANT
    setList([]);

    if (props.shoppingList == undefined || props.shoppingList == '' ) return (<div><p>Loading...</p></div>)


    //sets a new meal object in the array for every document with this date attached
    props.shoppingList.forEach((doc ) => {

      const items = doc.ingredients

      items.forEach((data) => {
        var start = moment(doc.start).utc().format('YYYY-MM-DD')
        var food = data.food
        var quantity = data.quantity;
        var measure = data.measure;

        setList((list) => [
          ...list,
          {
            week: moment(start, "YYYY-MM-DD").week(),
            food: food + " " + quantity + " " + measure,
            measure: measure,
            quantity: quantity,
            //id: id,
          },
        ]);
      })
                
        
    });
  };

  useEffect(() => {
    updateShoppingList();
  }, [props.shoppingList]);

  function getFilteredProducts() {
    return list.filter(product => {
      const week = props.value.format("w")
      //console.log("week", product.week)
    
      return week == product.week;
    });
  }

  // useEffect(() => {
  //   getFilteredProducts();
  // }, [props.shoppingList]);


  console.log("check", getFilteredProducts())


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
            {getFilteredProducts().map((ingr, index) => (
              <ListItem
                key={`ingr${index}`}
                className="list"
                style={{ alignItems: "flex-end" }}
              >
                <div>
                  <p>
                    {ingr.food}
                    </p>
                    <br />


                </div>
                <div style={{ marginLeft: "20px" }}>
                  
                </div>
                <div className="icons">
                  {/* {isItemInInventory(ingr.food) ? (
                    <ItemAlreadyInInventoryIcon />
                  ) : null} */}
                  <BoughtItemIcon 
                    value={props.value}
                    food={ingr.food}
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
    //shoppingList: state.mealPlan.shoppingList,
    inventory: state.mealPlan.inventory,
    shoppingList: state.mealPlanner.allItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //getShoppingList: (product) => dispatch(getShoppingList(product)),
    getInventory: () => dispatch(getInventory()),
    getAllItems: (plan) => dispatch(getAllItems(plan)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItems);
