import React, {useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import { Modal, Alert, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import { editPurchaseStatusOnSupplier } from "../../../../../../store/actions/marketplaceActions/farmPlanData";
import { sendOrderToFarmerFromSupplier } from "../../../../../../store/actions/dataActions";

import { useTranslation, Trans } from 'react-i18next';
import '../../../../../SubComponents/Button.css'

import { connect } from "react-redux";
import { submitNotification } from "../../../../../lib/Notifications";

//takes props value, meal(name), ingredients, id and onChange(change of value)
function ConfirmItemIconSup(props) {

  const { t } = useTranslation();

  const [showModal, setShow] = useState(false);

 // console.log("to inventory ==> ", props.food)
  const handleSelect = async () => {
    const data = {
      //need to send shopping list data to be bough the previous week from the day it is made
      supplierRef: props.supplierRef,
      status: "ACCEPTED",
      item: props.item,
      currency: props.currency,
      companyID: props.companyID,
      receiversID: props.receiversID,
      deliveryDueDate: props.deliveryDueDate,
      delivery_code: props.delivery_code,
    };
    // props.editPurchaseStatusOnSupplier(data);
    props.sendOrderToFarmerFromSupplier(data).then((resp)=>{
    // submitNotification("Success", "You will be contacted shortly")
    submitNotification("Success", "You will receive a notification when users completes payment");


    }).catch((err)=>{
    submitNotification("Error", "Something went wrong, try again")


    });
    // console.log("show items", data)
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Tooltip title="Bought Item">
        <IconButton
          aria-label="Bought Item"
          sx={{ ml: 2 }}
        >
          <Button className="blue-btn shadow-none mt-3" onClick={handleShow}>
          {t('description.button_confirm')}
          </Button> 
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
    // editPurchaseStatusOnSupplier: (data) => dispatch(editPurchaseStatusOnSupplier(data)),
    sendOrderToFarmerFromSupplier: (data) => dispatch(sendOrderToFarmerFromSupplier(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmItemIconSup);
