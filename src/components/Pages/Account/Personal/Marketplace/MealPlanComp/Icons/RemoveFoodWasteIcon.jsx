import React, { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { RemoveFromInventory, addToWasteItems } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import FoodWaste from "../../../FoodWasteE";
import { connect } from "react-redux";

//need props id
function RemoveFoodWasteIcon(props) {

  const [showModal, setShow] = useState(false);


  const history = useHistory();

  //id passed from onClick
  const WasteFood = () => {

    const getItem = props.item

    const data = {

      upload: {
        //id: getItem.id,
        food: getItem.food,
        item: getItem.item,
        measure: getItem.measure,
        quantity: getItem.quantity,
        createdAt: new Date()
      }
     
    };

    //console.log("xxx",data)
    //props.removeFromInventory(data);
    props.addToWasteItems(data);
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
          onClick={() => WasteFood()}
          // onClick={()=> {
          //   handleDelete(props.id)
          //   history.push("/food-waste")
          // }}
        >
        <Button variant="outlined" color="success" onClick={handleShow}>
          Add To Food Waste
        </Button>        
      </IconButton>
      </Tooltip>

      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add To Food Waste</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            <p><h5>Remove {props.item.quantity} {props.item.measure} of {props.item.item} from the inventory?</h5></p>
            <Alert variant="primary">
              Cannot find the measurement unit? select another unit, measure and update
            </Alert>
            <FoodWaste item={props.item}/>
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary"
        onClick={() => {
          //WasteFood()
          handleDelete(props.id)
          handleClose()
          //history.push("/food-waste-edible")
        }}>
            Done
          </Button>
          {/* <Button variant="secondary" 
          onClick={handleClose}
          >
            Cancel
          </Button> */}
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
    addToWasteItems: (data) => dispatch(addToWasteItems(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveFoodWasteIcon);
