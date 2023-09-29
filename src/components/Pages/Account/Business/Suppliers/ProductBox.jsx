import React,{useState} from "react";

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
	const [show, setShow] = useState(false);


   //trigger this when editing/deleting items
//  const [update, setUpdate] = useState(0);
 
//  const forceUpdate = () => {
//    setUpdate(update + 1);
//  };


  //console.log("let fetch what weekly props is ==> ", props)

  const iconToShow =(newProduct)=> {

   return newProduct?.stockType === 'Rentage' ?  <AddToRentIcon 
  product={newProduct}
  show={show} 
  setShow={setShow}
     value={props.value}
   
  /> :  <AddToSalesIcon 
  show={show} 
  setShow={setShow}
  product={newProduct}
     value={props.value}
  
  /> }

  let cost =(newProduct)=> {
    return newProduct.stockType === 'Sale'? <p>
    Price: <span>{newProduct.productCurrency} {newProduct.productPrice}</span>  
    </p> :<p> Rent rates: {newProduct.rentRates.map((rate,index)=>{
      return <span key={`rate-${index}`}>{rate.rateDuration}{newProduct.currency} per {rate.ratePeriod}</span>
    }) }</p> 
   }

  
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

               {iconToShow(newProduct)}
                


                
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
                
                  <div style={{ width: "100%" }}  >
                    <Image  imageUrl={newProduct.imageURL} />
                    <div>
                    <p>
                     Product Name:  {newProduct.productName}
                    </p>
                    <p>
                     Brand Name:  {newProduct.brandName}
                    </p>
                    <p>
                     Batch Number:  {newProduct.batchNumber}
                    </p>
                   
                    <div style={{marginBottom : '0.9rem'}}>
                      Description: <span style={{textWrap : 'wrap', lineHeigt: '1.2rem'}}>{newProduct.productDescription}</span> 
                    </div>
                    <p>
                      Initial quantity:{newProduct.productQty}{newProduct.productMeasure} 
                    </p>
                    <p>
                      Quantity available: {newProduct.currentQuantity}{newProduct.productMeasure} 
                    </p>
                    <p>
                     Stock Type: {newProduct.stockType}
                    </p>
                    {cost(newProduct)}
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
