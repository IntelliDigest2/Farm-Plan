import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Image from "../../../../SubComponents/Image"
import AddToSalesIcon from "./Icons/AddToSalesIcon";
import {format} from 'date-fns'
import {
	
	Table,
} from "react-bootstrap";
// import Edit from "./Icons/EditIcon";

export default function RentBox(props) {

   //trigger this when editing/deleting items
//  const [update, setUpdate] = useState(0);
 
//  const forceUpdate = () => {
//    setUpdate(update + 1);
//  };

const generateRentTable = () => {
  return props.rent.map((rent, index) => {
    let formattedDate = format(rent.createdAt.toDate(), "M/d/yyyy");
    return (
    <tbody>
      <tr key={`${index}`}>
      <td>{formattedDate}</td>
      <td>{rent.rentId}</td>
      <td>{rent.productName}</td>
      <td>{rent.batchNumber}</td>
      <td>{rent.duration} {rent.rateDuration}</td>
      <td>@ {rent.rateAmount}{rent.productCurrency
} per {rent.rateDuration}</td>
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


  console.log(props.rent,`this is the rent list`)
  return (
    <>
      {
      // props.rent.map((product, index) => (
        <div className="meal-box" >
          <div className="ingredients">
          <Table striped bordered hover>
					<thead>
						<tr>
							<th>Date</th>
							<th>Rent Id </th>
							<th>Product Name</th>
							<th>Batch Number</th>

							<th>Duration</th>
							<th>Rate</th>
							<th>Quantity</th>
							<th>Customer Name</th>
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
   

      // )
      // )
      }
      </>
  );
}
