import React, { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { RemoveFromInventory, addToPurchaseItems } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";
import { promiseProps } from "firebase-tools/lib/utils";

//need props id
function PurchaseIcon(props) {

  const [showModal, setShow] = useState(false);


  const history = useHistory();

  //id passed from onClick
  const PurchaseItem = () => {

    const getItem = props.item

    const data = {

      upload: {
        id: getItem.id,
        food: getItem.food,
        item: getItem.item,
        measure: getItem.measure,
        quantity: getItem.quantity,
        profile: props.profile,
        // FirstName: props.profile.firstName, 
        // LastName: props.profile.lastName,
        // Country: props.profile.country,
        // City: props.profile.city,
        // Email: props.profile.email,
        status: "pending"
      }
     
    };


    //props.removeFromInventory(data);
    props.addToPurchaseItems(data);
    submitNotification("Order Successful", "You will be contected shortly..");

   // props.setUpdate(props.update + 1);
  };


  //id passed from onClick
  const handleDelete = (id) => {
    const data = {
      id: id,
    };
    // console.log(props.id);
    props.removeFromInventory(data);
    props.setUpdate(props.update + 1);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Tooltip title="Remove">
        <IconButton
          aria-label="Remove"
          sx={{ ml: 2 }}
          // onClick={() => handleDelete(props.id)}
          // onClick={()=> {
          //   handleDelete(props.id)
          //   history.push("/gift-food")
          // }}
        >
        <Button variant="outlined" color="success" onClick={handleShow}>
          Purchase Item
        </Button>        
      </IconButton>
      </Tooltip>
      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Purchase Item?</Modal.Title>
          </Modal.Header>
        <Modal.Body>
          <p><h5>Hello {props.profile.firstName}, Do you want to request for {props.item.quantity} {props.item.measure} of {props.item.item} to be delivered to you?</h5></p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary"
        onClick={() => {
          PurchaseItem();
          // handleDelete(props.id);
          handleClose();
          //history.push("/gift-food")
        }}>
            Order
          </Button>
          <Button variant="secondary" 
          onClick={handleClose}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
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
    addToPurchaseItems: (data) => dispatch(addToPurchaseItems(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchaseIcon);
