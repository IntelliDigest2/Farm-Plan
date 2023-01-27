import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { RemoveFromInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { connect } from "react-redux";

//need props id
function RemoveFoodWasteIcon(props) {

  const [showModal, setShow] = useState(false);


  const history = useHistory();

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
            This will remove {props.item.quantity} {props.item.measure} of {props.item.item} from the inventory
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary"
        onClick={() => {
          handleDelete(props.id)
          history.push("/food-waste-edible")
        }}>
            Yes
          </Button>
          <Button variant="secondary" 
          onClick={handleClose}
          >
            No
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveFoodWasteIcon);
