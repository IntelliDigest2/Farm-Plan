import React,{useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { addToRent } from "../../../../../../store/actions/supplierActions/supplierData"

import { connect } from "react-redux";
import { submitNotification } from "../../../../../lib/Notifications";
import { Modal } from "react-bootstrap";
import AddToSupplierRentFrom from './AddToSupplierRentForm.js';



//takes props value, meal(name), ingredients, id and onChange(change of value)
function AddToRentIcon(props) {
  const [show, setShow] = useState(false)
	const handleFormClose = () => setShow(false);



 // console.log("to inventory ==> ", props.food)
  const handleSelect = async () => {
    setShow(true)

  
  };

  console.log(props.products)


  return (
    <>
      <Tooltip title="Add To Rent">
        <IconButton
          aria-label="Add To Sales"
          sx={{ ml: 5 }}
          onClick={() => {
            handleSelect();
          }}
        >
          <DeliveryDiningIcon fontSize="50" />
        </IconButton>
      </Tooltip>
      <Modal
				show={show}
				onHide={handleFormClose}
				size="lg"
				aria-labelledby="add item"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="add-item" className="basic-title-left basic-lg">
						Add External Sale
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddToSupplierRentFrom
          productInfo={props.product}
						// handleFormClose={handleFormClose}
						// update={update}
						// setUpdate={setUpdate}
					/>
				</Modal.Body>
			</Modal>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToRent: (data) => dispatch(addToRent(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddToRentIcon);
