import React, {useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import { Modal, Alert, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useTranslation, Trans } from 'react-i18next';

import { connect } from "react-redux";
import { submitNotification } from "../../../../../lib/Notifications";
import { editMenuStatusOnRes, sendOrderToUser } from "../../../../../../store/actions/marketplaceActions/restaurantData";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function ConfirmItemIconRes(props) {

  const { t } = useTranslation();


  const [showModal, setShow] = useState(false);

 // console.log("to inventory ==> ", props.food)
  const handleSelect = async () => {
    const data = {
      //need to send shopping list data to be bough the previous week from the day it is made
      id: props.id,
      item: props.item,
      status: "CONFIRMED",
    };
    props.editMenuStatusOnRes(data);
    props.sendOrderToUser(data)

    submitNotification("Success", "User will be notified");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Tooltip title="Bought Item">
        <IconButton
          aria-label="Bought Item"
          sx={{ ml: 2 }}
          onClick={handleShow}
        >
          <ThumbUpAltIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.button_confirm')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            <p><h5>{t('description.accept_to_deliver')}</h5></p>
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary"
        onClick={() => {
          handleSelect()
          handleClose()
        }}>
            {t('description.button_yes')}
          </Button>
          <Button variant="secondary" 
            onClick={handleClose}
          >
            {t('description.button_cancel')}
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
    editMenuStatusOnRes: (data) => dispatch(editMenuStatusOnRes(data)),
    sendOrderToUser: (data) => dispatch(sendOrderToUser(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmItemIconRes);
