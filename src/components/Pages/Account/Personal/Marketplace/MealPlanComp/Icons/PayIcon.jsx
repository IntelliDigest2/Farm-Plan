import React, {useState,useEffect,forwardRef} from "react";
import Tooltip from "@mui/material/Tooltip";
import { Modal, Alert, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import CreditScoreIcon from '@mui/icons-material/CreditScore';import { editPurchaseStatusFromUser, editPurchaseStatusOnUser } from "../../../../../../../store/actions/marketplaceActions/inventoryData";
import { connect } from "react-redux";
import { submitNotification } from "../../../../../../lib/Notifications";
import { useHistory } from 'react-router'
import { useTranslation, Trans } from 'react-i18next';
import {sendPaymentNotificationToSeller} from './notificationData.js';
import Swal from 'sweetalert2';
import {changePurchaseStatus} from './../../../../../../../store/actions/marketplaceActions/consultingBookingData'




//takes props value, meal(name), ingredients, id and onChange(change of value)
const  PayIcon =
// forwardRef(
  ({setPrice,price,index,disabled,newRef,...props}) =>{
  const { t } = useTranslation();

  let history = useHistory();
  // console.log(props,`these are all the variables in props`)

  

  useEffect(() => {
    if(newRef.length > 0){
    console.log(newRef  , `this is the current ref ${index}`)
    }


  }, [newRef])
  

  const [showModal, setShow] = useState(false);
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"
  const otherUrl = 'https://us-central1-itracker-development.cloudfunctions.net/itrackerPaymentFunction/create-payment-intent'



  
  
  const handlePay = async () => {

    
const transferData = {
      user: props.uid,
      order: props.order, 
      currency: props.currency,
    };
    transferData.order.price = parseFloat(newRef.current[index])

    // console.log(transferData,`this is the transfer data`)


    
          //  await fetch('http://localhost:5001/itracker-development/us-central1/itrackerPaymentFunction/create-payment-intent', {
      await fetch(`${baseUrlProd}/v1/payment/initiate-payment`, {
  
         method: 'POST',
         body: JSON.stringify({
            user: transferData.user,
            order: transferData.order,
           
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((response) => response.json())
         .then((data) => {
            // console.log("this is the data returned", data)
            sendPaymentNotificationToSeller(props.payType,props.consultantPaymentInfo.consultantId)
            changePurchaseStatus(props.consultantPaymentInfo.bookingId,
              props.consultantPaymentInfo.consultantId,
              props.consultantPaymentInfo.consultantName,
              props.consultantPaymentInfo.eventType,
              props.consultantPaymentInfo.date)
          

          Swal.fire({
            title: 'Success!',
            text: 'Payment was successful',
            icon: 'success',
          });
         })
         .catch((err) => {
            console.log(err.message);
         })
  
 };


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <Tooltip title="Pay">
        <span>
        <IconButton
        disabled={disabled}
          aria-label="Pay"
          sx={{ ml: 2 }}
          onClick={handleShow}
        >
            <CreditScoreIcon fontSize="inherit" />
        </IconButton></span>
        
      </Tooltip>

      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.payment')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            <h5>{t('description.continue_to_payment')}</h5>
          </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary"
        
        onClick={() => {
          handlePay()
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
// )

const mapStateToProps = (state) => {
  return {
    data: state.data.getData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPurchaseStatusFromUser: (data) => dispatch(editPurchaseStatusFromUser(data)),
    editPurchaseStatusOnUser: (data) => dispatch(editPurchaseStatusOnUser(data)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PayIcon);
