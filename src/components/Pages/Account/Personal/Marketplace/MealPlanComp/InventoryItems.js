import React, { useState, useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { connect } from "react-redux";
import { getInventory } from "../../../../../../store/actions/marketplaceActions/inventoryData";
import RemoveFromInventoryIcon from "./Icons/RemoveFromInventoryIcon";

function InventoryItems(props) {
  const [list, setList] = useState([]);

  //this sends data request
  useEffect(() => {
    props.getInventory();
    console.log("this a props", props)
  }, [props.value, props.update]);

  const updateInventoryList = async () => {
    //clears the items array before each update- IMPORTANT
    setList([]);

    //sets a new item object in the array for every document
    props.data.forEach((doc) => {
      // id is the docref for deletion
      var id = doc.id;
      var item = doc.item;

      setList((list) => [
        ...list,
        {
          item: item,
          id: id,
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
    updateInventoryList();
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
                <p>{item.item}</p>
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
          <p>There are no items in the list :( </p>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.mealPlan.inventory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInventory: (item) => dispatch(getInventory(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InventoryItems);
