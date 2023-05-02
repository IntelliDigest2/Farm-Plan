import React from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { addToRent } from "../../../../../../store/actions/supplierActions/supplierData"

import { connect } from "react-redux";
import { submitNotification } from "../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function AddToRentIcon(props) {

 // console.log("to inventory ==> ", props.food)
  const handleSelect = async () => {
    const data = {
      //need to send shopping list data to be bough the previous week from the day it is made
      upload: {
        productName: props.productName,
        imageURL: props.imageURL,
        productDescription: props.productDescription,
        productQty: props.productQty,
        productMeasure:props.productMeasure,
        productPrice:props.productPrice,
        productCurrency:props.productCurrency,
        companyID: props.companyID,
        productID: props.id,
      },
    };
    props.addToRent(data);
    submitNotification("Success", `${data.upload.productName}` + " added to sals list!");
  };


  return (
    <>
      <Tooltip title="Add To Sales">
        <IconButton
          aria-label="Add To Sales"
          sx={{ ml: 2 }}
          onClick={() => {
            handleSelect();
          }}
        >
          <DeliveryDiningIcon fontSize="25" />
        </IconButton>
      </Tooltip>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToRent: (data) => dispatch(addToRent(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddToRentIcon);
