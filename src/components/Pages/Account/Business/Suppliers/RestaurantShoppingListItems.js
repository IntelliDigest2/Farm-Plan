// , mostly done? see if u want to replace RemoveFromInventoryIcon

import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getRestaurantShoppingList } from "../../../../../store/actions/marketplaceActions/restaurantShoppingListData";
import RemoveFromInventoryIcon from "../../Personal/Marketplace/MealPlanComp/Icons/RemoveFromInventoryIcon";



function RestaurantShoppingListItems(props) {
  const [list, setList] = useState([]);

  //this sends data request
  useEffect(() => {
    props.getRestaurantShoppingList();
  // }, [props.value, props.update]);
  }, [props.value,props.quantity,props.measure,props.update]);  // 

  const updateRestaurantShoppingList = async () => {
    //clears the items array before each update- IMPORTANT
    setList([]);

    //sets a new item object in the array for every document
    props.data.forEach((doc) => {
      // id is the docref for deletion
      var id = doc.id;
      var item = doc.item;
      var quantity = doc.quantity; // 
      var measure = doc.measure;// 


      setList((list) => [
        ...list,
        {
          item: item,
          id: id,
          measure: measure, // 
          quantity: quantity, // 
        },
      ]);
    });

    setList((list) => {
      let newList = [...list];
      newList.sort((a, b) => {
        return a.item < b.item ? -1 : a.item > b.item ? 1 : 0;
      });
      // console.log("list sorted");
      return newList;
    });
  };

  useEffect(() => {
    updateRestaurantShoppingList();
  }, [props.data]);

  return (
    <>
      {list.length ? (
        <>
          <List>
            {list.map((item, index) => (
              
              <ListItem
                key={`item${index}`}
                className="list"
                style={{ alignItems: "flex-end" }}
              >
                {/* <p>{item.item}</p> */}
                <p>{item.quantity} {item.measure} {item.item}</p>       {/*   */}


                <div className="icons">
                  <RemoveFromInventoryIcon
                    id={item.id}
                    value={props.value}
                    update={props.update}
                    setUpdate={props.setUpdate}
                  />
                </div>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <div className="empty basic-title-left">
          <p>There are no items in the list. </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.mealPlan.restaurantShoppingListItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRestaurantShoppingList: (item) => dispatch(getRestaurantShoppingList(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantShoppingListItems);
