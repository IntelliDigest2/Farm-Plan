import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, Alert, Table } from "react-bootstrap";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getShoppingList } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import { addToShoppingListUpdate } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import RemoveFromShop from "../Icons/RemoveFromShop";
import { getInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { getAllItems, getPlanData } from "../../../../../../../store/actions/marketplaceActions/mealPlannerData";
import { ItemAlreadyInInventoryIcon } from "../Icons/ItemAlreadyInInventoryIcon";
import BoughtItemIcon from "../Icons/BoughtItemIcon";
import FullCalendar from "../Plan/CalendarPlanner/FullCalendar";
import moment from "moment";


function ShopItems(props) {
  const [list, setList] = useState([]);
  const [allList, setAllList] = useState([]);


  //console.log("whats props:", allList)


  //trigger this when editing/deleting items
  const [update, setUpdate] = useState(0);

  // //this sends data request
  // useEffect(() => {
  //   props.getAllItems();
  // }, [update]);

  //this sends data request
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      month: props.value.format("YYYYMM"),
      day: props.value.format("DD-MM-yyyy"),
    };
    props.getPlanData(data);
  }, [props.value, update]);

  //const year = props.value.format("YYYY")

  useEffect(() => {
    const data = {
      week: props.value.format("w"),
    };

    props.getShoppingList(data);
  }, [props.value, update]);


  const newShoppingList = async () => {
    //clears the meals array before each update- IMPORTANT
    setAllList([]);

    //sets a new meal object in the array for every document with this date attached
    props.UpdatedShoppingList.forEach((doc) => {

      //id is the docref for deletion
      var id = doc.id;
      var food = doc.ingredient.food;
      var quantity = doc.ingredient.quantity;
      var measure = doc.ingredient.measure;
      var expiry = doc.ingredient.expiry;

      setAllList((list) => [
        ...list,
        {
          food: food,
          measure: measure,
          quantity: quantity,
          expiry: expiry,
          id: id,
        },
      ]);
    });
  };

  useEffect(() => {
    newShoppingList();
  }, [props.UpdatedShoppingList]);

  const updateShoppingList = async () => {
    //clears the meals array before each update- IMPORTANT
    setList([]);

    if (props.newPlans == undefined || props.newPlans == '' ) return (<div><p>Loading...</p></div>)


    //sets a new meal object in the array for every document with this date attached
    props.newPlans.forEach((doc ) => {

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
  }, [props.newPlans, update]);

  function getFilteredProducts() {
    return list.filter(product => {
      const week = props.value.format("w")
      //console.log("week", product.week)
    
      return week == product.week;
    });
  }

  useEffect(() => {
    getFilteredProducts();
  }, [props.newPlans]);

  // const isItemInInventory = (strItem) => {
  //   for (let i = 0; i < props.inventory.length; i++) {
  //     if (props.inventory[i].item.toLowerCase().includes(strItem.toLowerCase()))
  //       // if(strItem.includes(props.inventory[i].item))
  //       return true;
  //   }
  //   return false;
  // };

  // const addToList = () => {

  //   console.log("this is function", getFilteredProducts())
  // }

  return (
    <>
      {getFilteredProducts().length ? (
        <>
          <List>
            {allList.map((ingr, index) => (
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
                    id={ingr.id}
                    update={update}
                    setUpdate={setUpdate}
                  /> 
                  {/* <RemoveFromShop
                    id={ingr.id}
                    value={props.value}
                    update={update}
                    setUpdate={setUpdate}
                  />
                    */}
                </div>
              </ListItem>
            ))}
          </List>

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
                    id={ingr.id}
                    update={update}
                    setUpdate={setUpdate}
                  /> 
                  {/* <RemoveFromShop
                    id={ingr.id}
                    value={props.value}
                    update={update}
                    setUpdate={setUpdate}
                  />
                    */}
                </div>
              </ListItem>
            ))}
          </List>
          
        </>
      ) : (
        <div className="empty basic-title-left">
          <p>There are no items in the list yet :( please refresh page</p>
          {/* <Button className="blue-btn shadow-none" type="submit"
            onClick={addToList}>
              Update
          </Button> */}
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    UpdatedShoppingList: state.mealPlan.shoppingList,
    inventory: state.mealPlan.inventory,
    shoppingList: state.mealPlanner.allItems,
    newPlans: state.mealPlanner.newPlans,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShoppingList: (product) => dispatch(getShoppingList(product)),
    getInventory: () => dispatch(getInventory()),
    getAllItems: (plan) => dispatch(getAllItems(plan)),
    addToShoppingListUpdate: (data) => dispatch(addToShoppingListUpdate(data)),
    getPlanData: (plan) => dispatch(getPlanData(plan)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItems);