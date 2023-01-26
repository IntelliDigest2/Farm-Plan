import React from "react";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { RemoveFromInventory, addToGiftItems } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { connect } from "react-redux";

//need props id
function GiftFoodIcon(props) {

  const history = useHistory();

  // //id passed from onClick
  // const giftFood = () => {

  //   const getItem = props.item

  //   const data = {

  //     upload: {
  //       id: getItem.id,
  //       food: getItem.food,
  //       item: getItem.item,
  //       measure: getItem.measure,
  //       quantity: getItem.quantity,
  //     }
     
  //   };


  //   console.log("gift this item", data)
  //   //props.removeFromInventory(data);
  //   props.addToGiftItems(data);
  //  // props.setUpdate(props.update + 1);
  // };


  //id passed from onClick
  const handleDelete = (id) => {
    const data = {
      id: id,
    };
    // console.log(props.id);
    props.removeFromInventory(data);
    props.setUpdate(props.update + 1);
  };

  return (
    <>
      <Tooltip title="Remove">
        <IconButton
          aria-label="Remove"
          sx={{ ml: 2 }}
          // onClick={() => handleDelete(props.id)}
          onClick={()=> {
            handleDelete(props.id)
            history.push("/gift-food")
          }}
        >
        <Button variant="outlined" color="success">
          Gift Food
        </Button>        
      </IconButton>
      </Tooltip>
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
    removeFromInventory: (data) => dispatch(RemoveFromInventory(data)),
    addToGiftItems: (data) => dispatch(addToGiftItems(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftFoodIcon);
