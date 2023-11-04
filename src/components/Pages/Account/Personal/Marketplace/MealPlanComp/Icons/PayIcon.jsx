import React, {useState} from "react";
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




//takes props value, meal(name), ingredients, id and onChange(change of value)
function PayIcon(props) {
  const { t } = useTranslation();

  let history = useHistory();

  // console.log("check userId and orderId  ", props.uid, props.id)

  const [showModal, setShow] = useState(false);
  const baseUrlProd="https://wallet-api-mbvca3fcma-ew.a.run.app"
  const otherUrl = 'https://us-central1-itracker-development.cloudfunctions.net/itrackerPaymentFunction/create-payment-intent'


  const handlePay = async () => {
    // console.log(props.payType, `this is the payment type`)
const transferData = {
      user: props.uid,
      order: props.order, 
      currency: props.currency,
    };
    
          //  await fetch('http://localhost:5001/itracker-development/us-central1/itrackerPaymentFunction/create-payment-intent', {
      await fetch(`${baseUrlProd}/v1/payment/initiate-payment`, {
  
         method: 'POST',
         body: JSON.stringify({
            userId: props.uid,
            orderId: props.refID,
            paymentType: props.payType,
            // currency: 
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((response) => response.json())
         .then((data) => {
            // console.log("this is the data returned", data)
            sendPaymentNotificationToSeller(props.payType,props.consultantPaymentInfo.consultantId)
          //   history.push('/payment-process',{params: {sec: `${data.clientSecret}`,
          // consultInfo : [props.consultantPaymentInfo]}})

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
        <IconButton
          aria-label="Pay"
          sx={{ ml: 2 }}
          onClick={handleShow}
        >
            <CreditScoreIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>

      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('description.payment')}</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            <p><h5>{t('description.continue_to_payment')}</h5></p>
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
