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

export default function ProductBox(props) {

   //trigger this when editing/deleting items
//  const [update, setUpdate] = useState(0);
 
//  const forceUpdate = () => {
//    setUpdate(update + 1);
//  };

const generatesalesTable = () => {
  return props.sales.map((sale, index) => {
    let formattedDate = format(sale.createdAt.toDate(), "M/d/yyyy");
    return (
      <tbody>
        <tr key={`${index}`}>
          <td>{formattedDate}</td>
          <td>{sale.salesId}</td>
          <td>{sale.productName}</td>
          <td>{sale.batchNumber}</td>
          <td>{sale.productCurrency} {sale.productPrice}</td>
          <td>
          {sale.productQty} {sale.productMeasure}
          </td>
          <td>{sale.customerName}</td>
          <td>
            {sale.medium}
            
          </td>
        </tr>
      </tbody>

      // 	// {/* {actualDay.toUpperCase()} */}
    );
  });
};

  //console.log("let fetch what weekly props is ==> ", props)
  return (
    <>
      {/* {props.sales.map((newProduct, index) => ( */}
        <div className="meal-box" >
          <div className="ingredients">
          <Table striped bordered hover>
					<thead>
						<tr>
							<th>Date</th>
							<th>Sale Id </th>
							<th>Product Name</th>
							<th>Batch Number</th>

							<th>Price</th>
							<th>Quantity</th>
							<th>Customer Name</th>
							<th>Medium</th>
						</tr>
					</thead>
					{generatesalesTable()}
				</Table>
             {/* <List
              key={`product${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newProduct.productName}</div>
                <div className="icons">
               
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
                     Product Name: {newProduct.productName}
                    </p>
                    <p>
                     Batch Number: {newProduct.batchNumber}
                    </p>
                    <p>
                      Product Description: {newProduct.productDescription}
                    </p>
                    <p>
                      Quantity : {newProduct.productQty} {newProduct.productMeasure}
                    </p>
                    <p>
                    Price: {newProduct.productCurrency} {newProduct.productPrice} 
                    </p>
                    <p>
                    Date: {format(newProduct.createdAt.toDate(),"MMMM d, yyyy")}
                    </p>
                  </div>
              </ListItem>
            </List> */
}
          </div>
        </div>
       {/* )) } */}
    </>
  );
}
