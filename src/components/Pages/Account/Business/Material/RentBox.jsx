import React,{useState} from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Image from "../../../../SubComponents/Image"
import AddToSalesIcon from "./Icons/AddToSalesIcon";
import {format} from 'date-fns'
import {
	Button,
	Table,
  Modal
} from "react-bootstrap";

import { connect } from "react-redux";




// import Edit from "./Icons/EditIcon";
import {returnRentedItem} from './../../../../../store/actions/supplierActions/supplierData.js';
import {submitNotification} from './../../../../lib/Notifications.js';

 const RentBox =  (props) =>{

   //trigger this when editing/deleting items
//  const [update, setUpdate] = useState(0);
 
//  const forceUpdate = () => {
//    setUpdate(update + 1);
//  };


const [showModal, setShowModal] = useState(false)
const [currentRent, setCurrentRent] = useState(null)
const openModal=(rent)=>{


  setShowModal(true)
  setCurrentRent(rent)



  


}

const closeModal =()=>{
  setShowModal(false)

}

const markRentedItemAsReturned=(rent)=>{
   // props.markRentAsReturned(rent)
   console.log(`this has been clicked in the supplier rent modal`)

}



const generateRentTable = () => {
  return props.rent.map((rent, index) => {
    let formattedDate = format(rent.createdAt.toDate(), "M/d/yyyy");
    // let rentQuantity = rent.productQty
    // let productId = rent.productId
    // let rentId = rent.rentId
    return (
    <tbody key={`rent-${index}`}>
      <tr >
      <td>{formattedDate}</td>
      <td> {rent.status=== 'active' ?  <Button onClick={()=>openModal(rent)} variant="info" type="button">Notify Receipt</Button> : 'RETURNED'}      
</td>
      <td>{rent.rentId}</td>
      <td>{rent.productName}</td>
      <td>{rent.batchNumber}</td>
      <td>{rent.duration} {rent.rateDuration}</td>
      <td>@ {rent.rateAmount}{rent.productCurrency
}</td>
      <td>
      {rent.productQty} {rent.productMeasure}
      </td>
      <td>{rent.customerName}</td>
      <td>
        {rent.totalCost}
        
      </td>
      <td>
        {rent.medium}
        
      </td>
      
      </tr>
    </tbody>
  
    // 	// {/* {actualDay.toUpperCase()} */}
    );
  });
  };


  // console.log(props.rent,`this is the rent list`)
  return (
    <>
      
     
        <div className="meal-box" >
          <div className="ingredients">
          <Table striped bordered hover>
					<thead>
						<tr>
							<th>Date</th>
							<th>Status</th>
							<th>Rent Id </th>
							<th>Product Name</th>
							<th>Batch Number</th>

							<th>Duration</th>
							<th>Rate</th>
							<th>Quantity</th>
							<th>Customer Name</th>
							<th>Total Cost</th>

							<th>Medium</th>
						</tr>
					</thead>
					{generateRentTable()}

             {/* <List
              key={`product${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newProduct.productName}</div>
                <div className="icons">
                {/* <AddToSalesIcon 
                   value={props.value}
                   productName={newProduct.productName}
                   imageURL={newProduct.imageURL}
                   productDescription={newProduct.productDescription}
                   productMeasure={newProduct.productMeasure}
                   productQty={newProduct.productQty}
                   productPrice={newProduct.productPrice}
                   productCurrency={newProduct.productCurrency}
                   companyID={newProduct.companyID}
                   id={newProduct.id}
                  //  update={update}
                  //  setUpdate={setUpdate}
                  />  
                  
                </div>
              </ListSubheader>

                <ListItem
                key={`item${index}`}
                className="list"
                style={{ alignItems: "baseline" }}
              >
                  <div>
                    <Image imageUrl={newProduct.imageURL} />
                    <p>
                      {newProduct.productName}
                    </p>
                    <p>
                      {newProduct.productDescription}
                    </p>
                    <p>
                      {newProduct.productQty} {newProduct.productMeasure}
                    </p>
                    <p>
                    {newProduct.productCurrency} {newProduct.productPrice} 
                    </p>
                  </div>
              </ListItem>
            </List> */}
            </Table>
          </div>
          
        </div>
        <Modal show={showModal} 
        onHide={closeModal}
        >
            <Modal.Header closeButton>
              <Modal.Title>Create</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             {/* Are you sure you want to mark {currentRent?.productName} rented on {format(currentRent?.createdAt.toDate(), "M/d/yyyy")} as returned? */}
             {currentRent ?` Are you sure you want to mark ${currentRent?.productName} rented on ${format(currentRent?.createdAt.toDate(), "M/d/yyyy")} as returned? `: ''}
            </Modal.Body>
            <Modal.Footer>
              <Button className="grey-btn" 
              onClick={closeModal}
              
              >
                Cancel
              </Button>
              <Button className="blue-btn" onClick={() => {
                markRentedItemAsReturned(currentRent);
                
              }}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        
       

      
      </>
  );
}

const mapDispatchToProps = (dispatch) => {
	return {
		markRentAsReturned: (rent) => {
			dispatch(returnRentedItem(rent));
		},
	};
};

export default connect(
	null,
	mapDispatchToProps
)(RentBox);
