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
import { useTranslation, Trans } from 'react-i18next';

//need props id
function RemoveFoodWasteIcon(props) {
  const { t } = useTranslation();

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
        created_at: new Date()
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
        {t('description.add_to_food_waste')}
        </Button>        
      </IconButton>
      </Tooltip>

      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.add_to_food_waste')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            <p><h5>{t('description.remove')} {props.item.quantity} {props.item.measure} {t('description.of')} {props.item.item} {t('description.from_your_inventory')}</h5></p>
            <Alert variant="primary">
              {t('description.cannot_find_measurement')}
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
            {t('description.button_done')}
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
