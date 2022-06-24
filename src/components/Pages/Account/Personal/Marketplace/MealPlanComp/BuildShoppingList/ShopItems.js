import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getShoppingList } from "../../../../../../../store/actions/marketplaceActions/shoppingListData";
import RemoveFromShop from "../Icons/RemoveFromShop";

function ShopItems(props) {
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(0);

  //this sends data request
  useEffect(() => {
    const data = {
      year: props.value.format("YYYY"),
      week: props.value.format("w"),
    };

    if (props.tab === 2) props.getShoppingList(data);
    // console.log(props.data);
  }, [props.value, update, props.tab]);

  const updateShoppingList = async () => {
    //clears the meals array before each update- IMPORTANT
    setList([]);

    //sets a new meal object in the array for every document with this date attached
    props.data.forEach((doc) => {
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
  }, [props.data]);

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
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShoppingList: (product) => dispatch(getShoppingList(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopItems);
