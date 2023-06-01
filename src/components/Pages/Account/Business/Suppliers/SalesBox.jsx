import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListSubheader from "@mui/material/ListSubheader";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Image from "../../../../SubComponents/Image"
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
      {props.sales.map((newProduct, index) => (
        <div className="meal-box" key={`meal-box${index}`}>
          <div className="ingredients">
             <List
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
                  />  */}
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
            </List>
          </div>
        </div>
      ))}
    </>
  );
}
