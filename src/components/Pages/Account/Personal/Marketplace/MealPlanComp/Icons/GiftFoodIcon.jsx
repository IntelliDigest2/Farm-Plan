import React, { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { RemoveFromInventory } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import GiftFood from "../../../GiftFoodE"
import { connect } from "react-redux";
import GiftFoodE from "../../../GiftFoodE";
import { useTranslation, Trans } from 'react-i18next';

//need props id
function GiftFoodIcon(props) {
  const { t } = useTranslation();

  const [showModal, setShow] = useState(false);


  const history = useHistory();

  //id passed from onClick
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
          {t('description.gift_food')}
        </Button>        
      </IconButton>
      </Tooltip>
      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.gifted_item')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
        <p><h5>{t('description.remove')} {props.item.quantity} {props.item.measure} {t('description.of')} {props.item.item} {t('description.from_your_inventory')}</h5></p>
           
        <Alert variant="primary">
          {t('description.cannot_find_measurement')} 
        </Alert>
            <GiftFood item={props.item}/>
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary"
        onClick={() => {
          //giftFood();
          handleDelete(props.id);
          handleClose();
          //history.push("/gift-food")
        }}>
            {t('description.button_done')}
          </Button>
          {/* <Button variant="secondary" 
          onClick={handleClose}
          >
            No
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
    //addToGiftItems: (data) => dispatch(addToGiftItems(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftFoodIcon);
