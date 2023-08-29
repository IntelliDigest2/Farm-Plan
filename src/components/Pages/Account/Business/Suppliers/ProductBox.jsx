import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Image from "../../../../SubComponents/Image"
import AddToRentIcon from "./Icons/AddToRentIcon";
import AddToSalesIcon from "./Icons/AddToSalesIcon";

// import Edit from "./Icons/EditIcon";

export default function ProductBox(props) {

   //trigger this when editing/deleting items
//  const [update, setUpdate] = useState(0);
 
//  const forceUpdate = () => {
//    setUpdate(update + 1);
//  };


  //console.log("let fetch what weekly props is ==> ", props)
  return (
    <>
      {props.products.map((newProduct, index) => (
        <div className="meal-box" key={`meal-box${index}`}>
          <div className="ingredients">
             <List
              key={`product${index}`}
              styles={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}
            >
              <ListSubheader className="heading">
                <div className="meal-name">{newProduct.productName}</div>
                <div className="icons">
                <AddToSalesIcon 
                   value={props.value}
                   productName={newProduct.productName}
                   imageURL={newProduct.imageURL}
                   productDescription={newProduct.productDescription}
                   productMeasure={newProduct.productMeasure}
                   productQty={newProduct.productQty}
                   productPrice={newProduct.productPrice}
                   productCurrency={newProduct.productCurrency}
                   companyID={newProduct.companyID}
                   region={newProduct.region}
                   city={newProduct.city}
                   companyName={newProduct.companyName}
                   id={newProduct.id}
                   createdAt={newProduct.createdAt}
                  //  update={update}
                  //  setUpdate={setUpdate}
                /> 

                <AddToRentIcon 
                   value={props.value}
                   productName={newProduct.productName}
                   imageURL={newProduct.imageURL}
                   productDescription={newProduct.productDescription}
                   productMeasure={newProduct.productMeasure}
                   productQty={newProduct.productQty}
                   productPrice={newProduct.productPrice}
                   productCurrency={newProduct.productCurrency}
                   companyID={newProduct.companyID}
                   region={newProduct.region}
                   city={newProduct.city}
                   companyName={newProduct.companyName}
                   id={newProduct.id}
                   createdAt={newProduct.createdAt}

                  //  update={update}
                  //  setUpdate={setUpdate}
                /> 
                  {/* {newMeal.nonNativeData ? null : (
                    <Edit
                      value={props.value}
                      meal={newMeal.meal}
                      ingredients={newMeal.ingredients}
                      id={newMeal.id}
                      forceUpdate={props.forceUpdate}
                      saved={props.saved}
                    />
                  )} */}
                </div>
              </ListSubheader>

                <ListItem
                key={`item${index}`}
                className="list"
                style={{ alignItems: "baseline" }}
              >
                  <div >
                    <Image  imageUrl={newProduct.imageURL} />
                    <div>
                    <p>
                     Product Name:  {newProduct.productName}
                    </p>
                    <p>
                     Product Name:  {newProduct.productId}
                    </p>
                    <p>
                      Description: <span>{newProduct.productDescription}</span> 
                    </p>
                    <p>
                     Qauntity: <span>{newProduct.productQty} {newProduct.productMeasure}</span> 
                    </p>
                    <p>
                    Price: <span>{newProduct.productCurrency} {newProduct.productPrice}</span>  
                    </p>
                    </div>
                   
                  </div>
              </ListItem>
            </List>
          </div>
        </div>
      ))}
    </>
  );
}
