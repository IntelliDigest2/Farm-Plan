import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getShoppingList } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";

function ShopItems(props) {
  const [list, setList] = useState([]);

  //this sends data request
  useEffect(() => {
    const data = {
      //decided to group year and month together, should this be changed?
      year: props.value.format("YYYY"),
      week: props.value.format("w"),
    };

    if (props.tab === 0) props.getMealData(data);
    // console.log(props.data);
  }, [props.value, props.update, props.tab]);

  const updateMeals = async () => {
    //clears the meals array before each update- IMPORTANT
    setList([]);

    //sets a new meal object in the array for every document with this date attached
    props.data.forEach((doc) => {
      var food = doc.food;

      setList((list) => [
        ...list,
        {
          food: food,
        },
      ]);
    });
  };

  useEffect(() => {
    updateMeals();
    // console.log(meals);
  }, [props.data]);

  return (
    <>
      {list.length ? (
        <List>
          {list.map((item, index) => (
            <ListItem
              key={`item${index}`}
              className="list"
              style={{ alignItems: "flex-end" }}
            >
              <p>{item.food}</p>
            </ListItem>
          ))}
        </List>
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
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShoppingList: (product) => dispatch(getShoppingList(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItems);
